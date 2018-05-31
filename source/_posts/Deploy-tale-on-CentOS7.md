---
title: Deploy tale on CentOS7
copyright: true
date: 2018-04-14 09:34:15
categories: Linux
description: 在 CentOS7 部署国人开源博客 Tale
tags: 
- Tale
---

## 在 CentOS7 部署国人开源博客 Tale
<!--more-->

## 前言
> 什么是`Nginx`?

- `Nginx`类似于`Apache`和`Tomcat`，也是一种服务器软件。
- `Nginx`是一个高性能的`HTTP`和反向代理服务器，也可以实现负载均衡的功能。
- 与`Tomcat`相比，`Tomcat`是一个`Java`实现的重量级服务器，而`Nginx`是一个轻量级服务器。
- 与`Apache`相比，`Nginx`能支持处理百万级的`TCP`连接，`10万`以上的并发连接。

## 准备工作
- `CentOS`主机
- `ssh`工具

## 开工
### `CentOS`安装`ssh`工具
```
$ yum install openssh-server -y 
```

### 检查是否安装成功
```
$ rpm -qa | grep ssh-server
```

> 如图所示即安装成功

```
[root@localhost]/home/parallels# rpm -qa | grep ssh-server  openssh-server-7.4p1-13.el7_4.x86_64[root@localhost]/home/parallels# 
```

### 打开虚拟机建立连接
配置好`IP`、网关、掩码以及`DNS`

### 连接到远程主机
```
$ ssh parallels@192.168.46.226 
```

> 如图建立连接成功

![](http://ovefvi4g3.bkt.clouddn.com/15236728557742.jpg)

其中命令格式为：
```
$ ssh user@ip
```

即远程连接的用户名`@`其`IP`地址，此处就是之前配置好的`IP`地址

**Note: 此处往下内容，均为远程登录后对远程主机的操作**

### 切换`root`权限
```
$ sudo -s
```

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

![](http://ovefvi4g3.bkt.clouddn.com/15236735604953.jpg)

### 安装`Nginx`
#### 下载
```
$ wget http://nginx.org/download/nginx-1.12.0.tar.gz
```

![](http://ovefvi4g3.bkt.clouddn.com/15236731142572.jpg)

#### 解压
```
$ tar -zxvf nginx-1.12.0.tar.gz 
```

![](http://ovefvi4g3.bkt.clouddn.com/15236732255925.jpg)

#### 对`Nginx`进行配置部署
> 进入`Nginx`目录，执行`configure`
```
$ cd nginx-1.12.0 && ./configure 
```

![](http://ovefvi4g3.bkt.clouddn.com/15236737656357.jpg)

> 编译安装

```
$ make && make install 
```

#### 检查`nginx`是否成功安装
```
$ ll -h /usr/local | grep nginx
```

![](http://ovefvi4g3.bkt.clouddn.com/15236740752298.jpg)

如图，有结果输出表示安装完成

### `Nginx`各文件简介
![](http://ovefvi4g3.bkt.clouddn.com/15236742286457.jpg)

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

![](http://ovefvi4g3.bkt.clouddn.com/15236747108486.jpg)

> 在启动`nginx`的同时测试配置文件是否正确

```
$ /usr/local/nginx/sbin/nginx -tc /usr/local/nginx/conf/nginx.conf 
```

![](http://ovefvi4g3.bkt.clouddn.com/15236749008794.jpg)

### 部署`Tale`
#### 安装`Java8运行环境`

> `Tale`是用`Java`实现的，所以需要`Java`环境

```
$ cd ; mkdir /usr/java && cd /usr/java 
$ yum install java-1.8.0-openjdk* -y
```

#### 安装`MySQL`
```
$ yum install -y mysql-server mysql mysql-devel
```

```
$ service mysqld restart
```

```
$ /usr/bin/mysqladmin -u root password '123456'
```

----

#### 安装`Nginx`服务器(与前面略有不同)
```
$ yum install nginx -y
```

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

#### 安装Tale博客
```
$ wget http://static.biezhi.me/tale-least.zip  
```

```
$ unzip tale.zip
```

```
$ cd tale
```

```
$ ./tale-cli 
```

![](http://ovefvi4g3.bkt.clouddn.com/15236888643209.jpg)

> 最后在浏览器输入`127.0.0.1:9000`就可以开始你的博客历程了

![](http://ovefvi4g3.bkt.clouddn.com/15236887060359.jpg)

