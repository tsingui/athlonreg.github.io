---
title: Disable the discrete GPU in laptop
copyright: true
date: 2017-10-04
categories: Hackintosh
description: Disable the discrete GPU to fix "Window Server Service only ran for 0 seconds" in High Sierra
tags:
- Hacintosh
- 黑苹果
- Window Server Service only ran for 0 seconds
- Disable DGPU
- 屏蔽独显
---

## Disable the discrete GPU to fix "Window Server Service only ran for 0 seconds" in High Sierra
<!--more-->

## 写在前面
最近我根据 RehabMan 的 hotpatch 添加了一些路径做了一个屏蔽独显得 hotpatch 来屏蔽独显解决一些升级 10.13 后因为 nv_disable 参数失效而卡在 Window Server Service only ran for 0 seconds 的错误，发现有些成功，有些失败。于是把我琢磨到的一种方法分享给大家！希望该帖子能帮助到各位！

> 感谢：

* PCBETA (远景论坛) [yearjinheng 版主的帖子](http://bbs.pcbeta.com/viewthread-1760319-1-5.html)

* tonymacx86.com [Rehabman 的帖子](https://www.tonymacx86.com/threads/fix-window-server-service-only-ran-for-0-seconds-with-dual-gpu.233092/)

* 转载请注明 [原贴地址](https://blog.iamzhl.top/2017/10/04/%E5%B1%8F%E8%94%BD%E7%8B%AC%E6%98%BE/)

> 屏蔽独显方法不一：

* 第一种：直接在 DSDT SSDT 上做修改
* 第二种：手动制作一个适合自己机器的 hotpatch 屏蔽独显达到屏蔽独显的作用

## 开工
> 本帖主要采用第二种方法，大致思路如下：

* 提取 ACPI 原始表单
* 反编译这些文件
* 搜索一个名为 _OFF 的方法
* 检查文件的结果以确定 _OFF 的路径
* 修改 RehabMan 的 hotpatch 加入自己的路径

### 提取 ACPI 原始表单并提取 _OFF 路径
* 打开电脑进入四叶草引导界面，按下 F4 或者 FN+F4 即可提取原始表单到 /EFI/CLOVER/ACPI/origin ，然后进入 MAC 将 origin 拷贝到桌面删掉除 SSDT DSDT 之外的所有 aml 文件，打开终端：

```
$ cd ~/Desktop/origin 
$ iasl -da -dl *.aml 
$ rm *.aml 
$ grep -l Method.*_OFF *.dsl
```

* 以我修改的一个机器为例，上一条命令得到的结果如下

```
DSDT.dsl
SSDT-7.dsl
SSDT-8.dsl
SSDT-9.dsl
```

* 依次打开这四个表单搜索 _OFF ，找到一个类似于下面这个函数：

![2017-10-04-01](http://ovefvi4g3.bkt.clouddn.com/2017-10-04-01.png)

* 图片左下角的路径就是我们最终所需要的: 

```
_SB.PCI0.RP05.PEGP
```

### 修改 RehabMan 的 hotpatch 添加这个路径
* 首先去 RehanMan 的 GitHub 下载 hotpatch 包

```
https://github.com/RehabMan/OS-X-Clover-Laptop-Config.git
```

* 我们只需要 SSDT-Disable_DGPU 这个文件，编译成 aml 文件

```
$ iasl SSDT-Disable_DGPU.dsl 
```

* 打开编译后得到的 aml 文件

![2017-10-04-02](http://ovefvi4g3.bkt.clouddn.com/2017-10-04-02.png)

* 按照这个格式添加自己的路径

![2017-10-04-03](http://ovefvi4g3.bkt.clouddn.com/2017-10-04-03.png)

* 保存放到 /EFI/CLOVER/ACPI/patched 

### 一个注意点
* 如果在 Config.plist 中使用了 SortedOrder (通常 Clover 安装后默认没有设置)，需要在其内添加 SSDT-Disable_DGPU.aml 这一项。因为如果指定了 SortedOrder ，则 Clover 只加载其中指定的 SSDT 。如果没有出现在列表中,即使在 ACPI/patched 中，它也不会加载。

## 完工


