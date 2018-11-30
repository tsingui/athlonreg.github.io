---
title: Jenkins 整合 LDAP 以及 CAS 单点登录
date: 2018-11-30 10:17:09
password:
categories: 运维
keywords: 
- Jenkins
- CAS
- LDAP
description: Jenkins 整合 LDAP 以及 CAS 单点登录
tags: 
- Jenkins
- CAS
- LDAP
photos:
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/bd/e3fd089257fe9caf4f4247f203d4bd.jpg
---

## 背景介绍
- Jenkins 安装方式： Tomcat 容器部署 war 包
- Jenkins 地址：http://devops.iamzhl.top:8080/jenkins
- openLDAP 服务：ldap://devops.iamzhl.top:389
- CAS 服务：http://devops.iamzhl.top:8080/cass

## 整合 openLDAP

首先去 Jenkins 插件官网下载 LDAP 和 CAS 插件

- LDAP：https://updates.jenkins.io/download/plugins/ldap/
- CAS：https://updates.jenkins.io/download/plugins/cas-plugin/

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/46/53fb1f3e3cfa00c055965bc99c7fbd.jpg)

如图，点击`系统管理`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/86/4f0c2ebaef58a3c719397b0adfbc5b.jpg)

点击插件管理 -> 高级 -> 上传插件(选择文件)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/65/bfd2b91d856ca8132434b2da51de6e.jpg)

弹出选择文件的对话框后，首先选择我们下载好的 LDAP 插件，然后点击上传，然后就会跳转到安装界面，我们勾选`安装完成后重启Jenkins(空闲时)`，等待一会Jenkins安装插件完成后就会重启

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/c5/7cf7ef11ecd49b19b07ea7333cc26a.jpg)

输入用户名密码登录后，依次打开`系统管理` -> `全局安全配置`，在安全域勾选 LDAP，点击`Advanced Server Configuration`,开始配置 LDAP 服务器的绑定信息

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/12/adf30303385802ce2fc45d175a7d16.jpg)

点击`Test LDAP settings`，测试`LDAP`配置是否可用，如下图，输入一个`LDAP`服务器中存在的用户账号和密码，点击`Test`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/93/bca0bd8c0ac21d1b2c4cffd7cea3bc.jpg)

如果测试成功，会打印出类似如下的信息

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f5/7453c8051a55d9622dbe1e461d1b25.jpg)

点击`应用`，然后点击`保存`。

测试一下，用`LDAP`中的用户进行登录

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/1e/46a5ac15c7611eff4ade4830966565.jpg)

登陆成功，配置完成，到这里，`Jenkins`整合`LDAP`认证就完成了。

## 整合 CAS 单点登录

首先安装`CAS`插件，和上面安装`LDAP`插件步骤一样，安装完`CAS`打开`系统管理` -> `全局安全配置`，在安全域勾选`CAS (Central Authentication Service)`，如图所示，配置好`CAS`的`URL`和`CAS 协议`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b7/99ca653df5281634fed8a6dcc4f3c2.jpg)

然后点击`应用`->`保存`，注销，然后重新登录

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/ce/bf7939fceebf45806037fd759179f4.jpg)

这时就可以跳转到`CAS`的登录界面了，输入用户名密码点击登录，就可以正常的登录进入`Jenkins`系统了。

至此，`Jenkins`整合`CAS`完成。