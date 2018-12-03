---
title: MantisBT 整合 LDAP 和 CAS 单点登录
date: 2018-12-03 15:07:11
password:
categories: 运维
keywords:
- MantisBT
- CAS
- LDAP
description: MantisBT 整合 LDAP 和 CAS 单点登录
tags:
- MantisBT
- CAS
- LDAP
photos:
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b1/c3e84af9570ae5c9d61d788d482a69.jpg
---

## 背景介绍

- MantisBT 版本：2.18
- Mantis URL：http://devops.iamzhl.top/mantis
- openLDAP 服务：ldap://devops.iamzhl.top:389
- CAS 服务：http://devops.iamzhl.top:8080/cas

## 整合 LDAP
### 修改`MantisBT`配置文件

> 添加以下配置项

```php
# MantisBT Authentication and LDAP Settings #
$g_login_method = LDAP;
$g_reauthentication = ON;
$g_reauthentication_expiry = TOKEN_EXPIRY_AUTHENTICATED;
$g_ldap_server = 'ldap://devops.iamzhl.top:389';
$g_ldap_root_dn = 'ou=People,dc=iamzhl,dc=top';
$g_ldap_protocol_version = 3;
$g_ldap_organization = '';
$g_ldap_bind_dn = 'cn=Manager,dc=iamzhl,dc=top';
$g_ldap_bind_passwd = '123456';
$g_ldap_uid_field = 'uid';
$g_ldap_realname_field = 'cn';
$g_use_ldap_realname = ON;
$g_use_ldap_email = ON;
```

打开`MantisBT`网址，输入用户名密码点击登录

