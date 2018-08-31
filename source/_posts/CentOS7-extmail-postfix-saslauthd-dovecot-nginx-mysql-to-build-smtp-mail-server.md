---
title: CentOS7 extmail postfix saslauthd dovecot nginx mysql 搭建smtp邮件服务器
date: 2018-08-31 10:30:51
categories: 
- Linux
- 运维
keywords: 
- smtp
- ExtMail
description: CentOS7 extmail postfix saslauthd dovecot nginx mysql 搭建smtp邮件服务器
tags: 
- Linux
- 运维
---

# <center>CentOS7 extmail postfix saslauthd dovecot nginx mysql 搭建smtp邮件服务器</center>

# 准备工作
## 关闭selinux
```bash
# setenforce 0    //关闭
# sed -i -e "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config   //永久关闭
```

## 关闭防火墙
```bash
# systemctl stop firewalld     //关闭
# systemctl disable firewalld  //永久关闭
```

## 清理iptables
```bash
# iptables -P INPUT ACCEPT
# iptables -F
# iptables -X
# iptables -L
```

## 资源下载
```
链接: https://pan.baidu.com/s/1WbYmQF9JqdJQB-hxEb14KA 密码: 74k9
```

# 安装MySQL
```bash
# wget http://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
# rpm -ivh mysql57-community-release-el7-9.noarch.rpm
# yum -y install mysql mysql-server mysql-devel
# systemctl start mysqld  //启动 MySQL 服务
# systemctl enable mysqld  //自启动 MySQL 服务
# grep 'temporary password' /var/log/mysqld.log    //获取安装 MySQL 时的初始密码并登录 MySQL
# mysql -u root -p    //登录 mysql
```

登录成功后修改密码，首先修改安全策略为 0，然后将密码长度限制修改为 1，最后修改密码

```mysql
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
mysql> set password for root@localhost=password('root');
```

# 安装nginx
```bash
# wget http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
# rpm -ivh nginx-release-centos-7-0.el7.ngx.noarch.rpm
# yum install nginx
# systemctl start nginx
# systemctl enable nginx
```

# 安装postfix
```bash
# yum -y install vim gcc gcc-c++ openssl openssl-devel db4-devel ntpdate mysql mysql-devel bzip2 php-mysql cyrus-sasl-md5 perl-GD perl-DBD-MySQL perl-GD perl-CPAN perl-CGI perl-CGI-Session cyrus-sasl-lib cyrus-sasl-plain cyrus-sasl cyrus-sasl-devel libtool-ltdl-devel telnet mail libicu-devel 
```

卸载系统自带的postfix，删除postfix用户，重新指定uid、gid创建新用户postfix，postdrop

```bash
# yum remove postfix -y
# userdel postfix
# groupdel postdrop
# groupadd -g 2525 postfix
# useradd -g postfix -u 2525 -s /sbin/nologin -M postfix
# groupadd -g 2526 postdrop
# useradd -g postdrop -u 2526 -s /sbin/nologin -M postdrop
```

编译postfix

```bash
# tar zxvf postfix-3.0.1.tar.gz
# cd postfix-3.0.1
# make makefiles 'CCARGS=-DHAS_MYSQL -I/usr/include/mysql -DUSE_SASL_AUTH -DUSE_CYRUS_SASL -I/usr/include/sasl -DUSE_TLS ' 'AUXLIBS=-L/usr/lib64/mysql -lmysqlclient -lz -lrt -lm -L/usr/lib64/sasl2 -lsasl2 -lssl -lcrypto'
# make && make install
```

make install的时候会有个交互式的界面，自定义一些目录，我们这里只更改第二项临时文件目录，其他的全部默认。

```
Please specify the prefix for installed file names. Specify this ONLY
if you are building ready-to-install packages for distribution to OTHER
machines. See PACKAGE_README for instructions.
install_root: [/]
Please specify a directory for scratch files while installing Postfix. You
must have write permission in this directory.
tempdir: [/root/postfix-3.0.1] /tmp/extmail
…………………………
…………………………
shlib_directory: [no]
Please specify the final destination directory for non-executable files
that are shared among multiple Postfix instances, such as postfix-files,
dynamicmaps.cf, as well as the multi-instance template files main.cf.proto
and master.cf.proto.
meta_directory: [/etc/postfix]
```

更改目录属主属组

```bash
# chown -R postfix:postdrop /var/spool/postfix
# chown -R postfix:postdrop /var/lib/postfix/
# chown root /var/spool/postfix
# chown -R root /var/spool/postfix/pid
```

修改postfix配置文件

```bash
# vim /etc/postfix/main.cf
```

