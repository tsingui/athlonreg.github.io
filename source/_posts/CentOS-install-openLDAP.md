---
title: CentOS安装部署 openLDAP
date: 2018-11-24 22:17:41
categories: 运维
keywords: openLDAP
description: CentOS安装部署 openLDAP
tags: openLDAP
photos: https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/08/3ae2f42f09aaee0b022ca1e9417ba1.jpg
---

## 简介
OpenLDAP 是轻型目录访问协议`Lightweight Directory Access Protocol` - `LDAP`的自由和开源的实现，在其`OpenLDAP`许可证下发行，并已经被包含在众多流行的`Linux`发行版中。

## 安装

```bash
# cd ~
# yum -y install openldap-servers openldap-clients
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/1c/02ad1e703c7187295361dbff3fad9c.jpg)

```bash
# cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
# chown ldap:ldap /var/lib/ldap/DB_CONFIG
# systemctl start slapd
# systemctl enable slapd
```

## 配置

```bash
# slappasswd
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/75/c5c970bd59e02ac7434f217a5f27a6.jpg)

```bash
# vi chrootpw.ldif
```

```properties
# specify the password generated above for "olcRootPW" section
dn: olcDatabase={0}config,cn=config
changetype: modify
add: olcRootPW
olcRootPW: {SSHA}xxxxxxxxxxxxxxxxxxxxxxxx
```

```bash
# ldapadd -Y EXTERNAL -H ldapi:/// -f chrootpw.ldif 
```

## 导入基本模式

```bash
# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/cosine.ldif 
# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/nis.ldif 
# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/inetorgperson.ldif 
```

## 在ldap的DB中设置域名

```bash
# slappasswd 
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/de/9a4502a39d572493b8ae8d723a08ef.jpg)

```bash
# vi chdomain.ldif
```

```properties
# replace to your own domain name for "dc=***,dc=***" section
# specify the password generated above for "olcRootPW" section
dn: olcDatabase={1}monitor,cn=config
changetype: modify
replace: olcAccess
olcAccess: {0}to * by dn.base="gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth"
  read by dn.base="cn=Manager,dc=iamzhl,dc=top" read by * none

dn: olcDatabase={2}hdb,cn=config
changetype: modify
replace: olcSuffix
olcSuffix: dc=iamzhl,dc=top

dn: olcDatabase={2}hdb,cn=config
changetype: modify
replace: olcRootDN
olcRootDN: cn=Manager,dc=iamzhl,dc=top

dn: olcDatabase={2}hdb,cn=config
changetype: modify
add: olcRootPW
olcRootPW: {SSHA}xxxxxxxxxxxxxxxxxxxxxxxx

dn: olcDatabase={2}hdb,cn=config
changetype: modify
add: olcAccess
olcAccess: {0}to attrs=userPassword,shadowLastChange by
  dn="cn=Manager,dc=iamzhl,dc=top" write by anonymous auth by self write by * none
olcAccess: {1}to dn.base="" by * read
olcAccess: {2}to * by dn="cn=Manager,dc=iamzhl,dc=top" write by * read
```

```bash
# ldapmodify -Y EXTERNAL -H ldapi:/// -f chdomain.ldif 
```

```bash
# vi basedomain.ldif
```

```properties
# replace to your own domain name for "dc=***,dc=***" section
dn: dc=iamzhl,dc=top
objectClass: top
objectClass: dcObject
objectclass: organization
o: iamzhl
dc: iamzhl

dn: cn=Manager,dc=iamzhl,dc=top
objectClass: organizationalRole
cn: Manager
description: Directory Manager

dn: ou=People,dc=iamzhl,dc=top
objectClass: organizationalUnit
ou: People

dn: ou=Group,dc=iamzhl,dc=top
objectClass: organizationalUnit
ou: Group
```

```bash
# ldapadd -x -D cn=Manager,dc=iamzhl,dc=top -W -f basedomain.ldif 
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/d1/46842e7f601199c0f78da4d97d30ad.jpg)

## 添加一个用户

```bash
# slappasswd 
# vi ldapuser.ldif
```

```properties
# create new
# replace to your own domain name for "dc=***,dc=***" section
dn: uid=cent,ou=People,dc=iamzhl,dc=top
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
cn: Cent
sn: Linux
userPassword: {SSHA}xxxxxxxxxxxxxxxxx
loginShell: /bin/bash
uidNumber: 1000
gidNumber: 1000
homeDirectory: /home/cent

dn: cn=cent,ou=Group,dc=iamzhl,dc=top
objectClass: posixGroup
cn: Cent
gidNumber: 1000
memberUid: cent
```

```bash
# ldapadd -x -D cn=Manager,dc=iamzhl,dc=top -W -f ldapuser.ldif 
```

## 添加本机的用户和群组到ldap目录

```bash
# vi ldapuser.sh
```

