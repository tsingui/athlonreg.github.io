---
title: SonarQube 整合 LDAP 和 CAS 单点登录
date: 2018-11-30 13:23:17
password:
categories: 运维
keywords: 
- SonarQube
- LDAP
- CAS
description: SonarQube 整合 LDAP 和 CAS 单点登录
tags: 
- SonarQube
- LDAP
- CAS
photos: 
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b4/92864641223d1537b6f4dfa27a6358.jpg
---

## 背景介绍
- `SonarQube`版本：7.4
- `SonarQube` URL: http://devops.iamzhl.top:9000

## 整合`LDAP`

修改`sonar`配置文件`sonar.properties`

```bash
$ vi /usr/local/sonarqube-7.4/conf/sonar.properties
```

找到下面的部分修改`LDAP`配置

```properties
#--------------------------------------------------------------------------------------------------
# LDAP CONFIGURATION

# Enable the LDAP feature
# sonar.security.realm=LDAP

# Set to true when connecting to a LDAP server using a case-insensitive setup.
# sonar.authenticator.downcase=true

# URL of the LDAP server. Note that if you are using ldaps, then you should install the server certificate into the Java truststore.
# ldap.url=ldap://localhost:10389

# Bind DN is the username of an LDAP user to connect (or bind) with. Leave this blank for anonymous access to the LDAP directory (optional)
# ldap.bindDn=cn=sonar,ou=users,o=mycompany

# Bind Password is the password of the user to connect with. Leave this blank for anonymous access to the LDAP directory (optional)
# ldap.bindPassword=secret

# Possible values: simple | CRAM-MD5 | DIGEST-MD5 | GSSAPI See http://java.sun.com/products/jndi/tutorial/ldap/security/auth.html (default: simple)
# ldap.authentication=simple
```

修改如下(请将具体信息按照自己的`LDAP`服务器信息进行修改):

```properties
#--------------------------------------------------------------------------------------------------
# LDAP CONFIGURATION

# Enable the LDAP feature
sonar.security.realm=LDAP

# Set to true when connecting to a LDAP server using a case-insensitive setup.
# sonar.authenticator.downcase=true

# URL of the LDAP server. Note that if you are using ldaps, then you should install the server certificate into the Java truststore.
ldap.url=ldap://devops.iamzhl.top:389

# Bind DN is the username of an LDAP user to connect (or bind) with. Leave this blank for anonymous access to the LDAP directory (optional)
ldap.bindDn=cn=Manager,dc=iamzhl,dc=top

# Bind Password is the password of the user to connect with. Leave this blank for anonymous access to the LDAP directory (optional)
ldap.bindPassword=passwd

# Possible values: simple | CRAM-MD5 | DIGEST-MD5 | GSSAPI See http://java.sun.com/products/jndi/tutorial/ldap/security/auth.html (default: simple)
ldap.authentication=simple

# See :
#   * http://java.sun.com/products/jndi/tutorial/ldap/security/digest.html
#   * http://java.sun.com/products/jndi/tutorial/ldap/security/crammd5.html
# (optional)
# ldap.realm=example.org

# Context factory class (optional)
# ldap.contextFactoryClass=com.sun.jndi.ldap.LdapCtxFactory

# Enable usage of StartTLS (default : false)
# ldap.StartTLS=true

# Follow or not referrals. See http://docs.oracle.com/javase/jndi/tutorial/ldap/referral/jndi.html (default: true)
# ldap.followReferrals=false

# USER MAPPING

# Distinguished Name (DN) of the root node in LDAP from which to search for users (mandatory)
ldap.user.baseDn=ou=People,dc=iamzhl,dc=top

# LDAP user request. (default: (&(objectClass=inetOrgPerson)(uid={login})) )
# ldap.user.request=(&(objectClass=user)(sAMAccountName={login}))
ldap.user.request=(&(objectClass=inetOrgPerson)(uid={login}))

# Attribute in LDAP defining the user’s real name. (default: cn)
# ldap.user.realNameAttribute=name
ldap.user.realNameAttribute=cn

# Attribute in LDAP defining the user’s email. (default: mail)
# ldap.user.emailAttribute=email
ldap.user.emailAttribute=mail

# GROUP MAPPING

# Distinguished Name (DN) of the root node in LDAP from which to search for groups. (optional, default: empty)
# ldap.group.baseDn=cn=groups,dc=example,dc=org
ldap.group.baseDn=ou=People,dc=iamzhl,dc=top

# LDAP group request (default: (&(objectClass=groupOfUniqueNames)(uniqueMember={dn})) )
# ldap.group.request=(&(objectClass=group)(member={dn}))
ldap.group.request=(&(objectClass=posixGroup)(memberUid={uid}))

# Property used to specifiy the attribute to be used for returning the list of user groups in the compatibility mode. (default: cn)
# ldap.group.idAttribute=sAMAccountName
```

修改完成后，重启`sonar`

```bash
$ sonar restart
```

打开`sonar`网址，输入`LDAP`中的用户名和密码后点击登录

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/89/7728c5a52a96a6841a426155062a56.jpg)

登陆成功后，正常获取用户名

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/dd/53d39dc0858679e2a4949419417678.jpg)

至此，`SonarQube`整合`LDAP`完成