```
myhostname = mail.everyoo.com                //设置主机名
mydomain = everyoo.com          //指定域名
myorigin = $mydomain            //指明发件人所在的域名
inet_interfaces = all           //指定postfix系统监听的网络接口
mydestination = $myhostname, localhost.$mydomain, localhost,$mydomain                       //指定postfix接收邮件时收件人的域名 [使用虚拟域需要禁用]
mynetworks_style = host         //指定信任网段类型
mynetworks = 192.168.1.0/24, 127.0.0.0/8                     //指定信任的客户端
relay_domains = $mydestination //指定允许中转邮件的域名
alias_maps = hash:/etc/aliases //设置邮件的别名
```

# 安装dovecot
```bash
# yum install -y dovecot dovecot-mysql
```

## 配置dovecot
```bash
# cd /etc/dovecot && vim dovecot.conf
```

```
protocols = imap pop3
!include conf.d/*.conf
listen = *
base_dir = /var/run/dovecot/
```

```bash
# cd conf.d/ && vim 10-auth.conf
```

```
disable_plaintext_auth = no
```

```bash
# vim 10-mail.conf
```

```
mail_location = maildir:~/Maildir
mail_location = maildir:/var/mailbox/%d/%n/Maildir
mail_privileged_group = mail
```

```bash
# vim 10-ssl.conf
```

```
ssl = no
```

```bash
# vim 10-logging.conf 
```

```
og_path = /var/log/dovecot.log
info_log_path = /var/log/dovecot.info
log_timestamp = "%Y-%m-%d %H:%M:%S "
```


```bash
# cp auth-sql.conf.ext auth-sql.conf
# vim auth-sql.conf
```


```
passdb { driver = sql # Path for SQL configuration file, see example-config/dovecot-sql.conf.ext 
args = /etc/dovecot/dovecot-sql.conf.ext}
userdb { driver = sql args = /etc/dovecot/dovecot-sql.conf.ext}
```

编辑dovecot通过mysql认证的配置文件

```bash
# vim /etc/dovecot-mysql.conf
```

```
driver = mysql
connect = host=localhost dbname=extmail user=extmail password=extmail
default_pass_scheme = CRYPT
password_query = SELECT username AS user,password AS password FROM mailbox WHERE username = '%u'
user_query = SELECT maildir, uidnumber AS uid, gidnumber AS gid FROM mailbox WHERE username = '%u'
```

# 安装courier-authlib

```bash
# tar xvf courier-authlib-0.66.2.tar.bz2
# cd courier-authlib-0.66.2
# ./configure \
--prefix=/usr/local/courier-authlib \
--sysconfdir=/etc \
--without-authpam \
--without-authshadow \
--without-authvchkpw \
--without-authpgsql \
--with-authmysql \
--with-mysql-libs=/usr/lib64/mysql \
--with-mysql-includes=/usr/include/mysql \
--with-redhat \
--with-authmysqlrc=/etc/authmysqlrc \
--with-authdaemonrc=/etc/authdaemonrc \
--with-mailuser=postfix
```

这里会报错： 

```
configure: error: The Courier Unicode Library 1.2 appears not to be installed
```

安装courier-unicode

```bash
# tar xvf courier-unicode-1.2.tar.bz2
# cd courier-unicode-1.2
# ./configure
# make && make install
```

再次编译安装courier-authlib

```bash
# ./configure \
--prefix=/usr/local/courier-authlib \
--sysconfdir=/etc \
--without-authpam \
--without-authshadow \
--without-authvchkpw \
--without-authpgsql \
--with-authmysql \
--with-mysql-libs=/usr/lib64/mysql \
--with-mysql-includes=/usr/include/mysql \
--with-redhat \
--with-authmysqlrc=/etc/authmysqlrc \
--with-authdaemonrc=/etc/authdaemonrc \
--with-mailuser=postfix
# make && make install
```

配置courier-authlib

```bash
# chmod 755 /usr/local/courier-authlib/var/spool/authdaemon
# cp /etc/authdaemonrc.dist /etc/authdaemonrc
# cp /etc/authmysqlrc.dist /etc/authmysqlrc
# vim /etc/authdaemonrc
```

```
authmodulelist="authmysql"
authmodulelistorig="authmysql"
```

```bash
# vim /etc/authmysqlrc
```

