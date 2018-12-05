---
title: TestLink 整合 LDAP 和 CAS 单点登录
date: 2018-12-04 14:55:56
password:
categories: 运维
keywords:
- TestLink
- CAS
- LDAP
description: TestLink 整合 LDAP 和 CAS 单点登录
tags:
- TestLink
- CAS
- LDAP
photos:
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/14/da839143e11bec790a2a77f7247529.jpg
---

## 背景介绍

- TestLink 版本：2.18
- TestLink URL：http://devops.iamzhl.top/testlink
- openLDAP 服务：ldap://devops.iamzhl.top:389
- CAS 服务：http://devops.iamzhl.top:8080/cas

## 整合 LDAP

### 修改`TestLink`配置文件

```bash
# vi /var/www/html/testlink/custom_config.inc.php
```

> 添加`LDAP`配置文件

```php
$tlCfg->authentication['method'] = 'LDAP';
$tlCfg->authentication['ldap'] = array();
$tlCfg->authentication['ldap'][1]['ldap_server'] = 'devops.iamzhl.top';
$tlCfg->authentication['ldap'][1]['ldap_port'] = '389';
$tlCfg->authentication['ldap'][1]['ldap_version'] = '3';
$tlCfg->authentication['ldap'][1]['ldap_root_dn'] = 'dc=iamzhl,dc=top';
$tlCfg->authentication['ldap'][1]['ldap_bind_dn'] = 'cn=Manager,dc=iamzhl,dc=top';
$tlCfg->authentication['ldap'][1]['ldap_bind_passwd'] = '123456';
$tlCfg->authentication['ldap'][1]['ldap_tls'] = false;
$tlCfg->authentication['ldap'][1]['ldap_organization'] = '';
$tlCfg->authentication['ldap'][1]['ldap_uid_field'] = 'uid';
$tlCfg->authentication['ldap'][1]['ldap_email_field'] = 'mail';
$tlCfg->authentication['ldap'][1]['ldap_firstname_field'] = 'givenname';
$tlCfg->authentication['ldap'][1]['ldap_surname_field'] = 'sn';
$tlCfg->authentication['ldap_automatic_user_creation'] = true;
$tlCfg->authentication['ldap_email_field'] = 'mail';
$tlCfg->authentication['ldap_firstname_field'] = 'givenname';
$tlCfg->authentication['ldap_surname_field'] = 'sn';
```

### 测试

> 打开`TestLink`网址`http://devops.iamzhl.top/testlink`

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fxvp6j1abej328s1f8qb2.jpg)

如图，正常跳转到`TestLink`登录界面，输入`LDAP`服务器中的用户名密码后点击`Log in`

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fxvuh6h46uj328s1f8k01.jpg)

如图所示，登陆成功后正常的获取到了用户名，点击左上角的登出按钮，正常退出后跳转到了`TestLink`的登录界面

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fxvuj3kqkjj328s1f8gtv.jpg)

至此，`TestLink`整合`LDAP`完成。

## 整合`CAS`单点登录

### 添加依赖的`phpCAS`库文件

``` bash
# wget https://github.com/apereo/phpCAS/archive/1.3.6.tar.gz
# mv 1.3.6.tar.gz phpCAS-1.3.6.tar.gz
# tar zxvf phpCAS-1.3.6.tar.gz
# chown -R apache:apache phpCAS-1.3.6
# cp -arf phpCAS-1.3.6/source/CAS.php /var/www/html/testlink/lib/functions/
# cp -arf phpCAS-1.3.6/source/CAS /var/www/html/testlink/lib/functions/
```

### 修改`TestLink`配置文件

```bash
# vi /var/www/html/testlink/custom_config.inc.php
```

> 添加`CAS`配置项

