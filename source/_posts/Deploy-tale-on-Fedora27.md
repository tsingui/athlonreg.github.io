---
title: Deploy tale on Fedora27
date: 2018-04-15 09:30:10
copyright: true
categories: Linux
description: 在 Fedora27 部署国人开源博客 Tale
tags: 
- Tale
---

## 在 Fedora27 部署国人开源博客 Tale
<!--more-->

## 前言
> 什么是`Nginx`?

- `Nginx`类似于`Apache`和`Tomcat`，也是一种服务器软件。
- `Nginx`是一个高性能的`HTTP`和反向代理服务器，也可以实现负载均衡的功能。
- 与`Tomcat`相比，`Tomcat`是一个`Java`实现的重量级服务器，而`Nginx`是一个轻量级服务器。
- 与`Apache`相比，`Nginx`能支持处理百万级的`TCP`连接，`10万`以上的并发连接。

## 准备工作
- `Fedora`主机
- `ssh`工具

## 开工
### `Fedora`安装`ssh`工具
```
$ yum install openssh-server -y 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237560096540.jpg)

### 检查是否安装成功
```
$ rpm -qa | grep ssh-server
```

> 如下所示即安装成功

```
[root@localhost athlonreg]# yum install openssh-server -y 
上次元数据过期检查：1:43:17 前，执行于 2018年04月15日 星期日 07时49分48秒。
软件包 openssh-server-7.5p1-5.fc27.x86_64 已安装，跳过
依赖关系解决。
无需任何处理。
完毕！
[root@localhost athlonreg]# rpm -qa | grep ssh-server
openssh-server-7.5p1-5.fc27.x86_64
[root@localhost athlonreg]# 
```

### 远程主机网络相关配置
配置好`IP`、网关、掩码以及`DNS`

### 本机连接到远程主机
```
$ ssh root@192.168.48.222 
```

> 如图建立连接成功

![](http://ovefvi4g3.bkt.clouddn.com/15237567232486.jpg)

其中命令格式为：
```
$ ssh user@ip
```

即远程连接的用户名`@`其`IP`地址，此处就是之前配置好的`IP`地址

**Note: 此处往下内容，均为远程登录后本机终端对远程主机的操作**

### 安装编译依赖工具以及库文件
> `gcc-c++`

```
$ yum -y install gcc gcc-c++ autoconf automake
```

> `pcre`

```
$ yum -y install pcre pcre-devel
```

> `zlib`

```
$ yum -y install zlib zlib-devel
```

> 检查是否安装成功

```
$ rpm -qa | grep gcc-c++
```

```
$ rpm -qa | grep pcre-devel
```

```
$ rpm -qa | grep zlib-devel
```

![](http://ovefvi4g3.bkt.clouddn.com/15237569358658.jpg)

### 安装`Nginx`
#### 下载
```
$ wget http://nginx.org/download/nginx-1.13.12.tar.gz
```

![](http://ovefvi4g3.bkt.clouddn.com/15237579657586.jpg)

#### 解压
```
$ tar -zxvf nginx-1.13.12.tar.gz 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237580152586.jpg)

#### 对`Nginx`进行配置部署

> 进入`Nginx`目录，执行`configure`

```
$ cd nginx-1.13.12 && ./configure 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237573233422.jpg)

> 编译安装

```
$ make && make install 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237580917796.jpg)

> 这里注意，如果遇到`make`或者`make install`报错，有能力的可以根据命令输出排错，也可以换个`nginx`的版本重新配置`nginx`，下面给出下载地址

[http://nginx.org/download/](http://nginx.org/download/)

#### 检查`nginx`是否成功安装
```
$ ll -h /usr/local | grep nginx
```

![](http://ovefvi4g3.bkt.clouddn.com/15237582810802.jpg)

如图，有结果输出表示安装完成

### `Nginx`各文件简介
![](http://ovefvi4g3.bkt.clouddn.com/15237583404346.jpg)

- `conf` -- 放置`nginx`的配置文件

- `html` -- 放置网页程序

- `logs` -- 放置日志文件

- `sbin` -- 放置`Nginx`可执行应用程序

### `Nginx`的常用命令

> 启动(格式就是Nginx可执行文件地址 -c Nginx配置文件地址)

```
$ /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

> 重启(格式就是Nginx可执行文件地址 -s reload)

```
$ /usr/local/nginx/sbin/nginx -s reload
```

> 杀死进程

```
$ pkill -9 nginx
```

> 验证配置文件重启(格式就是Nginx可执行文件地址 -t)

```
$ /usr/local/nginx/sbin/nginx -t 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237584136305.jpg)

> 在启动`nginx`的同时测试配置文件是否正确

```
$ /usr/local/nginx/sbin/nginx -tc /usr/local/nginx/conf/nginx.conf 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237584361064.jpg)

----

### 部署`Tale`
#### 安装`Java8运行环境`

> `Tale`是用`Java`实现的，所以需要`Java`环境

```
$ cd ; mkdir /usr/java && cd /usr/java 
$ yum install java-1.8.0-openjdk* -y
```

![](http://ovefvi4g3.bkt.clouddn.com/15237586607060.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15237586980349.jpg)

#### 安装`MySQL`
```
$ cd && yum install -y mysql-server mysql mysql-devel
```

![](http://ovefvi4g3.bkt.clouddn.com/15237587770486.jpg)

> 如遇到上图所示报错，只需根据提示执行以下命令清除缓存即可

```
$ dnf clean packages 
```

![](http://ovefvi4g3.bkt.clouddn.com/15237589070728.jpg)

```
$ service mysqld restart
```

如遇报错，可用`MariaDB`代替

安装`MariaDB`

```
$ yum install -y mariadb-server
```

启动`MariaDB`服务

```
$ systemctl start mariadb.service
```

添加到开机启动

```
$ systemctl enable mariadb.service
```

进行一些安全设置，以及修改数据库管理员密码

```
$ mysql_secure_installation
```

----

#### 安装`Nginx`服务器(与前面略有不同)
```
$ yum install nginx -y
```

![](http://ovefvi4g3.bkt.clouddn.com/15237597121815.jpg)

#### 启动nginx,可执行文件在/usr/sbin/下
```
$ /usr/sbin/nginx -t
```

#### 新建数据库

```
$ mysql -u root -p 
```

输入密码登录

```
$ create database `tale` default character set utf8 collate utf8_general_ci;
```

```
$ exit;
```

![](http://ovefvi4g3.bkt.clouddn.com/15237597862688.jpg)

#### 安装Tale博客
```
$ wget http://static.biezhi.me/tale-least.zip  
```

```
$ unzip tale-least.zip
```

![](http://ovefvi4g3.bkt.clouddn.com/15237600130824.jpg)

```
$ cd tale
```

```
$ ./tale-cli start
```

![](http://ovefvi4g3.bkt.clouddn.com/15237601311912.jpg)

> 最后在远程主机浏览器输入`127.0.0.1:9000`就可以开始你的博客历程了

![](http://ovefvi4g3.bkt.clouddn.com/15237602146298.jpg)

## 本项目实战到此结束

