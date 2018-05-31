---
title: Install macOS on laptop
copyright: true
date: 2017-12-12 00:28:15
categories: Hackintosh
description: Install macOS on laptop 原版黑苹果安装参考贴
tags:
- Hacintosh
- 黑苹果
---

## struts2中s:iterator 标签的使用详解
<!--more-->

### 前言
Clover支持两种启动方式，启动过程如下：

- 基于`BIOS`的电脑（老式主板）
BIOS -> MBR -> PBR -> boot -> CLOVERX64.efi -> OSLoader

- 基于`UEFI`的电脑（新式主板）
UEFI -> CLOVERX64.efi -> OSLoader

对于支持`UEFI`的机器，我们通常用`CLOVER`引导原版安装，这种方式最大的优点就是有恢复分区可以正常升级，当然前提要把引导做好。

### 前期知识储备
#### `CLOVER`的目录结构
`CLOVER`正常工作需要的完整目录包括`config.plist`、`CLOVERX64.efi`两个文件以及`ACPI`、`drivers64UEFI`、`kexts`、和`themes`几个目录，如图所示：

![2018-02-12-01](http://ovefvi4g3.bkt.clouddn.com/2018-02-12-01.png)

其中，`config.plist`是最核心的文件----配置文件，`CLOVER`所实现的多数功能都是通过这个文件进行配置的，对其进行配置修改的最好用的工具就是`Clover Configurator`，主页面如下：

![2018-02-12-02](http://ovefvi4g3.bkt.clouddn.com/2018-02-12-02.png)

详细的配置方法下面会有介绍。

另外一个文件是`CLOVERX64.efi`，这个文件用以启动`CLOVER`引导，通过`EasyUEFI`或者`BIOS`对启动项进行添加操作时，就是指向的这个文件。

`ACPI`是用以存放机器`ACPI`表单的，全称是"高级配置和电源管理接口"`(Advanced Configuration and Power Interface)`，其子目录由`origin`、`patched`、`WINDOWS`构成，其中`origin`用以保存通过在`CLOVER`引导界面按`F4`或`Fn F4`提取的原始表单，此目录的所有表文件是不加载的，需要对其进行编译得到`.dsl`文件，然后对其进行修改拍错，最后保存成`.aml`文件保存至`patched`目录才会在启动时加载，而`WINDOWS`目录则可以忽略不计。在黑果中，我们用到的表单文件只有`SSDT`和`DSDT`，其中`DSDT`主要是对各种设备的描述，而`SSDT`则主要是用以实现某个功能。

`drivers64UEFI`是由各种`EFI`驱动组成，在笔记本黑果需要用到的有`FSInject-64.efi`、`HFSPlus-64.efi`、`OsxAptioFixDrv-64.efi`、`APFS.efi`以及`OsxFatBinaryDrv-64.efi`，在新版`CLOVER`中只需要`FSInject-64.efi`、`HFSPlus-64.efi`、`OsxAptioFixDrv-64.efi`、以及`APFS.efi`

`kexts`主要用于存储各种驱动(`OS X`称为内核扩展)

`themes`用以存储`CLOVER`引导界面的主题

#### 根据机器配置定制`kext`
`kext`在`EFI`的配置中是相当重要的，好的`kext`配置可以弥补`config`的不足，不好的`kext`配置也会让本应完美的`config`发挥不出作用。

`FakeSMC.kext`:`FakeSMC`是现今的⿊黑苹果过程中唯⼀一的”必要性”内核扩展程序。对于⿊黑苹果有着⽆与伦比的重要性，但是很多⼈并不知道`FakeSMC`为什么重要，只是知道必须有它才⾏行，。简⽽而⾔言之就是: `FakeSMC`是⽤用于将`PC`主板上的各种控制芯⽚片伪装成Mac独有的硬件控制芯片`SMC`以骗过系统从⽽而是系统正常启动的⼀一个内核扩展(其实很复杂,这⾥里不多说了)。在系统启动的阶段，`FakeSMC`负责告知系统有关主板上`SMC`芯⽚片(伪装出来的)的各种加密信息，欺骗系统。也就是说呢，无论你笔记本是什么配置，此驱动是必须的。

`ApplePS2SmartTouchPad.kext`、`VoodooI2C.kext`和`VoodooPS2Controller.kext`:此驱动用以驱动键盘鼠标以及触摸板，两者选择一个即可，两者区别就是适用的类型不一样，有`PS/2`、`Synaptics`、`alps`、`i2c`等等，其中`Synaptics`、`alps`用`ApplePS2SmartTouchPad.kext`适配性好一些，`VoodooI2C.kext`比较麻烦，仅适用于`i2c`触摸板。具体怎么确定走的总线类型，大家参考百度就好了，这里就不再赘述。

`FakePCIID.kext`:这个kext的目的是与`IOPCIDevice`设备建立连接，以便当另一个驱动程序连接到同一设备时，它可以提供备用的`PCI ID`。也就是说，如果用到`Fake-PCI-ID`中的其他任何`kext`的话，此驱动都是必要的。

`FakePCIID_Intel_HD_Graphics.kext`:此驱动主要用于核显`HD4200 HD4400 HD4600 P4600`、`Iris 540 Iris 550 Iris Pro 580`、`HD510 HD515 HD520 HD530 P530`（多数530不需要这个）、`P4000`、`P6300 - 162a`、`UHD620 KabyLake-R `、`UHD630 CoffeeLake`。

`FakePCIID_Intel_HDMI_Audio.kext`:其目的是为不支持的`HDAU`提供支持(通常称为`B0D3`，但需要将其重命名为`HDAU`，以满足`Apple`的期望值)在`Haswell`以上的系统中提供`HDMI-audio`的设备。

`FakePCIID_BCM57XX_as_BCM57765.kext`:这个`kext`将与众多不受支持的`BCM57XX`以太网设备建立连接，以使本机驱动程序为兼容的更广泛的`BCM`以太网芯片组工作。

`FakePCIID_Intel_GbX.kext`:这个`kext`将与一些`Intel`以太网设备建立连接，以使基于`Intel`芯片组的驱动程序工作。

`FakePCIID_XHCIMux.kext`:将会连接到8086:1e31, 8086:9c31, 8086:9cb1, 8086:9c31, 8086:8cb1这个注入器是正常的`FakePCIID`任务的一部分。它实际上并没有伪造任何`PCI id`。相反，它将某些值强加于`Intel XHCI USB3`控制器上的`XUSB2PR` (PCI配置偏移`0xD0`)。其效果是将任何`USB2`设备与`XHC`端口上的`USB2`引脚连接到`EHC1`。换句话说，使用USB2驱动而不是`USB3`驱动程序(`AppleUSBEHCI vs AppleUSBXHCI`)处理`USB2`设备。

`FakePCIID_AR9280_as_AR946x`:这是`FakePCIID.kext`的特殊应用，是在一个`AR9280`被重新命名为其他设备的情况下使用的。例如，在联想`u430`中，将一个`AR9280`作为`AR946x`重新命名是很有用的，因为该设备可以被`BIOS`白名单所允许，而`AR9280`不是。通过使用`FakePCIID`，我们可以将`PCI id`重新映射回`AR9280` (168c:002a)，即使该设备本身报告的是168c:0034。

`FakePCIID_Broadcom_WiFi.kext`:这个`kext`将连接到14e4:43b1, 14e4:4357, 14e4:4331, 14e4:4353, 14e4:432b, 14e4 . 432b, 14e4:43a3，或14e4:43a0。以及106b:4e, 14e4:4312, 14e4:4313, 14e4:4318, 14e4:431a, 14e4:4320, 14e4:4324, 14e4:4324, 14e4:4328, 14e4:432d。
最初是为`BCM94352Z`创建的，这个特殊的FakePCIID应用程序。在使用多种支持的Broadcom WiFi设备时，kext被用来模拟真正的`Apple Airport`(苹果无线网卡)。

`ACPIBatteryManager.kext`:用以使笔记本正确显示电量，但通常需要配合`DSDT`的`patch`才能发挥作用。

`VoodooHDA.kext`:万能声卡驱动，用以禁用`AppleHDA`来驱动声卡。

`AppleALC.kext`:通过对`AppleHDA`的动态`patch`实现对`AppleHDA`的完整加载。

`Lilu.kext`:一个开放源码的内核扩展，为macOS系统提供了一个任意的kext、库和程序补丁的平台。

`IntelGraphicsDVMTFixup.kext`:修复因`BIOS`显存分配不足造成的`KP`。建议`broadwell+`平台使用。

`IntelGraphicsFixup.kext`:动态修复核显的各种问题(例如腾讯视频死机，开机二阶段花屏等)，建议`Haswell+`平台使用。

`CoreDisplayFixup.kext`:为不受支持的4K机器(非`Iris`)开启高分辨率支持。

`AzulPatcher4600.kext`:针对`HD4600`的额外修复，仅推荐`HD4600`使用。

`HibernationFixup.kext`:修复睡眠，以支持某些机器在3和28休眠模式下的正常休眠。

`NvidiaGraphicsFixup.kext`:修复某些n卡的黑屏。

`WhateverGreen.kext`:用以驱动A卡。

`RealtekRTL8111.kext`:用以驱动`RealtekRTL8111.kext`以太网卡设备。

`AppleIGB.kext`、`IntelMausiEthernet.kext`:用以驱动`Intel`板载网卡设备。

#### 根据机器配置定制`config`
Clover 可以根据硬件进行自动配置，但是自动配置组件并不总是完美的。这也是保留用户可以自定义配置的原因。用户可以修改配置文件config.plist中的配置参数，或者基于GUI的配置界面进行修改配置。配置文件是基于XML的，可以以文本文件来处理。它可以用纯文本编辑器进行编辑，也可以用plist编辑器进行编辑，如PlistEdit。配置文件 (config.plist) 必须放在EFI/CLOVER目录下。

这里遵循一个原则，尽可能简单的设置`config`，不知道具体作用的就让他空着好了，如果你不知道参数的需求值是什么，就从配置文件中排除！不要用没有值的参数。

正所谓前人种树，后人乘凉，很多黑果的热心朋友已经为我们做好了教程，这里我直接拿来用了。

- ACPI
![2018032502](http://ovefvi4g3.bkt.clouddn.com/2018032502.png)

![2018032503](http://ovefvi4g3.bkt.clouddn.com/2018032503.png)

- BOOT
![2018032504](http://ovefvi4g3.bkt.clouddn.com/2018032504.png)

- CPU
![2018032505](http://ovefvi4g3.bkt.clouddn.com/2018032505.png)

- Device
![2018032506](http://ovefvi4g3.bkt.clouddn.com/2018032506.png)

- Disable Drivers
![2018032507](http://ovefvi4g3.bkt.clouddn.com/2018032507.png)

- GUI
![2018032508](http://ovefvi4g3.bkt.clouddn.com/2018032508.png)

- Graphics
![2018032509](http://ovefvi4g3.bkt.clouddn.com/2018032509.png)

- Kernel and Kext Patches
![2018032510](http://ovefvi4g3.bkt.clouddn.com/2018032510.png)

- Rt Variables
![2018032511](http://ovefvi4g3.bkt.clouddn.com/2018032511.png)

- SMBIOS
![2018032512](http://ovefvi4g3.bkt.clouddn.com/2018032512.png)

- System Parameters
![2018032513](http://ovefvi4g3.bkt.clouddn.com/2018032513.png)

不敢下手的没关系，我给一个最简单的模板，全按这个来就足可以装上最常见的。
![201801](http://ovefvi4g3.bkt.clouddn.com/201801.png)

![201802](http://ovefvi4g3.bkt.clouddn.com/201802.png)

![Xnip2018-03-84_21-47-09](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-47-09.jpg)

![Xnip2018-03-84_21-48-34](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-48-34.jpg)

![Xnip2018-03-84_21-53-09](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-53-09.jpg)

![Xnip2018-03-84_21-54-50](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-54-50.jpg)

![Xnip2018-03-84_21-56-51](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-56-51.jpg)

![Xnip2018-03-84_21-57-48](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-57-48.jpg)

![Xnip2018-03-84_21-58-35](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-58-35.jpg)

![Xnip2018-03-84_21-59-32](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_21-59-32.jpg)

![Xnip2018-03-84_22-00-18](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-03-84_22-00-18.jpg)

敢下手了，没有`Mac`环境？没关系，送你们在线编辑器，点这里[传送门](http://cloudclovereditor.altervista.org/cce/index.php)。里面目前加入了一些常见的配置，帮你完成一部分工作。

#### 了解`drivers64UEFI`各个`.EFI`文件的作用，精简引导
`BIOS`启动过程中要用到`drivers32`或`drivers64`目录，`UEFI`启动过程中则使用`drivers64UEFI`目录。它们的内容会根据配置和`BIOS版本`而有所不同。

必须要提的一点是这些驱动程序只在`bootloader`运行时有效，不会影响最终启动的操作系统。

至于到底要使用哪些驱动程序由用户来决定。

- NTFS.efi

`NTFS`文件系统驱动程序。用于启动`Windows EFI`系统。

- HFSPlus.efi
`HFS+`文件系统驱动程序。这个驱动对于`10.13`之前的系统版本来启动`Mac OS X`是必须的。

- APFS.efi
`APFS`文件系统驱动程序。这个驱动对于在`10.13`的系统版本通过`APFS`装的黑果来启动`Mac OS X`是必须的。

- VBoxHFS.efi
`HFSPlus.efi`的替代品，性能要差一点。

- VBoxExt2.efi
`EXT2/3`文件系统驱动。用于启动`Linux EFI`系统。

- VBoxExt4.efi
`EXT4`文件系统驱动。用于启动`Linux EFI`系统。

- FSInject.efi
控制文件系统注入`kext`到系统的可能性。

- PartitionDxe.efi
已经存在于在`CloverEFI`和`UEFI`中，但没有为`Apple`分区优化，也没有为`GPT/MBR`优化。

- OsxFatBinaryDrv.efi
允许加载`FAT`模块比如`boot.efi`。

- OsxAptioFixDrv.efi
修复`AMI Aptio EFI`内存映射。如果没有就不能启动`OS X`。

- OswLowMemFix.efi
是`OsxAptioFixDrv`的简化版。两个不能同时使用。

- DataHubDxe.efi
已经存在于在`CloverUEFI`中。建议还是使用它，不会产生冲突。

- CsmVideoDxe.efi
比`UEFI`里提供更多分辨率的显卡驱动。

看了这么多，千万不要崩溃，我告诉大家一个经验，一般`Drivers64UEFI`目录只需要下面几个`.EFI`驱动就够了。

![2018032501](http://ovefvi4g3.bkt.clouddn.com/2018032501.png)

#### 进攻`ACPI`，完美黑苹果(进阶篇)
论坛贡献会员[daxuexinsheng](http://i.pcbeta.com/space-uid-3322572.html)已经翻译了`RehabMan`的`DSDT`教程，可以说是非常详细，可以直接参考:[使用补丁修改DSDT/SSDT](http://i.pcbeta.com/space-uid-3322572.html)，以及[RehabMan的原贴](https://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/)。

如果你喜欢`hotpatch`，可以参考我的翻译帖[Clover-ACPI-hotpatch](https://blog.iamzhl.top/Clover-ACPI-hotpatch.html)，不过由于我太懒还没翻译完哈哈。当然还是推荐[RehabMan的原贴](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)。

### 准备工作
- 集成`CLOVER`的原版镜像
> 链接:https://pan.baidu.com/s/1gfTmRj9  密码:s3dv
- `Transmac`
> 链接:https://pan.baidu.com/s/1oAn79Zc  密码:yafn
- `easyUEFI`
> 链接:https://pan.baidu.com/s/1nwqbnMp  密码:gxoc
- `Clover Configurator`四叶草助手
> 链接:https://pan.baidu.com/s/1ht2wFQW  密码:tbce
- `DiskGenius`
> 链接:https://pan.baidu.com/s/1cVyULo  密码:pfrm
- 鲁大师/`AIDA64`(推荐)/也可以用设备管理器
> 自行度娘

### 安装步骤
#### 利用`Transmac`将原版镜像写入u盘
打开`TransMac`,右键选择欲制作的`USB`盘符，选择Restore with Disk Image,选择下载好的dmg文件,会弹出窗口,提示将要格式化USB磁盘,点击OK按钮继续，耐心等待写盘的完成。写入完成，若弹出对话框提示将其格式化，点击取消。
![TransMac1](http://ovefvi4g3.bkt.clouddn.com/TransMac1.png)

![TransMac2](http://ovefvi4g3.bkt.clouddn.com/TransMac2.png)

![TransMac3](http://ovefvi4g3.bkt.clouddn.com/TransMac3.png)

![TransMac4](http://ovefvi4g3.bkt.clouddn.com/TransMac4.png)


#### 利用鲁大师等软件查看自己机器的配置信息，来定制`config`和需要用的`kext`
这一步想必不用我多说，大家利用鲁大师或者`AIDA64`看一下自己配置好了。有一点提示，尽量在安装过程中不考虑各种`kext`，尽量用少的驱动去安装，安装完成后再完善驱动，这样可以减少许多安装中的错误，也利于排错，但需要注意的必备的驱动一定要放，例如`FakeSMC.kext`、还有就是键盘驱动。当然老鸟无所谓了，直接把需要用到的都放上就`OK`了。以我自己机器为例，配置如下：

```
主板       Asus X455LD Intel Haswell-ULT - Lynx Point-LP

独立显卡    Nvidia GeForce 820M 2G 

核心显卡    HD4400

声卡        Realtek @ Intel Lynx Point-LP  High Definition Audio (CX20751)

以太网卡    Realtek RTL8168/8111/8112 Gigabit Ethernet Controller / Asus

无线网卡    Atheros AR956X
```

按照上面的驱动简要说明，我以太网卡是`RTL8111`，那么需要`RTL8111.kext`、核心显卡是`HD4400`，就需要`FakePCIID.kext`、`FakePCIID_Intel_HD_Graphics.kext`，声卡比较麻烦，暂时不考虑，无线网卡是`Atheros AR956X`，那么我需要`ATH9KFixup.kext`，又要依赖`Lilu.kext`，所以需要`Lilu.kext`，四代低压机器，我需要`IntelGraphicsFixup.kext`来解决腾讯视频死机的问题，所以放上这个。暂时只考虑这些驱动吧，下面就进入安装阶段。

#### 重启利用`U`盘启动选择安装盘
开机按`esc`键进入启动项列表，不同厂商热键不同，参考下图：
![BIOS](http://ovefvi4g3.bkt.clouddn.com/BIOS.JPG)

选择`U`盘进入，这里就不介绍太多了，大家玩黑果的想必对`BIOS`不会陌生，不过需要注意的是需要将`BIOS`中的安全启动关掉。

接下来就会进入`CLOVER`引导界面
![XiaoMiCloverboot](http://ovefvi4g3.bkt.clouddn.com/XiaoMiCloverboot.png)

通过键盘方向键选中`Boot OS X Install from ***`，`***`代表你的镜像名字，然后回车。
![ParallelsPicture](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture.png)


等待进入安装界面。
![ParallelsPicture1](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture1.png)

这里选择自己擅长的语言好啦。

#### 磁盘工具分区
选择磁盘工具，并继续
![ParallelsPicture0](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture0.png)

选择`显示所有设备`
![ParallelsPicture2](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture2.png)

选择SSD Media,点击抹掉按钮,选择默认的`Mac OS`扩展(日志型)，在`10.13`中如果装在`SSD`上，也可以选择`APFS`,将名称修改为`Macintosh HD`（名字随意啦，自己喜欢就好，但要是英文）,点击抹掉按钮，抹掉完成后，点击完成按钮。
![ParallelsPicture7](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture7.png)

然后退出磁盘工具，到这里，磁盘工具的动作就已经结束了。

#### 退出磁盘工具，选择安装`macos`选中刚才抹掉的分区开始安装
选择安装`macOS`，并继续
![ParallelsPicture8](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture8.png)

接下来按照提示一步一步来就好了，有一步需要注意的就是选择安装分区时，选择自己之前抹掉的那个分区。
![ParallelsPicture 14](http://ovefvi4g3.bkt.clouddn.com/ParallelsPicture 14.png)

接下来静静等待，会有一次自动重启，依然用`U`盘启动，注意这次会在引导界面多出一个图标，选择除第一次选的图标外的另一个图标。然后继续等待
![](http://ovefvi4g3.bkt.clouddn.com/15218990390224.png)

系统安装完成后,重启进入系统设置向导，接下来根据下面的图一步一步设置就好了
![](http://ovefvi4g3.bkt.clouddn.com/15218990840183.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218990903045.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218990970841.png)

这里选择现在不传输任何信息
![](http://ovefvi4g3.bkt.clouddn.com/15218991032937.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991134189.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991182539.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991276552.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991350935.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991452868.png)

这里注意，一定不要选择加密！！！
![](http://ovefvi4g3.bkt.clouddn.com/15218991526744.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991591740.png)

![](http://ovefvi4g3.bkt.clouddn.com/15218991634647.png)

### 转移`CLOVER`到硬盘`ESP`，摆脱`U`盘引导
这里用到前期准备的`EasyUEFI`，在`Windows`下安装打开此软件，添加`CLOVER`启动项，并置顶。具体操作参考：[黑苹果安装从0开始----clover优盘引导改硬盘引导篇](http://bbs.pcbeta.com/viewthread-1683571-1-1.html)

### 后期的驱动安装以及优化
#### 屏蔽无用的独显降低温度
参考我之前的帖子：[Disable the discrete GPU in laptop](https://blog.iamzhl.top/Disable-the-discrete-GPU-in-laptop.html)

#### 摆脱万能声卡，利用`AppleALC`加载原生声卡
参考我之前的帖子：[Driver-audio-for-hackintosh](https://blog.iamzhl.top/Driver-audio-for-hackintosh.html)
还有这个帖子：[自己动手用上AppleALC，使用原生AppleHDA](http://bbs.pcbeta.com/forum.php?mod=viewthread&tid=1763452&highlight=AppleALC)

#### 通过对`DSDT`打补丁完善电池显示
参考`pcbeta`[daxuexinsheng的帖子](http://bbs.pcbeta.com/viewthread-1595139-1-1.html)
`tonymacx86`[RehabMan的帖子](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)

#### 加载`x86`实现变频和原生电源管理，完善节能器信息
- 对于`Haswell`以及`Broadwell`平台，利用`ssdtPRGen`生成`SSDT`，在`config`中`drop`掉`CpuPm`和`Cpu0Ist`两个表，并利用`FakeSMC`或`DSDT`或`hotpatch`加载`AppleLPC`
- 对于`Skylake`及以上平台，选择支持`HWP`的合适的机型，并勾选`HWPEnable`。

#### 注入`HiDPI`和显示器信息完善唤醒后的花屏、闪屏、撕裂屏问题
参考：[macOS Sierra 10.12下 开启HiDPI 傻瓜式开启教程](http://bbs.pcbeta.com/forum.php?mod=viewthread&tid=1722308&highlight=HIDPI)

### 写在最后
本帖多处引用现成帖子，只是将整个流程做个陈述，意在整理思路，以便大家更好地理解实践。本人水平有限，帖子中的不正确之处希望大家积极批评指出，一起完善。

楼主真的是懒到蜕皮(手动滑稽哈哈)帖子中图片很多是出自黑果小兵的博客：[macOS安装教程兼小米Pro安装过程记录](https://blog.daliansky.net/MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records.html)。

感谢各位黑果前辈的好帖子，引用太多，文中也有说明，就不一一列出了。

如果你在帖子中有任何不明白的地方，欢迎加入`Hackintosh Club`（群号580864366），一起探讨，当然啦，此群只为讨论技术，伸手党不要进来哈，只接受有些技术的，进群会有一段时间的考核哦。

![1A0A34E6-D9B0-497B-885E-71C65EE59AE3](http://ovefvi4g3.bkt.clouddn.com/1A0A34E6-D9B0-497B-885E-71C65EE59AE3.png)


待续......