```php
/** CAS server parameters */
$tlCfg->authentication['cas_enable'] = true;
$tlCfg->authentication['cas_server_name'] = 'devops.iamzhl.top';
$tlCfg->authentication['cas_server_port'] = 8080;
$tlCfg->authentication['cas_server_path'] = 'cas';
$tlCfg->authentication['cas_debug_enable'] = true;
$tlCfg->authentication['cas_debug_file'] = '/var/logs/testlink/phpCAS.log';
$tlCfg->authentication['cas_server_protocol'] = '2.0';
```

### 修改登录界面

```bash
# vi /var/www/html/testlink/login.php
```

> 在`switch($args->action)`分支选择语句段内找到`case 'loginform'`部分，添加`CAS`的认证

```php
switch($args->action) 
{
  case 'doLogin':
  case 'ajaxlogin':
    doSessionStart(true);
     
    // When doing ajax login we need to skip control regarding session already open
    // that we use when doing normal login.
    // If we do not proceed this way we will enter an infinite loop
    $options = array('doSessionExistsCheck' => ($args->action=='doLogin'));
    $op = doAuthorize($db,$args->login,$args->pwd,$options);
    $doAuthPostProcess = true;
    $gui->draw = true;
  break;

  case 'ajaxcheck':
    processAjaxCheck($db);
  break;


  case 'oauth':
    //If code is empty then break
    if (!isset($_GET['code'])){
        renderLoginScreen($gui);
        die();
    }

    //Switch between oauth providers
    if (!include_once('lib/functions/oauth_providers/'.$_GET['oauth'].'.php')) {
        die("Oauth client doesn't exist");
    }

    $oau = config_get('OAuthServers');
    foreach ($oau as $oprov) {
      if (strcmp($oprov['oauth_name'],$_GET['oauth']) == 0){
        $oauth_params = $oprov;
        break;
      }
    }

    $user_token = oauth_get_token($oauth_params, $_GET['code']);
    if($user_token->status['status'] == tl::OK) {
      doSessionStart(true);
      $op = doAuthorize($db,$user_token->options->user,'oauth',$user_token->options);
      $doAuthPostProcess = true;
    } else {
        $gui->note = $user_token->status['msg'];
        renderLoginScreen($gui);
        die();
    }
  break;

  case 'loginform':
  	//zhanghl start
  	if($authCfg['cas_enable'])
    {    
       if($authCfg['cas_debug_enable'])
       {
          phpCAS::setDebug($authCfg['cas_debug_file']);
       }
       // Initialize phpCAS
       phpCAS::client($authCfg['cas_server_protocol'], $authCfg['cas_server_name'], $authCfg['cas_server_port'], $authCfg['cas_server_path']);
       // For production use set the CA certificate that is the issuer of the cert
       // on the CAS server and uncomment the line below
       // phpCAS::setCasServerCACert($cas_server_ca_cert_path);
       
       // For quick testing you can disable SSL validation of the CAS server.
       // THIS SETTING IS NOT RECOMMENDED FOR PRODUCTION.
       // VALIDATING THE CAS SERVER IS CRUCIAL TO THE SECURITY OF THE CAS PROTOCOL!
       phpCAS::setNoCasServerValidation();
               
       // Override the validation url for any (ST and PT) CAS 2.0 validation
       //phpCAS::setServerProxyValidateURL('http://devops.iamzhl.top:8080/cas/proxyValidate');
               
       // Override the validation url for any CAS 1.0 validation
       //phpCAS::setServerServiceValidateURL('http://devops.iamzhl.top:8080/cas/serviceValidate');
              
       phpCAS::handleLogoutRequests();
       phpCAS::forceAuthentication();
       $options = array('doSessionExistsCheck' => ($args->action=='doLogin'));
       $op = doCASAuthorize($db,$options);
       $doAuthPostProcess = true;
    }
    else {
  	//zhanghl end
	    $doRenderLoginScreen = true;
	    $gui->draw = true;
	    $op = null;

	    // unfortunatelly we use $args->note in order to do some logic.
	    if( ($args->note=trim($args->note)) == "" )
	    {
	      if( $gui->authCfg['SSO_enabled'] )
	      {
	        doSessionStart(true);
	        $doAuthPostProcess = true;
	        
	        switch ($gui->authCfg['SSO_method']) 
	        {
	          case 'CLIENT_CERTIFICATE':
	            $op = doSSOClientCertificate($db,$_SERVER,$gui->authCfg);
	          break;
	          
	          case 'WEBSERVER_VAR':
	            //DEBUGsyslogOnCloud('Trying to execute SSO using SAML');
	            $op = doSSOWebServerVar($db,$gui->authCfg);
	          break;
	        }
	      }
	    }
	//zhanghl start
	}
	//zhanghl end
  break;
}
```

