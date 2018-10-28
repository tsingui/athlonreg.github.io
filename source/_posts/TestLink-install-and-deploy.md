---
title: TestLink安装部署
date: 2018-08-26 19:51:29
categories: 
- Linux
- 运维
keywords: TestLink
description: TestLink安装部署
tags: 
- TestLink
photos:
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/14/da839143e11bec790a2a77f7247529.jpg
---

# <center>TestLink安装部署</center>
## 安装MySQL

MySQL的Server在CentOS 7上从默认软件列表中被移除了，用MariaDB来代替，所以这导致我们必须要去官网上进行下载，找到链接，用wget打开，然后再安装：

```bash
# wget http://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
# rpm -ivh mysql57-community-release-el7-9.noarch.rpm
# yum -y install mysql mysql-server mysql-devel
```

启动MySQL服务

```bash
# systemctl start mysqld
```

获取安装MySQL时的初始密码并登录MySQL

```bash
# grep 'temporary password' /var/log/mysqld.log
# mysql -u root -p
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/4a/a001ae2bae5a494c7329cd78a477a3.jpg)

登录成功后修改密码，首先修改安全策略为0，然后将密码长度限制修改为1，最后修改密码

```mysql
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
mysql> set password for root@localhost=password('root');
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/a2/0f74ed53f3a426d1fe005228478d8f.jpg)

创建testlink用户并创建testlink要用的数据库并把testlink数据库的所有权限赋给testlink用户

```mysql
mysql> CREATE USER 'testlink'@'%' IDENTIFIED BY 'root';
mysql> CREATE DATABASE testlink; 
mysql> GRANT ALL ON testlink.* TO 'testlink'@'%'; 
mysql> flush privileges;
```

设置MySQL启动与自启动

```bash
# systemctl enable mysqld    //自启动
# systemctl start mysqld     //启动
```

## 安装httpd
### 安装

```bash
# yum -y install httpd
```

### 启动自启动

```bash
# systemctl enable httpd  //自启动
# systemctl start httpd   //启动
```

## 安装PHP
```bash
# rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
# yum -y install `yum search php | grep php56w | grep -v "===" | grep -v mysqlnd | awk -F '.' '{print $1}'`
```

### 测试一下PHP环境
写一个phpinfo测试php环境是否正常

```bash
# vim /var/www/html/info.php
```

```php
<?php
    phpinfo();
?>
```

浏览器打开`http://IP:httpd端口/info.php`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/bf/a51c4fe3482af30d3b54a102c5a844.jpg)

如图，PHP环境安装完成。

**Note: **
PHP无法正确解析，网页显示源码的解决方法：

```bash
$ vi /etc/php.ini 
```

将short_open_tag = Off修改为short_open_tag = On，然后重启httpd服务即可

## 安装TestLink
### 下载
```bash
# wget https://jaist.dl.sourceforge.net/project/testlink/TestLink%201.9/TestLink%201.9.18/testlink-1.9.18.tar.gz
```

### 解压重命名
```bash
# tar zxvf testlink-1.9.18.tar.gz
# mv testlink-1.9.18 testlink
# mv testlink /var/www/html/
# chown -R apache:apache /var/www/html/testlink
```

### 修改配置文件

```bash
# sed -i -e "s/AllowOverride None/AllowOverride All/g" /etc/httpd/conf/httpd.conf
# sed -i -e "s/DirectoryIndex index.html/DirectoryIndex index.html index.php index.shtm/g" /etc/httpd/conf/httpd.conf
# sed -i -e "s/session.gc_maxlifetime = 1440/session.gc_maxlifetime = 2400/g" /etc/php.ini
# sed -i -e "s/max_execution_time = 30/max_execution_time = 120/g" /etc/php.ini
# service httpd restart
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/49/3c7f4c9291a6c276e5dad2200d5571.jpg)

### 新建一些PHP环境要求必备的文件夹并赋予适当权限

```bash
# mkdir -p /var/www/html/testlink/gui/templates_c
# mkdir -p /var/testlink/logs/
# mkdir -p /var/testlink/upload_area/
# chmod 777 /var/www/html/testlink/gui/templates_c
# chmod 777 /var/testlink/logs/
# chmod 777 /var/testlink/upload_area/
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/23/c132221e0b416226f6f7df1e63b12c.jpg)

### 安装
浏览器打开`http://IP:port/testlink/install`(将IP换成自己主机IP，端口号换为自己主机的Apache服务端口号)。如图，点击New installation开始安装

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/14/da839143e11bec790a2a77f7247529.jpg)

选中同意协议，continue

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/7c/b33fa4f939e6447fa43f36b5577b43.jpg)

进入系统环境检测阶段，这一步需要根据错误提示进行配置，前面已经在安装php和testlink时解决了，所以现在已经没有错误了，图中橙色的提示可以忽略，点击continue

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/8c/84dad1406d9a22e95913b060326730.jpg)

如图，设定数据库管理员登录账户密码，自定义TestLink的数据库登录账户密码，其余均保持默认，点击Process TestLink Setup

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/58/736d782618beafcda69918ffca7749.jpg)

## 登录
安装完成网址输入http://IP/testlink即可自动跳转到登录页面，默认用户admin/admin
