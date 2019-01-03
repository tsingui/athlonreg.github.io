---
title: CentOS 7 安装部署邮件服务器
date: 2018-10-19 21:31:24
categories: 
- 运维
- Linux
keywords: 
- CentOS
- 邮件服务器
- SMTP
- IMAP
- POP3
description: CentOS 7安装部署邮件服务器
tags: 
- 运维
- Linux
- SMTP
- Mail Server
---

# 本文环境
CentOS 7.2 1511

# 开始安装
## 安装postfix

```bash
# yum -y install postfix
```

如果机器已经安装了sendmail，需要将其卸载，下面两条命令均可

```bash
# yum -y remove sendmail
# rpm -e sendmail
```

修改MTA(默认邮件代理)

```bash
# alternatives --config mta
```

检查是否配置成功

```bash
# alternatives --display mta
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/14/519a03d59c7bc4ff363f66a8620736.jpg)

这里我已经安装过postfix了

## 安装dovecot

```bash
# yum -y install dovecot
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/fd/d041b10136a8aea22008556cba508a.jpg)

## 配置postfix

```bash
# vi /etc/postfix/main.cf
```

修改以下参数

```
myhostname = mail.zhanghl.cn  # 取消注释，设置hostname
mydomain = zhanghl.cn  # 取消注释，设置域名
myorigin = $mydomain  # 取消注释
inet_interfaces = all  # 修改为all
inet_protocols = ipv4  # 修改ipv4，如果支持ipv6，则可以为all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain # 修改在最后添加$mydomain
mynetworks = 127.0.0.0/8, 10.0.0.0/24  # 取消注释，指定内网和本地的IP地址范围
home_mailbox = Maildir/  # 取消注释，邮件保存目录
smtpd_banner = $myhostname ESMTP $mail_name ($mail_version)  # 取消注释，邮件服务器欢迎信息
```

文件最后添加以下内容

```
# Setup max mail attachment to 10M
message_size_limit = 10485760
# Setup max capacity of Inbox to 1G
mailbox_size_limit = 1073741824
# SMTP Authentication
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes
smtpd_sasl_security_options = noanonymous
smtpd_sasl_local_domain = $myhostname
smtpd_recipient_restrictions = permit_mynetworks,permit_auth_destination,permit_sasl_authenticated,reject
```

启动并设置自启动

```bash
# systemctl start postfix  //启动
# systemctl enable postfix  //自启动
```

## 配置dovecot

```bash
# vim /etc/dovecot/dovecot.conf
```

```
listen = *  //取消注释并修改
```

```bash
# vim /etc/dovecot/conf.d/10-auth.conf
```

```
disable_plaintext_auth = no  //取消注释并修改
auth_mechanisms = plain login  //修改添加login
```

```bash
# vim /etc/dovecot/conf.d/10-mail.conf
```

```
mail_location = maildir:~/Maildir  //修改设置邮件存储位置
```

```bash
# vim /etc/dovecot/conf.d/10-master.conf
```

取消注释并添加user和group属性

```
unix_listener /var/spool/postfix/private/auth {
    mode = 0666
    user = postfix
    group = postfix
}
```

启动并设置自启动

```bash
# systemctl start dovecot  //启动
# systemctl enable dovecot  //自启动
```

## 域名解析

添加一个子域名mail，A记录解析到服务器IP。

再添加一个MX记录，主机记录为空，记录值为上面解析的二级域名mail.zhanghl.cn，优先级10。

注意：解析生效可能需要一段时间。

也可以修改/etc/hosts添加邮件服务器域名实现。

