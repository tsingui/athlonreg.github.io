---
title: Make a bootable install image to install macOS High Sierra 10.13.4
copyright: true
date: 2018-03-30 19:52:35
categories: Hackintosh
description: 制作可启动的安装镜像来安装macOS High Sierra 10.13.4
tags:
- image
- 10.13.4
- 镜像
---

## 制作可启动的安装镜像来安装macOS High Sierra 10.13.4
<!--more-->

## 前言
随着新的`macOS High Sierra 10.13.4`操作系统发布，很多盆友迫不及待的做了一个`.dmg`格式的压缩镜像以备用，但发现用`Apple`官方的方法制作出的镜像用`CLOVER`引导时是看不到安装镜像的，最后，在[黑果小兵](https://blog.daliansky.net)的帮助下，终于找到了解决方法。

## 教程开始
### 下载`app`镜像
首先去`AppleStore`下载原版的`app`镜像[https://itunes.apple.com/cn/app/macos-high-sierra/id1246284741?l=en&mt=12](https://itunes.apple.com/cn/app/macos-high-sierra/id1246284741?l=en&mt=12)

### 制作镜像
打开磁盘工具

![Snip20180330_1](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_1.png)

点击顶部状态栏`File -> New Image -> Blank Image`

![Snip20180330_11](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_11.png)

如上图写一个好听的名字，大小大于`app`镜像的大小，我直接大一点，写了`6.8GB`，选好保存位置，然后点击`save`。

打开终端，输入`sudo`空格，找到下载好的`app`镜像(一般在应用程序里)，右键显示包内容，依次打开`/Contents/Resources`，将`createinstallmedia`拖到终端，输入空格，然后输入`--volume`，再空格，然后将准备好的安装磁盘，拖动至终端，再空格，接着输入`--applicationpath`，空格，将`app`镜像拖放到终端，空格，输入`--nointeraction`，回车，输入密码，再回车，等待镜像写入完成。

如图

![Snip20180330_3](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_3.png)

### 进行镜像修复
然后下载附件，这个是我从10.13.3的镜像中提取的，13.4缺少这个启动的必要文件。
链接:[https://pan.baidu.com/s/14R8rEk7PK9exu0lDvPh7jA](https://pan.baidu.com/s/14R8rEk7PK9exu0lDvPh7jA)  密码:fcwt，将下载的压缩包解压，按住`Command Shift .`显示隐藏文件，即可看到里面的`.IA`开头的一个目录和一个文件，将这两个文件拷贝到刚才做的安装盘内。

拷贝之前

![Snip20180330_4](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_4.png)

拷贝之后

![Snip20180330_5](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_5.png)

右键`.IABootFilesSystemVersion.plist`用`plist`编辑器打开，例如`Xcode`、`Plist Edit`

做以下修改

![Snip20180330_6](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_6.png)

保存退出

打开`/System/Library/CoreServices`

![Snip20180330_8](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_8.png)

拷贝图中选中项，将其拷贝到`/.IABootFiles/`目录下，然后打开`/System/Library/PrelinkedKernels/`，将下图选中的文件也拷贝到`/.IABootFiles/`目录下

![Snip20180330_9](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_9.png)

最后`/.IABootFiles/`目录下内容如下

![Snip20180330_10](http://ovefvi4g3.bkt.clouddn.com/Snip20180330_10.png)

这时重启进入`CLOVER`引导界面就可以看到安装盘了。