![](https://gitee.com/athlonreg/picbed/raw/master/Images/dd/a754582a7218fd2860d31fb543c667.jpg)

![](https://gitee.com/athlonreg/picbed/raw/master/Images/07/158dfd797dce0fa01335dd8d9b5085.jpg)

登陆成功后，正常获取用户名

![](https://gitee.com/athlonreg/picbed/raw/master/Images/5d/e2fd0f937861208615ce61fae90423.jpg)

点击右上角的用户名 -> 注销，会正常退出并跳转到登录界面

![](https://gitee.com/athlonreg/picbed/raw/master/Images/5e/e198803ba7693b67b5e6c5fc075ab5.jpg)

至此，`MantisBT`整合`LDAP`完成。

## 整合 CAS 单点登录

### 下载`phpCAS`放到`MantisBT`下

```bash
# wget https://github.com/apereo/phpCAS/archive/1.3.6.tar.gz
# mv 1.3.6.tar.gz phpCAS-1.3.6.tar.gz
# tar zxvf phpCAS-1.3.6.tar.gz
# chown -R apache:apache phpCAS-1.3.6
# cp -arf phpCAS-1.3.6 /var/www/html/mantis/phpCAS
```

### 修改`MantisBT`配置文件

```bash
# vi /var/www/html/mantis/config/config_inc.php
```

> 添加`CAS`认证需要的变量(请按照自己的`LDAP`服务器进行修改)

```php
# MantisBT Authentication With CAS Settings #
$g_login_method = CAS;
$g_cas_server = 'devops.iamzhl.top';
$g_cas_port = 8080;
$g_cas_uri = '/cas';
$g_cas_validate = '';
$g_cas_version = '2.0';
$g_cas_debug = '/var/www/html/mantis/cas.log';
$g_cas_saml_attributes = OFF;
$g_cas_saml_map = array( 'name' => '', 'mail' => '' );
$g_cas_use_ldap = ON;
$g_ldap_mantis_uid  = 'uid';
$g_cas_ldap_update  = OFF;
$g_cas_ldap_update_fields = '';
$g_cas_ldap_update_map    = '';
$g_ldap_language_field = '';
$g_ldap_language_keys = '';
```

### 修改登录页面

```bash
# vi /var/www/html/mantis/login_page.php
```

```php
// 在文件开头的 require_once 部分增加对 phpCAS 的引入
require_once( '/var/www/html/mantis/phpCAS/login_cas.php' );
// 在 $f_username 变量的定义之前添加判断语句，当检测到用户已经认证时，跳转到主页
if( auth_is_user_authenticated() && !current_user_is_anonymous() ) {
	print_header_redirect( config_get( 'default_home_page' ) );
}
```

```bash
# vi /var/www/html/mantis/login.php
```

```php
// 在判断变量 f_install 的判断语句之后添加下面的判断语句来判断验证方式，若为 CAS ，则利用 auth_cas_get_name 函数来处理
if ( CAS == config_get( 'login_method' ) ) {
	# This will detour to the CAS login page if needed
	$f_password = '';
	$f_username = auth_cas_get_name();
	# User is always authenticated by this point
}
```

```bash
# vi /var/www/html/mantis/login_password_page.php
```

```php
// 在 $f_username 变量的定义之前添加判断语句，当检测到用户已经认证时，跳转到主页
if( auth_is_user_authenticated() && !current_user_is_anonymous() ) {
	print_header_redirect( config_get( 'default_home_page' ) );
}
if( auth_is_user_authenticated() && !current_user_is_anonymous() ) {
        print_header_redirect( config_get( 'default_home_page' ) );
}
$f_username              = gpc_get_string( 'username', '' );
# zhanghl start
if( $f_username == '' ) {
        $f_username = $staffid;
}
# zhanghl end
```

### 修改登出页面

```bash
# vi /var/www/html/mantis/logout_page.php
```

```php
// 在文件开头的 require_once 部分增加对 phpCAS 的引入
require_once( '/var/www/html/mantis/phpCAS/login_cas.php' );
// 在 auth_logout(); 上面添加 phpCAS 的登出函数调用，处理 CAS 单点登出
phpCAS::handleLogoutRequests();
phpCAS::logout();
```

### 修改验证逻辑

```bash
# vi /var/www/html/mantis/core/authentication_api.php
```

```php
// 在变量 g_cache_current_user_id 的定义后面添加以下函数，定义 CAS 的登录逻辑
/**
* Initialize phpCAS.
*/
function auth_cas_init() {
       # phpCAS must be installed in the include path
       # or in the Mantis directory.
       require_once('/var/www/html/mantis/phpCAS/CAS.php');

       static $s_initialized=false;

       if (! $s_initialized ) {
               phpCAS::setDebug( config_get( 'cas_debug' ) );
       	       ## These should be set in config_inc.php
               $t_server_version = config_get( 'cas_version' );
               $t_server_cas_server = config_get( 'cas_server' );
               $t_server_port = config_get( 'cas_port' );
               $t_server_uri = config_get( 'cas_uri' );
               $t_start_session = (boolean)FALSE; # Mantis takes care of its own session

               phpCAS::client($t_server_version, $t_server_cas_server, $t_server_port, $t_server_uri, $t_start_session);
               if ($t_server_version == "S1")
                       phpCAS::setServerSamlValidateURL( config_get( 'cas_validate' ) );
               else
                       phpCAS::setServerProxyValidateURL( config_get( 'cas_validate' ) );
               if (method_exists('phpCAS', 'setNoCasServerValidation')) {
                       // no SSL validation for the CAS server
                       phpCAS::setNoCasServerValidation();
               }

               $s_initialized = true;
       }

}

/**
* Fetches the user's CAS name, authenticating if needed.
* Can translate CAS login name to Mantis username through LDAP.
*/
function auth_cas_get_name()
{
       # Get CAS username from phpCAS
       auth_cas_init();
       phpCAS::forceAuthentication();
       $t_cas_id = phpCAS::getUser();
       $t_cas_attribs = phpCAS::getAttributes();

       # If needed, translate the CAS username through LDAP
       $t_username = $t_cas_id;
       if (config_get( 'cas_use_ldap', false )) {
               $t_username = auth_cas_ldap_translate( $t_cas_id );
       }
       elseif (config_get( 'cas_saml_attributes', false )) {
               $t_cas_attribmap = config_get( 'cas_saml_map', array() );
               $t_cas_attrib_name = $t_cas_attribs[$t_cas_attribmap['name']];
               $t_cas_attrib_mail = $t_cas_attribs[$t_cas_attribmap['mail']];
               if ( user_get_id_by_name($t_cas_id) == false ) {
                       user_create( $t_cas_id, '', $t_cas_attrib_mail, null, false, true, $t_cas_attrib_name );
	       }
       }
                               
       return $t_username;
}

/**
* Takes an ID string, and looks up the LDAP directory to find
* the matching username for Mantis.
*
* Optionally, also update the user information in the Mantis user
* table.
*
* @param $p_cas_id string Typically, the username given by phpCAS.
* @param $p_update_user bool Whether or not to update user details from LDAP.
*/
function auth_cas_ldap_translate( $p_cas_id, $p_update_user='' )
{

       # Please make sure the Mantis CAS and LDAP settings are set in config_inc.php

       $t_ldap_organization    = config_get( 'ldap_organization' );
       $t_ldap_root_dn         = config_get( 'ldap_root_dn' );

       # Required fields in LDAP for CAS
       $t_ldap_language_field = config_get( 'ldap_language_field', '' );
       $t_ldap_uid_field = config_get( 'ldap_uid_field', 'uid' ) ;
       $t_ldap_mantis_uid = config_get( 'ldap_mantis_uid', 'uid' );
       $t_ldap_required = array( $t_ldap_uid_field, $t_ldap_mantis_uid, 'dn' );
       if ($t_ldap_language_field) {
               // Add language field to attributes list only if it is configured.
               $t_ldap_required[] = $t_ldap_language_field;
       }
       $t_ldap_required = array_combine( $t_ldap_required, $t_ldap_required );

       # User-defined fields to fetch from LDAP...
       $t_ldap_fields = explode( ',', config_get( 'cas_ldap_update_fields' ) );
       $t_ldap_fields = array_combine( $t_ldap_fields, $t_ldap_fields );
       # ...which are mapped to Mantis user fields
       $t_ldap_map = explode( ',', config_get( 'cas_ldap_update_map' ) );
       $t_ldap_map = array_combine( $t_ldap_map, $t_ldap_map );

       # Build LDAP search filter, attribute list from CAS ID
       $t_search_filter = "(&$t_ldap_organization($t_ldap_uid_field=$p_cas_id))";
       $t_search_attrs = array_values($t_ldap_required + $t_ldap_fields);      # array union

       # Use Mantis ldap_api to connect to LDAP
       $t_ds = ldap_connect_bind();
       $t_sr   = ldap_search( $t_ds, $t_ldap_root_dn, $t_search_filter, $t_search_attrs );
       $t_info = ldap_get_entries( $t_ds, $t_sr );
       # Parse the LDAP entry to find the Mantis username
       if ( $t_info ) {
               # Get Mantis username
               $t_username = $t_info[0][$t_ldap_mantis_uid][0];

               # @@@ The fact that we got here means the user is authenticated
               # @@@ by CAS, and has an LDAP entry.
               # @@@ We might as well update other user details since we are here.

               # If no argument given, check settings
               if ( '' == $p_update_user ) {
                       $p_update_user = config_get( 'cas_ldap_update', FALSE );
               }
               # If there's a user record, then update it
               if ( $p_update_user ) {
                       # Only proceed if the field map arrays are the same length
                       $t_field_map = array_combine( $t_ldap_fields, $t_ldap_map );
                       if ($t_field_map) {
                               # If user is new, then we must create their account before updating it
                               # @@@ ( make sure $g_allow_blank_email == ON )
                               $t_userid = user_get_id_by_name($t_username);
                               if ( false == $t_userid ) {
                                       user_create( $t_username, '' );
                                       # @@@ Wow, this is pretty lame
                                       $t_userid = user_get_id_by_name($t_username);
                               }
                               # @@@ maybe we can optimize this to write all fields at once?
                             foreach ( $t_field_map as $key=>$t_userfield ) {
                                     if (isset($t_info[0][$key][0])) {
                                             user_set_field( $t_userid, $t_userfield, $t_info[0][$key][0] );
                                     }
                             }
                       }

                       // Update user's overall language preference
                       if ($t_ldap_language_field) {
                               $t_language = $t_info[0][$t_ldap_language_field][0];
                               // Map the LDAP language field to Mantis' language field if needed
                               $t_language_keys = config_get( 'ldap_language_keys', '');
                               $t_language_values = config_get( 'ldap_language_values', '');
                               $t_language_map = array_combine(
                                       explode(',', $t_language_keys),
                                       explode(',', $t_language_values)
                               );
                               if (isset($t_language_map[$t_language])) {
                                       $t_language = $t_language_map[$t_language];
                               }
                               user_pref_set_pref($t_userid, 'language', $t_language);
                       }
               }
       }
       ldap_free_result( $t_sr );
       ldap_unbind( $t_ds );

       return $t_username;
}

/**
* Logs out of CAS, redirecting to Mantis on re-login.
* User should already be logged out of Mantis by the time this is called.
* @see auth_logout()
*/
function auth_cas_logout()
{
       $t_path = config_get('path');
       auth_cas_init();

       if (method_Exists('phpCAS', 'logoutWithUrl')) {
               phpCAS::logoutWithUrl($t_path);
       } else {
               phpCAS::logout($t_path);
       }
}
// zhanghl end
```

```php
// 修改 auth_auto_create_user 函数实现 CAS 自动创建用户
function auth_auto_create_user( $p_username, $p_password ) {
	$t_login_method = config_get_global( 'login_method' );

	// if( $t_login_method == BASIC_AUTH ) {
	if ( in_array( $t_login_method, array( BASIC_AUTH, CAS ) ) ) {
		# attempt to create the user if using BASIC_AUTH or CAS
		$t_auto_create = true;
	} else if( $t_login_method == LDAP && ldap_authenticate_by_username( $p_username, $p_password ) ) {
		$t_auto_create = true;
	} else {
		$t_auto_create = false;
	}

	if ( CAS == config_get( 'login_method' ) ) {
		# Redirect to CAS page to logout
		auth_cas_logout();
	}

	if( $t_auto_create ) {
		# attempt to create the user
		$t_cookie_string = user_create( $p_username, md5( $p_password ) );
		if( $t_cookie_string === false ) {
			# it didn't work
			return false;
		}

		# ok, we created the user, get the row again
		return user_get_id_by_name( $p_username );
	}

	session_clean();

	return false;
}
```

```php
function auth_attempt_login( $p_username, $p_password, $p_perm_login = false ) {
	$t_user_id = auth_get_user_id_from_login_name( $p_username );
	$t_login_method = config_get( 'login_method' );

	if( $t_user_id === false ) {
		if ( in_array( $t_login_method, array( BASIC_AUTH, CAS ) ) ) {
            # attempt to create the user if using BASIC_AUTH or CAS
            # ( note: CAS must have $g_allow_blank_email == ON )
 			$t_auto_create = true;
		}
		$t_user_id = auth_auto_create_user( $p_username, $p_password );
		if( $t_user_id === false ) {
			return false;
		}
	}

	# max. failed login attempts achieved...
	if( !user_is_login_request_allowed( $t_user_id ) ) {
		return false;
	}

	# check for anonymous login
	if( !user_is_anonymous( $t_user_id ) ) {
		# anonymous login didn't work, so check the password
		if( !auth_does_password_match( $t_user_id, $p_password ) ) {
			user_increment_failed_login_count( $t_user_id );
			return false;
		}
	}

	return auth_login_user( $t_user_id, $p_perm_login );
}
```

```php
function auth_logout() {
	global $g_cache_current_user_id, $g_cache_cookie_valid;

	# clear cached userid
	user_clear_cache( $g_cache_current_user_id );
	current_user_set( null );
	$g_cache_cookie_valid = null;

	# clear cookies, if they were set
	if( auth_clear_cookies() ) {
		helper_clear_pref_cookies();
	}

	if( HTTP_AUTH == config_get_global( 'login_method' ) ) {
		auth_http_set_logout_pending( true );
	}

	elseif ( CAS == config_get( 'login_method' ) ) {
	        # Redirect to CAS page to logout
        	auth_cas_logout();
	}

	session_clean();
}
```

```php
function auth_automatic_logon_bypass_form() {
        switch( config_get( 'login_method' ) ) {
                case HTTP_AUTH:
                        return true;
                case CAS:
                        return true;
        }
        return false;
        //return config_get_global( 'login_method' ) == HTTP_AUTH;
}
```

```php
function auth_does_password_match( $p_user_id, $p_test_password ) {
	$t_configured_login_method = config_get_global( 'login_method' );

	if( LDAP == $t_configured_login_method ) {
		return ldap_authenticate( $p_user_id, $p_test_password );
	}

	elseif ( CAS == $t_configured_login_method ) {
		return true;
	}

	if( !auth_can_use_standard_login( $p_user_id ) ) {
		return false;
	}

	$t_password = user_get_field( $p_user_id, 'password' );
	$t_login_methods = array(
		MD5,
		CRYPT,
		PLAIN,
		BASIC_AUTH,
		CAS,
	);

	foreach( $t_login_methods as $t_login_method ) {
		# pass the stored password in as the salt
		if( auth_process_plain_password( $p_test_password, $t_password, $t_login_method ) == $t_password ) {
			# Do not support migration to PLAIN, since this would be a crazy thing to do.
			# Also if we do, then a user will be able to login by providing the MD5 value
			# that is copied from the database.  See #8467 for more details.
			if( ( $t_configured_login_method != PLAIN && $t_login_method == PLAIN ) ||
				( $t_configured_login_method != BASIC_AUTH && $t_login_method == BASIC_AUTH ) ) {
				continue;
			}

			# Check for migration to another login method and test whether the password was encrypted
			# with our previously insecure implementation of the CRYPT method
			if( ( $t_login_method != $t_configured_login_method ) || (( CRYPT == $t_configured_login_method ) && mb_substr( $t_password, 0, 2 ) == mb_substr( $p_test_password, 0, 2 ) ) ) {
				user_set_password( $p_user_id, $p_test_password, true );
			}

			return true;
		}
	}

	return false;
}
```

```php
function auth_reauthenticate() {
	//if( !auth_reauthentication_enabled() || BASIC_AUTH == config_get_global( 'login_method' ) || HTTP_AUTH == config_get_global( 'login_method' ) ) {
	if( !auth_reauthentication_enabled() || in_array(config_get('login_method'), array(BASIC_AUTH, HTTP_AUTH, CAS)) ) {
		return true;
	}

	$t_auth_token = token_get( TOKEN_AUTHENTICATED );
	if( null != $t_auth_token ) {
		token_touch( $t_auth_token['id'], auth_reauthentication_expiry() );
		return true;
	} else {
		$t_anon_account = auth_anonymous_account();
		$t_anon_allowed = auth_anonymous_enabled();

		$t_user_id = auth_get_current_user_id();
		$t_username = user_get_username( $t_user_id );

		# check for anonymous login
		if( ON == $t_anon_allowed && $t_anon_account == $t_username ) {
			return true;
		}

		$t_request_uri = string_url( $_SERVER['REQUEST_URI'] );

		$t_query_params = http_build_query(
			array(
				'reauthenticate' => 1,
				'username' => $t_username,
				'return' => $t_request_uri,
			),
			'', '&'
		);

		# redirect to login page
		print_header_redirect( auth_credential_page( $t_query_params ) );
	}
}
```

### 新建`login_cas.php`处理拦截利用`CAS`认证登录


```bash
#  vi /var/www/html/mantis/phpCAS/login_cas.php
```

```php
<?php

require_once( 'CAS.php' );
define('CAS_ENABLE', true);
$cas_host = 'devops.iamzhl.top';
$cas_context = '/cas';
$cas_port = 8080;
$cas_real_hosts = array (
	'devops.iamzhl.top'
);

phpCAS::setDebug();
phpCAS::setVerbose(true);
phpCAS::client(CAS_VERSION_2_0, $cas_host, $cas_port, $cas_context);
phpCAS::setNoCasServerValidation();
phpCAS::handleLogoutRequests(true, $cas_real_hosts);
phpCAS::forceAuthentication();
?>

```

### 修改`phpCAS`源码取消`https`

```bash
# vi /var/www/html/mantis/phpCAS/source/CAS/Client.php
```

```php
private function _getServerBaseURL()
    {
        // the URL is build only when needed
        if ( empty($this->_server['base_url']) ) {
            //$this->_server['base_url'] = 'https://' . $this->_getServerHostname();
            $this->_server['base_url'] = 'http://' . $this->_getServerHostname();
            if ($this->_getServerPort()!=443) {
                $this->_server['base_url'] .= ':'
                .$this->_getServerPort();
            }
            $this->_server['base_url'] .= $this->_getServerURI();
        }
        return $this->_server['base_url'];
    }
```

```php
private function _getCallbackURL()
    {
        // the URL is built when needed only
        if ( empty($this->_callback_url) ) {
            $final_uri = '';
            // remove the ticket if present in the URL
            //$final_uri = 'https://';
            $final_uri = 'http://';
            $final_uri .= $this->_getClientUrl();
            $request_uri = $_SERVER['REQUEST_URI'];
            $request_uri = preg_replace('/\?.*$/', '', $request_uri);
            $final_uri .= $request_uri;
            $this->_callback_url = $final_uri;
        }
        return $this->_callback_url;
    }
```

```
public function getURL()
    {
        phpCAS::traceBegin();
        // the URL is built when needed only
        if ( empty($this->_url) ) {
            $final_uri = '';
            // remove the ticket if present in the URL
            //$final_uri = ($this->_isHttps()) ? 'https' : 'http';
            $final_uri = ($this->_isHttps()) ? 'http' : 'http';
            $final_uri .= '://';

            $final_uri .= $this->_getClientUrl();
            $request_uri        = explode('?', $_SERVER['REQUEST_URI'], 2);
            $final_uri          .= $request_uri[0];

            if (isset($request_uri[1]) && $request_uri[1]) {
                $query_string= $this->_removeParameterFromQueryString('ticket', $request_uri[1]);

                // If the query string still has anything left,
                // append it to the final URI
                if ($query_string !== '') {
                    $final_uri  .= "?$query_string";
                }
            }

            phpCAS::trace("Final URI: $final_uri");
            $this->setURL($final_uri);
        }
        phpCAS::traceEnd($this->_url);
        return $this->_url;
    }
```


### 测试

> 新建`log`目录

```bash
# mkdir /var/log/mantis
# chown -R apache:apache /var/log/mantis
```

打开`MantisBT`网址，正常跳转至`CAS`登录界面，网址是`http://devops.iamzhl.top:8080/cas/login?service=http%3A%2F%2Fdevops.iamzhl.top%2Fmantis%2Flogin_page.php`

![](https://gitee.com/athlonreg/picbed/raw/master/Images/fa/f707556ce41d95b71052d07834f5d8.jpg)

如图，输入用户名密码后点击登录，正常登陆后跳转至`MantisBT`主页，并且正常获取用户名

![](https://gitee.com/athlonreg/picbed/raw/master/Images/49/1365298ec15c90fbf95612a38606ed.jpg)

点击右上角的用户名 -> 注销，会正常退出并跳转到`CAS`的登出界面

![](https://gitee.com/athlonreg/picbed/raw/master/Images/85/2d25e40bdf97b6f06dad6239cf3167.jpg)
