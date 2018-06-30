---
title: 集成 CLOVER 引导的黑苹果原版镜像制作教程
date: 2018-06-14 10:27:33
categories: Hackintosh
description: 制作集成CLOVER引导的黑苹果原版镜像
tags:
- dmg
- 原版镜像
- 黑苹果镜像
---

# 准备工作
- `macOS`环境(虚拟机实机均可)
- `Clover`的`pkg`安装包(可以去我`Github`找，保证源码最新，[传送门](https://github.com/athlonreg/Clover_Build/tree/master/build))
- `app`格式的原版镜像(可以去`App Store`下载)

# 制作过程
- 新建空白镜像
打开终端，状态栏新建一个空白磁盘，名字任意，不要有中文，大小我们这里设置为`6.8G`，格式为`HFS`，即`mac os`扩展日志式，不要太小，也不建议太大，将其保存至桌面。示例中我做的是`10.14`的镜像，名字用`macOS Mojave 10.14 beta 1 with Clover 4539 18A293u`，当然这个看自己心情。

![](http://ovefvi4g3.bkt.clouddn.com/15289438539084.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15289439526117.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15289440105315.jpg)

然后你就发现桌面会多出一个`dmg`文件和挂载后的一个磁盘。

![](http://ovefvi4g3.bkt.clouddn.com/15289441649195.jpg)

**至此空白镜像新建完成**

- 利用命令写入`app`镜像到空白镜像

打开终端，输入命令来将镜像写进刚才我们新建的那个空盘，命令的大体格式如下：

```
$ sudo createinstallmedia制作工具 --volume 空盘 –applicationpath app镜像 --nointeraction
```

> 从`macOS Mojave`开始，`--applicationpath`参数被抛弃，因此，`10.14`以后的写入命令为下面的

```bash
$ sudo createinstallmedia制作工具 --volume 空盘 --nointeraction
```

> 由于命令较长，在此稍作说明，方便朋友们理解，以支持更为广泛的命令为例，首先输入`sudo `后边跟一个空格，然后找到`app`镜像，右键显示包内容，依次进入`/Contents/Resources`,找到一个名为`createinstallmedia`的文件，将其拖到终端，然后空格输入`--volume`再空格，然后将磁盘工具新建的那个空白镜像自动挂载后的空磁盘拖进来，空格输入`--applicationpath`，再空格将整个`app`镜像拖进来，空格输入`--nointeraction`,最后空格回车输入密码再回车，静静等待写入完成即可。

![](http://ovefvi4g3.bkt.clouddn.com/15289444930934.jpg)

这时你会发现桌面的那个空磁盘现在已经有内容了，而且也有了自己的图标

![](http://ovefvi4g3.bkt.clouddn.com/15289445980969.jpg)

**到这里镜像已经写入完成**

- 集成四叶草引导

> 写入完成之后，如果你不打算集成四叶草，请略过这一步看下一步。

找到准备好的`pkg`格式的`CLOVER`安装包，双击打开

![](http://ovefvi4g3.bkt.clouddn.com/15289448692805.jpg)

按继续

![](http://ovefvi4g3.bkt.clouddn.com/15289449004194.jpg)

再次按继续

![](http://ovefvi4g3.bkt.clouddn.com/15289449130600.jpg)

选择更改安装位置，选择做好的安装盘，然后选择继续

![](http://ovefvi4g3.bkt.clouddn.com/15289449445201.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15289449926727.jpg)

选择自定，弹出下面的对话框

![](http://ovefvi4g3.bkt.clouddn.com/15289452242278.jpg)

按照下面勾选的方式进行择选选项，然后选择安装，输入密码

![](http://ovefvi4g3.bkt.clouddn.com/15289451488498.jpg)

安装完成后选择关闭

![](http://ovefvi4g3.bkt.clouddn.com/15289452782292.jpg)

这时我们会发现桌面多出了一个`EFI`磁盘，这就是我们安装`CLOVER`后自动挂载的引导盘

![](http://ovefvi4g3.bkt.clouddn.com/15289457361369.jpg)

为了让我们的镜像更加干净，打开桌面上挂载的镜像磁盘，删除里面的`EFI-Backups`

![](http://ovefvi4g3.bkt.clouddn.com/15289454218633.jpg)

**至此集成`CLOVER`完成**

- 定制四叶草引导

上面我们已经集成好了`CLOVER`引导，但是现在集成的`CLOVER`是杂乱的没有意义的，我们需要进行定制，这里我可以将我本机正在用的`CLOVER`引导定制进去，以达到我使最终镜像成为我本机专用的写入`U`盘后直接引导可以完美的镜像

打开桌面的自动挂载的`EFI`磁盘，依次打开`EFI -> CLOVER`

![](http://ovefvi4g3.bkt.clouddn.com/15289457803375.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15289457872379.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15289457949944.jpg)

将我自己的引导的必要文件导入进去，有`ACPI`、`kexts`、`config.plist`，然后将一些没用的文件删除以精简我们的镜像，例如`drivers64`、`OEM`、`kexts`下除`Other`之外的其他文件夹和`themes`下的除去我们需要的主题之外的其他文件，经过以上所述的处理之后，我的`CLOVER`定制完成，如下

![](http://ovefvi4g3.bkt.clouddn.com/15289461768241.jpg)

**至此`CLOVER`定制完成**

- 推出镜像盘

`CLOVER`定制完成我们需要将镜像磁盘推出以压缩镜像。右键桌面的那两个挂载后的磁盘，选择推出

![](http://ovefvi4g3.bkt.clouddn.com/15289462969571.jpg)

**至此推出镜像盘完成**

- 转换压缩镜像

到了最后一步，这时我们的镜像其实已经做完了，只是它`个头`很大，我们需要将其压缩一下，让它和应用商店下载的`app`格式的镜像大小相近。打开磁盘工具，状态栏依次选择`映像-> 转换`

![](http://ovefvi4g3.bkt.clouddn.com/15289465213040.jpg)

弹出的对话框选择我们桌面的那个`大`镜像，点击选取

![](http://ovefvi4g3.bkt.clouddn.com/15289465707057.jpg)

然后弹出存储选项的对话框

![](http://ovefvi4g3.bkt.clouddn.com/15289466327715.jpg)

这里`存储为`后面的名字和刚开始起的名字一致好了，位置选择`文稿`，这个看自己心情吧。

![](http://ovefvi4g3.bkt.clouddn.com/15289467382397.jpg)

然后点击转换

![](http://ovefvi4g3.bkt.clouddn.com/15289467783389.jpg)

然后静静等待，直到完成。

![](http://ovefvi4g3.bkt.clouddn.com/15289468624281.jpg)

转换完成后，点击完成退出磁盘工具，文稿中会出现一个和你当初下载的app原版镜像大小差不多的`dmg`文件，这就是我们最后需要的原版镜像了。

![](http://ovefvi4g3.bkt.clouddn.com/15289469150367.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15289469712986.jpg)

将此镜像拿到`windows`电脑上，用`Transmac`写进`U`盘，由于我做的是集成我自己引导专用的`CLOBER`，所以重启就可以愉快的黑苹果咯。

# 视频链接
> 为了方便大家理解，我将过程做了一个视频，大家可以简单看看

```
链接:https://pan.baidu.com/s/1g0J8zxqut4S2JYxtJV8IXw  密码:vcjo
```

# 关于打赏
码字不易，你们的支持是我分享和创作的动力，欢迎打赏。


