---
title: High Sierra 和 Mojave 镜像大全
date: 2018-07-15 15:58:04
categories: 黑苹果
keywords: 原版镜像, macOS Mojave, 10.14, 10.13, macOS High Sierra, 黑苹果镜像
description: macOS High Sierra 以及 macOS Mojave 镜像大全(持续更新)
tags: 
- 原版镜像
- 黑苹果镜像
---

## 前言
本人所有镜像均采用`Applestore`官方商店下载整包制作，适用于`gpt`分区表，加入了各个版本刚推送时的`Clover`源码最新引导，后续的测试版推送之后我会尽早做出供坛友使用，希望大家多多支持给楼主加个分，你们的支持就是我的动力

----

楼主所做的镜像全部集成多驱动，多`config`，镜像所集成的这些东西只是方便大家用，坛友写入之后请适当删减使用，有能力的或者本身自己有一套适合自己的`EFI`的朋友请用自己的，望周知。

***PS: 镜像内驱动和config是为新手准备，老鸟勿喷
镜像内有文件详细说明，新手请按说明自行配置引导。***

## 最近一次更新内容

新款`MacBook Pro`上市之后，`Apple`推出特供版本以支持八代`CPU`，依然是`10.13.6`，此次版本号为`17G2112`，经测试，已原生支持八代机器

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/25/b5aa43f4a1a170328a5d9af626d004.jpg)

此外,`Clover`也及时跟新了`mbp15,1`以及`mbp15,2`的`SMBIOS`，推荐大家使用，低压本用`mbp15,2`，其他`mbp15,1`，下面是`SMBIOS`，大家可以直接套用，记得修改`BoardSerialNumber`为自己之前正在用的。

> MacBook Pro 15,1

```
<key>SMBIOS</key>
<dict>
	<key>BiosReleaseDate</key>
	<string>06/26/2018</string>
	<key>BiosVendor</key>
	<string>Apple Inc.</string>
	<key>BiosVersion</key>
	<string>MBP151.88Z.0178.B00.1806260902</string>
	<key>Board-ID</key>
	<string>Mac-937A206F2EE63C01</string>
	<key>BoardManufacturer</key>
	<string>Apple Inc.</string>
	<key>BoardSerialNumber</key>
	<string>C02418108QXF64WCB</string>
	<key>BoardType</key>
	<integer>11</integer>
	<key>BoardVersion</key>
	<string>1.0</string>
	<key>ChassisAssetTag</key>
	<string>MacBook-Aluminum</string>
	<key>ChassisManufacturer</key>
	<string>Apple Inc.</string>
	<key>ChassisType</key>
	<string>0x09</string>
	<key>Family</key>
	<string>MacBook Pro</string>
	<key>FirmwareFeatures</key>
	<string>0xFC0FE137</string>
	<key>FirmwareFeaturesMask</key>
	<string>0xFF1FFF3F</string>
	<key>LocationInChassis</key>
	<string>Part Component</string>
	<key>Manufacturer</key>
	<string>Apple Inc.</string>
	<key>Mobile</key>
	<true/>
	<key>PlatformFeature</key>
	<string>0x1A</string>
	<key>ProductName</key>
	<string>MacBookPro15,1</string>
	<key>SerialNumber</key>
	<string>C02X1HACKGYG</string>
	<key>Version</key>
	<string>1.0</string>
</dict>
```

> MacBook Pro 15,2

```
<key>SMBIOS</key>
<dict>
	<key>BiosReleaseDate</key>
	<string>06/26/2018</string>
	<key>BiosVendor</key>
	<string>Apple Inc.</string>
	<key>BiosVersion</key>
	<string>MBP152.88Z.0178.B00.1806260902</string>
	<key>Board-ID</key>
	<string>Mac-827FB448E656EC26</string>
	<key>BoardManufacturer</key>
	<string>Apple Inc.</string>
	<key>BoardSerialNumber</key>
	<string>C02418108QXF64WCB</string>
	<key>BoardType</key>
	<integer>11</integer>
	<key>BoardVersion</key>
	<string>1.0</string>
	<key>ChassisAssetTag</key>
	<string>MacBook-Aluminum</string>
	<key>ChassisManufacturer</key>
	<string>Apple Inc.</string>
	<key>ChassisType</key>
	<string>0x09</string>
	<key>Family</key>
	<string>MacBook Pro</string>
	<key>FirmwareFeatures</key>
	<string>0xFC0FE137</string>
	<key>FirmwareFeaturesMask</key>
	<string>0xFF1FFF3F</string>
	<key>LocationInChassis</key>
	<string>Part Component</string>
	<key>Manufacturer</key>
	<string>Apple Inc.</string>
	<key>Mobile</key>
	<true/>
	<key>PlatformFeature</key>
	<string>0x1A</string>
	<key>ProductName</key>
	<string>MacBookPro15,2</string>
	<key>SerialNumber</key>
	<string>C02X1HACKGYG</string>
	<key>Version</key>
	<string>1.0</string>
</dict>
```

## 镜像内容

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/88/e3735f1df7c1698869bc4700b0e34f.png)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/48/99a6d0d9094d41acc455008be82109.png)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/48/87d2b0ec6f40a3df7347148b03d196.png)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/04/9fa489977f2fc21eccce5b795eddb6.png)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/a6/ba1d85d46d0523daf0d539579bcbbd.png)

## 镜像地址

每出一个版本都写一个帖子的话太麻烦，所以决定直接写一个镜像的集合贴，下面是各个版本的链接：

```
链接: https://pan.baidu.com/s/1n5-2-NiQARXA4r5996k1mw 密码: 8rt5
```

## 镜像校验

为防止下载文件损坏，请尽量进行`MD5`、`SHA1`、`SHA256`校验，校验文件以图片的形式存在于各个镜像文件夹内。