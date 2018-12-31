---
title: macOS 安装和配置 MySQL
copyright: true
date: 2017-12-20 17:01:00
categories: 学习
description: 在 Mac 安装和配置 MySQL
tags:
- MySQL
- Mac
photos:
- http://ovefvi4g3.bkt.clouddn.com/2017-12-20-3.png
---

## 准备
### 安装`HomeBrew`
```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

等待安装完成即可

## 安装
### 安装`MySQL`
```bash
$ brew install mysql
```

等待安装完成，如下图

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fypx04k5t3j31ik0jcq6h.jpg)

### 检查安装是否正常
```bash
$ mysql --version
```

如果出现版本号，则正常，如下图

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fypx1r6r9rj31is034dgk.jpg)

若提示`command not found`，则依次执行下面两条命令

```bash
$ cd /usr/local/bin/
$ sudo ln -fs /usr/local/mysql/bin/mysql mysql
```

## 配置
### 配置root账号的密码，默认无密码
#### 开启安全模式启动`mysql`
```bash
$ sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables
```

### 修改密码
#### 首先登录`mysql`
```bash
$ mysql -u root
```

#### 配置`root`账号的密码
> 命令中的`****`为要修改的密码

```mysql
UPDATE mysql.user SET authentication_string=PASSWORD('****') WHERE User='root';
```

#### 刷新权限
```mysql
FLUSH PRIVILEGES;
```

#### 退出`mysql`
```mysql
\q
```

## 验证密码
```bash
$ mysql -u root -p
```

会提示输入密码，输入刚才设定的密码后如果能够进入`mysql`则说明配置成功。

## 终端开启和关闭`mysql`服务
```bash
$ sudo /usr/local/mysql/support-files/mysql.server start
$ sudo /usr/local/mysql/support-files/mysql.server stop
```