> 在`init_gui`函数内找到`switch($args->note)`分支语句，在`expired`分支下添加一行重定向调用

```php
switch($args->note) {
    case 'expired':
      if(!isset($_SESSION)) {
        session_start();
      }
      session_unset();
      session_destroy();
      $gui->note = lang_get('session_expired');
      $gui->reqURI = null;
      // 添加重定向调用
      redirect(TL_BASE_HREF ."login.php?destination=".$args->destination);
    break;

    case 'first':
      $gui->note = lang_get('your_first_login');
      $gui->reqURI = null;
    break;

    case 'lost':
      $gui->note = lang_get('passwd_lost');
      $gui->reqURI = null;
    break;

    default:
      $gui->note = '';
    break;
  }
```



### 修改登出界面

```bash
# /var/www/html/testlink/logout.php
```

> 在`$authCfg = config_get('authentication');`语句之后添加`CAS`的登出处理

```php
if($authCfg['cas_enable'])
{
   if($authCfg['cas_debug_enable'])
   {
      phpCAS::setDebug($authCfg['cas_debug_file']);
   }
   // Initialize phpCAS
   phpCAS::client($authCfg['cas_server_protocol'], $authCfg['cas_server_name'], $authCfg['cas_server_port'], $authCfg['cas_server_path']);
   phpCAS::logout();
}
redirect("login.php?note=logout");
```

### 修改`common.php`全局引用文件

```bash
# vi /var/www/html/testlink/lib/functions/common.php
```

> 在`require_once('tlsmarty.inc.php');`引用的前面增加对`CAS`的引用

```php
/** TestLink CAS Authentication Ref */
$authCfg = config_get('authentication');
if($authCfg['cas_enable'])
{
   // Load the CAS lib
   require_once 'CAS.php';
}
```

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fxvnthnmyaj31p818kn8o.jpg)

### 修改认证函数

```bash
# vi /var/www/html/testlink/lib/functions/doAuthorize.php
```

> 在开头`require_once`语句的后面添加`CAS`认证函数

```php
// zhanghl start
function doCASAuthorize(&$db,$options=null)
{
   global $g_tlLogger;
   $result = array('status' => tl::ERROR, 'msg' => null);
   $user = new tlUser();
   $user->login = $_SESSION['phpCAS']['user'];
   $login_exists = ($user->readFromDB($db,tlUser::USER_O_SEARCH_BYLOGIN) >= tl::OK);

   if(!$login_exists)
   {
      $user = new tlUser();
      $user->login = $_SESSION['phpCAS']['user'];
      $user->isActive = true;
      $user->authentication = 'LDAP';  // force for auth_does_password_match
      $user->setPassword($user->login);  // write password on DB anyway
   }
   //$user->emailAddress = $_SESSION['phpCAS']['attributes']['mail'];
   //$user->firstName = $_SESSION['phpCAS']['attributes']['sn'];
   //$user->lastName = $_SESSION['phpCAS']['attributes']['givenName'];
   $doLogin = ($user->writeToDB($db) == tl::OK);

   if( $doLogin )
   {
      // Need to do set COOKIE following Mantis model
      $auth_cookie_name = config_get('auth_cookie');
      $expireOnBrowserClose=false;
      setcookie($auth_cookie_name,$user->getSecurityCookie(),$expireOnBrowserClose,'/');

      // Disallow two sessions within one browser
      if (isset($_SESSION['currentUser']) && !is_null($_SESSION['currentUser']))
      {
         $result['msg'] = lang_get('login_msg_session_exists1') .
            ' <a style="color:white;" href="logout.php">' .
            lang_get('logout_link') . '</a>' . lang_get('login_msg_session_exists2');
      }
      else
      {
         // Setting user's session information
         $_SESSION['currentUser'] = $user;
         $_SESSION['lastActivity'] = time();

         $g_tlLogger->endTransaction();
         $g_tlLogger->startTransaction();
         setUserSession($db,$user->login, $user->dbID,$user->globalRoleID,$user->emailAddress,$user->locale,null);

         $result['status'] = tl::OK;
      }
   }
   return $result;
}
// zhanghl end
```

