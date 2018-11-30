---
title: CAS 5.3.4 安装部署
date: 2018-11-24 20:59:49
password: geovis
categories: 运维
keywords: CAS
description: CAS 5.3.4 安装部署
tags: CAS
photos: https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/91/6097314bc496dd2404ecc7ccac8a28.jpg
top: 101
---

## 简介

`CAS`全称`Central Authentication Service`，中央认证服务，一种独立开放指令协议。CAS 是 Yale 大学发起的一个开源项目，旨在为 Web 应用系统提供一种可靠的单点登录方法，CAS 在 2004 年 12 月正式成为 JA-SIG 的一个项目，目前是一种企业级的单点登录解决方案。

## 协议介绍

关于 oauth2.0 的原理及介绍可以参考[理解OAuth 2.0 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)，这里不做赘述。

## 环境准备
`CAS`是基于Spring写的，因此需要准备Java环境，官方提供了一种非常好用的编译方法，我们在使用时可以根据自己的需求来决定依赖的选择，本文主要以openLDAP和oauth为例。编译时需要maven环境。运行时需要 Tomcat 容器，因此需要提前准备好 Tomcat 环境。后续我们会整合 openLDAP 做统一用户管理，因此请先安装好 openLDAP。

## 编译
首先去项目地址下载编译模板

```url
https://github.com/apereo/cas-overlay-template
```

```bash
# git clone https://github.com/apereo/cas-overlay-template
# cd cas-overlay-template
# vi pom.xml
```

找到下面的部分

```properties
<dependencies>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-webapp${app.server}</artifactId>
        <version>${cas.version}</version>
        <type>war</type>
        <scope>runtime</scope>
    </dependency>
    <!--
    ...Additional dependencies may be placed here...
    -->
    </dependencies>
```

将注释的部分替换为我们需要的模块

```properties
<dependencies>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-webapp${app.server}</artifactId>
        <version>${cas.version}</version>
        <type>war</type>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-oauth-webflow</artifactId>
        <version>${cas.version}</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>${mysql.driver.version}</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-jdbc</artifactId>
        <version>${cas.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-jdbc-drivers</artifactId>
        <version>${cas.version}</version>
    </dependency>
    <!--
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-rest</artifactId>
        <version>${cas.version}</version>
        <scope>runtime</scope>
    </dependency>
    -->
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-ldap</artifactId>
        <version>${cas.version}</version>
    </dependency>
    <!--
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-jpa-ticket-registry</artifactId>
        <version>${cas.version}</version>
    </dependency>

    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-jpa-service-registry</artifactId>
        <version>${cas.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-rest-services</artifactId>
        <version>${cas.version}</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.apereo.cas</groupId>
        <artifactId>cas-server-support-json-service-registry</artifactId>
        <version>${cas.version}</version>
    </dependency>
    -->
</dependencies>
```

上面例子中我添加了openLDAP oauth2.0 mysql的依赖，具体请按照自己需求选择。

编辑好pom文件后，执行下面的命令开始编译

```bash
# mvn clean package
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/42/20e1a20a856b8d98083544240e949b.jpg)

过程很长，需要联网。如上图所示，编译完成后，会在此目录下生成一个 target 目录，我们需要的 war 包就在里面。

## 安装测试
安装过程就比较简单了，将 war 包保存至 Tomcat 下 webapps 目录下，然后运行 Tomcat 即可。

```bash
# startup.sh
# tail -f /usr/local/tomcat/logs/catalina.out
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b7/bfb043dc833a972751ad396ccc63c5.jpg)

运行完成后日志如上图所示，然后我们打开 http://localhost:8080/cas 

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/91/6097314bc496dd2404ecc7ccac8a28.jpg)

默认的用户名密码为 casuser / Mellon，输入用户名密码点击登录，登录成功后如图跳转至登录成功页面

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/41/4c9e1c4a3a9632ffd3475df7798005.jpg)

安装至此完成

## 开启 oauth 2.0 授权

> application.properties 增加配置文件如下

```bash
# vi /usr/local/tomcat/webapps/cas/WEB-INF/classes/application.propertiesvi /usr/local/tomcat/webapps/cas/WEB-INF/classes/application.properties
```

