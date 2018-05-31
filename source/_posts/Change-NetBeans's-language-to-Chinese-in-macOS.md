---
title: Change NetBeans's language to Chinese in macOS
copyright: true
date: 2017-12-09 02:36:23
categories: Study
description: macOS 下修改 NetBeans 的界面语言
tags:
- NetBeans
---

## macOS 下修改 NetBeans 的界面语言
<!--more-->

## `macOS`下修改`NetBeans`的界面语言
在`Applications`中找到`NetBeans`的安装目录：`/Applications/NetBeans/NetBeans 8.2.app/Contents/Resources/NetBeans/etc/netbeans.conf`，以纯文本文档格式打开，搜索`netbeans_default_options`，在最后加上`--locale zh:CN`，改为英文则是`--locale en:US`，如图所示：

![20171209-0](http://ovefvi4g3.bkt.clouddn.com/20171209-0.png)

![20171209-1](http://ovefvi4g3.bkt.clouddn.com/20171209-1.png)