```
//直接添加到配置文件尾部，然后去上面将响应系统默认的注视掉，或者删除即可
MYSQL_SERVER localhost
MYSQL_USERNAME extmail
MYSQL_PASSWORD extmail
MYSQL_SOCKET /var/lib/mysql/mysql.sock
MYSQL_PORT 3306
MYSQL_DATABASE extmail
MYSQL_USER_TABLE mailbox
MYSQL_CRYPT_PWFIELD password
DEFAULT_DOMAIN test.com
MYSQL_UID_FIELD '2525'
MYSQL_GID_FIELD '2525'
MYSQL_LOGIN_FIELD username
MYSQL_HOME_FIELD concat('/var/mailbox/',homedir)
MYSQL_NAME_FIELD name
MYSQL_MAILDIR_FIELD concat('/var/mailbox/',maildir)
```

courier-authlib添加服务启动脚本及其他

```bash
# cp courier-authlib.sysvinit /etc/init.d/courier-authlib
# chmod +x /etc/init.d/courier-authlib
# chkconfig --add courier-authlib
# chkconfig courier-authlib on
# echo "/usr/local/courier-authlib/lib/courier-authlib" >> /etc/ld.so.conf.d/courier-authlib.conf
# ldconfig
# service courier-authlib start
```

smtp以及虚拟用户相关的配置

```bash
# vim /usr/lib64/sasl2/smtpd.conf //文件不存在，要自己创建
```

```
pwcheck_method: authdaemond
log_level: 3
mech_list: PLAIN LOGIN
authdaemond_path:/usr/local/courier-authlib/var/spool/authdaemon/socket
```

```bash
# vim /etc/postfix/main.cf
```

```
smtpd_sasl_auth_enable = yes
smtpd_sasl_local_domain = ''
smtpd_recipient_restrictions = permit_mynetworks,permit_sasl_authenticated,reject_unauth_destination
broken_sasl_auth_clients=yes
smtpd_client_restrictions = permit_sasl_authenticated
smtpd_sasl_security_options = noanonymous
virtual_mailbox_base = /var/mailbox
virtual_mailbox_maps = mysql:/etc/postfix/mysql_virtual_mailbox_maps.cf //这里的配置文件需在后面extman里复制过来
virtual_mailbox_domains = mysql:/etc/postfix/mysql_virtual_domains_maps.cf
virtual_alias_domains =
virtual_alias_maps = mysql:/etc/postfix/mysql_virtual_alias_maps.cf
virtual_uid_maps = static:2525
virtual_gid_maps = static:2525
virtual_transport = virtual
```

# 安装extmail
```bash
# tar xf extmail-1.2.tar.gz -C /var/www/extsuite/
# mv /var/www/extsuite/extmail-1.2/ /var/www/extsuite/extmail
# cd /var/www/extsuite/extmail
# cp webmail.cf.default webmail.cf
# vim webmail.cf
```

```
SYS_SESS_DIR = /tmp/extmail
SYS_UPLOAD_TMPDIR = /tmp/extmail/upload
SYS_USER_LANG = zh_CN
SYS_MIN_PASS_LEN = 8
SYS_MAILDIR_BASE = /var/mailbox
SYS_MYSQL_USER = extmail
SYS_MYSQL_PASS = extmail
SYS_MYSQL_DB = extmail
SYS_MYSQL_HOST = localhost
SYS_MYSQL_SOCKET = /var/lib/mysql/mysql.sock
SYS_MYSQL_TABLE = mailbox
SYS_MYSQL_ATTR_USERNAME = username
SYS_MYSQL_ATTR_DOMAIN = domain
SYS_MYSQL_ATTR_PASSWD = password
SYS_AUTHLIB_SOCKET = /usr/local/courier-authlib/var/spool/authdaemon/socket
```

建立临时文件目录与session目录

```bash
# mkdir -p /tmp/extmail/upload
# chown -R postfix.postfix /tmp/extmail/
```

# 安装extman

```bash
# tar xf extman-1.1.tar.gz -C /var/www/extsuite/
# cd /var/www/extsuite/
# mv extman-1.1/ extman
```

更改extman配置文件

```bash
# cd extman/
# cp webman.cf.default webman.cf
```

更改cgi目录属主属组

```bash
chown -R postfix.postfix /var/www/extsuite/extman/cgi/
chown -R postfix.postfix /var/www/extsuite/extmail/cgi/
```

导入数据库

> 由于数据库不能识别TYPE= MyISAM ，所以这里直接导入会出错，先编辑extmail.sql数据库文件，将TYPE=MyISAM更改为ENGINE=MyISAM

```bash
# vim docs/extmail.sql
# sed -i -e "s/TYPE=MyISAM/ENGINE=MyISAM/g"
```

导入还是会报错

```mysql
mysql -uroot -p < docs/extmail.sql
```

```
ERROR 1364 (HY000) at line 31: Field 'ssl_cipher' doesn't have a default value
```

