---
title: macOS Mojave 10.14 beta1
date: 2018-06-13 12:32:49
categories: Hackintosh
description: macOS Mojave 10.14 beta1 with Clover 4513 18A293u原版镜像
tags: 
- macOS Mojave
- 10.14
- 18A293u
---

## 前言
随着WWDC大会的召开，`apple`带来了我们期待已久的`10.14`，代号`macOS Mojave`，下面是本次的支持列表

> macOS Mojave support

- MacBook (Early 2015 or newer)

- MacBook Air (Mid 2012 or newer)

- MacBook Pro (Mid 2012 or newer)

- Mac mini (Late 2012 or newer)

- iMac (Late 2012 or newer)

- iMac Pro (2017)

- Mac Pro (Late 2013, plus mid 2010 and mid 2012 models with recommend Metal-capable GPU)

`Apple`于`2018-6-4`凌晨两点推送的`macOS Mojave 10.14 beta 1`开发者测试版更新包，版本号为`18A293u`

![Cache_-409923ca8760a2c1](http://ovefvi4g3.bkt.clouddn.com/Cache_-409923ca8760a2c1.jpg)

增加全局暗黑模式，`Dock`堆栈以及根据时间动态调整壁纸等特色更新，

![400a6b5314836667](http://ovefvi4g3.bkt.clouddn.com/400a6b5314836667.jpg)

## 更新须知
本次更新移除了对高通多数无线网卡的支持，`/System/Library/Extensions/IO80211Family.kext/Contents/PlugIns`下已经丢掉了`AirPortAtheros40.kext`，`AR9285`的朋友可以通过将旧版本的此驱动安装到对应位置重建缓存修复权限然后重启即可，`AR956X`、`AR946X`、`AR9485`暂时无法驱动，`AppleALC`的`1.2.7`的`Releases`版驱动也无法支持，请基于源码编译最新，然后`config.plist`加入`-lilubetaall`启动参数即可，具体文件请到我`Github`找，[传送门](https://github.com/athlonreg/Common-CLOVER-EFI-Bootloader)。

## 镜像内容
此镜像采用`Applestore`官方商店下载整包制作，仅适用于`GUID`分区表，加入了经`口袋妖怪修改`的`Clover_v2.4k_r4512`，支持引导`10.14`，并集成一些常用驱动和`config`，镜像内有文件详细说明

PS: 镜像内驱动和`config`是为新手准备，老鸟勿喷

![](http://ovefvi4g3.bkt.clouddn.com/15288662496913.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15288662560159.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15288662632173.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15288662719521.jpg)

**新手请务必按其中的说明自行选用**

## 镜像地址
- 谷歌网盘 - https://drive.google.com/open?id=15o_QbgOx-OVQ-15JCPdRxrVtIxPEaAKm
- 百度网盘 - 链接:https://pan.baidu.com/s/1oFdF-M2xzcQztsxgSnZJ4A  密码:gvhg
- 城通网盘 - https://u14843043.ctfile.com/dir/14843043-28600324-6148d5/

## 镜像校验
为防止下载文件损坏，请尽量进行校验，`MD5`、`SHA1`、`SHA256`如下

![MD5 SHA1 SHA256](http://ovefvi4g3.bkt.clouddn.com/MD5 SHA1 SHA256.jpg)