```properties
cas.authn.oauth.refreshToken.timeToKillInSeconds=2592000
cas.authn.oauth.code.timeToKillInSeconds=30
cas.authn.oauth.code.numberOfUses=1
cas.authn.oauth.accessToken.releaseProtocolAttributes=true
cas.authn.oauth.accessToken.timeToKillInSeconds=7200
cas.authn.oauth.accessToken.maxTimeToLiveInSeconds=28800
cas.authn.oauth.grants.resourceOwner.requireServiceHeader=true
cas.authn.oauth.userProfileViewType=NESTED
```

> 增加 OAUTH-1002.json service 注册文件

```bash
# vi /usr/local/tomcat/webapps/cas/WEB-INF/classes/servies/OAUTH-1002.json
```

```properties
{
  "@class" : "org.apereo.cas.support.oauth.services.OAuthRegisteredService",
  "clientId": "20181124",
  "clientSecret": "123456",
  "serviceId" : "^(https|http|imaps)://.*",
  "name" : "OAuthService",
  "id" : 1002
}
```

> 重启 Tomcat 测试

```bash
# shutdown.sh                   
Using CATALINA_BASE:   /usr/local/tomcat
Using CATALINA_HOME:   /usr/local/tomcat
Using CATALINA_TMPDIR: /usr/local/tomcat/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar
# startup.sh 
Using CATALINA_BASE:   /usr/local/tomcat
Using CATALINA_HOME:   /usr/local/tomcat
Using CATALINA_TMPDIR: /usr/local/tomcat/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar
Tomcat started.
# 
```

重启完成后，我们利用本博客作为目标访问网址进行测试，浏览器打开 http://localhost:8080/cas/oauth2.0/authorize?response_type=code&client_id=20181124&redirect_uri=https://blog.iamzhl.top

发现跳转了一个示例网址

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b1/603980e19d03912f2c01b3a7c94b80.jpg)

这时我们需要设置一下两个变量

```bash
# vi /usr/local/tomcat/webapps/cas/WEB-INF/classes/application.properties
```

加入下面两行

```properties
cas.server.name=http://devops.iamzhl.top:8080/cas
cas.server.prefix=${cas.server.name}
```

请将 devops.iamzhl.top 改为你的 ip，然后重启 Tomcat 再次测试

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/66/574e93fdcc2b8ab686a46ec772627d.jpg)

这次能正常跳转了，但是出现了`未认证授权的服务`，这是因为我们没有开启 http 协议支持，因此只要再让我们的 CAS Server 支持 http 认证就行了

```bash
# vi /usr/local/tomcat/webapps/cas/WEB-INF/classes/application.properties
```

添加下面两行

```properties
cas.tgc.secure=false
cas.serviceRegistry.initFromJson=true
```

```bash
# vi /usr/local/tomcat/webapps/cas/WEB-INF/classes/services/HTTPSandIMAPS-10000001.json
```

将`"serviceId" : "^(https|imaps)://.*",`改为`"serviceId" : "^(https|http|imaps)://.*",`，如图

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/2b/cca4a5df53dd47b94e73664bdc8ff3.jpg)

再次登录测试

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f5/c1a598cd7ecd0a96df200f38659aec.jpg)

这次终于正常了，输入用户名密码点击登录，就会跳转到授权页面

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/ae/c40e776bfcecf0ca8b48c4e9582dbc.jpg)

点击 Allow 即可成功授权跳转至本博客，我们会注意到 uri 会携带一个 code，这就是 CAS 目前在 oauth2.0 授权中最为完善的 code 授权模式了。

至此， CAS 5.3 集成 oauth2.0 的授权已经搭建完毕

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/13/f1a8df13c6ee93210a970833c5059a.jpg)

## 整合 openLDAP

```bash
# vi /usr/local/tomcat/webapps/cas/WEB-INF/classes/application.properties
```

注释掉默认的 `cas.authn.accept.users` 认证方式并添加与`LDAP Server`连接的配置(请根据自己的`LDAP`服务器信息进行修改)

