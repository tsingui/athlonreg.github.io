---
title: How to patch Framebuffer change VRAM from 1536MB to 2048MB
copyright: true
date: 2018-03-29 17:22:57
categories: Hackintosh
description: 简单修改FB实现显存增加至2048MB修复某些花屏
tags: 
- 显存
- FB
- 花屏
- Framebuffer
---

## 简单修改FB实现显存增加至2048MB修复某些花屏
<!--more-->

## 前言：
本来不打算发这个帖子的，因为好多人觉得没有什么用，但前几天帮论坛好友阿林解决他`hd4600`花屏问题时，发现这个方法还是有一定作用的。之前在`10.12`区有坛友的`4600`部分区域出现花屏的情况，最后通过修改注入的`ig`来解决的，大家都知道，`4200 4400 4600`都是靠`FakeID`为`0x04128086`和`ig`为`0x0a260006`然后配合`FakePCIID`和`FakePCIID_HD_Graphics`两个`kext`来驱动的，大家也知道，一部分`4600`也可以用`0x04160000`而不需要`FakeID`注入来驱动（相应的不少`4400`也可以用`0x0a160000`而不需要`FakeID`来驱动），两种方法都可以驱动核显，但区别还是有的，最容易发现的就是显存了，第一种方法驱动后都是`1536m`，第二种则是`1024m`。而前面提到的`4600`部分区域花屏的案例则是用第二种方式来解决的，后来经过测试，发现通过对`framebuffer`进行`patch`以达到`2048m`的显存也可以解决这个问题，于是这个方法就被我记在心里了。后来在帮阿林解决了他的花屏问题后，决定还是把相关方法写出来，虽然没什么技术含量，但也能为景友提供一个思路。
废话就说到这，下面说方法:

## 开工

### 查看`FB`以及`ig`
首先，确定你当前加载的Framebuffer，终端执行以下命令

```
$ kextstat | grep -y AppleIntel
```

![163040bhnxihl6zjlv0uiv](http://ovefvi4g3.bkt.clouddn.com/163040bhnxihl6zjlv0uiv.png)

如图，看输出结果中带Framebuffer的就是我们需要的（haswell之前的是带FB的），图中我的就是AppleIntelFramebufferAzul然后执行以下命令查看当前使用的ig

```
$ ioreg -l | grep ig-platform-id
```

![163317lkkaa4c8k88h8gec](http://ovefvi4g3.bkt.clouddn.com/163317lkkaa4c8k88h8gec.png)

如图我的就是`0x0a260006`,有朋友不清楚，不是`0600260a`吗，下次一定要知道，这种`id`将每两位一组分组，然后从后往前排序，最后由于是十六进制，我们在最前面加上`0x`来表示，就得出了`0x0a260006`，这就是我们的`id`，当然了，后面步骤中用到的还是`0600260a`。

### 下载并安装`hexfiend`
我直接放链接了
链接:[https://pan.baidu.com/s/1EhkVv2eaUE1u_Gmp87arJw](https://pan.baidu.com/s/1EhkVv2eaUE1u_Gmp87arJw)  密码:lm1o

### 在`FB`中查找`ig`进行处理
然后，在`/System/Library/Extensions`下找到和第一步找出的`Frambuffer`同名`kext`，以我的为例，就是`AppleIntelFramebufferAzul.kext`,右键显示包内容，在`/Contents/MacOS`下将`kext`的同名文件拷贝到桌面，以我的为例就是`AppleIntelFramebufferAzul`。

右键此文件打开方式选我们刚才安装的`hexfiend`，如图

![165110qfihyri7ahijpxfi](http://ovefvi4g3.bkt.clouddn.com/165110qfihyri7ahijpxfi.png)

快捷键`command + F`调出搜索框，输入刚才在第一步找到的`ig`，回车搜索，找到后面紧跟`01030303`的那一串字符，如图

![165432j9e9ve5zw091q6mj](http://ovefvi4g3.bkt.clouddn.com/165432j9e9ve5zw091q6mj.png)

从搜索的`ig`后面第一串开始，到`00000060`结束，将这些字符串拷贝到一个文本文档，并八个数字一组，整理好，然后再复制一行，将第二行最后的`60`改为`80`，如图

![165830l1ji7ero3hez1js6](http://ovefvi4g3.bkt.clouddn.com/165830l1ji7ero3hez1js6.png)

第一串就是我们要做的`patch`的`Find`，第二串是`Replace`，而`Name`则是第一步中的`Framebuffer`名字，我这里就是`AppleIntelFramebufferAzul`，`Comment`就无所谓了，我写成`Change VRAM from 1536MB to 2048MB for HD4400`，这时我们的补丁就做好了。

![170205ia9i0jppida5jai5](http://ovefvi4g3.bkt.clouddn.com/170205ia9i0jppida5jai5.png)

最后将`patch`打到`config.plist`

![170356xpbiyid3del3byda](http://ovefvi4g3.bkt.clouddn.com/170356xpbiyid3del3byda.png)

然后保存重启，就会发现关于本机的显存从原来的`1536MB`变成了`2048MB`

![170543xxdf6b0wdrkkbh80](http://ovefvi4g3.bkt.clouddn.com/170543xxdf6b0wdrkkbh80.png)

如果没效果，可以尝试重建缓存。

## 帖子的最后，我将之前做的几个`patch`贴出来，大家可以尝试使用

> HD4200_4400_4600 Mobile

```
Name：           AppleIntelFramebufferAzul
Find：           01030303 00000002 00003001 00006000 00000060
Replace：        01030303 00000002 00003001 00009000 00000080
Comment：        1536MB -> 2048MB for HD4200_4400_4600 Mobile
```

> HD620 Mobile：

```
Name：           AppleIntelKBLGraphicsFramebuffer
Find：           01030303 00002002 00000000 00000060
Replace：        01030303 00002002 00000000 00000080 
Comment：        1536MB -> 2048MB for HD620 Mobile
```

> HD630 Mobile：

```
Name：           AppleIntelKBLGraphicsFramebuffer
Find：           01030303 00006002 00005001 00000060
Replace：        01030303 00006002 00005001 00000080
Comment：        1536MB -> 2048MB for HD630 Mobile
```

> HD520_530_540 Mobile：

```
Name：           AppleIntelSKLGraphicsFramebuffer
Find：           01030303 00002002 00005001 00000060
Replace：        01030303 00002002 00005001 00000080
Comment：        1536MB -> 2048MB for HD520_530_540 Mobile
```

> HD5500 Mobile：

```
Name：           AppleIntelBDWGraphicsFramebuffer 
find：           01030303 00002002 00005001 00000060
Replace：        01030303 00002002 00005001 00000080
Comment：        1536MB -> 2048MB for HD5500 Mobile
```


