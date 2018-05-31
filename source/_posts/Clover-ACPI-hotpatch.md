---
title: Clover ACPI hotpatch
copyright: true
date: 2017-12-17 15:30:15
categories: Hackintosh
description: Using Clover to "hotpatch" ACPI 
tags:
- Hacintosh
- hotpatch
- ACPI
- SSDT
---

## Using Clover to "hotpatch" ACPI
<!--more-->

## Preface--序言
This blog is created by me to introduce how to using Clover to hotpatch ACPI，and provide an Chinese version。
> 我写这篇博客是为了介绍如何使用`Clover`对`ACPI`使用`hotpatch`，并翻译原贴提供中文参考帖。

## Brief description for hotpatch--`hotpatch`概要
In RehabMan's GitHub homepage, a repository named `OS-X-Clover-Laptop-Config` Contains some Clover `config.plist` for common Intel graphics and hotpatch for common configurations.More information in [here](https://github.com/RehabMan/OS-X-Clover-Laptop-Config).
> `RehabMan`的`GitHub`有一个仓库--`OS-X-Clover-Laptop-Config`,里面包含了一些适用于常见的英特尔核芯显卡的`config.plist`,还有`hotpatch`。点击[这里](https://github.com/RehabMan/OS-X-Clover-Laptop-Config)了解更多。

There are some handy SSDTs for use with Clover ACPI hotpatch (in conjunction with hotpatch/config.plist) If you understand ACPI, you may find the SSDTs and hotpatch/config.plist quite useful.
> 这儿有许多针对使用Clover ACPI hotpatch(连同使用hotpatch/config.plist)的SSDT。如果你理解了ACPI，你会发现这些`SSDT`和`hotpatch/config.plist`相当重要。

Read here for the hotpatch guide: [https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)
> 这里是`hotpatch`的‘入门引导贴。
> [https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)

## A brief description of each hotpatch SSDT is provided below--下面是每一个 `hotpatch SSDT` 的概要

`SSDT-Config.dsl`: This file provides configuration data for other SSDTs. Read the comments within the file for more information.
> `SSDT-Config.dsl`:这个文件为其他`SSDT`提供参数。请阅读文件中的注释以获得更多信息。

`SSDT-Debug.dsl`: This SSDT is for use with ACPIDebug.kext. Instead of patching your DSDT to add the RMDT device, you can use this SSDT and refer to the methods with External. See ACPIDebug.kext documentation for more information regarding the RMDT methods.
> 这个`SSDT`和`ACPIDebug.kext`一起使用。不需要对你的`DSDT`打补丁增加`RMDT`设备，你可以使用这个`SSDT`通过`External`导入这个方法。关于`RMDT`方法，要了解更多请参阅`ACPIDebug.kext`文档。

`SSDT-XOSI.dsl`: This SSDT provides the XOSI method, which is a replacement for the system provided _OSI object when the _OSI->XOSI patch is being used. This is actually one of the examples in the Clover ACPI hotpatch guide, linked above.
> 这个`SSDT`提供了`XOSI`方法，当打了`_OSI->XOSI`补丁时，`XOSI`方法会替换系统提供的`_OSI`对象。实际上，这就是`Clover ACPI hotpatch`入门参考帖的一个例子，链接在下面。

SSDT-IGPU.dsl This SSDT injects Intel GPU properties depending on the configuration data in SSDT-Config and the device-id that is discovered to be present on the system. It assumes the IGPU is named IGPU (typical is GFX0, requring GFX0->IGPU rename). Configured with RMCF.TYPE, RMCF.HIGH, RMCF.IGPI, and SSDT-SkylakeSpoof.aml.
> 这个`SSDT`根据`SSDT-config`的配置数据和系统中发现的设备id注入了Intel GPU--核芯显卡属性。它假定`IGPU`被命名成`IGPU`(通常是`GFX0`，需要重命名`GFX0->IGPU`)。通过`RMCF.TYPE, RMCF.HIGH, RMCF.IGPI, and SSDT-SkylakeSpoof.aml`来配置。

`SSDT-SkylakeSpoof.aml`: This SSDT is an optional SSDT that can be paired with SSDT-IGPU.dsl. When present, SSDT-IGPU uses the data within as an override for various KabyLake graphics devices which spoofs those devices as Skylake. Prior to 10.12.6, Skylake spoofing is the only option for KabyLake graphics. And even with 10.12.6 (or later, including 10.13.x), it still may be useful to spoof KabyLake graphics as Skyake. Keep in mind complete Skylake spoofing requires FakePCIID.kext + FakePCIID_Intel_HD_Graphics.kext.
> 这个`SSDT`是一个可选的`SSDT`,它可以配合`SSDT-IGPU.dsl`使用。`SSDT-IGPU`使用这些数据对`KabyLake`图形设备的数据进行覆盖重写，把`KabyLake`仿冒成`Skylake`。10.12.6之前,`KabyLake`只有仿冒成'SkyLake'驱动核显，即使在10.12.6之后(或者更新的版本，包括10.13.x)，将`KabyLake`仿冒成'SkyLake'仍然是很有用的，需要注意的是完整的仿冒需要`FakePCIID.kext + FakePCIID_Intel_HD_Graphics.kext`。

`SSDT-IMEI.dsl`: This SSDT injects fake device-id as required for IMEI when using mixed HD3000/7-series or HD4000/6-series. Be sure to read the comments within carefully, as customization is required if your system already has an IMEI identity in ACPI.

> 当使用混合的hd3000/7系或hd4000/6系时，该SSDT为IMEI注入了仿冒的设备id。一定要仔细阅读注释，因为如果您的系统已经在ACPI中有了IMEI标识，那么就需要进行定制。

`SSDT-PNLF.dsl`: This SSDT injects a PNLF device that works with IntelBacklight.kext or AppleBacklight.kext. Configured with RMCF.BKLT, RMCF.LMAX, RMCF.FBTP. See guide for more information: [https://www.tonymacx86.com/threads/guide-laptop-backlight-control-using-applebacklightinjector-kext.218222/](https://www.tonymacx86.com/threads/guide-laptop-backlight-control-using-applebacklightinjector-kext.218222/)

> 这个SSDT注入了一个`PNLF`设备，它可以与`IntelBacklight.kext` 或者`AppleBacklight.kext`一起工作。通过`RMCF.BKLT` ,`RMCF.LMAX` `RMCF.FBTP`。更多信息参见指南:

`SSDT-LPC.dsl`:This SSDT injects properties to force AppleLPC to load for various unsupported LPC device-ids. It assumes the LPC device is named LPCB.

> 这个SSDT:注入属性以强制`AppleLPC`加载各种不支持的`LPC`设备id。需要`LPC`设备被命名为`LPCB`。

`SSDT-SATA.dsl`: This SSDT injects properties (fake device-id, compatible) to enable the SATA controller with certain unsupported SATA controllers. It assumes the SATA device is named SATA (typical is SAT0, thus requiring SAT0->SATA rename).

> 这个SSDT注入了一些属性(仿冒的设备id，兼容的)，以使某些不受支持的`SATA`控制器启用`SATA`控制器。它假设`SATA`设备被命名为`SATA`(常见的是`SAT0`，因此需要`SAT0-SATA`重命名)。

`SSDT-Disable_DGPU.dsl`: This SSDT provides an _INI method that will call _OFF for a couple of common paths for a discrete GPU in a switched/dual GPU scenario. This SSDT can work to disable the Nvidia or AMD graphics device, if the path matches (or is modified to math) and your _OFF method code path has no EC related code. Refer to the hotpatch guide for a complete example.

> 这个SSDT提供了一个`INI`方法，它将在可切换的/双`GPU`中为独立显卡提供一些通用的路径来调用`_OFF`。如果路径匹配(或被自定义来匹配)而且你的`_OFF`方法代码路径则没有与`EC`相关的代码，那么这个`SSDT`可以禁用`Nvidia`或`AMD`图形设备。有关一个完整的示例，请参阅热补丁指南。

`SSDT-SMBUS.dsl`:This SSDT injects the missing DVL0 device. Mostly used with Sandy Bridge and Ivy Bridge systems.

> 这个SSDT注入了丢失的`DVL0`设备。主要用于`Sandy Bridge`和`Ivy Bridge`平台。

`SSDT-GPRW.dsl` and `SSDT-UPRW.dsl`: These SSDTs is used in conjuction with the GPRW->XPRW or UPRW->XPRW patch. Used together this SSDT can fix "instant-wake" by disabling "wake on USB". It overrides the _PRW package return for GPE indexes 0x0d or 0x6d. Potential companion patches are provided in hotpatch/config.plist

> 这些SSDT与`GPRW-XPRW`或`UPRW-XPRW`补丁一起使用。通过使用这些`SSDT`，可以通过禁用`wake on USB`来修复`instant wake`。它重写了`GPE`的索引`0x0d`或`0x6d`的`PRW`包返回值。在`hotpatch`/`config.plist`中提供了潜在的伙伴补丁。

`SSDT-LANC_PRW.dsl`: Also part of fixing "instant wake", but this is for _PRW on the Ethernet device. Potential companion patches are provided in hotpatch/config.plist.

> 这也是修复`instant wake`的一部分，但这是在以太网设备上进行修复的。在`hotpatch`/`config.plist`中提供了潜在的伙伴补丁。

`SSDT-PTSWAK.dsl`: This SSDT provides overrides for both _PTS and _WAK. When combined with the appropriate companion patches from hotpatch/config.plist, these methods can provide various fixes. The actions are controlled by RMCF.DPTS, RMCF.SHUT, RMCF.XPEE, RMCF.SSTF. Refer to SSDT-Config.dsl for more information on those options.

> 这个SSDT提供了对`_PTS`和`_WAK`的重写。当与来自`hotpatch`/`config.plist`的适当的补丁相结合使用时，这些方法可以提供一系列的修复。这些行为是由`RMCF.DPTS`, `RMCF.SHUT`,`RMCF.XPEE`,`RMCF.XPEE` ,`RMCF.SSTF`.更多关于这些选项的信息参阅`SSDT-Config`。

`SSDT-Disable_EHCI.dsl`: This SSDT can disable both EHCI controllers. It is assumed both have been renamed to EH01/EH02 (typically original names are EHC1/EHC2).

> 这个SSDT可以禁用`EHCI`控制器。要求这两种情况都被重新命名为`EH01/EH02`(通常原来的名字是`EHC1/EHC2`).

`SSDT-Disable_EH01.dsl`, `SSDT-Disable_EH02.dsl`: Each of these SSDTs is just SSDT-Disable_EHCI.dsl broken down to only disable EH01 or only EH02. Use as appropriate depending on which EHCI controllers are active/present in your ACPI set.

> 这些SSDT每一个都是`SSDT-Disable_EHCI.dsl`分解的，仅仅用以禁用`EH01`或`EH02`。取决于在你的`ACPI`集合中使用哪个`EHCI`控制器是合适的。

`SSDT-XWAK.dsl`, `SSDT-XSEL.dsl`, `SSDT-ESEL.dsl`: Each of these SSDTs provides an empty XWAK, XSEL, and ESEL methods (respectively). Use with the appropriate companion patch from hotpatch/config.plist. Typically, these methods are disabled (by having no code in them) to disable certain actions native ACPI may be doing on wake from sleep or during startup that cause problems with the xHCI/EHCI configuration.

> 这些SSDT分别提供了一个空的`XWAK`、`XSEL`和`ESEL`方法(独立地)。配合`hotpatch/config.plist`中适当的补丁一起使用。通常情况下，这些方法被禁用(因为在它们中没有代码)，以禁用本地`ACPI`可能在唤醒睡眠或在启动时导致`xHCI/EHCI`i配置问题的某些动作。

`SSDT-PluginType1.dsl`: This SSDT injects "plugin-type"=1 on CPU0. It assumes ACPI Processor objects are in Scope(_PR). It can be used to enable native CPU power management on Haswell and later CPUs. See guide for more information: [https://www.tonymacx86.com/threads/guide-native-power-management-for-laptops.175801/](https://www.tonymacx86.com/threads/guide-native-power-management-for-laptops.175801/).

> 这个SSDT在`CPU0`注入`“plugin-type”=1`。它要求`ACPI`处理器对象在`Scope(_PR)`范围内。它可以用于在`Haswell`和更新的`CPU`启用原生电源管理。更多信息见指南：[https://www.tonymacx86.com/threads/guide-native-power-management-for-laptops.175801/](https://www.tonymacx86.com/threads/guide-native-power-management-for-laptops.175801/).

`SSDT-HDEF.dsl` and `SSDT-HDAU.dsl`: Injects layout-id, hda-gfx, and PinConfiguration properties on HDEF and HDAU in order to implement audio with patched AppleHDA.kext Configured with: RMCF.AUDL.

> 在`HDEF`和`HDAU`上注入`layout-id`、`hda-gfx`和`PinConfiguration`属性，以通过对`AppleHDA`的`patch`实现音频。通过`RMCF.AUDL`配置.

`SSDT-EH01.dsl`,` SSDT-EH02.dsl`, and `SSDT-XHC.dsl`:These SSDTs inject USB power properties and control over FakePCIID_XHCIMux (dending on SSDT-Disable_EH*.dsl).

> 这些SSDT注入`USB`电源属性并通过`FakePCIID_XHCIMux`控制(取决于`SSDT-Disable_EH*.dsl`)。

`SSDT-ALS0.dsl`: Injects a fake ALS device (ambient light sensor). This SSDT is used to fix problems with restoring brightness upon reboot.

> 注入仿冒`ALS`设备(环境光传感器)。这个`SSDT`用于修复重新启动时还原亮度的问题。

## Introduction-说明文档

Patching ACPI is always necessary to enable (near) full functionality when installing OS X on non-Apple hardware.

> 在非苹果硬件上安装OS X时，修补`ACPI`以启用(接近)完整的功能总是必要的。

There is a complete guide here: [http://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/](http://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/)

> 这里有一个完整的指南: [http://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/](http://www.tonymacx86.com/threads/guide-patching-laptop-dsdt-ssdts.152573/)

That guide uses what is known as "static patching". In order to inject patched ACPI files, we extract native ACPI, disassemble them, make changes, then recompile and place the files in ACPI/patched, so that Clover injects the patched ACPI instead of native ACPI. With the techniques detailed in this guide, the changes can be made directly to the ACPI binaries provided by BIOS, skipping the extract, disassembly, and recompilation steps.

> 该指南使用了所谓的“静态补丁”。为了注入打了补丁的`ACPI`文件，我们提取本地的ACPI，将它们反编译，进行修改，然后重新编译，并将文件放在`ACPI/patched`中，这样Clover就注入了打过补丁的`ACPI`，而不是原生的`ACPI`。通过本指南中详细介绍的技术，可以直接对`BIOS`提供的`ACPI`二进制文件进行更改，跳过提取、分解和重新编译步骤。

You should have a solid understanding of static ACPI patching before attempting to hotpatch. You should also have an understanding of the ACPI spec, binary patching, programming, and ACPI concepts. Don't expect step-by-step and spoon feeding in this thread.

> 在尝试`hotpatch`之前，你应该对静态的`ACPI`补丁有一定的了解。你还应该了解`ACPI`规范、二进制补丁、语法和`ACPI`概念。不要指望在这个过程中循序渐进地学习。

### Clover mechanisms-`Clover`机制

Clover provides a few methods for accomplishing ACPI hotpatch:

> Clover提供了一些新的方法来实现`ACPI hotpatch`.

- config.plist/ACPI/DSDT/Fixes
- config.plist/ACPI/DSDT/Patches
- ability to inject additional SSDTs

`DSDT/Fixes` provide fixed function ACPI patching. Each "Fix" can do a particular kind of patching that can be used instead of typical patching you might do with MaciASL and static patching. For example, "IRQ Fix" can be accomplished with "FixHPET_0010" "FixIPIC_0040" "FIX_RTC_20000" and "FIX_TMR_40000". As an other example, "Fix _WAK Arg0 v2" can be accomplished with "FIX_WAK_200000". You can read the Clover wiki for more information on each patch. Most of the time, there are not many DSDT "Fixes" needed for basic functionality. DSDT "Fixes" are useful for implementing patches that are difficult or impossible to implement with ACPI/DSDT/Patches or additional SSDTs.

> `DSDT/Fixes`提供了具有修复功能的`ACPI`补丁。每一个`Fix`都可以使用一种特殊的补丁，从而不需要你使用`MaciASL`和静态补丁。例如，`IRQ Fix`可以用`FixHPET_0010`、`FixIPIC_0040`、`FIX_RTC_20000`和`FIX_TMR_40000`来完成。再举一个例子，`Fix _WAK Arg0 v2`可以用`FIX_WAK_200000`来完成。对于每个补丁阅读`Clover wiki`以获得更多信息。大多数情况下，基本功能所需的DSDT`Fix`并不多。对于用`ACPI/DSDT/Patches`或附加的`SSDT`很难实现甚至不可能实现的补丁,利用DSDT`Fixes`实现非常有用。

DSDT/Patches allows for binary search and replace by Clover. Clover loads the native ACPI files, applies the patches specified in ACPI/Patches using binary search/replace, then injects the patched ACPI. You need to have an understanding of the binary AML format. It is fully documented in the ACPI spec.

> `DSDT/Patches`允许通过`Clover`对二进制进行查找并替换。`Clover`加载本地的`ACPI`文件，在`ACPI/Patches`中使用二进制查找替换以应用指定的补丁，然后注入打过补丁的`ACPI`。您需要了解二进制`AML`格式。它在`ACPI`规范中有完整的文档记录。

ACPI namespace is built by merging the DSDT and SSDTs at load time. By placing additional SSDTs into ACPI/patched, we can essentially add code to this ACPI set. Since many OS X patches involve adding properties to ioreg with a _DSM method, it is often adequate to simply add an SSDT which contains the additional _DSM method instead of patching the native ACPI files. A perfect example you're already familiar with is the SSDT.aml that is generated by Pike's ssdtPRgen.sh.

> ACPI命名空间在加载时通过合并`DSDT`和`SSDT`构建。通过将额外的`SSDT`放到`ACPI/patched`,我们可以添加代码到`ACPI`集。因为许多`OS X`补丁涉及`_DSM`方法添加属性到`ioreg` ,通常是适当的`SSDT`包含额外的一个`_DSM`方法而不是对本地`ACPI`文件打补丁。你已经熟悉的一个很好的例子是`Pike`的`ssdtprgensh.sh`脚本生成的`SSDT.aml`。

In some cases, more than one mechanism must be used to accomplish a single goal. For example, you might use binary patching to disable or rename components in the native ACPI set, and then replace it with additional SSDTs.

> 在某些情况下，必须使用不止一个机制来完成某一个目标。例如，你可能使用二进制补丁来禁用或重命名本地`ACPI`集合中的组件，然后用额外的`SSDT`替换它。

### Renaming ACPI objects-重命名`ACPI`对象

Since OS X can depend on specific ACPI object names used by Macs, a common patch is to rename an object in the native ACPI set. For example, most PC laptops use GFX0 for the integrated Intel GPU object (Intel HD Graphics). In OS X, power management for Intel graphics is not enabled unless this device is named IGPU. Using static patching, we apply "Rename IGPU to GFX0" in order to rename this object. The patch must be applied to the DSDT and all SSDTs that reference it.

> 由于`OS X`可以依赖于`Mac`所使用的特定的`ACPI`对象名称，一个常见的补丁是在本地的ACPI集合中重命名一个对象，例如，大多数`PC`笔记本使用`GFX0`作为集成的`Intel GPU`对象(`Intel HD`显卡)。在`OS X`中，除非这个设备被命名为`IGPU`，否则英特尔图形的电源管理是不能启用的。使用静态补丁，我们应用`Rename IGPU to GFX0`来重命名这个对象。这个补丁必须应用到`DSDT`和所有有引用`GFX0`的`SSDT`上。

With hotpatch, we can rename GFX0 to IGPU using a simple Clover patch in ACPI/DSDT/Patches. Such patches apply to DSDT and all native SSDTs (DSDT/Patches do not apply to SSDTs that are added via ACPI/patched). The patch for the rename would be:

> 使用`hotpatch`，我们可以在`ACPI/DSDT/Patches`使用一个简单的四叶草补丁将`GFX0`重命名为`IGPU`。这些补丁适用于`DSDT`和所有本地的`SSDTs`(`(DSDT/Patches`不能被应用到通过`ACPI/patched`添加的`SSDT`)。重命名的补丁是:

```
Comment: Rename GFX0 to IGPU
Find: <4746 5830>
Replace: <4947 5055>
```

The hex values in Find and Replaces are the ASCII codes for GFX0 and IGPU, respectively.

> 查找和替换的十六进制值分别是`GFX0`和`IGPU`的`ASCII`码,分别是：

```
$ echo -n GFX0|xxd
0000000: 4746 5830                                GFX0
$ echo -n IGPU|xxd
0000000: 4947 5055                                IGPU
```

There are number of common renames, and most are in the config.plist that are part of my Clover/hoptpatch project:

[https://github.com/RehabMan/OS-X-Clover-Laptop-Config/tree/master/hotpatch](https://github.com/RehabMan/OS-X-Clover-Laptop-Config/tree/master/hotpatch)

> 有许多通用的重命名，而且很多都在`config.plist`里，这个`config.plist`是我的`Clover/hotpatch`项目的一部分:[https://github.com/RehabMan/OS-X-Clover-Laptop-Config/tree/master/hotpatch](https://github.com/RehabMan/OS-X-Clover-Laptop-Config/tree/master/hotpatch)

In fact, the hotpatch SSDTs that are part of the same project depend on the renames being implemented.

> 事实上，这些`hotpach`的`SSDT`也是上面那个项目的一部分，并且它们要求这些重命名必须被实现。

Common renames:

> 通用的重命名：

```
GFX0 -> IGPU
SAT0 -> SATA
EHC1 -> EH01
EHC2 -> EH02
XHCI -> XHC
HECI -> IMEI
MEI -> IMEI
LPC -> LPCB
HDAS -> HDEF
AZAL -> HDEF
```

Note: All ACPI identifiers are 4 characters. Shorter names are padded with underscore. So, for example, XHC is represented in the AML binary as XHC_, EC would be EC__, EC0 would be EC_, MEI would be MEI_, etc.

> 注意：所有的`ACPI`标识符都是4个字符。较短的名字用下划线填充。例如，`XHC`在`AML`二进制文件中被表示为`XHC_`，`EC`是`EC__`，`EC0`是`EC0_`，`MEI`是`MEI_`，等等。

### Removing methods-移除方法

It is very difficult to remove ACPI objects, (methods, names, devices, etc) using Clover binary patches. Commonly, we must add _DSM methods to inject properties that describe various hardware properties. But added _DSM methods can conflict with existing _DSM methods that may already be in the native ACPI files. With static patching, "Remove _DSM methods" would be used.

> 使用`Clover`二进制补丁来移除`ACPI`对象(方法、名称、设备等等)是非常困难的。通常，我们必须添加`_DSM`方法来注入各种描述硬件属性的属性。但是，添加`_DSM`方法可能与本地`ACPI`文件现有的`_DSM`方法冲突。这时，就会用到静态补丁`Remove _DSM methods`。

Since it is difficult to remove the methods, but we don't want the native methods to conflict with new _DSM methods that are added, the fix is to rename the native methods to something else.

> 由于很难删除这些方法，但是我们又不希望本地方法与添加的新`_DSM`方法相冲突，所以就将本地方法重命名为其他名字来修复这个问题。

So... again, we use a simple rename patch:

> 那么…同样地，我们使用一个简单的重命名补丁:

```
Comment: Rename _DSM to XDSM
Find: <5f44534d>
Replace: <5844534d>
```

Sometimes, you might rename an object to effectively disable it so it does not cause problems. For example, my Intel DH67GD DSDT defines an APSS object. If this object is left in the DSDT it interferes with power management (causes panic). I use a rename from APSS -> APXX. Because AppleIntelCPUPowerManagement is looking for APSS, it does not cause a problem once renamed to APXX.

> 有时，你可能会重命名一个对象，以便有效地禁用它，这样它就不会造成问题。例如，我的`Intel DH67GD`的 `DSDT`定义了`APSS`对象。如果这个对象留在`DSDT`中，它会干扰电源管理(引起`KP`)。我使用`APSS->APXX`的重命名。因为`AppleIntelCPUPowerManagement`会查找`APSS`,只要改名为`APXX`就不会引起问题。

### Redirect and Replace-重定向和替换

In some cases, we would like to replace code to change the behavior. For this, we can rename the object and provide an alternate implementation in an SSDT.

> 在某些情况下，我们希望替换代码来改变某些动作。为此，我们可以重命名这个对象，并在`SSDT`中提供一个用来替代的对象以达到目的。

A common fix is spoofing the ACPI code in DSDT and SSDTs such that it behaves as if a certain version of Windows is the ACPI host. When static patching, we might use "OS Check Fix (Windows 8)". When applied, it changes code from:

> 一个常见的修复是在`DSDT`和`SSDT`中仿冒`ACPI`代码，使其表现得就像是`ACPI`主机的某个版本的`Windows`一样。当利用静态补丁时，我们可能会使用`OS Check Fix (Windows 8)`。当应用这个补丁时，它会将代码从:

```
If (_OSI("Windows 2012"))
```

To:

> 改为：

```
If (LOr(_OSI("Darwin"),_OSI("Windows 2012"))
```

Since the _OSI implementation in OS X only responds to "Darwin" the code is changed so that this specific _OSI check also accomodates "Darwin".

> 由于`OS X`中`_OSI`方法的实现只对被修改了代码的`Darwin`作出响应，所以这个特定的`_OSI check`补丁也能响应`Darwin`。

With hotpatching, the opposite approach is taken. Instead of changing the code using _OSI, we change the code so it calls a different method that emulates the _OSI implementation that would be in the Windows ACPI host.

> 而热补丁则采用相反的方法，我们不使用`_OSI`修改代码，而是改变代码让它调用一种不同的方法来模拟在`Windows ACPI`主机上的`_OSI`实现。

This technique relies on two of the techniques... a patch to change all calls from _OSI to XOSI... and an implementation of XOSI that emulates what Windows would do for a certain Windows version.

> 这项技术依赖于两种技术，一个补丁来改变从`_OSI`到`XOSI`的所有调用。另一个是`XOSI`的实现，即模拟`Windows`对某个`Windows`版本的操作。

First, changing the code to call XOSI instead of _OSI:

> 首先，改变代码来调用`XOSI`而不是`_OSI`:

```
Comment: Change _OSI to XOSI
Find: <5f4f 5349>
Replace: <584f 5349>
```

The hex codes above should be no mystery (they are ASCII for _OSI and XOSI, respectively).

> 上面的十六进制代码没有什么神秘的(它们分别是`_OSI`和`XOSI`的`ASCII`码)。

Now the code mentioned above, after patching by Clover, will read:

> 现在，上面提到的代码，在通过`Clover`打了补丁之后，将会读到:

```
If (XOSI("Windows 2012"))
```

Now we need an SSDT that implements XOSI. You will find such an implementation in the repository (SSDT-XOSI.dsl).

> 现在我们需要一个实现`XOSI`的`SSDT`。你可以我的`GitHub`仓库中找到这样的实现(SSDT-XOSI.dsl).

Note that without the SSDT that implements the XOSI method, the (patched) calls to XOSI would cause an ACPI abort (ACPI abort causes execution of the ACPI method to be terminated immediately with an error). Don't use the _OSI->XOSI patch without the XOSI method.

> 注意，如果没有实现`XOSI`方法的`SSDT`，这个补丁对`XOSI`的调用将导致`ACPI`的加载被终止(`ACPI`中止导致`ACPI`方法的执行被错误立即终止)。如果没有`XOSI`方法不要使用`_OSI`->`XOSI`补丁。

### Rename and Replace-重命名和替换

A second pattern, similar to "Redirect and Replace" is "Rename and Replace". In this case, instead of changing all the call sites, we change the method definition such that the method is named something different than it was originally, but leave the original method name at the call sites. This allows the method that is the target of the calls to be replaced.

For example, it is very common for USB devices to cause "instant wake". As a work around, wake on USB can be disabled. Most laptops don't have a BIOS option for it, so instead the _PRW methods that control this feature are patched.

For example, the native _SB.PCI0.EHC1._PRW method might read:

```
Method (_PRW, 0, NotSerialized)  // _PRW: Power Resources for Wake
{
	Return (GPRW (0x6D, 0x03))
}
```

In order to patch it so USB devices on EHCI#1 cannot cause wake, it would be changed:

```
Method (_PRW, 0, NotSerialized)  // _PRW: Power Resources for Wake
{
	Return (GPRW (0x6D, 0))
}
```

Usually, there are several such call sites to GPRW that need to be changed (also, keep in mind not all ACPI sets use the specific name GPRW). Instead of trying to patch all the call sites as above, we can instead patch the method definition of GPRW instead:

With the original code:

```
Method (GPRW, 2, NotSerialized)
{
   ...
}
```

If we change it to:

```
Method (XPRW, 2, NotSerialized)
{
   ...
}
```

Since you don't want to change any call sites, the patch must be constructed such that it affects only the method itself and not the call sites. According to ACPI spec, a method definition starts with bytecode 14, is followed by the method size, the method name, argument count/flags. You can use the "-l" option in iasl to generate a mixed listing of your ACPI file. For example, the Lenovo u430 GPRW method mixed listing:

```
4323:          Method (GPRW, 2, NotSerialized)
00003F95:  14 45 08 47 50 52 57 02     ".E.GPRW."
4324:          {
4325:              Store (Arg0, Index (PRWP, Zero))
00003F9D:  70 68 ..................    "ph"
00003F9F:  88 50 52 57 50 00 00 ...    ".PRWP.."
```

We could do a find replace using the method header bytes:

```
Find: <14 45 08 47 50 52 57 02>
Replace: <14 45 08 58 50 52 57 02>
```

But what happens if the method differs slightly between different versions of BIOS or models that are similar, but not exactly the same? In that case, the byte following the 14 will change due to the change in the method length.

My thought is that the beginning of the method body is less likely to be different than the total length of the method, so it helps to add a few extra bytes from the body of the method to the find/replace specification:

```
Find: <47 50 52 57 02 70 68>
Replace: <58 50 52 57 02 70 68>
```

The number of follow-on bytes that you use depends on how many you need to make the find/replace affect only the method definition. You can verify by looking at the native AML binary in a hex editor such as Hex Fiend (it is a nice hex editor and is also open source).

Note: Although you could search just for the method name + arg count/flags, it is possible that the same pattern will find a call site to the method which you don't want to change. In the case of the u430 that wasn't the case, so I was able to find/replace with just the method name+flags.

```
Find: <47505257 02>
Replace: <58505257 02>
```

In the case of the ProBook UPRW, it was necessary to use the follow-on bytes that are part of the method body:

```
Find: <55505257 0a7012>
Replace: <58505257 0a7012>
```

Now any code that calls GPRW (or UPRW in the ProBook example) will not call the implementation in XPRW because the name doesn't match. The original XPRW is now unreachable code. Which means the GPRW implementation can be changed for our purpose:

```
Method(GPRW, 2)
{
	If (0x6d == Arg0) { Return(Package() { 0x6d, 0, }) }
    External(\XPRW, MethodObj)
    Return(XPRW(Arg0, Arg1))
}
```

Explaining the code: For any call to GPRW with the first argument set to 0x6d (the GPE we are trying to disable for wake), instead of returning what the original GPRW would, we return a package with 0x6d and 0 (which disables wake). And for other GPE values, the code simply calls the original GPRW method now named XPRW.

Another simple case is patching EC query methods to fix the brightness keys. A simple rename of the _Qxx methods involved to XQxx, and a new definition of the method with the original name is all that is needed.

For example, in the HP Envy Haswell repo:

```
// _Q13 called on brightness/mirror display key
Method (_Q13, 0, Serialized)  // _Qxx: EC Query
{
	External(\HKNO, FieldUnitObj)
	Store(HKNO, Local0)
	If (LEqual(Local0,7))
	{
		// Brightness Down
		Notify(\_SB.PCI0.LPCB.PS2K, 0x0405)
	}
	If (LEqual(Local0,8))
	{
		// Brightness Up
		Notify(\_SB.PCI0.LPCB.PS2K, 0x0406)
	}
	If (LEqual(Local0,4))
	{
		// Mirror toggle
		Notify(\_SB.PCI0.LPCB.PS2K, 0x046e)
	}
}
```

And the associated patch:

```
Comment: change Method(_Q13,0,S) to XQ13
Find: <5f513133 08>
Replace: <58513133 08>
```

This same "Rename and Replace" mechanism can be used in cases that are much more complex than this. For example, it is typically used to patch battery methods, which need to be patched to avoid access to multibyte EC fields.

#### Tips for complex Rename and Replace

As you probably already know, patching for battery status (multibyte EC fields) can be very complex and can involve a lot of code changes to many methods.

This section will detail some of the techniques and procedures used for battery patching.

It is advisable to patch for battery without using hotpatch first. After you get it working, then attempt hotpatch. Also, the difference between the code not patched for battery and the code patched for battery is very helpful. You can use a tool like 'diffmerge' to compare each. This is especially true if there is already a static battery patch for your laptop in my laptop repository.

General procedure:
- start with native ACPI
- patch for battery status using static patching (verify it works)
- use diffmerge to compare the unpatched code with patched code
- for each method that is different, implement the "Rename and Replace" pattern
- for the EC fields, create another EC OperationRegion (use a name that is different from the original) and Field definition as a sort of "overlay" which contains only the EC fields you need to patch
- to create the EC overlay, you can use the patched Field/OperationRegion in the patched DSDT, then eliminate unpatched fields
- use External to allow the replacement methods in the SSDT to access the fields defined elsewhere in the ACPI set (usually DSDT)
- let the compiler point out where you need to use External
- watch out for symbols with duplicate names in different scopes

An example is provided in post #2 of this thread.

### Code value patching

Consider the case of "Fix Mutex with non-zero SyncLevel". This patch finds all Mutex objects and replaces the SyncLevel with 0. We use this patch since OS X does not support Mutex debugging correctly and aborts on any Acquire with a Mutex that has a non-zero SyncLevel.

As an example, the u430 has Mutexes delcared as such:

    Mutex (MSMI, 0x07)

To make it compatible with OS X it must be changed:

    Mutex (MSMI, 0)

The ACPI spec defines how a Mutex object is encoded in the AML, but it can be helpful to look at a mixed disassembly of a small ACPI file:

```
DefinitionBlock ("", "DSDT", 2, "test", "test", 0)
{
    Mutex(ABCD, 7)
}
```

The iasl compiler can create a mixed listing file with the "-l" option.

If we compile the above file with: iasl -l test.dsl, test.lst contains:


    	   1:  DefinitionBlock ("", "DSDT", 2, "test", "test", 0)
    00000000:  44 53 44 54 2B 00 00 00     "DSDT+..."
    00000008:  02 36 74 65 73 74 00 00     ".6test.."
    00000010:  74 65 73 74 00 00 00 00     "test...."
    00000018:  00 00 00 00 49 4E 54 4C     "....INTL"
    00000020:  10 04 16 20 ............    "... "
    	   
    	   2:  {
    	   3:  		Mutex(ABCD, 7)
    	   
    00000024:  5B 01 41 42 43 44 07 ...    "[.ABCD."
    	   4:  }   

As you can see, the `Mutex(ABCD, 7)`, is encoded as `<5B 01 41 42 43 44 07>`

It is now very easy to construct a patch for it:

```
Comment: Change Mutex(ABCD,7) to Mutex(ABCD,0)
Find: <5B 01 41 42 43 44 07>
Replace: <5B 01 41 42 43 44 00>
```

### Clover ACPI configuration

With static patching, DropOem=true is used and patched DSDT and SSDTs are added to ACPI/patched. With hotpatch, instead use DropOem=false, and only add-on SSDTs are placed in ACPI/patched.

It is important to note that config.plist/ACPI/patches are applied only to native SSDTs, and not the SSDTs in ACPI/patched. This means that if you are renaming objects using config.plist, the add-on SSDTs must refer to the new names, not the old names. Unlike SSDTs in ACPI/patched, binary patches in ACPI/Patches *do apply* to DSDT.aml that might be in ACPI/patched. Keep this in mind if you're using a combination of static and hotpatching.

Also, with static patching, SortedOrder is used to specify the order of SSDTs in ACPI/patched. With hotpatch it is not strictly necessary as it is possible to construct the code in each SSDT such that the code is not order dependent. Especially if you place all add-on code in a single SSDT such as many of my laptop repo examples. Unless your add-on SSDTs are order dependent, you do not have to name each one in SortedOrder.

It is also not necessary to choose "numbered names" for each SSDT. Instead you can use meaningful names, such as "SSDT-USB.aml", SSDT-XOSI.aml", etc. Using numbers instead of meaningul names will just confuse you. Don't do it.

### Troubleshooting

You can use patchmatic to look at your complete ACPI set as injected by Clover after patching. By runnning 'patchmatic -extract', patchmatic will write all injected DSDT.aml and SSDT*.aml in the order they were injected by Clover. You can disassemble them with 'iasl -da -dl *.aml'. If iasl shows errors with the disassembly (for example duplicate symbols), it is likley OS X is also rejecting the conflicting SSDTs.

If you're a novice with this technique, it is a good idea to implement one patch at a time, and slowly build it up to a full set of working patches + SSDTs. Trying to do all at once can make it difficult to locate your mistake.

## Battery Status Hotpatch

This second post is dedicated to patching battery status with Clover hotpatch. To demonstrate the process, we will work through an example DSDT. The example files used are from the guide for disabling discrete graphics, an "Asus UX303LN".

[https://www.tonymacx86.com/threads/guide-disabling-discrete-graphics-in-dual-gpu-laptops.163772/](https://www.tonymacx86.com/threads/guide-disabling-discrete-graphics-in-dual-gpu-laptops.163772/)

You should download the ACPI/origin files that are attached to that guide, so you can follow along.

As mentioned in post #1, the general procedures are as follows:
- start with native ACPI
- patch for battery status using static patching (verify it works)
- use diffmerge to compare the unpatched code with patched code
- for each method that is different, implement the "Rename and Replace" pattern
- for the EC fields, create another EC OperationRegion (use a name that is different from the original) and Field definition as a sort of "overlay" which contains only the EC fields you need to patch
- to create the EC overlay, you can use the patched Field/OperationRegion in the patched DSDT, then eliminate unpatched fields
- use External to allow the replacement methods in the SSDT to access the fields defined elsewhere in the ACPI set (usually DSDT)
- let the compiler point out where you need to use External
- watch out for symbols with duplicate names in different scopes


### Using diffmerge to find patched vs. native differences

Start by disassembling the origin files: iasl -da -dl *.aml
(you should be familiar with this part as it is part of normal ACPI patching)

Next apply the battery patch only using MaciASL to DSDT.dsl. In this case, we apply the "ASUS N55SL/VivoBook". There is no need to fix any errors, as we are interested only in the differences created by applying the battery patch. Save the patched file as DSDT_patched.dsl.

Now you can run diffmerge to see the differences between DSDT.dsl and DSDT_patched.dsl. I usually just do this from Terminal:

`$ diffmerge DSDT.dsl DSDT_patched.dsl`

The initial diffmerge window will look something like this:
![batthot_diffmerge_initial](http://ovefvi4g3.bkt.clouddn.com/batthot_diffmerge_initial.png)

From there, we can examine the parts that have changes by clicking on the markers in the left column.

In the examples, the groups of changes you find:
- group 1: is the changes to the EC fields (multibyte to single byte)
- group 2: addition of RDBA, WRBA, RDBB, WRBB methods
- group 3: patched FBST, _BIX, B1FA methods
- group 4: patched SMBR, SMBW, ECSB methods
- group 5: patched TACH method
- final group: addition of B1B2 method


### Constructing the initial SSDT

Start with an empty SSDT in MaciASL:

```
DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
{
}
```

Next, add all methods that were added by the patch. In the example, this includes RDBA, WRBA, RDBB, WRBB and B1B2 methods. You can copy them directly from the DSDT_patched.dsl.

You want to be certain each method is placed in the same scope. For example, here is the "group 2" methods added:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        Scope (_SB.PCI0.LPCB.EC0)
        {
            Scope (EC0)
            {
                Method (RDBA, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BA00, Index(TEMP, 0x00))
                    Store (BA01, Index(TEMP, 0x01))
                    Store (BA02, Index(TEMP, 0x02))
                    Store (BA03, Index(TEMP, 0x03))
                    Store (BA04, Index(TEMP, 0x04))
                    Store (BA05, Index(TEMP, 0x05))
                    Store (BA06, Index(TEMP, 0x06))
                    Store (BA07, Index(TEMP, 0x07))
                    Store (BA08, Index(TEMP, 0x08))
                    Store (BA09, Index(TEMP, 0x09))
                    Store (BA0A, Index(TEMP, 0x0A))
                    Store (BA0B, Index(TEMP, 0x0B))
                    Store (BA0C, Index(TEMP, 0x0C))
                    Store (BA0D, Index(TEMP, 0x0D))
                    Store (BA0E, Index(TEMP, 0x0E))
                    Store (BA0F, Index(TEMP, 0x0F))
                    Store (BA10, Index(TEMP, 0x10))
                    Store (BA11, Index(TEMP, 0x11))
                    Store (BA12, Index(TEMP, 0x12))
                    Store (BA13, Index(TEMP, 0x13))
                    Store (BA14, Index(TEMP, 0x14))
                    Store (BA15, Index(TEMP, 0x15))
                    Store (BA16, Index(TEMP, 0x16))
                    Store (BA17, Index(TEMP, 0x17))
                    Store (BA18, Index(TEMP, 0x18))
                    Store (BA19, Index(TEMP, 0x19))
                    Store (BA1A, Index(TEMP, 0x1A))
                    Store (BA1B, Index(TEMP, 0x1B))
                    Store (BA1C, Index(TEMP, 0x1C))
                    Store (BA1D, Index(TEMP, 0x1D))
                    Store (BA1E, Index(TEMP, 0x1E))
                    Store (BA1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBA, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BA00)
                    Store (DerefOf(Index(TEMP, 0x01)), BA01)
                    Store (DerefOf(Index(TEMP, 0x02)), BA02)
                    Store (DerefOf(Index(TEMP, 0x03)), BA03)
                    Store (DerefOf(Index(TEMP, 0x04)), BA04)
                    Store (DerefOf(Index(TEMP, 0x05)), BA05)
                    Store (DerefOf(Index(TEMP, 0x06)), BA06)
                    Store (DerefOf(Index(TEMP, 0x07)), BA07)
                    Store (DerefOf(Index(TEMP, 0x08)), BA08)
                    Store (DerefOf(Index(TEMP, 0x09)), BA09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BA0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BA0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BA0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BA0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BA0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BA0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BA10)
                    Store (DerefOf(Index(TEMP, 0x11)), BA11)
                    Store (DerefOf(Index(TEMP, 0x12)), BA12)
                    Store (DerefOf(Index(TEMP, 0x13)), BA13)
                    Store (DerefOf(Index(TEMP, 0x14)), BA14)
                    Store (DerefOf(Index(TEMP, 0x15)), BA15)
                    Store (DerefOf(Index(TEMP, 0x16)), BA16)
                    Store (DerefOf(Index(TEMP, 0x17)), BA17)
                    Store (DerefOf(Index(TEMP, 0x18)), BA18)
                    Store (DerefOf(Index(TEMP, 0x19)), BA19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BA1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BA1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BA1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BA1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BA1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BA1F)
                }
                Method (RDBB, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BB00, Index(TEMP, 0x00))
                    Store (BB01, Index(TEMP, 0x01))
                    Store (BB02, Index(TEMP, 0x02))
                    Store (BB03, Index(TEMP, 0x03))
                    Store (BB04, Index(TEMP, 0x04))
                    Store (BB05, Index(TEMP, 0x05))
                    Store (BB06, Index(TEMP, 0x06))
                    Store (BB07, Index(TEMP, 0x07))
                    Store (BB08, Index(TEMP, 0x08))
                    Store (BB09, Index(TEMP, 0x09))
                    Store (BB0A, Index(TEMP, 0x0A))
                    Store (BB0B, Index(TEMP, 0x0B))
                    Store (BB0C, Index(TEMP, 0x0C))
                    Store (BB0D, Index(TEMP, 0x0D))
                    Store (BB0E, Index(TEMP, 0x0E))
                    Store (BB0F, Index(TEMP, 0x0F))
                    Store (BB10, Index(TEMP, 0x10))
                    Store (BB11, Index(TEMP, 0x11))
                    Store (BB12, Index(TEMP, 0x12))
                    Store (BB13, Index(TEMP, 0x13))
                    Store (BB14, Index(TEMP, 0x14))
                    Store (BB15, Index(TEMP, 0x15))
                    Store (BB16, Index(TEMP, 0x16))
                    Store (BB17, Index(TEMP, 0x17))
                    Store (BB18, Index(TEMP, 0x18))
                    Store (BB19, Index(TEMP, 0x19))
                    Store (BB1A, Index(TEMP, 0x1A))
                    Store (BB1B, Index(TEMP, 0x1B))
                    Store (BB1C, Index(TEMP, 0x1C))
                    Store (BB1D, Index(TEMP, 0x1D))
                    Store (BB1E, Index(TEMP, 0x1E))
                    Store (BB1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBB, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BB00)
                    Store (DerefOf(Index(TEMP, 0x01)), BB01)
                    Store (DerefOf(Index(TEMP, 0x02)), BB02)
                    Store (DerefOf(Index(TEMP, 0x03)), BB03)
                    Store (DerefOf(Index(TEMP, 0x04)), BB04)
                    Store (DerefOf(Index(TEMP, 0x05)), BB05)
                    Store (DerefOf(Index(TEMP, 0x06)), BB06)
                    Store (DerefOf(Index(TEMP, 0x07)), BB07)
                    Store (DerefOf(Index(TEMP, 0x08)), BB08)
                    Store (DerefOf(Index(TEMP, 0x09)), BB09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BB0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BB0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BB0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BB0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BB0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BB0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BB10)
                    Store (DerefOf(Index(TEMP, 0x11)), BB11)
                    Store (DerefOf(Index(TEMP, 0x12)), BB12)
                    Store (DerefOf(Index(TEMP, 0x13)), BB13)
                    Store (DerefOf(Index(TEMP, 0x14)), BB14)
                    Store (DerefOf(Index(TEMP, 0x15)), BB15)
                    Store (DerefOf(Index(TEMP, 0x16)), BB16)
                    Store (DerefOf(Index(TEMP, 0x17)), BB17)
                    Store (DerefOf(Index(TEMP, 0x18)), BB18)
                    Store (DerefOf(Index(TEMP, 0x19)), BB19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BB1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BB1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BB1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BB1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BB1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BB1F)
                }
            }
    	}
    }
And with B1B2 added:


    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
    	Method (B1B2, 2, NotSerialized) { Return (Or (Arg0, ShiftLeft (Arg1, 8))) }
        // added methods (group 2)
        Scope (_SB.PCI0.LPCB.EC0)
        {
            Scope (EC0)
            {
                Method (RDBA, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BA00, Index(TEMP, 0x00))
                    Store (BA01, Index(TEMP, 0x01))
                    Store (BA02, Index(TEMP, 0x02))
                    Store (BA03, Index(TEMP, 0x03))
                    Store (BA04, Index(TEMP, 0x04))
                    Store (BA05, Index(TEMP, 0x05))
                    Store (BA06, Index(TEMP, 0x06))
                    Store (BA07, Index(TEMP, 0x07))
                    Store (BA08, Index(TEMP, 0x08))
                    Store (BA09, Index(TEMP, 0x09))
                    Store (BA0A, Index(TEMP, 0x0A))
                    Store (BA0B, Index(TEMP, 0x0B))
                    Store (BA0C, Index(TEMP, 0x0C))
                    Store (BA0D, Index(TEMP, 0x0D))
                    Store (BA0E, Index(TEMP, 0x0E))
                    Store (BA0F, Index(TEMP, 0x0F))
                    Store (BA10, Index(TEMP, 0x10))
                    Store (BA11, Index(TEMP, 0x11))
                    Store (BA12, Index(TEMP, 0x12))
                    Store (BA13, Index(TEMP, 0x13))
                    Store (BA14, Index(TEMP, 0x14))
                    Store (BA15, Index(TEMP, 0x15))
                    Store (BA16, Index(TEMP, 0x16))
                    Store (BA17, Index(TEMP, 0x17))
                    Store (BA18, Index(TEMP, 0x18))
                    Store (BA19, Index(TEMP, 0x19))
                    Store (BA1A, Index(TEMP, 0x1A))
                    Store (BA1B, Index(TEMP, 0x1B))
                    Store (BA1C, Index(TEMP, 0x1C))
                    Store (BA1D, Index(TEMP, 0x1D))
                    Store (BA1E, Index(TEMP, 0x1E))
                    Store (BA1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBA, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BA00)
                    Store (DerefOf(Index(TEMP, 0x01)), BA01)
                    Store (DerefOf(Index(TEMP, 0x02)), BA02)
                    Store (DerefOf(Index(TEMP, 0x03)), BA03)
                    Store (DerefOf(Index(TEMP, 0x04)), BA04)
                    Store (DerefOf(Index(TEMP, 0x05)), BA05)
                    Store (DerefOf(Index(TEMP, 0x06)), BA06)
                    Store (DerefOf(Index(TEMP, 0x07)), BA07)
                    Store (DerefOf(Index(TEMP, 0x08)), BA08)
                    Store (DerefOf(Index(TEMP, 0x09)), BA09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BA0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BA0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BA0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BA0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BA0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BA0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BA10)
                    Store (DerefOf(Index(TEMP, 0x11)), BA11)
                    Store (DerefOf(Index(TEMP, 0x12)), BA12)
                    Store (DerefOf(Index(TEMP, 0x13)), BA13)
                    Store (DerefOf(Index(TEMP, 0x14)), BA14)
                    Store (DerefOf(Index(TEMP, 0x15)), BA15)
                    Store (DerefOf(Index(TEMP, 0x16)), BA16)
                    Store (DerefOf(Index(TEMP, 0x17)), BA17)
                    Store (DerefOf(Index(TEMP, 0x18)), BA18)
                    Store (DerefOf(Index(TEMP, 0x19)), BA19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BA1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BA1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BA1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BA1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BA1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BA1F)
                }
                Method (RDBB, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BB00, Index(TEMP, 0x00))
                    Store (BB01, Index(TEMP, 0x01))
                    Store (BB02, Index(TEMP, 0x02))
                    Store (BB03, Index(TEMP, 0x03))
                    Store (BB04, Index(TEMP, 0x04))
                    Store (BB05, Index(TEMP, 0x05))
                    Store (BB06, Index(TEMP, 0x06))
                    Store (BB07, Index(TEMP, 0x07))
                    Store (BB08, Index(TEMP, 0x08))
                    Store (BB09, Index(TEMP, 0x09))
                    Store (BB0A, Index(TEMP, 0x0A))
                    Store (BB0B, Index(TEMP, 0x0B))
                    Store (BB0C, Index(TEMP, 0x0C))
                    Store (BB0D, Index(TEMP, 0x0D))
                    Store (BB0E, Index(TEMP, 0x0E))
                    Store (BB0F, Index(TEMP, 0x0F))
                    Store (BB10, Index(TEMP, 0x10))
                    Store (BB11, Index(TEMP, 0x11))
                    Store (BB12, Index(TEMP, 0x12))
                    Store (BB13, Index(TEMP, 0x13))
                    Store (BB14, Index(TEMP, 0x14))
                    Store (BB15, Index(TEMP, 0x15))
                    Store (BB16, Index(TEMP, 0x16))
                    Store (BB17, Index(TEMP, 0x17))
                    Store (BB18, Index(TEMP, 0x18))
                    Store (BB19, Index(TEMP, 0x19))
                    Store (BB1A, Index(TEMP, 0x1A))
                    Store (BB1B, Index(TEMP, 0x1B))
                    Store (BB1C, Index(TEMP, 0x1C))
                    Store (BB1D, Index(TEMP, 0x1D))
                    Store (BB1E, Index(TEMP, 0x1E))
                    Store (BB1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBB, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BB00)
                    Store (DerefOf(Index(TEMP, 0x01)), BB01)
                    Store (DerefOf(Index(TEMP, 0x02)), BB02)
                    Store (DerefOf(Index(TEMP, 0x03)), BB03)
                    Store (DerefOf(Index(TEMP, 0x04)), BB04)
                    Store (DerefOf(Index(TEMP, 0x05)), BB05)
                    Store (DerefOf(Index(TEMP, 0x06)), BB06)
                    Store (DerefOf(Index(TEMP, 0x07)), BB07)
                    Store (DerefOf(Index(TEMP, 0x08)), BB08)
                    Store (DerefOf(Index(TEMP, 0x09)), BB09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BB0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BB0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BB0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BB0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BB0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BB0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BB10)
                    Store (DerefOf(Index(TEMP, 0x11)), BB11)
                    Store (DerefOf(Index(TEMP, 0x12)), BB12)
                    Store (DerefOf(Index(TEMP, 0x13)), BB13)
                    Store (DerefOf(Index(TEMP, 0x14)), BB14)
                    Store (DerefOf(Index(TEMP, 0x15)), BB15)
                    Store (DerefOf(Index(TEMP, 0x16)), BB16)
                    Store (DerefOf(Index(TEMP, 0x17)), BB17)
                    Store (DerefOf(Index(TEMP, 0x18)), BB18)
                    Store (DerefOf(Index(TEMP, 0x19)), BB19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BB1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BB1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BB1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BB1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BB1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BB1F)
                }
            }
    	}
    }
Don't worry that the code does not compile at the moment. It is not expected at this point, due to the EC fields (and other identifiers) that are not defined in this file. They will need to be definined or referenced via External (eventually).

Now let's add the patched methods. Just like the methods that were added methods, the patched methods are just copied from the DSDT_patched.dsl:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        // patched methods
        Scope (_SB.PCI0)
        {
            Scope (BAT0)
            {
                Method (FBST, 4, NotSerialized)
                {
                    And (Arg1, 0xFFFF, Local1)
                    Store (Zero, Local0)
                    If (^^LPCB.EC0.ACAP ())
                    {
                        Store (One, Local0)
                    }
    
                    If (Local0)
                    {
                        If (CHGS (Zero))
    {
    	Store (0x02, Local0)
    }
    Else
    {
    	Store (Zero, Local0)
    }
    				}
                    Else
                    {
                        Store (One, Local0)
                    }
    
                    If (BLLO)
                    {
                        ShiftLeft (One, 0x02, Local2)
                        Or (Local0, Local2, Local0)
                    }
    
                    If (And (^^LPCB.EC0.EB0S, 0x08))
                    {
                        ShiftLeft (One, 0x02, Local2)
                        Or (Local0, Local2, Local0)
                    }
    
                    If (LGreaterEqual (Local1, 0x8000))
                    {
                        Subtract (0xFFFF, Local1, Local1)
                    }
    
                    Store (Arg2, Local2)
                    If (LEqual (PUNT, Zero))
                    {
                        Multiply (Local1, ^^LPCB.EC0.B0DV, Local1)
                        Multiply (Local2, 0x0A, Local2)
                    }
    
                    And (Local0, 0x02, Local3)
                    If (LNot (Local3))
                    {
                        Subtract (LFCC, Local2, Local3)
                        Divide (LFCC, 0xC8, Local4, Local5)
                        If (LLess (Local3, Local5))
                        {
                            Store (LFCC, Local2)
                        }
                    }
                    Else
                    {
                        Divide (LFCC, 0xC8, Local4, Local5)
                        Subtract (LFCC, Local5, Local4)
                        If (LGreater (Local2, Local4))
                        {
                            Store (Local4, Local2)
                        }
                    }
    
                    If (LNot (^^LPCB.EC0.ACAP ()))
                    {
                        Divide (Local2, MBLF, Local3, Local4)
                        If (LLess (Local1, Local4))
                        {
                            Store (Local4, Local1)
                        }
                    }
    
                    Store (Local0, Index (PBST, Zero))
                    Store (Local1, Index (PBST, One))
                    Store (Local2, Index (PBST, 0x02))
                    Store (Arg3, Index (PBST, 0x03))
                }
                Method (_BIX, 0, NotSerialized)  // _BIX: Battery Information Extended
                {
                    If (LNot (^^LPCB.EC0.BATP (Zero)))
                    {
                        Return (NBIX)
                    }
    
                    If (LEqual (^^LPCB.EC0.GBTT (Zero), 0xFF))
                    {
                        Return (NBIX)
                    }
    
                    _BIF ()
                    Store (DerefOf (Index (PBIF, Zero)), Index (BIXT, One))
                    Store (DerefOf (Index (PBIF, One)), Index (BIXT, 0x02))
                    Store (DerefOf (Index (PBIF, 0x02)), Index (BIXT, 0x03))
                    Store (DerefOf (Index (PBIF, 0x03)), Index (BIXT, 0x04))
                    Store (DerefOf (Index (PBIF, 0x04)), Index (BIXT, 0x05))
                    Store (DerefOf (Index (PBIF, 0x05)), Index (BIXT, 0x06))
                    Store (DerefOf (Index (PBIF, 0x06)), Index (BIXT, 0x07))
                    Store (DerefOf (Index (PBIF, 0x07)), Index (BIXT, 0x0E))
                    Store (DerefOf (Index (PBIF, 0x08)), Index (BIXT, 0x0F))
                    Store (DerefOf (Index (PBIF, 0x09)), Index (BIXT, 0x10))
                    Store (DerefOf (Index (PBIF, 0x0A)), Index (BIXT, 0x11))
                    Store (DerefOf (Index (PBIF, 0x0B)), Index (BIXT, 0x12))
                    Store (DerefOf (Index (PBIF, 0x0C)), Index (BIXT, 0x13))
                    If (LEqual (DerefOf (Index (BIXT, One)), One))
                    {
                        Store (Zero, Index (BIXT, One))
                        Store (DerefOf (Index (BIXT, 0x05)), Local0)
                        Multiply (DerefOf (Index (BIXT, 0x02)), Local0, Index (BIXT, 0x02))
                        Multiply (DerefOf (Index (BIXT, 0x03)), Local0, Index (BIXT, 0x03))
                        Multiply (DerefOf (Index (BIXT, 0x06)), Local0, Index (BIXT, 0x06))
                        Multiply (DerefOf (Index (BIXT, 0x07)), Local0, Index (BIXT, 0x07))
                        Multiply (DerefOf (Index (BIXT, 0x0E)), Local0, Index (BIXT, 0x0E))
                        Multiply (DerefOf (Index (BIXT, 0x0F)), Local0, Index (BIXT, 0x0F))
                        Divide (DerefOf (Index (BIXT, 0x02)), 0x03E8, Local0, Index (BIXT, 0x02))
                        Divide (DerefOf (Index (BIXT, 0x03)), 0x03E8, Local0, Index (BIXT, 0x03))
                        Divide (DerefOf (Index (BIXT, 0x06)), 0x03E8, Local0, Index (BIXT, 0x06))
                        Divide (DerefOf (Index (BIXT, 0x07)), 0x03E8, Local0, Index (BIXT, 0x07))
                        Divide (DerefOf (Index (BIXT, 0x0E)), 0x03E8, Local0, Index (BIXT, 0x0E))
                        Divide (DerefOf (Index (BIXT, 0x0F)), 0x03E8, Local0, Index (BIXT, 0x0F))
                    }
    
                    Store (B1B2(^^LPCB.EC0.XC30,^^LPCB.EC0.XC31), Index (BIXT, 0x08))
                    Store (0x0001869F, Index (BIXT, 0x09))
                    Return (BIXT)
                }
    
        }
        }
        Scope (_SB.PCI0.LPCB.EC0)
        {
            Method (BIFA, 0, NotSerialized)
            {
                If (ECAV ())
                {
                    If (BSLF)
                    {
                        Store (B1B2(B1S0,B1S1), Local0)
                    }
                    Else
                    {
                        Store (B1B2(B0S0,B0S1), Local0)
                    }
                }
                Else
                {
                    Store (Ones, Local0)
                }
    
                Return (Local0)
            }
        }
    
        Method (B1B2, 2, NotSerialized) { Return (Or (Arg0, ShiftLeft (Arg1, 8))) }
    
        // added methods (group 2)
        Scope (_SB.PCI0.LPCB.EC0)
        {
            Scope (EC0)
            {
                Method (RDBA, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BA00, Index(TEMP, 0x00))
                    Store (BA01, Index(TEMP, 0x01))
                    Store (BA02, Index(TEMP, 0x02))
                    Store (BA03, Index(TEMP, 0x03))
                    Store (BA04, Index(TEMP, 0x04))
                    Store (BA05, Index(TEMP, 0x05))
                    Store (BA06, Index(TEMP, 0x06))
                    Store (BA07, Index(TEMP, 0x07))
                    Store (BA08, Index(TEMP, 0x08))
                    Store (BA09, Index(TEMP, 0x09))
                    Store (BA0A, Index(TEMP, 0x0A))
                    Store (BA0B, Index(TEMP, 0x0B))
                    Store (BA0C, Index(TEMP, 0x0C))
                    Store (BA0D, Index(TEMP, 0x0D))
                    Store (BA0E, Index(TEMP, 0x0E))
                    Store (BA0F, Index(TEMP, 0x0F))
                    Store (BA10, Index(TEMP, 0x10))
                    Store (BA11, Index(TEMP, 0x11))
                    Store (BA12, Index(TEMP, 0x12))
                    Store (BA13, Index(TEMP, 0x13))
                    Store (BA14, Index(TEMP, 0x14))
                    Store (BA15, Index(TEMP, 0x15))
                    Store (BA16, Index(TEMP, 0x16))
                    Store (BA17, Index(TEMP, 0x17))
                    Store (BA18, Index(TEMP, 0x18))
                    Store (BA19, Index(TEMP, 0x19))
                    Store (BA1A, Index(TEMP, 0x1A))
                    Store (BA1B, Index(TEMP, 0x1B))
                    Store (BA1C, Index(TEMP, 0x1C))
                    Store (BA1D, Index(TEMP, 0x1D))
                    Store (BA1E, Index(TEMP, 0x1E))
                    Store (BA1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBA, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BA00)
                    Store (DerefOf(Index(TEMP, 0x01)), BA01)
                    Store (DerefOf(Index(TEMP, 0x02)), BA02)
                    Store (DerefOf(Index(TEMP, 0x03)), BA03)
                    Store (DerefOf(Index(TEMP, 0x04)), BA04)
                    Store (DerefOf(Index(TEMP, 0x05)), BA05)
                    Store (DerefOf(Index(TEMP, 0x06)), BA06)
                    Store (DerefOf(Index(TEMP, 0x07)), BA07)
                    Store (DerefOf(Index(TEMP, 0x08)), BA08)
                    Store (DerefOf(Index(TEMP, 0x09)), BA09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BA0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BA0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BA0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BA0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BA0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BA0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BA10)
                    Store (DerefOf(Index(TEMP, 0x11)), BA11)
                    Store (DerefOf(Index(TEMP, 0x12)), BA12)
                    Store (DerefOf(Index(TEMP, 0x13)), BA13)
                    Store (DerefOf(Index(TEMP, 0x14)), BA14)
                    Store (DerefOf(Index(TEMP, 0x15)), BA15)
                    Store (DerefOf(Index(TEMP, 0x16)), BA16)
                    Store (DerefOf(Index(TEMP, 0x17)), BA17)
                    Store (DerefOf(Index(TEMP, 0x18)), BA18)
                    Store (DerefOf(Index(TEMP, 0x19)), BA19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BA1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BA1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BA1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BA1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BA1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BA1F)
                }
                Method (RDBB, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BB00, Index(TEMP, 0x00))
                    Store (BB01, Index(TEMP, 0x01))
                    Store (BB02, Index(TEMP, 0x02))
                    Store (BB03, Index(TEMP, 0x03))
                    Store (BB04, Index(TEMP, 0x04))
                    Store (BB05, Index(TEMP, 0x05))
                    Store (BB06, Index(TEMP, 0x06))
                    Store (BB07, Index(TEMP, 0x07))
                    Store (BB08, Index(TEMP, 0x08))
                    Store (BB09, Index(TEMP, 0x09))
                    Store (BB0A, Index(TEMP, 0x0A))
                    Store (BB0B, Index(TEMP, 0x0B))
                    Store (BB0C, Index(TEMP, 0x0C))
                    Store (BB0D, Index(TEMP, 0x0D))
                    Store (BB0E, Index(TEMP, 0x0E))
                    Store (BB0F, Index(TEMP, 0x0F))
                    Store (BB10, Index(TEMP, 0x10))
                    Store (BB11, Index(TEMP, 0x11))
                    Store (BB12, Index(TEMP, 0x12))
                    Store (BB13, Index(TEMP, 0x13))
                    Store (BB14, Index(TEMP, 0x14))
                    Store (BB15, Index(TEMP, 0x15))
                    Store (BB16, Index(TEMP, 0x16))
                    Store (BB17, Index(TEMP, 0x17))
                    Store (BB18, Index(TEMP, 0x18))
                    Store (BB19, Index(TEMP, 0x19))
                    Store (BB1A, Index(TEMP, 0x1A))
                    Store (BB1B, Index(TEMP, 0x1B))
                    Store (BB1C, Index(TEMP, 0x1C))
                    Store (BB1D, Index(TEMP, 0x1D))
                    Store (BB1E, Index(TEMP, 0x1E))
                    Store (BB1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBB, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BB00)
                    Store (DerefOf(Index(TEMP, 0x01)), BB01)
                    Store (DerefOf(Index(TEMP, 0x02)), BB02)
                    Store (DerefOf(Index(TEMP, 0x03)), BB03)
                    Store (DerefOf(Index(TEMP, 0x04)), BB04)
                    Store (DerefOf(Index(TEMP, 0x05)), BB05)
                    Store (DerefOf(Index(TEMP, 0x06)), BB06)
                    Store (DerefOf(Index(TEMP, 0x07)), BB07)
                    Store (DerefOf(Index(TEMP, 0x08)), BB08)
                    Store (DerefOf(Index(TEMP, 0x09)), BB09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BB0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BB0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BB0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BB0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BB0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BB0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BB10)
                    Store (DerefOf(Index(TEMP, 0x11)), BB11)
                    Store (DerefOf(Index(TEMP, 0x12)), BB12)
                    Store (DerefOf(Index(TEMP, 0x13)), BB13)
                    Store (DerefOf(Index(TEMP, 0x14)), BB14)
                    Store (DerefOf(Index(TEMP, 0x15)), BB15)
                    Store (DerefOf(Index(TEMP, 0x16)), BB16)
                    Store (DerefOf(Index(TEMP, 0x17)), BB17)
                    Store (DerefOf(Index(TEMP, 0x18)), BB18)
                    Store (DerefOf(Index(TEMP, 0x19)), BB19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BB1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BB1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BB1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BB1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BB1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BB1F)
                }
            }
        }            
    }
Notice how FBST and _BIX were added to scope _SB.PCI0.BAT0, but BIFA was added to _SB.PCI0.LPCB.EC0. It is important to inject all methods into their original scope.

Now, we add SMBR, SMBW, ECSB, and TACH:

```
DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
{
	// patched methods
    Scope (_SB.PCI0)
    {
        Scope (BAT0)
        {
            Method (FBST, 4, NotSerialized)
            {
                And (Arg1, 0xFFFF, Local1)
                Store (Zero, Local0)
                If (^^LPCB.EC0.ACAP ())
                {
                    Store (One, Local0)
                }

                If (Local0)
                {
                    If (CHGS (Zero))
{
	Store (0x02, Local0)
}
Else
{
	Store (Zero, Local0)
}
				}
                Else
                {
                    Store (One, Local0)
                }

                If (BLLO)
                {
                    ShiftLeft (One, 0x02, Local2)
                    Or (Local0, Local2, Local0)
                }

                If (And (^^LPCB.EC0.EB0S, 0x08))
                {
                    ShiftLeft (One, 0x02, Local2)
                    Or (Local0, Local2, Local0)
                }

                If (LGreaterEqual (Local1, 0x8000))
                {
                    Subtract (0xFFFF, Local1, Local1)
                }

                Store (Arg2, Local2)
                If (LEqual (PUNT, Zero))
                {
                    Multiply (Local1, ^^LPCB.EC0.B0DV, Local1)
                    Multiply (Local2, 0x0A, Local2)
                }

                And (Local0, 0x02, Local3)
                If (LNot (Local3))
                {
                    Subtract (LFCC, Local2, Local3)
                    Divide (LFCC, 0xC8, Local4, Local5)
                    If (LLess (Local3, Local5))
                    {
                        Store (LFCC, Local2)
                    }
                }
                Else
                {
                    Divide (LFCC, 0xC8, Local4, Local5)
                    Subtract (LFCC, Local5, Local4)
                    If (LGreater (Local2, Local4))
                    {
                        Store (Local4, Local2)
                    }
                }

                If (LNot (^^LPCB.EC0.ACAP ()))
                {
                    Divide (Local2, MBLF, Local3, Local4)
                    If (LLess (Local1, Local4))
                    {
                        Store (Local4, Local1)
                    }
                }

                Store (Local0, Index (PBST, Zero))
                Store (Local1, Index (PBST, One))
                Store (Local2, Index (PBST, 0x02))
                Store (Arg3, Index (PBST, 0x03))
            }
            Method (_BIX, 0, NotSerialized)  // _BIX: Battery Information Extended
            {
                If (LNot (^^LPCB.EC0.BATP (Zero)))
                {
                    Return (NBIX)
                }

                If (LEqual (^^LPCB.EC0.GBTT (Zero), 0xFF))
                {
                    Return (NBIX)
                }

                _BIF ()
                Store (DerefOf (Index (PBIF, Zero)), Index (BIXT, One))
                Store (DerefOf (Index (PBIF, One)), Index (BIXT, 0x02))
                Store (DerefOf (Index (PBIF, 0x02)), Index (BIXT, 0x03))
                Store (DerefOf (Index (PBIF, 0x03)), Index (BIXT, 0x04))
                Store (DerefOf (Index (PBIF, 0x04)), Index (BIXT, 0x05))
                Store (DerefOf (Index (PBIF, 0x05)), Index (BIXT, 0x06))
                Store (DerefOf (Index (PBIF, 0x06)), Index (BIXT, 0x07))
                Store (DerefOf (Index (PBIF, 0x07)), Index (BIXT, 0x0E))
                Store (DerefOf (Index (PBIF, 0x08)), Index (BIXT, 0x0F))
                Store (DerefOf (Index (PBIF, 0x09)), Index (BIXT, 0x10))
                Store (DerefOf (Index (PBIF, 0x0A)), Index (BIXT, 0x11))
                Store (DerefOf (Index (PBIF, 0x0B)), Index (BIXT, 0x12))
                Store (DerefOf (Index (PBIF, 0x0C)), Index (BIXT, 0x13))
                If (LEqual (DerefOf (Index (BIXT, One)), One))
                {
                    Store (Zero, Index (BIXT, One))
                    Store (DerefOf (Index (BIXT, 0x05)), Local0)
                    Multiply (DerefOf (Index (BIXT, 0x02)), Local0, Index (BIXT, 0x02))
                    Multiply (DerefOf (Index (BIXT, 0x03)), Local0, Index (BIXT, 0x03))
                    Multiply (DerefOf (Index (BIXT, 0x06)), Local0, Index (BIXT, 0x06))
                    Multiply (DerefOf (Index (BIXT, 0x07)), Local0, Index (BIXT, 0x07))
                    Multiply (DerefOf (Index (BIXT, 0x0E)), Local0, Index (BIXT, 0x0E))
                    Multiply (DerefOf (Index (BIXT, 0x0F)), Local0, Index (BIXT, 0x0F))
                    Divide (DerefOf (Index (BIXT, 0x02)), 0x03E8, Local0, Index (BIXT, 0x02))
                    Divide (DerefOf (Index (BIXT, 0x03)), 0x03E8, Local0, Index (BIXT, 0x03))
                    Divide (DerefOf (Index (BIXT, 0x06)), 0x03E8, Local0, Index (BIXT, 0x06))
                    Divide (DerefOf (Index (BIXT, 0x07)), 0x03E8, Local0, Index (BIXT, 0x07))
                    Divide (DerefOf (Index (BIXT, 0x0E)), 0x03E8, Local0, Index (BIXT, 0x0E))
                    Divide (DerefOf (Index (BIXT, 0x0F)), 0x03E8, Local0, Index (BIXT, 0x0F))
                }

                Store (B1B2(^^LPCB.EC0.XC30,^^LPCB.EC0.XC31), Index (BIXT, 0x08))
                Store (0x0001869F, Index (BIXT, 0x09))
                Return (BIXT)
            }

    }
    }
    Scope (_SB.PCI0.LPCB.EC0)
    {
        Method (BIFA, 0, NotSerialized)
        {
            If (ECAV ())
            {
                If (BSLF)
                {
                    Store (B1B2(B1S0,B1S1), Local0)
                }
                Else
                {
                    Store (B1B2(B0S0,B0S1), Local0)
                }
            }
            Else
            {
                Store (Ones, Local0)
            }

            Return (Local0)
        }
        Method (SMBR, 3, Serialized)
        {
            Store (Package (0x03)
                {
                    0x07,
                    Zero,
                    Zero
                }, Local0)
            If (LNot (ECAV ()))
            {
                Return (Local0)
            }

            If (LNotEqual (Arg0, RDBL))
            {
                If (LNotEqual (Arg0, RDWD))
                {
                    If (LNotEqual (Arg0, RDBT))
                    {
                        If (LNotEqual (Arg0, RCBT))
                        {
                            If (LNotEqual (Arg0, RDQK))
                            {
                                Return (Local0)
                            }
                        }
                    }
                }
            }

            Acquire (MUEC, 0xFFFF)
            Store (PRTC, Local1)
            Store (Zero, Local2)
            While (LNotEqual (Local1, Zero))
            {
                Stall (0x0A)
                Increment (Local2)
                If (LGreater (Local2, 0x03E8))
                {
                    Store (SBBY, Index (Local0, Zero))
                    Store (Zero, Local1)
                }
                Else
                {
                    Store (PRTC, Local1)
                }
            }

            If (LLessEqual (Local2, 0x03E8))
            {
                ShiftLeft (Arg1, One, Local3)
                Or (Local3, One, Local3)
                Store (Local3, ADDR)
                If (LNotEqual (Arg0, RDQK))
                {
                    If (LNotEqual (Arg0, RCBT))
                    {
                        Store (Arg2, CMDB)
                    }
                }

                WRBA(Zero)
                Store (Arg0, PRTC)
                Store (SWTC (Arg0), Index (Local0, Zero))
                If (LEqual (DerefOf (Index (Local0, Zero)), Zero))
                {
                    If (LEqual (Arg0, RDBL))
                    {
                        Store (BCNT, Index (Local0, One))
                        Store (RDBA(), Index (Local0, 0x02))
                    }

                    If (LEqual (Arg0, RDWD))
                    {
                        Store (0x02, Index (Local0, One))
                        Store (B1B2(T2B0,T2B1), Index (Local0, 0x02))
                    }

                    If (LEqual (Arg0, RDBT))
                    {
                        Store (One, Index (Local0, One))
                        Store (DAT0, Index (Local0, 0x02))
                    }

                    If (LEqual (Arg0, RCBT))
                    {
                        Store (One, Index (Local0, One))
                        Store (DAT0, Index (Local0, 0x02))
                    }
                }
            }

            Release (MUEC)
            Return (Local0)
        }
        Method (SMBW, 5, Serialized)
        {
            Store (Package (0x01)
                {
                    0x07
                }, Local0)
            If (LNot (ECAV ()))
            {
                Return (Local0)
            }

            If (LNotEqual (Arg0, WRBL))
            {
                If (LNotEqual (Arg0, WRWD))
                {
                    If (LNotEqual (Arg0, WRBT))
                    {
                        If (LNotEqual (Arg0, SDBT))
                        {
                            If (LNotEqual (Arg0, WRQK))
                            {
                                Return (Local0)
                            }
                        }
                    }
                }
            }

            Acquire (MUEC, 0xFFFF)
            Store (PRTC, Local1)
            Store (Zero, Local2)
            While (LNotEqual (Local1, Zero))
            {
                Stall (0x0A)
                Increment (Local2)
                If (LGreater (Local2, 0x03E8))
                {
                    Store (SBBY, Index (Local0, Zero))
                    Store (Zero, Local1)
                }
                Else
                {
                    Store (PRTC, Local1)
                }
            }

            If (LLessEqual (Local2, 0x03E8))
            {
                WRBA(Zero)
                ShiftLeft (Arg1, One, Local3)
                Store (Local3, ADDR)
                If (LNotEqual (Arg0, WRQK))
                {
                    If (LNotEqual (Arg0, SDBT))
                    {
                        Store (Arg2, CMDB)
                    }
                }

                If (LEqual (Arg0, WRBL))
                {
                    Store (Arg3, BCNT)
                    WRBA(Arg4)
                }

                If (LEqual (Arg0, WRWD))
                {
                    Store(Arg4,T2B0) Store(ShiftRight(Arg4,8),T2B1)
                }

                If (LEqual (Arg0, WRBT))
                {
                    Store (Arg4, DAT0)
                }

                If (LEqual (Arg0, SDBT))
                {
                    Store (Arg4, DAT0)
                }

                Store (Arg0, PRTC)
                Store (SWTC (Arg0), Index (Local0, Zero))
            }

            Release (MUEC)
            Return (Local0)
        }
        Method (ECSB, 7, NotSerialized)
        {
            Store (Package (0x05)
                {
                    0x11,
                    Zero,
                    Zero,
                    Zero,
                    Buffer (0x20){}
                }, Local1)
            If (LGreater (Arg0, One))
            {
                Return (Local1)
            }

            If (ECAV ())
            {
                Acquire (MUEC, 0xFFFF)
                If (LEqual (Arg0, Zero))
                {
                    Store (PRTC, Local0)
                }
                Else
                {
                    Store (PRT2, Local0)
                }

                Store (Zero, Local2)
                While (LNotEqual (Local0, Zero))
                {
                    Stall (0x0A)
                    Increment (Local2)
                    If (LGreater (Local2, 0x03E8))
                    {
                        Store (SBBY, Index (Local1, Zero))
                        Store (Zero, Local0)
                    }
                    ElseIf (LEqual (Arg0, Zero))
                    {
                        Store (PRTC, Local0)
                    }
                    Else
                    {
                        Store (PRT2, Local0)
                    }
                }

                If (LLessEqual (Local2, 0x03E8))
                {
                    If (LEqual (Arg0, Zero))
                    {
                        Store (Arg2, ADDR)
                        Store (Arg3, CMDB)
                        If (LOr (LEqual (Arg1, 0x0A), LEqual (Arg1, 0x0B)))
                        {
                            Store (DerefOf (Index (Arg6, Zero)), BCNT)
                            WRBA(DerefOf (Index (Arg6, One)))
                        }
                        Else
                        {
                            Store (Arg4, DAT0)
                            Store (Arg5, DAT1)
                        }

                        Store (Arg1, PRTC)
                    }
                    Else
                    {
                        Store (Arg2, ADD2)
                        Store (Arg3, CMD2)
                        If (LOr (LEqual (Arg1, 0x0A), LEqual (Arg1, 0x0B)))
                        {
                            Store (DerefOf (Index (Arg6, Zero)), BCN2)
                            WRBB(DerefOf (Index (Arg6, One)))
                        }
                        Else
                        {
                            Store (Arg4, DA20)
                            Store (Arg5, DA21)
                        }

                        Store (Arg1, PRT2)
                    }

                    Store (0x7F, Local0)
                    If (LEqual (Arg0, Zero))
                    {
                        While (PRTC)
                        {
                            Sleep (One)
                            Decrement (Local0)
                        }
                    }
                    Else
                    {
                        While (PRT2)
                        {
                            Sleep (One)
                            Decrement (Local0)
                        }
                    }

                    If (Local0)
                    {
                        If (LEqual (Arg0, Zero))
                        {
                            Store (SSTS, Local0)
                            Store (DAT0, Index (Local1, One))
                            Store (DAT1, Index (Local1, 0x02))
                            Store (BCNT, Index (Local1, 0x03))
                            Store (RDBA(), Index (Local1, 0x04))
                        }
                        Else
                        {
                            Store (SST2, Local0)
                            Store (DA20, Index (Local1, One))
                            Store (DA21, Index (Local1, 0x02))
                            Store (BCN2, Index (Local1, 0x03))
                            Store (RDBB(), Index (Local1, 0x04))
                        }

                        And (Local0, 0x1F, Local0)
                        If (Local0)
                        {
                            Add (Local0, 0x10, Local0)
                        }

                        Store (Local0, Index (Local1, Zero))
                    }
                    Else
                    {
                        Store (0x10, Index (Local1, Zero))
                    }
                }

                Release (MUEC)
            }

            Return (Local1)
        }
        Method (TACH, 1, Serialized)
        {
            If (ECAV ())
            {
                Switch (Arg0)
                {
                    Case (Zero)
                    {
                        Store (B1B2(TH00,TH01), Local0)
                        Break
                    }
                    Case (One)
                    {
                        Store (B1B2(TH10,TH11), Local0)
                        Break
                    }
                    Default
                    {
                        Return (Ones)
                    }

                }

                Multiply (Local0, 0x02, Local0)
                If (LNotEqual (Local0, Zero))
                {
                    Divide (0x0041CDB4, Local0, Local1, Local0)
                    Return (Local0)
                }
                Else
                {
                    Return (Ones)
                }
            }
            Else
            {
                Return (Ones)
            }
        }    
    }

    Method (B1B2, 2, NotSerialized) { Return (Or (Arg0, ShiftLeft (Arg1, 8))) }

    // added methods (group 2)
    Scope (_SB.PCI0.LPCB)
    {
        Scope (EC0)
        {
            Method (RDBA, 0, Serialized)
            {
                Name (TEMP, Buffer(0x20) { })
                Store (BA00, Index(TEMP, 0x00))
                Store (BA01, Index(TEMP, 0x01))
                Store (BA02, Index(TEMP, 0x02))
                Store (BA03, Index(TEMP, 0x03))
                Store (BA04, Index(TEMP, 0x04))
                Store (BA05, Index(TEMP, 0x05))
                Store (BA06, Index(TEMP, 0x06))
                Store (BA07, Index(TEMP, 0x07))
                Store (BA08, Index(TEMP, 0x08))
                Store (BA09, Index(TEMP, 0x09))
                Store (BA0A, Index(TEMP, 0x0A))
                Store (BA0B, Index(TEMP, 0x0B))
                Store (BA0C, Index(TEMP, 0x0C))
                Store (BA0D, Index(TEMP, 0x0D))
                Store (BA0E, Index(TEMP, 0x0E))
                Store (BA0F, Index(TEMP, 0x0F))
                Store (BA10, Index(TEMP, 0x10))
                Store (BA11, Index(TEMP, 0x11))
                Store (BA12, Index(TEMP, 0x12))
                Store (BA13, Index(TEMP, 0x13))
                Store (BA14, Index(TEMP, 0x14))
                Store (BA15, Index(TEMP, 0x15))
                Store (BA16, Index(TEMP, 0x16))
                Store (BA17, Index(TEMP, 0x17))
                Store (BA18, Index(TEMP, 0x18))
                Store (BA19, Index(TEMP, 0x19))
                Store (BA1A, Index(TEMP, 0x1A))
                Store (BA1B, Index(TEMP, 0x1B))
                Store (BA1C, Index(TEMP, 0x1C))
                Store (BA1D, Index(TEMP, 0x1D))
                Store (BA1E, Index(TEMP, 0x1E))
                Store (BA1F, Index(TEMP, 0x1F))
                Return (TEMP)
            }
            Method (WRBA, 1, Serialized)
            {
                Name (TEMP, Buffer(0x20) { })
                Store (Arg0, TEMP)
                Store (DerefOf(Index(TEMP, 0x00)), BA00)
                Store (DerefOf(Index(TEMP, 0x01)), BA01)
                Store (DerefOf(Index(TEMP, 0x02)), BA02)
                Store (DerefOf(Index(TEMP, 0x03)), BA03)
                Store (DerefOf(Index(TEMP, 0x04)), BA04)
                Store (DerefOf(Index(TEMP, 0x05)), BA05)
                Store (DerefOf(Index(TEMP, 0x06)), BA06)
                Store (DerefOf(Index(TEMP, 0x07)), BA07)
                Store (DerefOf(Index(TEMP, 0x08)), BA08)
                Store (DerefOf(Index(TEMP, 0x09)), BA09)
                Store (DerefOf(Index(TEMP, 0x0A)), BA0A)
                Store (DerefOf(Index(TEMP, 0x0B)), BA0B)
                Store (DerefOf(Index(TEMP, 0x0C)), BA0C)
                Store (DerefOf(Index(TEMP, 0x0D)), BA0D)
                Store (DerefOf(Index(TEMP, 0x0E)), BA0E)
                Store (DerefOf(Index(TEMP, 0x0F)), BA0F)
                Store (DerefOf(Index(TEMP, 0x10)), BA10)
                Store (DerefOf(Index(TEMP, 0x11)), BA11)
                Store (DerefOf(Index(TEMP, 0x12)), BA12)
                Store (DerefOf(Index(TEMP, 0x13)), BA13)
                Store (DerefOf(Index(TEMP, 0x14)), BA14)
                Store (DerefOf(Index(TEMP, 0x15)), BA15)
                Store (DerefOf(Index(TEMP, 0x16)), BA16)
                Store (DerefOf(Index(TEMP, 0x17)), BA17)
                Store (DerefOf(Index(TEMP, 0x18)), BA18)
                Store (DerefOf(Index(TEMP, 0x19)), BA19)
                Store (DerefOf(Index(TEMP, 0x1A)), BA1A)
                Store (DerefOf(Index(TEMP, 0x1B)), BA1B)
                Store (DerefOf(Index(TEMP, 0x1C)), BA1C)
                Store (DerefOf(Index(TEMP, 0x1D)), BA1D)
                Store (DerefOf(Index(TEMP, 0x1E)), BA1E)
                Store (DerefOf(Index(TEMP, 0x1F)), BA1F)
            }
            Method (RDBB, 0, Serialized)
            {
                Name (TEMP, Buffer(0x20) { })
                Store (BB00, Index(TEMP, 0x00))
                Store (BB01, Index(TEMP, 0x01))
                Store (BB02, Index(TEMP, 0x02))
                Store (BB03, Index(TEMP, 0x03))
                Store (BB04, Index(TEMP, 0x04))
                Store (BB05, Index(TEMP, 0x05))
                Store (BB06, Index(TEMP, 0x06))
                Store (BB07, Index(TEMP, 0x07))
                Store (BB08, Index(TEMP, 0x08))
                Store (BB09, Index(TEMP, 0x09))
                Store (BB0A, Index(TEMP, 0x0A))
                Store (BB0B, Index(TEMP, 0x0B))
                Store (BB0C, Index(TEMP, 0x0C))
                Store (BB0D, Index(TEMP, 0x0D))
                Store (BB0E, Index(TEMP, 0x0E))
                Store (BB0F, Index(TEMP, 0x0F))
                Store (BB10, Index(TEMP, 0x10))
                Store (BB11, Index(TEMP, 0x11))
                Store (BB12, Index(TEMP, 0x12))
                Store (BB13, Index(TEMP, 0x13))
                Store (BB14, Index(TEMP, 0x14))
                Store (BB15, Index(TEMP, 0x15))
                Store (BB16, Index(TEMP, 0x16))
                Store (BB17, Index(TEMP, 0x17))
                Store (BB18, Index(TEMP, 0x18))
                Store (BB19, Index(TEMP, 0x19))
                Store (BB1A, Index(TEMP, 0x1A))
                Store (BB1B, Index(TEMP, 0x1B))
                Store (BB1C, Index(TEMP, 0x1C))
                Store (BB1D, Index(TEMP, 0x1D))
                Store (BB1E, Index(TEMP, 0x1E))
                Store (BB1F, Index(TEMP, 0x1F))
                Return (TEMP)
            }
            Method (WRBB, 1, Serialized)
            {
                Name (TEMP, Buffer(0x20) { })
                Store (Arg0, TEMP)
                Store (DerefOf(Index(TEMP, 0x00)), BB00)
                Store (DerefOf(Index(TEMP, 0x01)), BB01)
                Store (DerefOf(Index(TEMP, 0x02)), BB02)
                Store (DerefOf(Index(TEMP, 0x03)), BB03)
                Store (DerefOf(Index(TEMP, 0x04)), BB04)
                Store (DerefOf(Index(TEMP, 0x05)), BB05)
                Store (DerefOf(Index(TEMP, 0x06)), BB06)
                Store (DerefOf(Index(TEMP, 0x07)), BB07)
                Store (DerefOf(Index(TEMP, 0x08)), BB08)
                Store (DerefOf(Index(TEMP, 0x09)), BB09)
                Store (DerefOf(Index(TEMP, 0x0A)), BB0A)
                Store (DerefOf(Index(TEMP, 0x0B)), BB0B)
                Store (DerefOf(Index(TEMP, 0x0C)), BB0C)
                Store (DerefOf(Index(TEMP, 0x0D)), BB0D)
                Store (DerefOf(Index(TEMP, 0x0E)), BB0E)
                Store (DerefOf(Index(TEMP, 0x0F)), BB0F)
                Store (DerefOf(Index(TEMP, 0x10)), BB10)
                Store (DerefOf(Index(TEMP, 0x11)), BB11)
                Store (DerefOf(Index(TEMP, 0x12)), BB12)
                Store (DerefOf(Index(TEMP, 0x13)), BB13)
                Store (DerefOf(Index(TEMP, 0x14)), BB14)
                Store (DerefOf(Index(TEMP, 0x15)), BB15)
                Store (DerefOf(Index(TEMP, 0x16)), BB16)
                Store (DerefOf(Index(TEMP, 0x17)), BB17)
                Store (DerefOf(Index(TEMP, 0x18)), BB18)
                Store (DerefOf(Index(TEMP, 0x19)), BB19)
                Store (DerefOf(Index(TEMP, 0x1A)), BB1A)
                Store (DerefOf(Index(TEMP, 0x1B)), BB1B)
                Store (DerefOf(Index(TEMP, 0x1C)), BB1C)
                Store (DerefOf(Index(TEMP, 0x1D)), BB1D)
                Store (DerefOf(Index(TEMP, 0x1E)), BB1E)
                Store (DerefOf(Index(TEMP, 0x1F)), BB1F)
            }
        }
    }
}
```

With all the nodes expanded in MaciASL, our work looks like this:
![ssd_with_nodes_expanded](http://ovefvi4g3.bkt.clouddn.com/ssd_with_nodes_expanded.png)

### Resolving errors

Now we need to start resolving errors by using External or defining the patched EC fields as necessary.
We can use the compiler to help.

Clicking Compile will show the first error: "3, 6085, Object not found or not accessible from scope (_SB.PCI0)"
It is at this line:

    Scope (_SB.PCI0)

The compiler is indicating that _SB.PCI0 is not declared, so you can't use it in a Scope operator.

We need to declare it with External, as the scope is actually defined in another file (DSDT.aml):
Add it to the top of the file:

```
DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
{
	External(_SB.PCI0, DeviceObj)
	Scope (_SB.PCI0)
	{
...
```

Now the next error is at "Scope(BAT0)", so, again:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        Scope (_SB.PCI0)
        {
            Scope (BAT0)
            {
    ...
The next error is "13, 6085, Object not found or not accessible from scope (^^LPCB.EC0.ACAP)"
We can tell from the code referencing ACAP that it is a method:

    If (^^LPCB.EC0.ACAP ())

Note: Method calls are indicated by the "()" (in this case, an empty parameter list).

So, we know we can add an External as MethodObj:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
    ...
    }
Note: The path ^^LPCB.EC0.ACAP is equivalent to _SB.PCI0.LPCB.EC0.ACAP because the reference was in scope _SB.PCI0.BAT0.FBST (the path of the FBST method). Each ^ (parent of) operator walks up the current scope by one item, so ^ is _SB.PCI0.BAT0, and ^^ is _SB.PCI0.

In some cases, you need to look at the DSDT to find the path and/or type of a given identifier. For example, the next error has to do with CHGS. Again, we know it is a method as it is the target of a method call, but for the path, we must refer to the DSDT:
Code (Text):

    Scope (\)
    {
        Method (CHGS, 1, Serialized)
        {
            Store (\_SB.PCI0.LPCB.EC0.BCHG (Arg0), Local0)
            Return (Local0)
        }

So, it is in the root:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
    ...
The next undefined symbol, BLLO, is something other than a method:

    If (BLLO)
    {

Looking in DSDT, we find it is defined with Name (and it happens to be in root scope):

    Name (BLLO, Zero)

Which makes it an IntObj:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
        External(BLLO, IntObj)
    ...

Fixing all the errors in the FBST method:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
        External(BLLO, IntObj)
        External(_SB.PCI0.LPCB.EC0.EB0S, FieldUnitObj)
        External(_SB.PCI0.BAT0.PUNT, IntObj)
        External(_SB.PCI0.LPCB.EC0.B0DV, FieldUnitObj)
        External(_SB.PCI0.BAT0.LFCC, IntObj)
        External(MBLF, IntObj)
        External(_SB.PCI0.BAT0.PBST, PkgObj)
    ...
And now continue with the same process.

Eventually, you will have:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
        External(BLLO, IntObj)
        External(_SB.PCI0.LPCB.EC0.EB0S, FieldUnitObj)
        External(_SB.PCI0.BAT0.PUNT, IntObj)
        External(_SB.PCI0.LPCB.EC0.B0DV, FieldUnitObj)
        External(_SB.PCI0.BAT0.LFCC, IntObj)
        External(MBLF, IntObj)
        External(_SB.PCI0.BAT0.PBST, PkgObj)
        External(_SB.PCI0.LPCB.EC0.BATP, MethodObj)
        External(_SB.PCI0.BAT0.NBIX, PkgObj)
        External(_SB.PCI0.LPCB.EC0.GBTT, MethodObj)
        External(_SB.PCI0.BAT0._BIF, MethodObj)
        External(_SB.PCI0.BAT0.PBIF, PkgObj)
        External(_SB.PCI0.BAT0.BIXT, PkgObj)
    ...
And will come to an error with XC30/XC31: "153, 6085, Object not found or not accessible from scope (^^LPCB.EC0.XC30)"

This is one of the 16-bit fields that was broken into two.
And this is where it is necessary to create the EC overlay.

To do this, we use another OperationRegion within EC scope, that has a different name than what we find in DSDT:

    External(_SB.PCI0.LPCB, DeviceObj)
    External(_SB.PCI0.LPCB.EC0, DeviceObj)
    Scope(_SB.PCI0.LPCB.EC0)
    {
        OperationRegion (ERM2, EmbeddedControl, Zero, 0xFF)
        Field(ERM2, ByteAcc, NoLock, Preserve)
        {
        }
    }

And from DSDT_patched.dsl, we can get the various patched fields (again refer to the diffmerge).
This is the entire set from ECOR in the DSDT_patched.dsl

    Offset (0x04),
    CMD1,   8,
    CDT1,   8,
    CDT2,   8,
    CDT3,   8,
    Offset (0x80),
    Offset (0x81),
    Offset (0x82),
    Offset (0x83),
    EB0R,   8,
    EB1R,   8,
    EPWF,   8,
    Offset (0x87),
    Offset (0x88),
    Offset (0x89),
    Offset (0x8A),
    HKEN,   1,
    Offset (0x93),
    TH00,8,TH01,8,
    TH10,8,TH11,8,
    TSTP,   8,
    Offset (0x9C),
    CDT4,   8,
    CDT5,   8,
    Offset (0xA0),
    Offset (0xA1),
    Offset (0xA2),
    Offset (0xA3),
    EACT,   8,
    TH1R,   8,
    TH1L,   8,
    TH0R,   8,
    TH0L,   8,
    Offset (0xB0),
    B0PN,   16,
    Offset (0xB4),
    Offset (0xB6),
    Offset (0xB8),
    Offset (0xBA),
    Offset (0xBC),
    Offset (0xBE),
    B0TM,   16,
    B0C1,   16,
    B0C2,   16,
    XC30,8,XC31,8,
    B0C4,   16,
    Offset (0xD0),
    B1PN,   16,
    Offset (0xD4),
    Offset (0xD6),
    Offset (0xD8),
    Offset (0xDA),
    Offset (0xDC),
    Offset (0xDE),
    B1TM,   16,
    B1C1,   16,
    B1C2,   16,
    YC30,8,YC31,8,
    B1C4,   16,
    Offset (0xF0),
    Offset (0xF2),
    Offset (0xF4),
    B0S0,8,B0S1,8,
    Offset (0xF8),
    Offset (0xFA),
    Offset (0xFC),
    B1S0,8,B1S1,8

And if we strip the unpatched identifiers, but keep the offsets correct (very important!):

    Offset (0x93),
    TH00,8,TH01,8,
    TH10,8,TH11,8,
    Offset (0xBE),
    /*B0TM*/,   16,
    /*B0C1*/,   16,
    /*B0C2*/,   16,
    XC30,8,XC31,8,
    Offset (0xDE),
    /*B1TM*/,   16,
    /*B1C1*/,   16,
    /*B1C2*/,   16,
    YC30,8,YC31,8,
    Offset (0xF4),
    B0S0,8,B0S1,8,
    Offset (0xFC),
    B1S0,8,B1S1,8

The same thing can be written as follows:

    Offset (0x93),
    TH00,8,TH01,8,
    TH10,8,TH11,8,
    Offset (0xc4),
    XC30,8,XC31,8,
    Offset (0xe4),
    YC30,8,YC31,8,
    Offset (0xF4),
    B0S0,8,B0S1,8,
    Offset (0xFC),
    B1S0,8,B1S1,8

So, into our SSDT:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
        External(BLLO, IntObj)
        External(_SB.PCI0.LPCB.EC0.EB0S, FieldUnitObj)
        External(_SB.PCI0.BAT0.PUNT, IntObj)
        External(_SB.PCI0.LPCB.EC0.B0DV, FieldUnitObj)
        External(_SB.PCI0.BAT0.LFCC, IntObj)
        External(MBLF, IntObj)
        External(_SB.PCI0.BAT0.PBST, PkgObj)
        External(_SB.PCI0.LPCB.EC0.BATP, MethodObj)
        External(_SB.PCI0.BAT0.NBIX, PkgObj)
        External(_SB.PCI0.LPCB.EC0.GBTT, MethodObj)
        External(_SB.PCI0.BAT0._BIF, MethodObj)
        External(_SB.PCI0.BAT0.PBIF, PkgObj)
        External(_SB.PCI0.BAT0.BIXT, PkgObj)
    
        External(_SB.PCI0.LPCB, DeviceObj)
        External(_SB.PCI0.LPCB.EC0, DeviceObj)
        Scope(_SB.PCI0.LPCB.EC0)
        {
            OperationRegion (ERM2, EmbeddedControl, Zero, 0xFF)
            Field(ERM2, ByteAcc, NoLock, Preserve)
            {
                    Offset (0x93),
                    TH00,8,TH01,8,
                    TH10,8,TH11,8,
                    Offset (0xc4),
                    XC30,8,XC31,8,
                    Offset (0xe4),
                    YC30,8,YC31,8,
                    Offset (0xF4),
                    B0S0,8,B0S1,8,
                    Offset (0xFC),
                    B1S0,8,B1S1,8
            }
        }

And then on to fixing more errors, we add some more External:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
        External(BLLO, IntObj)
        External(_SB.PCI0.LPCB.EC0.EB0S, FieldUnitObj)
        External(_SB.PCI0.BAT0.PUNT, IntObj)
        External(_SB.PCI0.LPCB.EC0.B0DV, FieldUnitObj)
        External(_SB.PCI0.BAT0.LFCC, IntObj)
        External(MBLF, IntObj)
        External(_SB.PCI0.BAT0.PBST, PkgObj)
        External(_SB.PCI0.LPCB.EC0.BATP, MethodObj)
        External(_SB.PCI0.BAT0.NBIX, PkgObj)
        External(_SB.PCI0.LPCB.EC0.GBTT, MethodObj)
        External(_SB.PCI0.BAT0._BIF, MethodObj)
        External(_SB.PCI0.BAT0.PBIF, PkgObj)
        External(_SB.PCI0.BAT0.BIXT, PkgObj)
        External(_SB.PCI0.LPCB.EC0.ECAV, MethodObj)
        External(BSLF, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDBL, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDWD, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDBT, IntObj)
        External(_SB.PCI0.LPCB.EC0.RCBT, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDQK, IntObj)
        External(_SB.PCI0.LPCB.EC0.MUEC, MutexObj)
        External(_SB.PCI0.LPCB.EC0.PRTC, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.SBBY, IntObj)
        External(_SB.PCI0.LPCB.EC0.ADDR, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.CMDB, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.SWTC, MethodObj)
        External(_SB.PCI0.LPCB.EC0.BCNT, FieldUnitObj)
    
        External(_SB.PCI0.LPCB, DeviceObj)
        External(_SB.PCI0.LPCB.EC0, DeviceObj)
        Scope(_SB.PCI0.LPCB.EC0)
        {
    ...
And then we have errors with T2B0 and T2B1. These are again broken down 16-bit EC fields that need to be defined in our EC overlay. In fact, might as well define the rest we know we need (from diffmerge data).

There is patched data in SMBX:

    OperationRegion (SMBX, EmbeddedControl, 0x18, 0x28)

So, we create a similar overlay, with a unique name:

    			OperationRegion (RMB1, EmbeddedControl, 0x18, 0x28)
    			Field (RMB1, ByteAcc, NoLock, Preserve)
    			{
    /* Note: disabling these fields (already defined in DSDT, referenced with External if needed,
    	but keeping the correct offset! (very important!) */
    */
    				PRTC,   8,
                    SSTS,   5,
                        ,   1,
                    ALFG,   1,
                    CDFG,   1,
                    ADDR,   8,
                    CMDB,   8, */
             Offset(4), // the data above is 4 bytes offset from the start of this region!
                    //BDAT, 256,
    BA00,8,BA01,8,BA02,8,BA03,8,
    BA04,8,BA05,8,BA06,8,BA07,8,
    BA08,8,BA09,8,BA0A,8,BA0B,8,
    BA0C,8,BA0D,8,BA0E,8,BA0F,8,
    BA10,8,BA11,8,BA12,8,BA13,8,
    BA14,8,BA15,8,BA16,8,BA17,8,
    BA18,8,BA19,8,BA1A,8,BA1B,8,
    BA1C,8,BA1D,8,BA1E,8,BA1F,8
    			}

And similar withe SMB2 region:

    			OperationRegion(RMB2, EmbeddedControl, 0x40, 0x28)
            	Field (RMB2, ByteAcc, NoLock, Preserve)
            	{
    /*
    				PRT2,   8,
                    SST2,   5,
                        ,   1,
                    ALF2,   1,
                    CDF2,   1,
                    ADD2,   8,
                    CMD2,   8, */
          Offset(4),
                    //BDA2, 256,
    BB00,8,BB01,8,BB02,8,BB03,8,
    BB04,8,BB05,8,BB06,8,BB07,8,
    BB08,8,BB09,8,BB0A,8,BB0B,8,
    BB0C,8,BB0D,8,BB0E,8,BB0F,8,
    BB10,8,BB11,8,BB12,8,BB13,8,
    BB14,8,BB15,8,BB16,8,BB17,8,
    BB18,8,BB19,8,BB1A,8,BB1B,8,
    BB1C,8,BB1D,8,BB1E,8,BB1F,8
    			}

And the T2B0 and T2B1 that are in orginal SMBX, but now RMB1:

    Field (RMB1, ByteAcc, NoLock, Preserve)
    {
        Offset (0x04),
        T2B0,8,T2B1,8
    }

And now we have:

    External(_SB.PCI0, DeviceObj)
    External(_SB.PCI0.BAT0, DeviceObj)
    External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
    External(CHGS, MethodObj)
    External(BLLO, IntObj)
    External(_SB.PCI0.LPCB.EC0.EB0S, FieldUnitObj)
    External(_SB.PCI0.BAT0.PUNT, IntObj)
    External(_SB.PCI0.LPCB.EC0.B0DV, FieldUnitObj)
    External(_SB.PCI0.BAT0.LFCC, IntObj)
    External(MBLF, IntObj)
    External(_SB.PCI0.BAT0.PBST, PkgObj)
    External(_SB.PCI0.LPCB.EC0.BATP, MethodObj)
    External(_SB.PCI0.BAT0.NBIX, PkgObj)
    External(_SB.PCI0.LPCB.EC0.GBTT, MethodObj)
    External(_SB.PCI0.BAT0._BIF, MethodObj)
    External(_SB.PCI0.BAT0.PBIF, PkgObj)
    External(_SB.PCI0.BAT0.BIXT, PkgObj)
    External(_SB.PCI0.LPCB.EC0.ECAV, MethodObj)
    External(BSLF, IntObj)
    External(_SB.PCI0.LPCB.EC0.RDBL, IntObj)
    External(_SB.PCI0.LPCB.EC0.RDWD, IntObj)
    External(_SB.PCI0.LPCB.EC0.RDBT, IntObj)
    External(_SB.PCI0.LPCB.EC0.RCBT, IntObj)
    External(_SB.PCI0.LPCB.EC0.RDQK, IntObj)
    External(_SB.PCI0.LPCB.EC0.MUEC, MutexObj)
    External(_SB.PCI0.LPCB.EC0.PRTC, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.SBBY, IntObj)
    External(_SB.PCI0.LPCB.EC0.ADDR, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.CMDB, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.SWTC, MethodObj)
    External(_SB.PCI0.LPCB.EC0.BCNT, FieldUnitObj)
     
    External(_SB.PCI0.LPCB, DeviceObj)
    External(_SB.PCI0.LPCB.EC0, DeviceObj)
    Scope(_SB.PCI0.LPCB.EC0)
    {
            OperationRegion (ERM2, EmbeddedControl, Zero, 0xFF)
            Field(ERM2, ByteAcc, NoLock, Preserve)
            {
                Offset (0x93),
                TH00,8,TH01,8,
                TH10,8,TH11,8,
                Offset (0xc4),
                XC30,8,XC31,8,
                Offset (0xe4),
                YC30,8,YC31,8,
                Offset (0xF4),
                B0S0,8,B0S1,8,
                Offset (0xFC),
                B1S0,8,B1S1,8
            }
            OperationRegion (RMB1, EmbeddedControl, 0x18, 0x28)
            Field (RMB1, ByteAcc, NoLock, Preserve)
            {
    /* Note: disabling these fields (already defined in DSDT, referenced with External if needed,
    	but keeping the correct offset! (very important!) */
    */
    			PRTC,   8,
                SSTS,   5,
                    ,   1,
                ALFG,   1,
                CDFG,   1,
                ADDR,   8,
                CMDB,   8, */
         Offset(4), // the data above is 4 bytes offset from the start of this region!
                //BDAT, 256,            
    BA00,8,BA01,8,BA02,8,BA03,8,
    BA04,8,BA05,8,BA06,8,BA07,8,
    BA08,8,BA09,8,BA0A,8,BA0B,8,
    BA0C,8,BA0D,8,BA0E,8,BA0F,8,
    BA10,8,BA11,8,BA12,8,BA13,8,
    BA14,8,BA15,8,BA16,8,BA17,8,
    BA18,8,BA19,8,BA1A,8,BA1B,8,
    BA1C,8,BA1D,8,BA1E,8,BA1F,8
    		}
            OperationRegion(RMB2, EmbeddedControl, 0x40, 0x28)
            Field (RMB2, ByteAcc, NoLock, Preserve)
            {
    /*
    			PRT2,   8,
                SST2,   5,
                    ,   1,
                ALF2,   1,
                CDF2,   1,
                ADD2,   8,
                CMD2,   8, */
      Offset(4),
                //BDA2, 256,
    BB00,8,BB01,8,BB02,8,BB03,8,
    BB04,8,BB05,8,BB06,8,BB07,8,
    BB08,8,BB09,8,BB0A,8,BB0B,8,
    BB0C,8,BB0D,8,BB0E,8,BB0F,8,
    BB10,8,BB11,8,BB12,8,BB13,8,
    BB14,8,BB15,8,BB16,8,BB17,8,
    BB18,8,BB19,8,BB1A,8,BB1B,8,
    BB1C,8,BB1D,8,BB1E,8,BB1F,8
    		}
            Field (RMB1, ByteAcc, NoLock, Preserve)
            {
                Offset (0x04),
                T2B0,8,T2B1,8
            }
    }                   
Then continue on with fixing more errors with External (it ends eventually!), by adding these External declarations:

    External(_SB.PCI0.LPCB.EC0.DAT0, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.WRBL, IntObj)
    External(_SB.PCI0.LPCB.EC0.WRWD, IntObj)
    External(_SB.PCI0.LPCB.EC0.WRBT, IntObj)
    External(_SB.PCI0.LPCB.EC0.SDBT, IntObj)
    External(_SB.PCI0.LPCB.EC0.WRQK, IntObj)
    External(_SB.PCI0.LPCB.EC0.PRT2, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.DAT1, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.ADD2, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.CMD2, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.BCN2, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.DA20, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.DA21, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.SSTS, FieldUnitObj)
    External(_SB.PCI0.LPCB.EC0.SST2, FieldUnitObj)

Note: With DAT0, don't be confused at the "other" DAT0 in a different scope!

At this point, the SSDT compiles without any errors:

    DefinitionBlock("", "SSDT", 2, "hack", "batt", 0)
    {
        External(_SB.PCI0, DeviceObj)
        External(_SB.PCI0.BAT0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.ACAP, MethodObj)
        External(CHGS, MethodObj)
        External(BLLO, IntObj)
        External(_SB.PCI0.LPCB.EC0.EB0S, FieldUnitObj)
        External(_SB.PCI0.BAT0.PUNT, IntObj)
        External(_SB.PCI0.LPCB.EC0.B0DV, FieldUnitObj)
        External(_SB.PCI0.BAT0.LFCC, IntObj)
        External(MBLF, IntObj)
        External(_SB.PCI0.BAT0.PBST, PkgObj)
        External(_SB.PCI0.LPCB.EC0.BATP, MethodObj)
        External(_SB.PCI0.BAT0.NBIX, PkgObj)
        External(_SB.PCI0.LPCB.EC0.GBTT, MethodObj)
        External(_SB.PCI0.BAT0._BIF, MethodObj)
        External(_SB.PCI0.BAT0.PBIF, PkgObj)
        External(_SB.PCI0.BAT0.BIXT, PkgObj)
        External(_SB.PCI0.LPCB.EC0.ECAV, MethodObj)
        External(BSLF, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDBL, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDWD, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDBT, IntObj)
        External(_SB.PCI0.LPCB.EC0.RCBT, IntObj)
        External(_SB.PCI0.LPCB.EC0.RDQK, IntObj)
        External(_SB.PCI0.LPCB.EC0.MUEC, MutexObj)
        External(_SB.PCI0.LPCB.EC0.PRTC, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.SBBY, IntObj)
        External(_SB.PCI0.LPCB.EC0.ADDR, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.CMDB, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.SWTC, MethodObj)
        External(_SB.PCI0.LPCB.EC0.BCNT, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.DAT0, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.WRBL, IntObj)
        External(_SB.PCI0.LPCB.EC0.WRWD, IntObj)
        External(_SB.PCI0.LPCB.EC0.WRBT, IntObj)
        External(_SB.PCI0.LPCB.EC0.SDBT, IntObj)
        External(_SB.PCI0.LPCB.EC0.WRQK, IntObj)
        External(_SB.PCI0.LPCB.EC0.PRT2, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.DAT1, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.ADD2, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.CMD2, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.BCN2, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.DA20, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.DA21, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.SSTS, FieldUnitObj)
        External(_SB.PCI0.LPCB.EC0.SST2, FieldUnitObj)
    
        External(_SB.PCI0.LPCB, DeviceObj)
        External(_SB.PCI0.LPCB.EC0, DeviceObj)
        Scope(_SB.PCI0.LPCB.EC0)
        {
                OperationRegion (ERM2, EmbeddedControl, Zero, 0xFF)
                Field(ERM2, ByteAcc, NoLock, Preserve)
                {
                    Offset (0x93),
                    TH00,8,TH01,8,
                    TH10,8,TH11,8,
                    Offset (0xc4),
                    XC30,8,XC31,8,
                    Offset (0xe4),
                    YC30,8,YC31,8,
                    Offset (0xF4),
                    B0S0,8,B0S1,8,
                    Offset (0xFC),
                    B1S0,8,B1S1,8
                }
                OperationRegion (RMB1, EmbeddedControl, 0x18, 0x28)
                Field (RMB1, ByteAcc, NoLock, Preserve)
                {
    /* Note: disabling these fields (already defined in DSDT, referenced with External if needed,
    	but keeping the correct offset! (very important!) */
    */
    				PRTC,   8,
                    SSTS,   5,
                        ,   1,
                    ALFG,   1,
                    CDFG,   1,
                    ADDR,   8,
                    CMDB,   8, */
             Offset(4), // the data above is 4 bytes offset from the start of this region!
                    //BDAT, 256,
    BA00,8,BA01,8,BA02,8,BA03,8,
    BA04,8,BA05,8,BA06,8,BA07,8,
    BA08,8,BA09,8,BA0A,8,BA0B,8,
    BA0C,8,BA0D,8,BA0E,8,BA0F,8,
    BA10,8,BA11,8,BA12,8,BA13,8,
    BA14,8,BA15,8,BA16,8,BA17,8,
    BA18,8,BA19,8,BA1A,8,BA1B,8,
    BA1C,8,BA1D,8,BA1E,8,BA1F,8
    			}
                OperationRegion(RMB2, EmbeddedControl, 0x40, 0x28)
                Field (RMB2, ByteAcc, NoLock, Preserve)
                {
    /*
    				PRT2,   8,
                    SST2,   5,
                        ,   1,
                    ALF2,   1,
                    CDF2,   1,
                    ADD2,   8,
                    CMD2,   8, */
          Offset(4),
                    //BDA2, 256,
    BB00,8,BB01,8,BB02,8,BB03,8,
    BB04,8,BB05,8,BB06,8,BB07,8,
    BB08,8,BB09,8,BB0A,8,BB0B,8,
    BB0C,8,BB0D,8,BB0E,8,BB0F,8,
    BB10,8,BB11,8,BB12,8,BB13,8,
    BB14,8,BB15,8,BB16,8,BB17,8,
    BB18,8,BB19,8,BB1A,8,BB1B,8,
    BB1C,8,BB1D,8,BB1E,8,BB1F,8
    			 }
                Field (RMB1, ByteAcc, NoLock, Preserve)
                {
                    Offset (0x04),
                    T2B0,8,T2B1,8
                }
        }
    
        Scope (_SB.PCI0)
        {
            Scope (BAT0)
            {
                Method (FBST, 4, NotSerialized)
                {
                    And (Arg1, 0xFFFF, Local1)
                    Store (Zero, Local0)
                    If (^^LPCB.EC0.ACAP ())
                    {
                        Store (One, Local0)
                    }
    
                    If (Local0)
                    {
                        If (CHGS (Zero))
    {
        Store (0x02, Local0)
    }
    Else
    {
        Store (Zero, Local0)   
    }
    				}
                    Else
                    {
                        Store (One, Local0)
                    }
    
                    If (BLLO)
                    {
                        ShiftLeft (One, 0x02, Local2)
                        Or (Local0, Local2, Local0)
                    }
    
                    If (And (^^LPCB.EC0.EB0S, 0x08))
                    {
                        ShiftLeft (One, 0x02, Local2)
                        Or (Local0, Local2, Local0)
                    }
    
                    If (LGreaterEqual (Local1, 0x8000))
                    {
                        Subtract (0xFFFF, Local1, Local1)
                    }
    
                    Store (Arg2, Local2)
                    If (LEqual (PUNT, Zero))
                    {
                        Multiply (Local1, ^^LPCB.EC0.B0DV, Local1)
                        Multiply (Local2, 0x0A, Local2)
                    }
    
                    And (Local0, 0x02, Local3)
                    If (LNot (Local3))
                    {
                        Subtract (LFCC, Local2, Local3)
                        Divide (LFCC, 0xC8, Local4, Local5)
                        If (LLess (Local3, Local5))
                        {
                            Store (LFCC, Local2)
                        }
                    }
                    Else
                    {
                        Divide (LFCC, 0xC8, Local4, Local5)
                        Subtract (LFCC, Local5, Local4)
                        If (LGreater (Local2, Local4))
                        {
                            Store (Local4, Local2)
                        }
                    }
    
                    If (LNot (^^LPCB.EC0.ACAP ()))
                    {
                        Divide (Local2, MBLF, Local3, Local4)
                        If (LLess (Local1, Local4))
                        {
                            Store (Local4, Local1)
                        }
                    }
    
                    Store (Local0, Index (PBST, Zero))
                    Store (Local1, Index (PBST, One))
                    Store (Local2, Index (PBST, 0x02))
                    Store (Arg3, Index (PBST, 0x03))
                }
                Method (_BIX, 0, NotSerialized)  // _BIX: Battery Information Extended
                {
                    If (LNot (^^LPCB.EC0.BATP (Zero)))
                    {
                        Return (NBIX)
                    }
    
                    If (LEqual (^^LPCB.EC0.GBTT (Zero), 0xFF))
                    {
                        Return (NBIX)
                    }
    
                    _BIF ()
                    Store (DerefOf (Index (PBIF, Zero)), Index (BIXT, One))
                    Store (DerefOf (Index (PBIF, One)), Index (BIXT, 0x02))
                    Store (DerefOf (Index (PBIF, 0x02)), Index (BIXT, 0x03))
                    Store (DerefOf (Index (PBIF, 0x03)), Index (BIXT, 0x04))
                    Store (DerefOf (Index (PBIF, 0x04)), Index (BIXT, 0x05))
                    Store (DerefOf (Index (PBIF, 0x05)), Index (BIXT, 0x06))
                    Store (DerefOf (Index (PBIF, 0x06)), Index (BIXT, 0x07))
                    Store (DerefOf (Index (PBIF, 0x07)), Index (BIXT, 0x0E))
                    Store (DerefOf (Index (PBIF, 0x08)), Index (BIXT, 0x0F))
                    Store (DerefOf (Index (PBIF, 0x09)), Index (BIXT, 0x10))
                    Store (DerefOf (Index (PBIF, 0x0A)), Index (BIXT, 0x11))
                    Store (DerefOf (Index (PBIF, 0x0B)), Index (BIXT, 0x12))
                    Store (DerefOf (Index (PBIF, 0x0C)), Index (BIXT, 0x13))
                    If (LEqual (DerefOf (Index (BIXT, One)), One))
                    {
                        Store (Zero, Index (BIXT, One))
                        Store (DerefOf (Index (BIXT, 0x05)), Local0)
                        Multiply (DerefOf (Index (BIXT, 0x02)), Local0, Index (BIXT, 0x02))
                        Multiply (DerefOf (Index (BIXT, 0x03)), Local0, Index (BIXT, 0x03))
                        Multiply (DerefOf (Index (BIXT, 0x06)), Local0, Index (BIXT, 0x06))
                        Multiply (DerefOf (Index (BIXT, 0x07)), Local0, Index (BIXT, 0x07))
                        Multiply (DerefOf (Index (BIXT, 0x0E)), Local0, Index (BIXT, 0x0E))
                        Multiply (DerefOf (Index (BIXT, 0x0F)), Local0, Index (BIXT, 0x0F))
                        Divide (DerefOf (Index (BIXT, 0x02)), 0x03E8, Local0, Index (BIXT, 0x02))
                        Divide (DerefOf (Index (BIXT, 0x03)), 0x03E8, Local0, Index (BIXT, 0x03))
                        Divide (DerefOf (Index (BIXT, 0x06)), 0x03E8, Local0, Index (BIXT, 0x06))
                        Divide (DerefOf (Index (BIXT, 0x07)), 0x03E8, Local0, Index (BIXT, 0x07))
                        Divide (DerefOf (Index (BIXT, 0x0E)), 0x03E8, Local0, Index (BIXT, 0x0E))
                        Divide (DerefOf (Index (BIXT, 0x0F)), 0x03E8, Local0, Index (BIXT, 0x0F))
                    }
    
                    Store (B1B2(^^LPCB.EC0.XC30,^^LPCB.EC0.XC31), Index (BIXT, 0x08))
                    Store (0x0001869F, Index (BIXT, 0x09))
                    Return (BIXT)
                }
    
        }
        }
        Scope (_SB.PCI0.LPCB.EC0)
        {
            Method (BIFA, 0, NotSerialized)
            {
                If (ECAV ())
                {
                    If (BSLF)
                    {
                        Store (B1B2(B1S0,B1S1), Local0)
                    }
                    Else
                    {
                        Store (B1B2(B0S0,B0S1), Local0)
                    }
                }
                Else
                {
                    Store (Ones, Local0)
                }
    
                Return (Local0)
            }
            Method (SMBR, 3, Serialized)
            {
                Store (Package (0x03)
                    {
                        0x07,
                        Zero,
                        Zero
                    }, Local0)
                If (LNot (ECAV ()))
                {
                    Return (Local0)
                }
    
                If (LNotEqual (Arg0, RDBL))
                {
                    If (LNotEqual (Arg0, RDWD))
                    {
                        If (LNotEqual (Arg0, RDBT))
                        {
                            If (LNotEqual (Arg0, RCBT))
                            {
                                If (LNotEqual (Arg0, RDQK))
                                {
                                    Return (Local0)
                                }
                            }
                        }
                    }
                }
    
                Acquire (MUEC, 0xFFFF)
                Store (PRTC, Local1)
                Store (Zero, Local2)
                While (LNotEqual (Local1, Zero))
                {
                    Stall (0x0A)
                    Increment (Local2)
                    If (LGreater (Local2, 0x03E8))
                    {
                        Store (SBBY, Index (Local0, Zero))
                        Store (Zero, Local1)
                    }
                    Else
                    {
                        Store (PRTC, Local1)
                    }
                }
    
                If (LLessEqual (Local2, 0x03E8))
                {
                    ShiftLeft (Arg1, One, Local3)
                    Or (Local3, One, Local3)
                    Store (Local3, ADDR)
                    If (LNotEqual (Arg0, RDQK))
                    {
                        If (LNotEqual (Arg0, RCBT))
                        {
                            Store (Arg2, CMDB)
                        }
                    }
    
                    WRBA(Zero)
                    Store (Arg0, PRTC)
                    Store (SWTC (Arg0), Index (Local0, Zero))
                    If (LEqual (DerefOf (Index (Local0, Zero)), Zero))
                    {
                        If (LEqual (Arg0, RDBL))
                        {
                            Store (BCNT, Index (Local0, One))
                            Store (RDBA(), Index (Local0, 0x02))
                        }
    
                        If (LEqual (Arg0, RDWD))
                        {
                            Store (0x02, Index (Local0, One))
                            Store (B1B2(T2B0,T2B1), Index (Local0, 0x02))
                        }
    
                        If (LEqual (Arg0, RDBT))
                        {
                            Store (One, Index (Local0, One))
                            Store (DAT0, Index (Local0, 0x02))
                        }
    
                        If (LEqual (Arg0, RCBT))
                        {
                            Store (One, Index (Local0, One))
                            Store (DAT0, Index (Local0, 0x02))
                        }
                    }
                }
    
                Release (MUEC)
                Return (Local0)
            }
            Method (SMBW, 5, Serialized)
            {
                Store (Package (0x01)
                    {
                        0x07
                    }, Local0)
                If (LNot (ECAV ()))
                {
                    Return (Local0)
                }
    
                If (LNotEqual (Arg0, WRBL))
                {
                    If (LNotEqual (Arg0, WRWD))
                    {
                        If (LNotEqual (Arg0, WRBT))
                        {
                            If (LNotEqual (Arg0, SDBT))
                            {
                                If (LNotEqual (Arg0, WRQK))
                                {
                                    Return (Local0)
                                }
                            }
                        }
                    }
                }
    
                Acquire (MUEC, 0xFFFF)
                Store (PRTC, Local1)
                Store (Zero, Local2)
                While (LNotEqual (Local1, Zero))
                {
                    Stall (0x0A)
                    Increment (Local2)
                    If (LGreater (Local2, 0x03E8))
                    {
                        Store (SBBY, Index (Local0, Zero))
                        Store (Zero, Local1)
                    }
                    Else
                    {
                        Store (PRTC, Local1)
                    }
                }
    
                If (LLessEqual (Local2, 0x03E8))
                {
                    WRBA(Zero)
                    ShiftLeft (Arg1, One, Local3)
                    Store (Local3, ADDR)
                    If (LNotEqual (Arg0, WRQK))
                    {
                        If (LNotEqual (Arg0, SDBT))
                        {
                            Store (Arg2, CMDB)
                        }
                    }
    
                    If (LEqual (Arg0, WRBL))
                    {
                        Store (Arg3, BCNT)
                        WRBA(Arg4)
                    }
    
                    If (LEqual (Arg0, WRWD))
                    {
                        Store(Arg4,T2B0) Store(ShiftRight(Arg4,8),T2B1)
                    }
    
                    If (LEqual (Arg0, WRBT))
                    {
                        Store (Arg4, DAT0)
                    }
    
                    If (LEqual (Arg0, SDBT))
                    {
                        Store (Arg4, DAT0)
                    }
    
                    Store (Arg0, PRTC)
                    Store (SWTC (Arg0), Index (Local0, Zero))
                }
    
                Release (MUEC)
                Return (Local0)
            }
            Method (ECSB, 7, NotSerialized)
            {
                Store (Package (0x05)
                    {
                        0x11,
                        Zero,
                        Zero,
                        Zero,
                        Buffer (0x20){}
                    }, Local1)
                If (LGreater (Arg0, One))
                {
                    Return (Local1)
                }
    
                If (ECAV ())
                {
                    Acquire (MUEC, 0xFFFF)
                    If (LEqual (Arg0, Zero))
                    {
                        Store (PRTC, Local0)
                    }
                    Else
                    {
                        Store (PRT2, Local0)
                    }
    
                    Store (Zero, Local2)
                    While (LNotEqual (Local0, Zero))
                    {
                        Stall (0x0A)
                        Increment (Local2)
                        If (LGreater (Local2, 0x03E8))
                        {
                            Store (SBBY, Index (Local1, Zero))
                            Store (Zero, Local0)
                        }
                        ElseIf (LEqual (Arg0, Zero))
                        {
                            Store (PRTC, Local0)
                        }
                        Else
                        {
                            Store (PRT2, Local0)
                        }
                    }
    
                    If (LLessEqual (Local2, 0x03E8))
                    {
                        If (LEqual (Arg0, Zero))
                        {
                            Store (Arg2, ADDR)
                            Store (Arg3, CMDB)
                            If (LOr (LEqual (Arg1, 0x0A), LEqual (Arg1, 0x0B)))
                            {
                                Store (DerefOf (Index (Arg6, Zero)), BCNT)
                                WRBA(DerefOf (Index (Arg6, One)))
                            }
                            Else
                            {
                                Store (Arg4, DAT0)
                                Store (Arg5, DAT1)
                            }
    
                            Store (Arg1, PRTC)
                        }
                        Else
                        {
                            Store (Arg2, ADD2)
                            Store (Arg3, CMD2)
                            If (LOr (LEqual (Arg1, 0x0A), LEqual (Arg1, 0x0B)))
                            {
                                Store (DerefOf (Index (Arg6, Zero)), BCN2)
                                WRBB(DerefOf (Index (Arg6, One)))
                            }
                            Else
                            {
                                Store (Arg4, DA20)
                                Store (Arg5, DA21)
                            }
    
                            Store (Arg1, PRT2)
                        }
    
                        Store (0x7F, Local0)
                        If (LEqual (Arg0, Zero))
                        {
                            While (PRTC)
                            {
                                Sleep (One)
                                Decrement (Local0)
                            }
                        }
                        Else
                        {
                            While (PRT2)
                            {
                                Sleep (One)
                                Decrement (Local0)
                            }
                        }
    
                        If (Local0)
                        {
                            If (LEqual (Arg0, Zero))
                            {
                                Store (SSTS, Local0)
                                Store (DAT0, Index (Local1, One))
                                Store (DAT1, Index (Local1, 0x02))
                                Store (BCNT, Index (Local1, 0x03))
                                Store (RDBA(), Index (Local1, 0x04))
                            }
                            Else
                            {
                                Store (SST2, Local0)
                                Store (DA20, Index (Local1, One))
                                Store (DA21, Index (Local1, 0x02))
                                Store (BCN2, Index (Local1, 0x03))
                                Store (RDBB(), Index (Local1, 0x04))
                            }
    
                            And (Local0, 0x1F, Local0)
                            If (Local0)
                            {
                                Add (Local0, 0x10, Local0)
                            }
    
                            Store (Local0, Index (Local1, Zero))
                        }
                        Else
                        {
                            Store (0x10, Index (Local1, Zero))
                        }
                    }
    
                    Release (MUEC)
                }
    
                Return (Local1)
            }
            Method (TACH, 1, Serialized)
            {
                If (ECAV ())
                {
                    Switch (Arg0)
                    {
                        Case (Zero)
                        {
                            Store (B1B2(TH00,TH01), Local0)
                            Break
                        }
                        Case (One)
                        {
                            Store (B1B2(TH10,TH11), Local0)
                            Break
                        }
                        Default
                        {
                            Return (Ones)
                        }
    
                    }
    
                    Multiply (Local0, 0x02, Local0)
                    If (LNotEqual (Local0, Zero))
                    {
                        Divide (0x0041CDB4, Local0, Local1, Local0)
                        Return (Local0)
                    }
                    Else
                    {
                        Return (Ones)
                    }
                }
                Else
                {
                    Return (Ones)
                }
            }    
        }
    
        Method (B1B2, 2, NotSerialized) { Return (Or (Arg0, ShiftLeft (Arg1, 8))) }
    
        Scope (_SB.PCI0.LPCB)
        {
            Scope (EC0)
            {
                Method (RDBA, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BA00, Index(TEMP, 0x00))
                    Store (BA01, Index(TEMP, 0x01))
                    Store (BA02, Index(TEMP, 0x02))
                    Store (BA03, Index(TEMP, 0x03))
                    Store (BA04, Index(TEMP, 0x04))
                    Store (BA05, Index(TEMP, 0x05))
                    Store (BA06, Index(TEMP, 0x06))
                    Store (BA07, Index(TEMP, 0x07))
                    Store (BA08, Index(TEMP, 0x08))
                    Store (BA09, Index(TEMP, 0x09))
                    Store (BA0A, Index(TEMP, 0x0A))
                    Store (BA0B, Index(TEMP, 0x0B))
                    Store (BA0C, Index(TEMP, 0x0C))
                    Store (BA0D, Index(TEMP, 0x0D))
                    Store (BA0E, Index(TEMP, 0x0E))
                    Store (BA0F, Index(TEMP, 0x0F))
                    Store (BA10, Index(TEMP, 0x10))
                    Store (BA11, Index(TEMP, 0x11))
                    Store (BA12, Index(TEMP, 0x12))
                    Store (BA13, Index(TEMP, 0x13))
                    Store (BA14, Index(TEMP, 0x14))
                    Store (BA15, Index(TEMP, 0x15))
                    Store (BA16, Index(TEMP, 0x16))
                    Store (BA17, Index(TEMP, 0x17))
                    Store (BA18, Index(TEMP, 0x18))
                    Store (BA19, Index(TEMP, 0x19))
                    Store (BA1A, Index(TEMP, 0x1A))
                    Store (BA1B, Index(TEMP, 0x1B))
                    Store (BA1C, Index(TEMP, 0x1C))
                    Store (BA1D, Index(TEMP, 0x1D))
                    Store (BA1E, Index(TEMP, 0x1E))
                    Store (BA1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBA, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BA00)
                    Store (DerefOf(Index(TEMP, 0x01)), BA01)
                    Store (DerefOf(Index(TEMP, 0x02)), BA02)
                    Store (DerefOf(Index(TEMP, 0x03)), BA03)
                    Store (DerefOf(Index(TEMP, 0x04)), BA04)
                    Store (DerefOf(Index(TEMP, 0x05)), BA05)
                    Store (DerefOf(Index(TEMP, 0x06)), BA06)
                    Store (DerefOf(Index(TEMP, 0x07)), BA07)
                    Store (DerefOf(Index(TEMP, 0x08)), BA08)
                    Store (DerefOf(Index(TEMP, 0x09)), BA09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BA0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BA0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BA0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BA0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BA0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BA0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BA10)
                    Store (DerefOf(Index(TEMP, 0x11)), BA11)
                    Store (DerefOf(Index(TEMP, 0x12)), BA12)
                    Store (DerefOf(Index(TEMP, 0x13)), BA13)
                    Store (DerefOf(Index(TEMP, 0x14)), BA14)
                    Store (DerefOf(Index(TEMP, 0x15)), BA15)
                    Store (DerefOf(Index(TEMP, 0x16)), BA16)
                    Store (DerefOf(Index(TEMP, 0x17)), BA17)
                    Store (DerefOf(Index(TEMP, 0x18)), BA18)
                    Store (DerefOf(Index(TEMP, 0x19)), BA19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BA1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BA1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BA1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BA1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BA1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BA1F)
                }
                Method (RDBB, 0, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (BB00, Index(TEMP, 0x00))
                    Store (BB01, Index(TEMP, 0x01))
                    Store (BB02, Index(TEMP, 0x02))
                    Store (BB03, Index(TEMP, 0x03))
                    Store (BB04, Index(TEMP, 0x04))
                    Store (BB05, Index(TEMP, 0x05))
                    Store (BB06, Index(TEMP, 0x06))
                    Store (BB07, Index(TEMP, 0x07))
                    Store (BB08, Index(TEMP, 0x08))
                    Store (BB09, Index(TEMP, 0x09))
                    Store (BB0A, Index(TEMP, 0x0A))
                    Store (BB0B, Index(TEMP, 0x0B))
                    Store (BB0C, Index(TEMP, 0x0C))
                    Store (BB0D, Index(TEMP, 0x0D))
                    Store (BB0E, Index(TEMP, 0x0E))
                    Store (BB0F, Index(TEMP, 0x0F))
                    Store (BB10, Index(TEMP, 0x10))
                    Store (BB11, Index(TEMP, 0x11))
                    Store (BB12, Index(TEMP, 0x12))
                    Store (BB13, Index(TEMP, 0x13))
                    Store (BB14, Index(TEMP, 0x14))
                    Store (BB15, Index(TEMP, 0x15))
                    Store (BB16, Index(TEMP, 0x16))
                    Store (BB17, Index(TEMP, 0x17))
                    Store (BB18, Index(TEMP, 0x18))
                    Store (BB19, Index(TEMP, 0x19))
                    Store (BB1A, Index(TEMP, 0x1A))
                    Store (BB1B, Index(TEMP, 0x1B))
                    Store (BB1C, Index(TEMP, 0x1C))
                    Store (BB1D, Index(TEMP, 0x1D))
                    Store (BB1E, Index(TEMP, 0x1E))
                    Store (BB1F, Index(TEMP, 0x1F))
                    Return (TEMP)
                }
                Method (WRBB, 1, Serialized)
                {
                    Name (TEMP, Buffer(0x20) { })
                    Store (Arg0, TEMP)
                    Store (DerefOf(Index(TEMP, 0x00)), BB00)
                    Store (DerefOf(Index(TEMP, 0x01)), BB01)
                    Store (DerefOf(Index(TEMP, 0x02)), BB02)
                    Store (DerefOf(Index(TEMP, 0x03)), BB03)
                    Store (DerefOf(Index(TEMP, 0x04)), BB04)
                    Store (DerefOf(Index(TEMP, 0x05)), BB05)
                    Store (DerefOf(Index(TEMP, 0x06)), BB06)
                    Store (DerefOf(Index(TEMP, 0x07)), BB07)
                    Store (DerefOf(Index(TEMP, 0x08)), BB08)
                    Store (DerefOf(Index(TEMP, 0x09)), BB09)
                    Store (DerefOf(Index(TEMP, 0x0A)), BB0A)
                    Store (DerefOf(Index(TEMP, 0x0B)), BB0B)
                    Store (DerefOf(Index(TEMP, 0x0C)), BB0C)
                    Store (DerefOf(Index(TEMP, 0x0D)), BB0D)
                    Store (DerefOf(Index(TEMP, 0x0E)), BB0E)
                    Store (DerefOf(Index(TEMP, 0x0F)), BB0F)
                    Store (DerefOf(Index(TEMP, 0x10)), BB10)
                    Store (DerefOf(Index(TEMP, 0x11)), BB11)
                    Store (DerefOf(Index(TEMP, 0x12)), BB12)
                    Store (DerefOf(Index(TEMP, 0x13)), BB13)
                    Store (DerefOf(Index(TEMP, 0x14)), BB14)
                    Store (DerefOf(Index(TEMP, 0x15)), BB15)
                    Store (DerefOf(Index(TEMP, 0x16)), BB16)
                    Store (DerefOf(Index(TEMP, 0x17)), BB17)
                    Store (DerefOf(Index(TEMP, 0x18)), BB18)
                    Store (DerefOf(Index(TEMP, 0x19)), BB19)
                    Store (DerefOf(Index(TEMP, 0x1A)), BB1A)
                    Store (DerefOf(Index(TEMP, 0x1B)), BB1B)
                    Store (DerefOf(Index(TEMP, 0x1C)), BB1C)
                    Store (DerefOf(Index(TEMP, 0x1D)), BB1D)
                    Store (DerefOf(Index(TEMP, 0x1E)), BB1E)
                    Store (DerefOf(Index(TEMP, 0x1F)), BB1F)
                }
            }
        }
    }
    //EOF   
The resulting file can be saved as AML (suggested name: SSDT-BATT.aml), and placed in ACPI/patched.

But you can't expect battery status to work with native DSDT yet!

### Renaming existing methods

For now, there are duplicate methods in DSDT and this SSDT-BATT.aml. For each method in DSDT that the SSDT-BATT.aml version will replace, we must rename the method in DSDT to something else, which will allow the SSDT version to override.

Just as in post #1, this part follows the "Rename/Replace" pattern.
The methods that need replacements are FBST, _BIX, BIFA, SMBR, SMBW, ECSB, and TACH.

For this step, it is useful to create a mixed bytecode listing for the native DSDT.aml.
It can be created with: "iasl -l -dl DSDT.aml", which creates a mixed listing in DSDT.dsl

For the FBST method:

    Method (FBST, 4, NotSerialized)
    {
    	And (Arg1, 0xFFFF, Local1)
    	Store (Zero, Local0)
    FF74: 14 43 12 46 42 53 54 04 7B 69 0B FF FF 61 70 00  // .C.FBST.{i...ap.
    FF84: 60

A potential rename patch (FBST->XBST):

```
Find: <46 42 53 54 04>
Replace: <58 42 53 54 04>
```

It is a good idea to verify that there is only one match for the Find hex data by searching for it in a hex editor such as Hex Fiend. Because the patch should ONLY apply to the method definition, not other code that may be present in the DSDT (or native SSDTs).

The target name you choose must be unique within the scope that the method resides. Creating a duplicate method will cause kernel panic. Changing the first letter to 'X' is usually ok, but no guarantee.

Patches for the rest of the methods:

```
_BIX->XBIX:
Find: <5F 42 49 58 00>
Replace: <58 42 49 58 00>
```

```
BIFA->XIFA:
Find: <42 49 46 41 00>
Replace: <58 49 46 41 00>
```

```
SMBR->XMBR:
Find: <53 4D 42 52 0B>
Replace: <58 4D 42 52 0B>
```

```
SMBW->XMBW:
Find: <53 4D 42 57 0D>
Replace: <58 4D 42 57 0D>
```

```
ECSB->XCSB:
Find: <45 43 53 42 07>
Replace: <58 43 53 42 07>
```

```
TACH->XACH:
Find: <54 41 43 48 09>
Replace: <58 41 43 48 09>
```

After adding those patches to config.plist/ACPI/DSDT/Patches, the methods in native DSDT will be renamed by Clover. And as a result of the renaming, the patched methods defined in SSDT-BATT.aml will override.

### Conclusion

Hotpatching for battery status is one of the most complex hotpatch tasks possible. The process of writing all the 'External' refernences is tedious and boring.

It will take some time (several hours into the text you're reading here). Do not rush it.

## Disabling discrete/switched GPU with Hotpatch

This third post is dedicated to hotpatching required for disabling the discrete GPU in a switched dual-GPU laptop, using the same example ACPI fils as the static patch guide.

[https://www.tonymacx86.com/threads/guide-disabling-discrete-graphics-in-dual-gpu-laptops.163772/](https://www.tonymacx86.com/threads/guide-disabling-discrete-graphics-in-dual-gpu-laptops.163772/)

You should download the ACPI/origin files that are attached to that guide, so you can follow along.

As in the static patch guide, the goal is relatively simple: call the _OFF method (from an _INI method) for the discrete GPU during ACPI initialization. But the details make it more complex due to the fact that _OFF can contain EC related code which needs to be executed in _REG instead of _INI.

### Building the replacement _INI/_OFF/_REG methods

In the example, the target _INI method is in SSDT-7, _OFF is in SSDT-8. The path of the discrete device is _SB.PCI0.RP05.PEGP. In the example files, _OFF contains EC related code that must be moved to _REG. To complete this patching process, we need to replace _INI, _OFF, and _REG, therefore each will need to be renamed to XINI, XOFF, and XREG

Note: The methods you need to patch may in fact be different. It all depends on the code within the _OFF path. For example, with other ACPI sets, it happens that SGOF (may be some other name) has EC related code that must be moved to _REG. In that case, you would need to use rename/replace for the SGOF, and perhaps not the _OFF method. Analyze your existing code carefully.

The Clover config.plist patches will be worked out later. For now, lets look at the SSDT for the replacement methods.

The SSDT will consist of the patched methods:

    DefinitionBlock("", "SSDT", 2, "hack", "D-GPU", 0)
    {
        External(_SB.PCI0.RP05.PEGP, DeviceObj)
        External(_SB.PCI0.RP05.PEGP.XINI, MethodObj)
        External(_SB.PCI0.RP05.PEGP.XOFF, MethodObj)
        External(_SB.PCI0.RP05.PEGP.XINI, MethodObj)
        External(_SB.PCI0.LPCB.EC0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.XREG, MethodObj)
        External(_SB.PCI0.LPCB.EC0.SPIN, MethodObj)
    
        Scope(_SB.PCI0.RP05.PEGP)
        {
            Method(_INI)
            {
                XINI() // call original _INI, now renamed XINI
                _OFF() // call (patched) _OFF
            }
            Method(_OFF, 0, Serialized)
            {
                If (LEqual (CTXT, Zero))
                {
                    /* \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero) */
                    If (LNotEqual (GPRF, One))
                    {
                        Store (VGAR, VGAB)
                    }
                    Store (One, CTXT)
                }
                SGOF ()
            }
        }
        Scope(_SB.PCI0.LPCB.EC0)
        {
            Method(_REG, 2)
            {
                XREG(Arg0, Arg1) // call original _REG, now renamed XREG
                If (3 == Arg0 && 1 == Arg1) // EC ready?
                {
                    \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero) // code that was removed from _OFF
                }
            }
        }
At this point, the code won't compile, as some of the symbols referenced in _OFF are not available.
Just like the battery patching guide, we must add the appropriate External declarations.

Use the compiler errors to determine which symbols you need to find, then add the appropriate External declartions. In the example case:

    External(_SB.PCI0.RP05.PEGP.CTXT, IntObj)
    External(_SB.PCI0.RP05.PEGP.GPRF, IntObj)
    External(_SB.PCI0.RP05.PEGP.VGAR, FieldUnitObj)
    External(_SB.PCI0.RP05.PEGP.VGAB, BuffObj)
    External(_SB.PCI0.RP05.PEGP.SGOF, MethodObj)

The resulting SSDT:

    DefinitionBlock("", "SSDT", 2, "hack", "D-GPU", 0)
    {
        External(_SB.PCI0.RP05.PEGP, DeviceObj)
        External(_SB.PCI0.RP05.PEGP.XINI, MethodObj)
        External(_SB.PCI0.RP05.PEGP.XOFF, MethodObj)
        External(_SB.PCI0.RP05.PEGP.XINI, MethodObj)
        External(_SB.PCI0.LPCB.EC0, DeviceObj)
        External(_SB.PCI0.LPCB.EC0.XREG, MethodObj)
        External(_SB.PCI0.LPCB.EC0.SPIN, MethodObj)
        External(_SB.PCI0.RP05.PEGP.CTXT, IntObj)
        External(_SB.PCI0.RP05.PEGP.GPRF, IntObj)
        External(_SB.PCI0.RP05.PEGP.VGAR, FieldUnitObj)
        External(_SB.PCI0.RP05.PEGP.VGAB, BuffObj)
        External(_SB.PCI0.RP05.PEGP.SGOF, MethodObj)
    
        Scope(_SB.PCI0.RP05.PEGP)
        {
            Method(_INI)
            {
                XINI() // call original _INI, now renamed XINI
                _OFF() // call (patched) _OFF
            }
            Method(_OFF, 0, Serialized)
            {
                If (LEqual (CTXT, Zero))
                {
                    /* \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero) */
                    If (LNotEqual (GPRF, One))
                    {
                        Store (VGAR, VGAB)
                    }
                    Store (One, CTXT)
                }
                SGOF ()
            }
        }
        Scope(_SB.PCI0.LPCB.EC0)
        {
            Method(_REG, 2)
            {
                XREG(Arg0, Arg1) // call original _REG, now renamed XREG
                If (3 == Arg0 && 1 == Arg1) // EC ready?
                {
                    \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero) // code that was removed from _OFF
                }
            }
        }
    }
Now it compiles without error, but there is one warning: "39, 3079, _REG has no corresponding Operation Region". And this warning is important. The _REG will not be called unless we add a dummy EC OperationRegion.

We can add it:

    ...
    Scope(_SB.PCI0.LPCB.EC0)
    {
        OperationRegion(RME3, EmbeddedControl, 0x00, 0xFF)
        Method(_REG, 2)
        {
    ...
Resulting complete SSDT:

    External(_SB.PCI0.RP05.PEGP, DeviceObj)
    External(_SB.PCI0.RP05.PEGP.XINI, MethodObj)
    External(_SB.PCI0.RP05.PEGP.XOFF, MethodObj)
    External(_SB.PCI0.RP05.PEGP.XINI, MethodObj)
    External(_SB.PCI0.LPCB.EC0, DeviceObj)
    External(_SB.PCI0.LPCB.EC0.XREG, MethodObj)
    External(_SB.PCI0.LPCB.EC0.SPIN, MethodObj)
    External(_SB.PCI0.RP05.PEGP.CTXT, IntObj)
    External(_SB.PCI0.RP05.PEGP.GPRF, IntObj)
    External(_SB.PCI0.RP05.PEGP.VGAR, FieldUnitObj)
    External(_SB.PCI0.RP05.PEGP.VGAB, BuffObj)
    External(_SB.PCI0.RP05.PEGP.SGOF, MethodObj)
    
    Scope(_SB.PCI0.RP05.PEGP)
    {
        Method(_INI)
        {
            XINI() // call original _INI, now renamed XINI
            _OFF() // call (patched) _OFF
        }
        Method(_OFF, 0, Serialized)
        {
            If (LEqual (CTXT, Zero))
            {
                /* \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero) */
                If (LNotEqual (GPRF, One))
                {
                    Store (VGAR, VGAB)
                }
                Store (One, CTXT)
            }
            SGOF ()
        }
    }
    Scope(_SB.PCI0.LPCB.EC0)
    {
        OperationRegion(RME3, EmbeddedControl, 0x00, 0xFF)
        Method(_REG, 2)
        {
            XREG(Arg0, Arg1) // call original _REG, now renamed XREG
            If (3 == Arg0 && 1 == Arg1) // EC ready?
            {
                \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero) // code that was removed from _OFF
            }
        }
    }
At this point, you can save the SSDT (suggestion: SSDT-DGPU.aml).
It is ready to go to ACPI/patched.

But we still need to rename the original methods in native ACPI.

### Renaming the methods

As mentioned earlier, the following methods need renaming:
_SB.PCI0.RP05.PEGP._INI -> XINI
_SB.PCI0.RP05.PEGP._OFF -> XOFF
_SB.PCI0.LPCB.EC0._REG -> XREG

To determine the binary patches needed, we need a mixed listing of DSDT.aml, SSDT-7.aml, and SSDT-8.aml.
Create with:

```
iasl -dl -l DSDT.aml SSDT-7.aml SSDT-8.aml
```

The resulting mixed listing is in DSDT.dsl, SSDT-7.dsl, and SSDT-8.dsl.

Here is the mixed listing for _REG in DSDT.dsl:
Code (Text):

            Method (_REG, 2, NotSerialized)  // _REG: Region Availability
            {
    
    D2B8: 14 12 5F 52 45 47 02                             // .._REG.
    
                If (LEqual (Arg0, 0x03))
                {
    
    D2BF: A0 0B 93 68 0A 03                                // ...h..
    
                    Store (Arg1, ECFL)
                    }
                }
            }
        }
    D2C5: 70 69 45 43 46 4C

The patch used should rename only this _REG, not other _REG methods in the ACPI set. We can rename it by grabbing the name/header plus a few bytes from the code.

This pattern grabs enough bytes to be unique for sure:

```
Find: <5F 52 45 47 02 A0 0B 93 68 0A 03 70 69 45 43 46 4C>
Replace: <58 52 45 47 02 A0 0B 93 68 0A 03 70 69 45 43 46 4C>
```

And the mixed listing for the target _INI in SSDT-7.dsl:

            Method (_INI, 0, NotSerialized)  // _INI: Initialize
            {
    
    03D1: 14 1F 5F 49 4E 49 00                             // .._INI.
    
                Store (Zero, \_SB.PCI0.RP05.PEGP._ADR)
            }
    
    03D8: 70 00 5C 2F 05 5F 53 42 5F 50 43 49 30 52 50 30  // p.\/._SB_PCI0RP0
    03E8: 35 50 45 47 50 5F 41 44 52                       // 5PEGP_ADR

  

​            




Resulting patch...

```
Find: <5F 49 4E 49 00 70 00 5C 2F 05 5F 53 42 5F 50 43 49 30 52 50 30 35 50 45 47 50>
Replace: <58 49 4E 49 00 70 00 5C 2F 05 5F 53 42 5F 50 43 49 30 52 50 30 35 50 45 47 50>
```

And the _OFF in SSDT-8.dsl:

        Method (_OFF, 0, Serialized)  // _OFF: Power Off
        {
    
    032B: 14 45 04 5F 4F 46 46 08                          // .E._OFF.
    
            If (LEqual (CTXT, Zero))
            {
            \_SB.PCI0.LPCB.EC0.SPIN (0x96, Zero)
            
    0333: A0 39 93 43 54 58 54 00 5C 2F 05 5F 53 42 5F 50  // .9.CTXT.\/._SB_P
    0343: 43 49 30 4C 50 43 42 45 43 30 5F 53 50 49 4E 0A  // CI0LPCBEC0_SPIN.
    0353: 96 00

 The patch...

```
Find: <5F 4F 46 46 08 A0 39 93 43 54 58 54>
Replace: <58 4F 46 46 08 A0 39 93 43 54 58 54>
```

Note: Each of these patches could probably be reduced, but you would need to check carefully in all native DSDT and SSDTs for the Find pattern as you don't want to match on any methods but the target methods. Because _REG, _INI and _OFF are very common names for methods in other scopes, we need to be careful.

### A simple example

The files for the ASUS mentioned above were complex due to the need to patch _OFF, _INI, and _REG.

But let's take a look at an example that is much simpler. The files are for an Asus K550VX-DM406T, and they are attached to this post. Please download them so you can follow along.

When we look at the _OFF method in SSDT-14, there is no EC related code. And it calls PGOF, but the PGOF method, defined in SSDT-3, also has no EC related code:

    Method (_OFF, 0, Serialized)  // _OFF: Power Off
    {
    	If (LEqual (CTXT, Zero))
    	{
    		If (LNotEqual (GPRF, One))
    		{
    			Store (VGAR, VGAB)
    		}
    
    		Store (One, CTXT)
    	}
    
    	PGOF (Zero)
    }

This means _OFF can be called directly from an _INI.

If you look at all the _INI methods in the ACPI set, you will find there is no _INI at the path of _OFF (_SB.PCI0.PEG0.PEGP). Which means we can simply add an SSDT that has an _INI at the correct path, and that _INI simply calls _OFF.

It is a one-liner method:

```
DefinitionBlock("", "SSDT", 2, "hack", "DGPU", 0)
{
	External(_SB.PCI0.PEG0.PEGP._OFF, MethodObj)
	Method(_SB.PCI0.PEG0.PEGP._INI) { _OFF() }
}
```

Just as mentioned in the main discrete disable guide (static patch), sometimes you need to call _PS3 instead of _OFF. It is a trial and error process to determine which is best.

Same code as above, but calling _PS3:

```
DefinitionBlock("", "SSDT", 2, "hack", "DGPU", 0)
{
	External(_SB.PCI0.PEG0.PEGP._PS3, MethodObj)
	Method(_SB.PCI0.PEG0.PEGP._INI) { _PS3() }
}
```

Save it as SSDT-DGPU.aml and the Nvidia should be disabled.

The simple example turned not so simple

Although the method mentioned above will usually work in this scenario (even with other laptops that present the same scenario: no EC access in _OFF path, no existing _INI at the path), this specific laptop needed additional patching in order to turn off the dedicated Nvidia fan.

A little investigation was needed. As we can see by looking at the _OFF code, it calls PGOF(Zero) to do most of the work. And if we search for other examples of PGOF being called with Arg0==Zero, we find this code in SSDT-3.dsl:

    ElseIf (LAnd (LGreater (OSYS, 0x07D9), PEGS ()))
    {
    	FAOF ()
    	PGOF (Zero)
    ...
Note the call to FAOF. Could that be for "FAN OFF"? Seems likely.

And look, we have FAOF and FAON in SSDT-3:

    Method (FAON, 0, Serialized)
    {
    	\_SB.PCI0.LPCB.EC0.WRAM (0x052B, 0x9E)
    	\_SB.PCI0.LPCB.EC0.WRAM (0x0520, 0x8B)
    	Store (\_SB.PCI0.LPCB.EC0.RRAM (0x0521), Local0)
    	And (Local0, 0xCF, Local0)
    	Or (Local0, 0x20, Local0)
    	\_SB.PCI0.LPCB.EC0.WRAM (0x0521, Local0)
    }
    
    Method (FAOF, 0, Serialized)
    {
    	Store (\_SB.PCI0.LPCB.EC0.RRAM (0x0521), Local0)
    	And (Local0, 0xCF, Local0)
    	\_SB.PCI0.LPCB.EC0.WRAM (0x0521, Local0)
    	\_SB.PCI0.LPCB.EC0.WRAM (0x0520, 0x89)
    	\_SB.PCI0.LPCB.EC0.WRAM (0x03A4, Zero)
    	\_SB.PCI0.LPCB.EC0.WRAM (0x03A5, Zero)
    }

And you can see it does a bunch of EC manipulations. Typically the EC controls the system fans, so this seems to confirm these methods are for "FAN ON", and "FAN OFF".

Since these methods manipulate the EC, we cannot call FAOF without the EC being ready. To do that, we need to patch _REG.

So, adding the necessary code to our SSDT:

```
DefinitionBlock("", "SSDT", 2, "hack", "DGPU", 0)
{
	External(_SB.PCI0.PEG0.PEGP._OFF, MethodObj)
	Method(_SB.PCI0.PEG0.PEGP._INI) { _OFF() }
	External(_SB.PCI0.LPCB.EC0, DeviceObj)
	External(_SB.PCI0.LPCB.EC0.XREG, MethodObj)
	External(_SB.PCI0.PEG0.FAOF, MethodObj)
	Scope(_SB.PCI0.LPCB.EC0)
	{
    	OperationRegion(RME3, EmbeddedControl, 0x00, 0xFF)
    	Method(_REG, 2)
    	{
        	XREG(Arg0, Arg1) // call original _REG, now renamed XREG
        	If (3 == Arg0 && 1 == Arg1) // EC ready?
        	{
             	\_SB.PCI0.PEG0.FAOF() // turn dedicated Nvidia fan off
        	}
    	}
	}
}
```

And the patch we need to rename _REG to XREG (again, based on a mixed listing of DSDT.aml):

```
Find: <5F 52 45 47 02 A0 0B 93 68 0A 03>
Replace: <58 52 45 47 02 A0 0B 93 68 0A 03>
```

With the patch in config.plist, EC0._REG is renamed XREG. The eventual call to _REG by the system lands in our modified _REG, which, in turn, calls the original _REG (renamed to XREG) and calls FAOF to turn the fan off.

### Conclusion

Hotpatching discrete GPU disable code is a bit simpler than battery status, but involves similar concepts.

## Credits

[https://github.com/RehabMan/OS-X-Clover-Laptop-Config](https://github.com/RehabMan/OS-X-Clover-Laptop-Config)
[https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)