```properties
##
# CAS Authentication Credentials
#
# cas.authn.accept.users=casuser::Mellon
cas.authn.ldap[0].principalAttributeList=sn,cn:commonName,givenName,eduPersonTargettedId:SOME_IDENTIFIER
cas.authn.ldap[0].collectDnAttribute=false
cas.authn.ldap[0].principalDnAttributeName=principalLdapDn
cas.authn.ldap[0].allowMultiplePrincipalAttributeValues=true
cas.authn.ldap[0].allowMissingPrincipalAttributeValue=true
cas.authn.ldap[0].credentialCriteria=
cas.authn.attributeRepository.ldap[0].attributes.uid=uid
cas.authn.attributeRepository.ldap[0].attributes.displayName=displayName
cas.authn.attributeRepository.ldap[0].attributes.cn=commonName
cas.authn.attributeRepository.ldap[0].attributes.affiliation=groupMembership
cas.authn.ldap[0].ldapUrl=ldap://devops.iamzhl.top:389
cas.authn.ldap[0].bindDn=cn=Manager,dc=iamzhl,dc=top
cas.authn.ldap[0].bindCredential=passwd
cas.authn.ldap[0].poolPassivator=BIND
cas.authn.ldap[0].connectionStrategy=
cas.authn.ldap[0].providerClass=org.ldaptive.provider.unboundid.UnboundIDProvider
cas.authn.ldap[0].connectTimeout=5000
cas.authn.ldap[0].trustCertificates=
cas.authn.ldap[0].keystore=
cas.authn.ldap[0].keystorePassword=
cas.authn.ldap[0].keystoreType=PKCS12
cas.authn.ldap[0].minPoolSize=3
cas.authn.ldap[0].maxPoolSize=10
cas.authn.ldap[0].validateOnCheckout=true
cas.authn.ldap[0].validatePeriodically=true
cas.authn.ldap[0].validatePeriod=500
cas.authn.ldap[0].validateTimeout=5000
cas.authn.ldap[0].failFast=true
cas.authn.ldap[0].idleTime=500
cas.authn.ldap[0].prunePeriod=24
cas.authn.ldap[0].blockWaitTime=5000
cas.authn.ldap[0].useSsl=false
cas.authn.ldap[0].useStartTls=false
cas.authn.ldap[0].responseTimeout=8000
cas.authn.ldap[0].allowMultipleDns=false
cas.authn.ldap[0].name=
cas.authn.ldap[0].type=AUTHENTICATED
cas.authn.ldap[0].searchFilter=uid={user}
#cas.authn.ldap[0].enhanceWithEntryResolver=true
cas.authn.ldap[0].derefAliases=NEVER
cas.authn.ldap[0].dnFormat=uid=%s,ou=People,dc=iamzhl,dc=top
cas.authn.ldap[0].baseDn=ou=People,dc=iamzhl,dc=top
```

重启 Tomcat 查看日志

```bash
# shutdown.sh
# startup.sh
# tail -f /usr/local/tomcat/logs/catalina.out
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f2/308f5dc1de191625e6087c1d040824.jpg)

新建一个 openLDAP 用户 test / 123456

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/0e/e69bb807212cc32a80cb28c4b927e1.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/01/ab9d40ac8d216e3e2b99a287082fa7.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/14/de8c6a3b3854b28bca29d84e338f9f.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/53/287f9a9a0cfe1c25c3c66d775fb214.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/af/af3a63b732070ac51f27b10f6e2dca.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b3/da28177e70ab2cb77421d6ae16ca95.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/70/749184f3907b06951093fc2a944e42.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/c0/5ddca5f311e7f8b2ba598480c3636e.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e7/8a989532254213ac72efc235676a2a.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/2e/ebca96c81bd780e9b90d9bdbd3415a.jpg)

打开 CAS 网址测试 `http://devops.iamzhl.top:8080/cas/login`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/48/9f8dc131728eda81cd522d5db954d4.jpg)

输入用户名密码登陆成功

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/89/2e8366b3accc1248a4043079a958a3.jpg)

日志输出如下

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/c3/cf45af8f7ab6b3aa80267f95cb6a42.jpg)

至此，CAS 5.3 整合 openLDAP 结束。