---
title: shadowsocks-libev
date: 2018-11-25 17:39:40
password:
categories: study
keywords: shadowsocks
description: shadowsocks-libev
tags: shadowsocks
photos:
---

## 环境准备
- 国外服务器一台
- CentOS 操作系统

## 安装
```bash
# yum -y install pcre pcre-devel git wget gcc gcc-c++
# cd ~ && git clone https://github.com/shadowsocks/shadowsocks-libev.git
# cd shadowsocks-libev && git submodule update --init --recursive
# yum install gettext gcc autoconf libtool automake make asciidoc xmlto c-ares-devel libev-devel
# echo "LIBSODIUM_VER=1.0.13" >> /etc/profile
# source /etc/profile
# cd ~
# wget https://download.libsodium.org/libsodium/releases/LATEST.tar.gz
# tar zxvf LATEST.tar.gz
# pushd libsodium-stable
# ./configure --prefix=/usr && make
# make install
# popd
# ldconfig
# echo "export MBEDTLS_VER=2.6.0" >> /etc/profile
# source /etc/profile
# cd ~ && wget wget https://tls.mbed.org/download/mbedtls-2.14.0-apache.tgz
# tar xvf mbedtls-2.14.0-apache.tgz
# pushd mbedtls-2.14.0
# make SHARED=1 CFLAGS=-fPIC
# make DESTDIR=/usr install
# popd
# ldconfig
# cd shadowsocks-libev && ./autogen.sh && ./configure && make
# make install
# cd /usr/local &&  wget  https://nchc.dl.sourceforge.net/project/pcre/pcre/8.41/pcre-8.41.tar.gz
# tar -zxvf  pcre-8.41.tar.gz
# cd pcre-8.41 && ./configure && make
# make install
# cd /usr/local && mkdir ssr && cd ssr
# vi conf.conf
```

```json
{
        "server":"your server ip",
        "server_port":7788,
        "local_port":1080,
        "password":"your password for ssr",
        "timeout":60,
        "method":"aes-256-cfb"
}
```

```bash
# ss-server -c /usr/local/ssr/conf.conf //运行
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/d4/6463c41c237e134ade8219c099db8e.jpg)

```bash
# cd /usr/local/bin && vi ssr //利用脚本后台运行
```

```shell
#!/bin/bash
nohup ss-server -c /usr/local/ssr/conf.conf > /dev/null 2>&1 &
```

```bash
# chmod +x /usr/local/bin/ssr
# ssr
# ps ax | grep ssr
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/a4/ef69a4b5a7ca6de17e5744064ba11d.jpg)