此处需要修改my.cnf配置文件，注释掉sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES或改为sql_mode=NO_ENGINE_SUBSTITUTION

再次导入数据库，会报错Unknown column 'password' in ‘field list’

```bash
# sed -i -e "s/Password/authentication_string/g" docs/extmail.sql
```

```mysql
mysql -uroot -p < docs/extmail.sql
mysql -uroot -p < docs/init.sql
```

创建数据库用户extmail并授予权限

```
mysql> GRANT ALL ON extmail.* to extmail@'%' identified by 'extmail'; 
Query OK, 0 rows affected (0.00 sec)
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)
```

复制配置文件

```bash
# cd /var/www/extsuite/extman/docs/
# cp mysql_virtual_* /etc/postfix/
```

为extman创建临时文件目录

```bash
# mkdir /tmp/extman
# chown -R postfix.postfix /tmp/extman/
```

# 启动postfix、dovecot、sasaulthd服务
```bash
# ss -tnluo | grep :25
# service dovecot start
# service saslauthd start
```

# 测试

> 测试虚拟用户

```bash
# /usr/local/courier-authlib/sbin/authtest -s login postmaster@extmail.org extmail
```

> 测试smtp发信

```
# printf "postmaster@extmail.org" | openssl base64
# printf "extmail" | openssl base64
# telnet localhost 25
```

# 创建mailbox，不创建会报错
```bash
# mkdir /var/mailbox
# chown -R postfix.postfix /var/mailbox/
```

# 安装Unix-Syslog

```bash
# tar zxvf Unix-Syslog-1.1.tar.gz
# mv Unix-Syslog-1.1 /usr/local/Unix-Syslog
# cd Unix-Syslog-1.1
# perl Makefile.PL
# make && make install
```

# 启动nginx实现web访问
```bash
# vim /var/www/extsuite/extmail/dispatch-init
```

```
SU_UID=postfix
SU_GID=postfix
```

启动dispatch-init

```bash
# /var/www/extsuite/extmail/dispatch-init start
Starting extmail FCGI server...
# /var/www/extsuite/extman/daemon/cmdserver -v -d
loaded ok
```

添加nginx虚拟主机

```bash
# vim /etc/nginx/conf.d/extmail.conf
```

```
server {
        listen     8080;
        server_name mail.everyoo.com;
        index index.html index.htm index.php index.cgi;
        root /var/www/extsuite/extmail/html/;

        location /extmail/cgi/ {
                fastcgi_pass        127.0.0.1:8888;
                fastcgi_index     index.cgi;
                fastcgi_param SCRIPT_FILENAME /var/www/extsuite/extmail/cgi/$fastcgi_script_name;
                include            fcgi.conf;
        }

        location /extmail/ {
                alias /var/www/extsuite/extmail/html/;
        }

        location /extman/cgi/ {
                fastcgi_pass        127.0.0.1:8888;
                fastcgi_index     index.cgi;
                fastcgi_param SCRIPT_FILENAME /var/www/extsuite/extman/cgi/$fastcgi_script_name;
                include         fcgi.conf;
        }

        location /extman/ {
                alias /var/www/extsuite/extman/html/;
        }

        access_log /var/log/extmail_access.log;
}
```

生成fcgi.conf

```bash
# vim /etc/nginx/fcgi.conf
```

```
fastcgi_param GATEWAY_INTERFACE CGI/1.1;
fastcgi_param SERVER_SOFTWARE nginx;
fastcgi_param QUERY_STRING $query_string;
fastcgi_param REQUEST_METHOD $request_method;
fastcgi_param CONTENT_TYPE $content_type;
fastcgi_param CONTENT_LENGTH $content_length;
fastcgi_param SCRIPT_NAME $fastcgi_script_name;
fastcgi_param REQUEST_URI $request_uri;
fastcgi_param DOCUMENT_ROOT $document_root;
fastcgi_param SERVER_PROTOCOL $server_protocol;
fastcgi_param REMOTE_ADDR $remote_addr;
fastcgi_param REMOTE_PORT $remote_port;
fastcgi_param SERVER_ADDR $server_addr;
fastcgi_param SERVER_PORT $server_port;
fastcgi_param SERVER_NAME $server_name;
```

# 重启nginx，访问http://IP:8080
```bash
# service nginx restart
```

ExtMail后台默认管理账号密码

| 超级管理员帐户 | 初始密码 |
| --- | --- |
| root@extmail.org | extmail*123* |

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/c2/85f52f71b24ae13db848eea21a1f75.jpg)

# 参考
[https://www.cnblogs.com/panliu/articles/4806947.html](https://www.cnblogs.com/panliu/articles/4806947.html)