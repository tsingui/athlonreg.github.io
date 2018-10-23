---
title:  CentOS安装部署Gerrit
date: 2018-08-22 11:36:45
categories: 
- Linux
- 运维
keywords: 
- Gerrit
- 代码审查
description: CentOS安装部署代码审查工具--Gerrit
tags:
- Gerrit
- 代码审查
---

## <cneter>`Gerrit`安装配置过程</center>

# 安装过程如下
## 步骤一：创建专用账户和工作目录

```bash
# adduser gerrit  // 创建专用账户
# passwd gerrit  //为专有账户设置密码
```

## 步骤二：配置`Java`环境

* 去官网下载`JDK`：[http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/81/1b33b7e9dbe92a1515154d0193194f.jpg)

* 安装`JDK`
将下载得到的`jdk-8u161-linux-x64.rpm`包保存到`Linux`主机

```bash
# rpm -ivh jdk-8u161-linux-x64.rpm
```

* 设置环境变量，编辑`~/.bashrc`，

```bash
# vim ~/.bashrc
```

在文件的末尾添加以下行

```
export JAVA_HOME=/usr/java/jdk1.8.0_161export JRE_HOME=$JAVA_HOME/jreexport CLASSPATH=$JAVA_HOME/libexport PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin:$CLASSPATH
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/49/6ac74e90a641e355b29b9c4d17deb9.jpg)

使环境配置生效
```bash
# source ~/.bashrc
```

* 测试`Java`环境，在终端输入：`java -version`查看是否正常显示版本信息，若显示则安装成功

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/2f/49c7d622b298ae690db3c13754c1b1.jpg)

## 步骤三：安装MySQL

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

创建gerrit用户

```mysql
mysql> CREATE USER 'gerrit'@'%' IDENTIFIED BY '123456';
```

创建gerrit要用的数据表

```mysql
mysql> CREATE DATABASE ReviewDB; 
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/d2/49b9ee020b217374593ca9bf2333b3.jpg)

把ReviewDB的所有权限赋给gerrit

```mysql
mysql> GRANT ALL ON ReviewDB.* TO 'gerrit'@'%'; 
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/73/94a9f46a5dd2572e26ac02b13ec1d8.jpg)

## 步骤四：安装Git

```bash
# yum -y install git
```

## 步骤五：下载安装`gerrit`

* 从官网下载`gerrit`，存放于`/home/gerrit`目录：

```bash
# wget https://gerrit-releases.storage.googleapis.com/gerrit-2.15.5.war
```

* 安装`gerrit`：

首先切换为gerrit用户，然后运行gerrit的war包

```bash
# su gerrit
$ cd 
$ java -jar gerrit-2.15.war init -d review_site
```

一路回车默认安装(其中的认证方式处改为HTTP)

```bash
[root@centos-7 gerrit]# su gerrit
[gerrit@centos-7 ~]$ ll
总用量 83864
-rwxr-xr-x. 1 root root 85872756 8月  21 12:49 gerrit-2.14.war
[gerrit@centos-7 ~]$ java -jar gerrit-2.15.5.war init -d review_site
Using secure store: com.google.gerrit.server.securestore.DefaultSecureStore
[2018-08-21 12:51:37,463] [main] INFO  com.google.gerrit.server.config.GerritServerConfigProvider : No /home/gerrit/review_site/etc/gerrit.config; assuming defaults

*** Gerrit Code Review 2.15.5
***

Create '/home/gerrit/review_site' [Y/n]?

*** Git Repositories
***

Location of Git repositories   [git]:

*** SQL Database
***

Database server type           [h2]:

*** Index
***

Type                           [LUCENE/?]:

*** User Authentication
***

Authentication method          [OPENID/?]: HTTP
Get username from custom HTTP header [y/N]?
SSO logout URL                 :
Enable signed push support     [y/N]?

*** Review Labels
***

Install Verified label         [y/N]?

*** Email Delivery
***

SMTP server hostname           [localhost]:
SMTP server port               [(default)]:
SMTP encryption                [NONE/?]:
SMTP username                  :

*** Container Process
***

Run as                         [gerrit]:
Java runtime                   [/usr/java/jdk1.8.0_161/jre]:
Copy gerrit-2.15.5.war to review_site/bin/gerrit.war [Y/n]?
Copying gerrit-2.15.5.war to review_site/bin/gerrit.war

*** SSH Daemon
***

Listen on address              [*]:
Listen on port                 [29418]:
Generating SSH host key ... rsa... dsa... done

*** HTTP Daemon
***