### 修改全局配置文件 (可选)

```bash
# vi /var/www/html/testlink/config.inc.php
```

> 增加`CAS`认证属性

```php
/** CAS server properties */
$tlCfg->authentication['cas_enable'] = false;
$tlCfg->authentication['cas_server_name'] = '';
$tlCfg->authentication['cas_server_port'] = 8080;
$tlCfg->authentication['cas_server_path'] = 'cas';
$tlCfg->authentication['cas_debug_enable'] = true;
$tlCfg->authentication['cas_debug_file'] = '';
$tlCfg->authentication['cas_server_protocol'] = '';
```

***Note：此选项用以设置默认属性值，主要用来日后查阅，可以不写，`/var/www/html/testlink/custom_config.inc.php`文件相同的属性配置会覆盖生效。***

### 修改`CAS`的`Client.php`启用`http`连接(根据个人`CAS`服务器来定)

```bash
# vi /var/www/html/testlink/lib/functions/CAS/Client.php
```

> 将如下几个函数中的`https`改为`http`即可

```php
private function _getServerBaseURL()
{
    // the URL is build only when needed
    if ( empty($this->_server['base_url']) ) {
        // $this->_server['base_url'] = 'https://' . $this->_getServerHostname();
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
        // $final_uri = 'https://';
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

```php
public function getURL()
{
    phpCAS::traceBegin();
    // the URL is built when needed only
    if ( empty($this->_url) ) {
        $final_uri = '';
        // remove the ticket if present in the URL
        // $final_uri = ($this->_isHttps()) ? 'https' : 'http';
        $final_uri = ($this->_isHttps()) ? 'http' : 'http';
        $final_uri .= '://';

        $final_uri .= $this->_getClientUrl();
        $request_uri	= explode('?', $_SERVER['REQUEST_URI'], 2);
        $final_uri		.= $request_uri[0];

        if (isset($request_uri[1]) && $request_uri[1]) {
            $query_string= $this->_removeParameterFromQueryString('ticket', $request_uri[1]);

            // If the query string still has anything left,
            // append it to the final URI
            if ($query_string !== '') {
                $final_uri	.= "?$query_string";
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

> 新建`debug`调试目录

```bash
# mkdir /var/log/testlink
# chown -R apache:apache /var/log/testlink
```

> 打开`TestLink`网址`http://devops.iamzhl.top/testlink`

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fxvougi1woj32221fcdv4.jpg)

如图所示，正常跳转到`CAS`的登录界面，地址变成了`http://devops.iamzhl.top:8080/cas/login?service=http%3A%2F%2Fdevops.iamzhl.top%2Ftestlink%2Flogin.php`，输入用户名密码后点击登录

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fxvuh6h46uj328s1f8k01.jpg)

如图登陆成功后正常获取用户名，点击左上角的登出按钮后，正常退出到`CAS`登出页面

![image-20181205173735167](/Users/canvas/Library/Application Support/typora-user-images/image-20181205173735167.png)

至此，`TestLink`整合`CAS`单点登录完成。