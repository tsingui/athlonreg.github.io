---
title: Speed up the hackintosh to boot
copyright: true
date: 2017-09-05
categories: Hackintosh
description: 加快黑苹果开机速度的一种方法
tags:
- 黑苹果
- 开机速度
- Hacintosh
---

## 加快黑苹果开机速度的一种方法
<!--more-->

# 知识普及

有的黑苹果重启速度特别慢（大约2、3分钟），这问题多半与Clover的 Reset Address 与 Reset Value 有关 ( 这里只针对 Clover ) 。

这个问题和 Reset Address 与 Reset Value 参数有关，这两个参数位于 Clover Configurator 的Acpi部分左下方。如果什么都不填默认值分别为：0x64与0xFE，即：重启通过PS控制器完成，PS控制器只有黑苹果才有，白苹果则是通过PCI实现，所以，如果你的电脑恰好也是通过PCI控制，那么就会有问题了。针对PCI这两个值应该填写：0x0CF9与0x06。 当然，还有一种更精确找到该值的办法，就是我们要用到的唯一一个表单，就是FACP这个表。

# 准备工作

首先利用 CLOVER 在引导界面按 F4 或者 Fn+F4 提取原始 ACPI 表单，提取出来的表单就在 /EFI/CLOVER/ACPI/origin 

# 开工

## 提取 Reset Address 和 Reset Value 值

用 MaciASL 打开 FACP 这个表单，Command + F 搜索 Reset Register ， Address 值和 Value to cause reset 值就是我们所说的 PCI 需要设定的两个值，如图高亮处：

  ![2017-09-05-07](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-07-1.png)

## 设定Reset Address 和 Reset Value 值

提取出来这两个值后就要修改 config 了，用 Clover Configurator 打开你的 config ，如图位置填上提取到的两个值：

  ![2017-09-05-08](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-08-1.png)

保存重启就可以了.
    
# 完工