```bash
# vim /etc/hosts
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e2/0e95d3345f60b59bffdf377e55fc3b.jpg)

## 测试邮箱

首先安装telnet，由于CentOS 7已经默认没有了xinetd和telnet，因此需要安装

```bash
# yum -y install xinetd telnet telnet-server
```

设置xinetd启动并自启动

```bash
# systemctl start xinetd
# systemctl enable xinetd
```

利用telnet测试邮件服务器

```bash
[zhanghl@centos-7 ~]$ telnet zhanghl.cn 25
Trying 127.0.0.1...
Connected to zhanghl.cn.
Escape character is '^]'.
220 mail.zhanghl.cn ESMTP Postfix (2.10.1)
mail from:zhanghl
250 2.1.0 Ok
rcpt to:root
250 2.1.5 Ok
data
354 End data with <CR><LF>.<CR><LF>
Hello, i'm zhanghl!
.
250 2.0.0 Ok: queued as 731144191B7F
quit
221 2.0.0 Bye
Connection closed by foreign host.
[zhanghl@centos-7 ~]$ telnet zhanghl.cn 110
Trying 127.0.0.1...
Connected to zhanghl.cn.
Escape character is '^]'.
+OK Dovecot ready.
user zhanghl
+OK
pass 123456
+OK Logged in.
list
+OK 1 messages:
1 2381
.
retr 1
+OK 2381 octets
Return-Path: <>
X-Original-To: zhanghl@zhanghl.cn
Delivered-To: zhanghl@zhanghl.cn
Received: by mail.zhanghl.cn (Postfix)
	id 61E594191B92; Fri, 19 Oct 2018 22:44:27 +0800 (CST)
Date: Fri, 19 Oct 2018 22:44:27 +0800 (CST)
From: MAILER-DAEMON@zhanghl.cn (Mail Delivery System)
Subject: Undelivered Mail Returned to Sender
To: zhanghl@zhanghl.cn
Auto-Submitted: auto-replied
MIME-Version: 1.0
Content-Type: multipart/report; report-type=delivery-status;
	boundary="731144191B7F.1539960267/mail.zhanghl.cn"
Message-Id: <20181019144427.61E594191B92@mail.zhanghl.cn>

This is a MIME-encapsulated message.

--731144191B7F.1539960267/mail.zhanghl.cn
Content-Description: Notification
Content-Type: text/plain; charset=us-ascii

This is the mail system at host mail.zhanghl.cn.

I'm sorry to have to inform you that your message could not
be delivered to one or more recipients. It's attached below.

For further assistance, please send mail to postmaster.

If you do so, please include this problem report. You can
delete your own text from the attached returned message.

                   The mail system

<root@zhanghl.cn> (expanded from <root>): maildir delivery failed: create
    maildir file /root/Maildir/tmp/1539960267.P14995.centos-7.shared:
    Permission denied

--731144191B7F.1539960267/mail.zhanghl.cn
Content-Description: Delivery report
Content-Type: message/delivery-status

Reporting-MTA: dns; mail.zhanghl.cn
X-Postfix-Queue-ID: 731144191B7F
X-Postfix-Sender: rfc822; zhanghl@zhanghl.cn
Arrival-Date: Fri, 19 Oct 2018 22:43:58 +0800 (CST)

Final-Recipient: rfc822; root@zhanghl.cn
Original-Recipient: rfc822;root
Action: failed
Status: 5.2.0
Diagnostic-Code: X-Postfix; maildir delivery failed: create maildir file
    /root/Maildir/tmp/1539960267.P14995.centos-7.shared: Permission denied

--731144191B7F.1539960267/mail.zhanghl.cn
Content-Description: Undelivered Message
Content-Type: message/rfc822

Return-Path: <zhanghl@zhanghl.cn>
Received: from mail.zhanghl.cn (mail.zhanghl.cn [127.0.0.1])
	by mail.zhanghl.cn (Postfix) with SMTP id 731144191B7F
	for <root>; Fri, 19 Oct 2018 22:43:58 +0800 (CST)
Message-Id: <20181019144410.731144191B7F@mail.zhanghl.cn>
Date: Fri, 19 Oct 2018 22:43:58 +0800 (CST)
From: zhanghl@zhanghl.cn

Hello, i'm zhanghl!

--731144191B7F.1539960267/mail.zhanghl.cn--
.
quit
+OK Logging out.
Connection closed by foreign host.
[zhanghl@centos-7 ~]$ 
```


## 使用邮箱

一切都弄好以后，就可以使用Foxmail等第三方软件来收发邮件了。在这里需要说一下，系统用户就是邮件的用户，例如root，就是一个邮箱用户，邮箱是root@zhanghl.cn，密码就是root的密码，所以需要创建用户，只要使用useradd创建用户，再使用passwd设置密码。