Behind reverse proxy           [y/N]?
Use SSL (https://)             [y/N]?
Listen on address              [*]:
Listen on port                 [8080]:
Canonical URL                  [http://centos-7.shared:8080/]:

*** Cache
***


*** Plugins
***

Installing plugins.
Install plugin commit-message-length-validator version v2.15.5 [y/N]?
Install plugin download-commands version v2.15.5 [y/N]?
Install plugin hooks version v2.15.5 [y/N]?
Install plugin replication version v2.15.5 [y/N]?
Install plugin reviewnotes version v2.15.5 [y/N]?
Install plugin singleusergroup version v2.15.5 [y/N]?
Initializing plugins.
No plugins found with init steps.

Initialized /home/gerrit/review_site
Executing /home/gerrit/review_site/bin/gerrit.sh start
Starting Gerrit Code Review: OK
Waiting for server on centos-7.shared:8080 ... OK
Opening http://centos-7.shared:8080/#/admin/projects/ ...FAILED
Open Gerrit with a JavaScript capable browser:
  http://centos-7.shared:8080/#/admin/projects/
[gerrit@centos-7 ~]$
```

授权文件夹权限给gerrit用户： 

```bash
# chown -R gerrit:gerrit review_site 
```

* 修改`gerrit`配置文件，说明如下

```bash
$ vim review_site/etc/gerrit.config
```

```
[gerrit]        basePath = git                          //指定被gerrit管理的所有git库存放位置，即review_site_project/git/        canonicalWebUrl = http://10.211.55.19:8081/project   //指定web访问gerrit的网址//填自己的ip和端口号[database]        type = mysql                             //指定gerrit所默认数据库类型，可以选用mysql，安装并创建gerrit账户        database = /home/gerrit/review_site/db/ReviewDB[auth]        type = HTTP                           //指定浏览器登录gerrit时的认证方式[sendemail]        smtpServer = localhost                //局域网邮件服务器，可使用hMailSever搭建[container]        user = gerrit                             //指定gerrit所在机器的用户身份与上文创建的用户对应一致,可以是root        javaHome = /usr/java/jdk1.8.0_161/jre[sshd]        listenAddress = *:29418                   //指定sshd服务监听的端口号[httpd]        listenUrl = http://*:8081/                //指定http代理地址[cache]        directory = cache                        //缓存位置
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/31/8e586e93c265a2f6ff36d3db0454e7.jpg)

重启gerrit服务

```bash
$ review_site/bin/gerrit.sh restart
```

设置gerrit服务开机启动

```bash
# ln -snf /home/gerrit/review_site/bin/gerrit.sh /etc/init.d/gerrit.sh
```

## 步骤六：配置反向代理服务(nginx)
> 说明： 局域网本地安装，设置本地`repo`库

### 安装`nginx`反向代理服务器

* 安装`gcc-c++ pcre pcre-devel zlib zlib-devel openssl`： 

```bash
# yum -y install gcc-c++ pcre pcre-devel zlib zlib-devel openssl
```

* 安装启动`nginx`并设置自启动

```bash
# rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
# yum update && yum -y install nginx 
# systemctl enable nginx
Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.
# systemctl start nginx
```

### 配置`nginx`：

```bash
# vim /etc/nginx/conf.d/default.conf
```

```
server {
    listen       82;
    server_name  localhost;

    auth_basic "Welcome to Gerrit Code Review !";
    auth_basic_user_file /home/gerrit/review_site/etc/passwd;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        #root   /usr/share/nginx/html;
        #index  index.html index.htm index.php index.jsp;
        proxy_pass http://127.0.0.1:8081;
        #proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
```
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/a1/7b9e070ca210075f5fec8631a40d8b.jpg)
启动`nginx`服务：

```bash
# setenforce 0                 //关闭selinux以避免造成权限问题
# systemctl disable firewalld  //禁用防火墙
# systemctl stop firewalld     //关闭防火墙
# systemctl start nginx
```

### 设置第一个`gerrit`用户的账号和密码

要用到htpasswd命令需要首先安装有httpd

```bash
# yum -y install httpd
$ touch ./review_site/etc/passwd
$ htpasswd -b ./review_site/etc/passwd gerrit 123456
```

## 步骤七：安装配置`gitweb`
### 安装`gitweb`,最好在联网环境下安装，或者在离线环境下下载对应的依赖包

```bash
# yum -y install gitweb```

### 配置`gitweb`,与`gerrit`集成
修改`gitweb`的配置文件（/etc/gitweb.conf），将配置项 "$projectroot"修改为`gerrit`的`git`仓库目录。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/35/3723767206d90e1f1fbf859d5df6ba.jpg)

修改/home/gerrit/review_site/etc/gerrit.config,添加：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/26/432e046271c2658c8a203b86c19d5f.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/9d/b0b9039fc3682a7cdfae62ce5387d9.jpg)

### 配置gerrit权限使用管理员账号登录`gerrit`,修改`All-Projects`的权限，为`refs/*`和`refs/meta/config`的`Read`配置项配置合适的权限。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/bc/d4431e93f304e1a913b244cadfd492.jpg)

**注意：如果你是在root用户下输入上面的命令 创建了password文件到/home/gerrit/review_site/etc目录中,你会发现在登录的时候永远登录不成功,永远会得到服务器500的错误页面。原因是password文件的权限问题。我们知道,/home/gerrit/是我们之前新建的gerrit用户的,那么这个文件夹的权限是700,也就是只允许gerrit用户访问,其他组的用户是访问不了的,虽然这个文件的权限拥有root用户的所有权限,但是因为它放在700权限的文件夹下面,所以同样其他用户是访问不到的。解决方法如下**

```bash
# chown -R gerrit:gerrit /home/gerrit
```
### 重启gerrit服务和Nginx服务重启`gerrit`和`nginx`服务

```bash$ /home/gerrit/review_site/bin/gerrit.sh restart
# systemctl restart nginx
```

## 步骤八：测试

访问http://localhost，用gerrit用户登录，登录界面如下

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/74/51196a5c04235cfbd07cf5a09e1b95.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/79/114d466e1f80823db828265ede65ee.jpg)

