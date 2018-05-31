---
title: Extract and fix DSDT SSDT simply
copyright: true
date: 2017-08-30
categories: Hackintosh
description: DSDT SSDT 简单提取修复
tags:
- DSDT
- SSDT
- 编译
---

## DSDT SSDT 简单提取修复
<!--more-->

# 开工
## 准备工作
首先在 CLOVER 引导界面按 F4 或者 FN + F4 提取原始表单，然后进入 Mac ，利用 Clover Configurator 挂载ESP分区，提取的表单就在 /EFI/CLOVER/ACPI/origin ,将 origin 整个拷贝到桌面，并删除 origin 中除 DSDT SSDT 以外的所有文件

然后下载要用到的工具

```
iasl：https://bitbucket.org/RehabMan/acpica/downloads/
MaciASL：链接:http://pan.baidu.com/s/1pKAksR5  密码:nxyr
```
  
将 iasl 放到 /usr/bin 

![170830-1](http://ovefvi4g3.bkt.clouddn.com/170830-1-1.png)

![170830-2](http://ovefvi4g3.bkt.clouddn.com/170830-2-1.png)

然后安装 MaciASL 并添加补丁源：

![170830-3](http://ovefvi4g3.bkt.clouddn.com/170830-3-1.png)

![170830-4](http://ovefvi4g3.bkt.clouddn.com/170830-4-1.png)

 Rehabman 补丁源：

```
Name：RehabMan Laptop 
URL：http://raw.github.com/RehabMan/Laptop-DSDT-Patch/master
```

打开终端，输入：

```
cd ~/Desktop/origin 
```

回车

![170830-5](http://ovefvi4g3.bkt.clouddn.com/170830-5-1.png)

然后输入:

```
iasl –da –dl *.aml 
```
  
回车

![170830-6](http://ovefvi4g3.bkt.clouddn.com/170830-6-1.png)

![170830-7](http://ovefvi4g3.bkt.clouddn.com/170830-7-1.png)

这时打开桌面的 origin 文件夹会发现多出了很多 .dsl 文件，我们要用到的就是这些文件

![170830-8](http://ovefvi4g3.bkt.clouddn.com/170830-8-1.png)

先不要急，终端继续执行

```
rm –rf *.aml 
```
  
回车

然后执行:

```
rm –rf *x.dsl 
```
  
回车，这时就会发现终端只剩下了不带 x 的 dsl 文件

![170830-9](http://ovefvi4g3.bkt.clouddn.com/170830-9-1.png)

## 开始操作
然后用 MaciASL 打开 DSDT.dsl 

![170830-10](http://ovefvi4g3.bkt.clouddn.com/170830-10-1.png)

点 Compile 编译后会弹出错误的窗口：

![170830-11](http://ovefvi4g3.bkt.clouddn.com/170830-11-1.png)

点这些错误就会定位到错误的代码位置

这里说一下常见的错误修复方法:

1、 PARSEOP_ZERO 错误，定位后会发现一堆 zero 代码，直接将他们删掉即可   
2、 Unexpected ‘}’ 错误：
    
定位后是这样：

![170830-12](http://ovefvi4g3.bkt.clouddn.com/170830-12-1.png)

我们会发现这个错误位于 ADBG 的方法下，这时只需打个补丁即可：
    
点Patch

![170830-13](http://ovefvi4g3.bkt.clouddn.com/170830-13-1.png)

找到 Fix ADBG Error 点一下，然后 Apply 应用即可，这时我们会发现再编译就没有错误了(警告可以不用管)，然后保存成aml文件

![170830-14](http://ovefvi4g3.bkt.clouddn.com/170830-14-1.png)

![170830-15](http://ovefvi4g3.bkt.clouddn.com/170830-15-1.png)

![170830-16](http://ovefvi4g3.bkt.clouddn.com/170830-16-1.png)

 Save 即可，其他 SSDT 文件也是一样的操作

## 修改完成
在修改完所有表单的错误并保存成aml格式后，将这些 aml 文件放到 /EFI/CLOVER/ACPI/patched 就可以了

# 完工


