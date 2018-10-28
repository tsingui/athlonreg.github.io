---
title: 黑苹果声卡 cx20751/2 驱动方法
abbrlink: 942dd3f5
copyright: true
date: 2018-05-02 23:10:57
categories: 黑苹果
description: 黑苹果 cx20751/2 驱动方法
tags: 
- cx20751
- cx20752
- ALCPlugFix
photos:
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/38/b57d916d38a521cd1b26f81426b225.jpg
---

### 准备工作
首先从`linux`提取`codec`，然后整理`codec`提取节点数据，参考我的另一篇帖子[http://blog.athlonreg.top/Driver-audio-for-hackintosh.html](http://blog.athlonreg.top/Driver-audio-for-hackintosh.html)

### 对比节点数据
这里拿我的`CX20751`为例，`codec`整理的数据如下

![2017-11-06-06](http://ovefvi4g3.bkt.clouddn.com/2017-11-06-06.png)

看其中的`Line in`节点，即`Mic at Ext`，我的是`0x19`，那么我的`AppleALC`就需要注入`Layout-ID`为`28`，如果你的`CX20751/2`提取的数据中此节点是`0x18`，就需要注入`Layout-ID`为`3`。

### 注入`Layout-ID`
#### `DSDT`方式
挂载你的`ESP`分区，打开`DSDT`，打上声卡`Layout-ID`注入补丁

![](http://ovefvi4g3.bkt.clouddn.com/15252748423044.jpg)

如图，`3`和`12`都可以，我拿`12`为例，点击此补丁，将如下图中的`12`改为`28`，然后点击`Apply`。

![](http://ovefvi4g3.bkt.clouddn.com/15253241498583.jpg)

如果你的需要注入`3`，只需直接打上那个为`3`的补丁即可

#### `Hotpatch`方式
将图中三个`SSDT`放入`/EFI/CLOVER/ACPI/patched`，三个文件分别做以下修改，我的是`28`改为`0x1C`，如果你的是`3`，则改为`0x03`。

![](http://ovefvi4g3.bkt.clouddn.com/15252751019326.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15252751161237.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15252751319904.jpg)

然后在`config.plist`中勾选以下选项

![](http://ovefvi4g3.bkt.clouddn.com/15252751877585.jpg)

#### `config`方式
同样勾选以下选项

![](http://ovefvi4g3.bkt.clouddn.com/15252751877585.jpg)

然后注入`ID`，此处根据前面的`Layout-ID`决定注入`3`还是`28`

![](http://ovefvi4g3.bkt.clouddn.com/15252754357190.jpg)

### 放驱动
将`AppleALC`、`Lilu`、`CodecCommander`三个驱动放到`/EFI/CLOVER/kexts/Other`

[https://github.com/vit9696/AppleALC/releases](https://github.com/vit9696/AppleALC/releases)
[https://github.com/vit9696/Lilu/releases](https://github.com/vit9696/Lilu/releases)
[https://bitbucket.org/RehabMan/os-x-eapd-codec-commander/downloads/](https://bitbucket.org/RehabMan/os-x-eapd-codec-commander/downloads/)

**注意三个驱动都用`Release`里面的**

### 放`SSDT`
打开终端执行

```
$ git clone https://github.com/RehabMan/OS-X-Clover-Laptop-Config
```

利用`MaciASL`打开`SSDT-CX20752.dsl`，将其另存为`SSDT-CX20752.aml`。保存至`/EFI/CLOVER/ACPI/patched`,如果你正在使用`SortedOrder`，则将其加入进去。

然后保存全部工作重启。

### 声卡输入修复
若遇到声卡内建输入或耳机线路输入无电平的情况，请继续以下步骤。

下载`ALCPlugFix for AppleALC.zip`

[https://github.com/athlonreg/ASUS-F455LD-i5-4210u](https://github.com/athlonreg/ASUS-F455LD-i5-4210u)

打开终端执行

```
$ git clone https://github.com/athlonreg/ASUS-F455LD-i5-4210u
```

下载完成后，如果你的`Layout-ID`是`3`，则将其中的`ALCPlugFix-LayoutID=3.zip`解压至桌面，若为`28`则将其中的`ALCPlugFix-LayoutID=28.zip`解压至桌面，执行

```
$ cd ~/Desktop/ALCPlugFix/alc_fix 
$ chmod +x install.sh 
$ ./install.sh 
```

然后根据提示输入密码回车。最后保存重启即可。



