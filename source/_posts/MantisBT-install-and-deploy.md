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
# 部署环境Mantis安装部署环境如下：
| 名称 | 版本号 | 描述 |
| --- | --- | --- |
| Mantisbt	 | 2.16.0	| BugTracing 软件 |
| 操作系统 | CentOS 7 | RedHat 社区发行版 |
| PHP | 7.2.8 | PHP 环境 |
# 部署过程## 软件安装### 安装PHP
```bash
# yum -y install php72w php72w-cli php72w-mysql php72w-mbstring
```

### 安装PHPMailer
```
https://github.com/Synchro/PHPMailer/releases/tag/v5.2.13
```

下载解压到/var/www/html/mantis/PHPMailer-5.2.13/

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/0b/f7ba2cdc89ecb4edee3d7c32861ad1.jpg)

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
### 安装mantis
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
#### 登录
&#160;&#160;&#160;&#160;进入Mantis登录界面，输入用户密码：administrator/root ，登陆即可看到mantis主界面。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b1/c3e84af9570ae5c9d61d788d482a69.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f4/2302c64875ae7556c732820ffe6c2f.jpg)
## 邮件配置&#160;&#160;&#160;&#160;修改MantisBT下config_defaults_inc.php配置文件，具体如下

```
$g_administrator_email = 'mailuser';$g_webmaster_email = 'mailuser'；$g_from_email = 'mailuser'；$g_from_name = 'Mantis Bug Tracker';$g_return_path_email = 'mailuser';$g_enable_email_notification = ON;
$g_phpMailer_path = '/var/www/html/mantis/PHPMailer-5.2.13/';
```
&#160;&#160;&#160;&#160;修改MantisBT/config/config_inc.php文件

```
$g_enable_email_notification = ON;
$g_administrator_email = 'mailuser';$g_webmaster_email = 'mailuser';$g_from_email = 'mailuser';$g_from_name = 'Mantis Bug Tracker';
$g_phpMailer_method = PHPMAILER_METHOD_SMTP;
$g_smtp_host = 'smtp.163.com'; # SMTP 服务器
$g_smtp_username = 'mailuser';
$g_smtp_password = 'mailpwd'; 
$g_use_phpMailer = ON; 
$g_return_path_email = 'mailuser';
$g_phpMailer_path = '/var/www/html/mantis/PHPMailer-5.2.13/';
```
## 中文配置&#160;&#160;&#160;&#160;修改/var/www/html/mantis/config_defaults_inc.php文件，在该文件中找到语言设置的地方，修改$g_default_language，将'english'改为'chinese_simplified'。

```bash
# sed -i -e "s/$g_default_language = 'auto'/$g_default_language = 'chinese_simplified'/g" /var/www/html/mantis/config_defaults_inc.php
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/17/52f55640c0580b49bb51e81728e32b.jpg)
# 问题解决问题描述：配置完成后，无法发送邮件。
解决方法：&#160;&#160;&#160;&#160;邮箱配置问题，添加本地邮箱服务器，设置本地邮箱，对于本地测试邮箱，设置$g_smtp_host=本地IP地址。
# 实例运行* 为了便于理解，先给出BUG跟踪流程图：
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b7/a17671861ee0f1c0ef2d34063c1f7e.png)

* Mantis使用流程图：![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/36/e0cd2969561f3a3847f00064f10d86.jpg)

* 新用户创建与登录
&#160;&#160;&#160;&#160;目前本系统的访问地址为：http://IP:port/mantis/login_page.php，用户可以通过首页显示的"注册一个新帐号"进行新用户注册。![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/7d/1aa6506c45bdc101125dbf0eb471cb.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e0/c44b7bd62656a42effb30cbe072d8d.jpg)
&#160;&#160;&#160;&#160;然后点击邮箱内的激活邮件，进行用户名与密码的设置。也可以通过管理员创建新用户

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f3/3984a7b93cb83f5018a886334554f3.jpg)
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/38/81f16e90a837e3b2e4753481d53d49.jpg)
&#160;&#160;&#160;&#160;管理员可以对用户的角色、所属的项目以及一些其他的情况进行对应的配置。![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/7e/8a3bf7d3b7d54549861c08cc2b8695.jpg)
&#160;&#160;&#160;&#160;各种具体的配置以及各种角色用户的权限可参见管理员的管理视图。![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/64/fb372744682c06a5abf50d6d08e3c3.jpg)
**操作流程**&#160;&#160;&#160;&#160;首先，说明一下系统中的角色和一般所对应的人员：观察者（复查员）、报告者（测试员）、升级者（审核员）、开发人员（开发员）、经理（项目经理）、管理员（系统管理员）。还要简单说明一下问题状态及相关含义（以上的两点只是中文理解和中文翻译的问题，可以在mantisbt-2.15.0/lang/strings_chinese_simplified.txt中修改）：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/32/a9311c413f72019f384eb9fdb64e91.jpg)
* 新建：新提交的报告，默认状态为新建* 反馈：修正的问题经过测试后仍不完善* 认可：报告的问题确实存在* 已确认：通常为项目经理确认时使用* 已分配：分派给具体开发人员* 已解决：修改后的问题，可以进行测试* 已关闭：测试通过的问题，或者在报告周期内判定为无需修改的问题。&#160;&#160;&#160;&#160;下面介绍一下简单的操作流程，这里以管理员和报告者作为示例，这里为了方便示例，示例中管理员包含了其他角色属性。观察者、升级者以及经理可以根据具体情况进行添加。
* 提交问题
**权限：**全部角色**必填信息：**分类、摘要、描述、查看权限**选填信息：**出现频率、严重性、优先级、选择平台设置、重现步骤、辅助、标签、上传文件。**问题单状态：**新建![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/7a/b1f51f397d2700ccd2ae21cc7edbc7.jpg)
* 审核问题
**权限：**审核员、项目经理、（开发员） **可进行操作：**添加附件、添加注释**问题单状态：**新建 -> 已审核（认可），审核员对问题进行审核，并确认此问题；新建 -> 已关闭，审核员认为报告的问题不存在或无需修改。![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/cc/cf2fa843e333b7b168418e13720f06.jpg)
* 确认问题**权限：**项目经理**问题单状态：**认可 -> 已确认，项目经理确认问题，确认后进入修改流程；认可 -> 反馈，项目经理对问题存在异议，反馈给审核者。![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/61/b450cb7f3eb6af3ce04b1e071dd25e.jpg)
* 分派问题**权限：**项目经理、开发员**问题单状态：**已确认 -> 已分派，项目经理分派问题给相应的开发人员；已分派 -> 已分派，开发组长也可以给组员分派问题。
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/97/1e02d524da8f78c447a2fae2b0ceb3.jpg)
* 修复问题**权限：**开发员**问题单状态：**已分派 -> 已解决，分派给开发员的问题已修复及内部测试，可以提交业务测试时。
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/46/f8d53110204d554fe1339fa16d4d98.jpg)
* 测试问题**权限：**报告者**问题单状态：**已解决 -> 已关闭，报告者对已解决的问题测试且测试通过；已解决 -> 反馈，报告者对已解决的问题测试，而测试未通过，开发员可对反馈的问题继续修复，再进入后续环节。![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/93/d945f5412b7aece0c5595564633ad6.jpg)
到此，整个流程结束。**说明：整个流程中，问题处于不同的状态，标记的颜色不同。**