## 整合`CAS`单点登录
### 介绍
`SonarQube`提供了一种`SSO`机制，可以用来作为单点登录的实现方式，就是使用`HTTP header`的方式，而`CAS`也提供了一种用于`apache`服务的认证方式，这就是`mod_auth_cas`，思路很简单，我们利用`apache`反向代理，做一个端口用于虚拟主机来转发`SonarQube`服务，然后在这个虚拟主机内部加入`mod_auth_cas`提供的认证拦截，同时在里面指定一个`HTTP header`用于发送认证后的请求到`SonarQube`，然后，`SonarQube`接收到这个请求后，发现正是自己设定的`HTTP header`，于是予以通过认证。这就是整个认证流程，下面开始介绍整合方法。

### `SonarQube`修改
```bash
$ vi /usr/local/sonarqube-7.4/conf/sonar.properties
```

修改如下部分(就是将`SSO AUTHENTICATION`部分的参数取消注释，令其生效)

```properties
#--------------------------------------------------------------------------------------------------
# SSO AUTHENTICATION

# Enable authentication using HTTP headers
sonar.web.sso.enable=true

# Name of the header to get the user login.
# Only alphanumeric, '.' and '@' characters are allowed
sonar.web.sso.loginHeader=X-Forwarded-Login

# Name of the header to get the user name
sonar.web.sso.nameHeader=X-Forwarded-Name

# Name of the header to get the user email (optional)
sonar.web.sso.emailHeader=X-Forwarded-Email

# Name of the header to get the list of user groups, separated by comma (optional).
# If the sonar.sso.groupsHeader is set, the user will belong to those groups if groups exist in SonarQube.
# If none of the provided groups exists in SonarQube, the user will only belong to the default group.
# Note that the default group will always be set.
sonar.web.sso.groupsHeader=X-Forwarded-Groups

# Interval used to know when to refresh name, email and groups.
# During this interval, if for instance the name of the user is changed in the header, it will only be updated after X minutes.
sonar.web.sso.refreshIntervalInMinutes=5
```

修改`app.d5dba530.chunk.js`，解决登出问题，不同的版本不同，`7.2.1`的在`main`开头的一个`js`文件中。

```bash
# vi /usr/local/sonarqube-7.4/web/js/app.d5dba530.chunk.js
```

修改如下

```js
t.handleLogout = function(e) {
	// e.preventDefault(), t.context.router.push("/sessions/logout") 
	t.context.router.push("/sessions/logout")  //去掉e.preventDefault()方法
}
```

```js
r.createElement("li", null, r.createElement("a", {
	//href: "#",
	href: "http://192.168.6.99:8080/cas/logout",  //将此注销按钮的href改为CAS服务器的登出页面
	onClick: this.handleLogout
}
```

### `mod_auth_cas`修改
然后安装`mod_auth_cas`

```bash
# yum -y install mod_auth_cas
```

配置`mod_auth_cas`

```bash
# vi /etc/httpd/conf.d/auth_cas.conf
```

修改`CAS`的`Cookie`存储位置以及登录地址和验证地址等参数如下

```properties
LogLevel Debug
CASDebug On
CASVersion 2
CASTimeout 1740
CASIdleTimeout 1740
CASSSOEnabled On
CASCookiePath /var/cache/httpd/mod_auth_cas/
CASLoginURL http://devops.iamzhl.top:8080/cas/login
CASValidateURL http://devops.iamzhl.top:8080/cas/serviceValidate
```

### `apache`修改

```bash
# vi /etc/httpd/conf/httpd.conf
```

添加虚拟主机

```properties
# 添加一个监听端口 83 用作 SonarQube 的代理主机
Listen 83

# 加载 mod_auth_cas 模块，如果已经加载请忽略
LoadModule auth_cas_module modules/mod_auth_cas.so

# 设置 SonarQube 的虚拟主机
<VirtualHost *:83>
        ServerName devops.iamzhl.top
        ServerAdmin 15563836030@163.com

        CASRootProxiedAs http://devops.iamzhl.top:83

        ProxyPreserveHost On

        ProxyPass / http://devops.iamzhl.top:9000/
        ProxyPassReverse / http://devops.iamzhl.top:9000/
        ProxyPass /sessions/logout http://devops.iamzhl.top:8080/cas/logout
        ProxyPassReverse /sessions/logout http://devops.iamzhl.top:8080/cas/logout
        ProxyPass /api/authentication/logout http://devops.iamzhl.top:8080/cas/logout
        ProxyPassReverse /api/authentication/logout http://devops.iamzhl.top:8080/cas/logout

        ErrorLog /var/log/sonar/error.log
        CustomLog /var/log/sonar/access.log common

        <Location />
                AuthName "Welcome to devops sonar"
                CASAuthNHeader X-Forwarded-Login
                Authtype CAS
                require valid-user
        </Location>

        <Proxy *>
                Order deny,allow
                Allow from all
        </Proxy>
</VirtualHost>
```

### 重启服务
```bash
# mkdir /var/log/sonar
# chown -R apache:apache /var/lo g/sonar
# su sonar
$ sonar restart
# su 
# systemctl restart httpd
```

### 测试
打开网址`http://devops.iamzhl.top:83`，发现自动跳转到了`CAS`的登录界面，网址是http://devops.iamzhl.top:8080/cas/login?service=http%3a%2f%2fdevops.iamzhl.top%3a83%2f

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/0b/b05aa63a31ffc624e42290d71c68e8.jpg)

输入用户名密码后点击登录

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/6d/548f70b5aba6e4399e06ae288adfa9.jpg)

如图所示，登陆成功，地址是`http://devops.iamzhl.top:83/projects`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e1/463c767ddd0147ed54fba65d91a0f7.jpg)

如上图所示，点击注销，就会登出并跳转至`CAS`的登出界面

至此，`SonarQube`整合`CAS`单点登录完成。