```shell
# extract local users and groups who have 1000-9999 digit UID
# replace "SUFFIX=***" to your own domain name
# this is an example
#!/bin/bash

SUFFIX='dc=iamzhl,dc=top'
LDIF='ldapuser.ldif'

echo -n > $LDIF
GROUP_IDS=()
grep "x:[1-9][0-9][0-9][0-9]:" /etc/passwd | (while read TARGET_USER
do
    USER_ID="$(echo "$TARGET_USER" | cut -d':' -f1)"

    USER_NAME="$(echo "$TARGET_USER" | cut -d':' -f5 | cut -d' ' -f1,2)"
    [ ! "$USER_NAME" ] && USER_NAME="$USER_ID"

    LDAP_SN="$(echo "$USER_NAME" | cut -d' ' -f2)"
    [ ! "$LDAP_SN" ] && LDAP_SN="$USER_NAME"

    LASTCHANGE_FLAG="$(grep "${USER_ID}:" /etc/shadow | cut -d':' -f3)"
    [ ! "$LASTCHANGE_FLAG" ] && LASTCHANGE_FLAG="0"

    SHADOW_FLAG="$(grep "${USER_ID}:" /etc/shadow | cut -d':' -f9)"
    [ ! "$SHADOW_FLAG" ] && SHADOW_FLAG="0"

    GROUP_ID="$(echo "$TARGET_USER" | cut -d':' -f4)"
    [ ! "$(echo "${GROUP_IDS[@]}" | grep "$GROUP_ID")" ] && GROUP_IDS=("${GROUP_IDS[@]}" "$GROUP_ID")

    echo "dn: uid=$USER_ID,ou=People,$SUFFIX" >> $LDIF
    echo "objectClass: inetOrgPerson" >> $LDIF
    echo "objectClass: posixAccount" >> $LDIF
    echo "objectClass: shadowAccount" >> $LDIF
    echo "sn: $LDAP_SN" >> $LDIF
    echo "givenName: $(echo "$USER_NAME" | awk '{print $1}')" >> $LDIF
    echo "cn: $USER_NAME" >> $LDIF
    echo "displayName: $USER_NAME" >> $LDIF
    echo "uidNumber: $(echo "$TARGET_USER" | cut -d':' -f3)" >> $LDIF
    echo "gidNumber: $(echo "$TARGET_USER" | cut -d':' -f4)" >> $LDIF
    echo "userPassword: {crypt}$(grep "${USER_ID}:" /etc/shadow | cut -d':' -f2)" >> $LDIF
    echo "gecos: $USER_NAME" >> $LDIF
    echo "loginShell: $(echo "$TARGET_USER" | cut -d':' -f7)" >> $LDIF
    echo "homeDirectory: $(echo "$TARGET_USER" | cut -d':' -f6)" >> $LDIF
    echo "shadowExpire: $(passwd -S "$USER_ID" | awk '{print $7}')" >> $LDIF
    echo "shadowFlag: $SHADOW_FLAG" >> $LDIF
    echo "shadowWarning: $(passwd -S "$USER_ID" | awk '{print $6}')" >> $LDIF
    echo "shadowMin: $(passwd -S "$USER_ID" | awk '{print $4}')" >> $LDIF
    echo "shadowMax: $(passwd -S "$USER_ID" | awk '{print $5}')" >> $LDIF
    echo "shadowLastChange: $LASTCHANGE_FLAG" >> $LDIF
    echo >> $LDIF
done

for TARGET_GROUP_ID in "${GROUP_IDS[@]}"
do
    LDAP_CN="$(grep ":${TARGET_GROUP_ID}:" /etc/group | cut -d':' -f1)"

    echo "dn: cn=$LDAP_CN,ou=Group,$SUFFIX" >> $LDIF
    echo "objectClass: posixGroup" >> $LDIF
    echo "cn: $LDAP_CN" >> $LDIF
    echo "gidNumber: $TARGET_GROUP_ID" >> $LDIF

    for MEMBER_UID in $(grep ":${TARGET_GROUP_ID}:" /etc/passwd | cut -d':' -f1,3)
    do
        UID_NUM=$(echo "$MEMBER_UID" | cut -d':' -f2)
        [ $UID_NUM -ge 1000 -a $UID_NUM -le 9999 ] && echo "memberUid: $(echo "$MEMBER_UID" | cut -d':' -f1)" >> $LDIF
    done
    echo >> $LDIF
done
)
```

```bash
# sh ldapuser.sh 
# ldapadd -x -D cn=Manager,dc=iamzhl,dc=top -W -f ldapuser.ldif 
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/d5/aaa70f4f22ad6ee40fa74bf027bd4b.jpg)

## 利用Apache Directory Studio进行管理

Apache Directory Studio 是一个 LDAP 的工具平台，用来连接到任何 LDAP 服务器并进行管理和开发工作。其可以实现以下功能：
- LDAP浏览器
- LDIF编辑器
- 嵌入式 ApacheDS
- ACI编辑器
- 属性管理

下面以新建连接和新增用户为例进行演示

如图，点击 New Connection 新建一个 ldap 连接

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/12/d782ef026127039c48173727402ae1.jpg)

依次输入连接名、主机名以及端口号后点击`Next`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b4/8238cc5d14bd32906fb1bf4d2fb726.jpg)

再依次输入绑定的`DN`和密码后点击`Finish`

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/6d/33932a9dccd444922051239295a40e.jpg)

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

## Credits
本文多处参考[centos7下ldap服务搭建](https://blog.csdn.net/wenwenxiong/article/details/76855047)，感谢[wenwenxiong](https://blog.csdn.net/wenwenxiong)的分享。