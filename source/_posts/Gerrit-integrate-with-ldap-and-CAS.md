---
title: Gerrit 整合 ldap 和 CAS 单点登录
date: 2018-12-03 09:42:41
password:
categories: 运维
keywords: 
- Gerrit
- ldap
- CAS
description: Gerrit 整合 ldap 和 CAS 单点登录
tags:
- Gerrit
- ldap
- CAS
photos: 
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/79/114d466e1f80823db828265ede65ee.jpg
---

## 背景介绍
- Gerrit 版本：2.16
- Gerrit URL：http://devops.iamzhl.top:82

## 整合 LDAP
### 修改 gerrit.config

```bash
# vi /usr/local/review_site/etc/gerrit.config
```

> 请根据自己的`LDAP`服务器信息进行定制

```properties
[auth]
        type = LDAP
[ldap]
        server = ldap://devops.iamzhl.top:389
        username = cn=Manager,dc=iamzhl,dc=top
        password = passwd
        accountBase = ou=People,dc=iamzhl,dc=top
        groupBase = ou=People,dc=iamzhl,dc=top
        accountFullName = uid
```

### 重启服务
```bash
# gerrit restart
```

### 测试
打开网址`http://devops.iamzhl.top:8081`，进入到`Gerrit`主页面

![](https://gitee.com/athlonreg/picbed/raw/master/Images/4d/42f6d16ca0cd469d5b5bd9cfb9f471.jpg)

点击右上角`Sign in`，进入登录界面，输入`LDAP`服务器中的用户名和密码，然后点击`Sign in`

![](https://gitee.com/athlonreg/picbed/raw/master/Images/5e/3a439fb1bcfae0116018eaca7dd987.jpg)

登录成功后跳转到用户主页面，正常获取用户名

![](https://gitee.com/athlonreg/picbed/raw/master/Images/3d/ea561210f011755f97aec7c4a90b59.jpg)

点击用户名 -> Sign Out，正常退出

![](https://gitee.com/athlonreg/picbed/raw/master/Images/4d/42f6d16ca0cd469d5b5bd9cfb9f471.jpg)

至此，`Gerrit`整合`LDAP`完成。

## 整合 CAS
### 修改 gerrit.config

```bash
# vi /usr/local/review_site/etc/gerrit.config
```

修改`[auth]`部分

```properties
[auth]
        type = HTTP
        httpHeader = X-Forwarded-Gerrit
        logoutUrl = http://devops.iamzhl.top:8080/cas/logout
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

### 修改 apache 配置文件

```bash
# vi /etc/httpd/conf/httpd.conf
```

> 添加反向代理

```properties
# 添加一个监听端口 82 用作 Gerrit 的代理主机
Listen 82

# 加载 mod_auth_cas 模块，如果已经加载请忽略
LoadModule auth_cas_module modules/mod_auth_cas.so

# 设置 Gerrit 的虚拟主机
<VirtualHost *:82>
    ServerName devops.iamzhl.top
    ServerAdmin 15563836030@163.com

    CASRootProxiedAs http://devops.iamzhl.top:82

    ProxyRequests Off
    ProxyVia Off
    ProxyPreserveHost On

    <Proxy *>
          Order deny,allow
          Allow from all
    </Proxy>

    <Location "/login/">
        AuthType CAS
        AuthName "Welcome To Gerrit Code Review"
        Require valid-user
        CASAuthNHeader X-Forwarded-Gerrit
    </Location>

    AllowEncodedSlashes On

    ProxyPass / http://devops.iamzhl.top:8081/
    ProxyPassReverse / http://devops.iamzhl.top:8081

    ErrorLog /var/log/gerrit/error.log
    CustomLog /var/log/gerrit/access.log common
</VirtualHost>
```

### 重启服务
```bash
# mkdir /var/log/gerrit
# gerrit restart
# systemctl restart httpd
```

### 测试
打开网址`http://devops.iamzhl.top:82`，发现自动跳转到了`CAS`的登录界面，网址是http://devops.iamzhl.top:8080/cas/login?service=http%3a%2f%2fdevops.iamzhl.top%3a82%2f

![](https://gitee.com/athlonreg/picbed/raw/master/Images/dc/a298cbb27df3f031b6a75d41b8ae3b.jpg)

输入用户名密码后，点击登录，登陆成功，地址是`http://devops.iamzhl.top:82//#/dashboard/self`

![](https://gitee.com/athlonreg/picbed/raw/master/Images/6b/7e1c3e774f6d188f2a2a7203776be1.jpg)

点击用户名 -> Sign Out，就会登出

![](https://gitee.com/athlonreg/picbed/raw/master/Images/a2/726b245663641d5b6aaf1eef3e17bf.jpg)

登出界面如下，地址是`http://devops.iamzhl.top:8080/cas/logout`

![](https://gitee.com/athlonreg/picbed/raw/master/Images/e9/a067be6a85ec888bc9ab25bcf0d0e7.jpg)

至此，`Gerrit`整合`CAS`单点登录完成。