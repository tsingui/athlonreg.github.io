---
title: MantisBT安装部署过程
date: 2018-08-18 13:53:09
categories: 
- Linux
- 运维
keywords: 
- MantisBT
- Bug追踪
description: MantisBT是一个基于PHP技术的轻量级的开源缺陷跟踪系统，以Web操作的形式提供项目管理及缺陷跟踪服务。在功能上、实用性上足以满足中小型项目的管理及跟踪。更重要的是其开源，不需要负担任何费用。本文简介MantisBT的安装部署过程。
tags: 
- MantisBT
- Bug追踪
---

**<center>MantisBT软件安装部署过程</center>**

# 简介
&#160;&#160;&#160;&#160;Mantis是一个基于PHP技术的轻量级的开源缺陷跟踪系统，以Web操作的形式提供项目管理及缺陷跟踪服务。在功能上、实用性上足以满足中小型项目的管理及跟踪。更重要的是其开源，不需要负担任何费用。


| --- | --- | --- |
| Mantisbt	 | 2.16.0	| BugTracing 软件 |
| 操作系统 | CentOS 7 | RedHat 社区发行版 |
| PHP | 7.2.8 | PHP 环境 |

```bash
# yum -y install php72w php72w-cli php72w-mysql php72w-mbstring
```

### 安装apache mysql等必要软件
```bash
# yum -y install httpd mysql mysql-server
```

设置MySQL apache启动与自启动

```bash
# chkconfig mysqld on    //自启动
# service mysqld start   //启动
# chkconfig httpd on     //自启动
# #service httpd restart //启动
```

#### 下载
```bash
# cd /var/www/html
# wget https://sourceforge.net/projects/mantisbt/files/mantis-stable/2.16.0/mantisbt-2.16.0.tar.gz/download
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/88/fd45c33bcf60c4cc8b2eaa6875fe7d.jpg)

#### 解压重命名
```bash
# tar zxvf download
# mv download mantis
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/8f/d157a7b973b67bab6839d5b669e9c3.jpg)

#### 修改用户组
```bash
# chown -R apache:apache mantis
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/10/b652d80634468939bbd1dad9575157.jpg)

#### 创建数据库
```bash
[root@centos-7 html]# mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 5.7.23 MySQL Community Server (GPL)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database mantis;
Query OK, 1 row affected (0.00 sec)

mysql> grant all privileges on mantis.* to root@localhost identified by 'root';
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
mysql> set global validate_password_policy=0;
Query OK, 0 rows affected (0.00 sec)

mysql> set global validate_password_length=1;
Query OK, 0 rows affected (0.00 sec)

mysql> grant all privileges on mantis.* to root@localhost identified by 'root';
Query OK, 0 rows affected, 1 warning (0.01 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> exit
Bye
[root@centos-7 html]#
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e8/b5fe383c27b5215e7d1abffba5dfb9.jpg)

#### 安装
&#160;&#160;&#160;&#160;打开浏览器在地址栏输入 http://10.211.55.17:82/mantis  --  格式为http://IP:端口/mantis文件夹名称，这时就会自动跳转到php安装向导的页面: 

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/13/430b174ae372e2c4854b5804123ab1.jpg)

&#160;&#160;&#160;&#160;填好主机、密码等信息之后点击 Install/Upgrade Database 安装数据库。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/86/f2dd1067427ccefb9829d5a3e2903e.jpg)

&#160;&#160;&#160;&#160;进入Mantis登录界面，输入用户密码：administrator/root ，登陆即可看到mantis主界面。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b1/c3e84af9570ae5c9d61d788d482a69.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f4/2302c64875ae7556c732820ffe6c2f.jpg)


```
```

```


```bash
# sed -i -e "s/$g_default_language = 'auto'/$g_default_language = 'chinese_simplified'/g" /var/www/html/mantis/config_defaults_inc.php
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/17/52f55640c0580b49bb51e81728e32b.jpg)





* Mantis使用流程图：

* 新用户创建与登录


![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e0/c44b7bd62656a42effb30cbe072d8d.jpg)


![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f3/3984a7b93cb83f5018a886334554f3.jpg)





![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/32/a9311c413f72019f384eb9fdb64e91.jpg)







![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/97/1e02d524da8f78c447a2fae2b0ceb3.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/46/f8d53110204d554fe1339fa16d4d98.jpg)

