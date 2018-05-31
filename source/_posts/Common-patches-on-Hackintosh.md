---
title: Common patches on Hackintosh
copyright: true
date: 2018-04-09 10:08:56
categories: Hackintosh
description: 黑苹果常见补丁
tags: 
- patch
- Hackintosh
- 补丁
---

## 黑苹果常见补丁
<!--more-->

### 先说说怎样强制加载某个驱动
如下，`KextToPatch`并列`ForceKextsToLoad`，设置`kext`路径
```
<key>ForceKextsToLoad</key>
<array>
    <string>\System\Library\Extensions\AppleHDA.kext</string>
    <string>\Extra\Extensions</string>
</array>
```

### 笔记本显存修改至`2048MB`
> HD4200_4400_4600 Mobile：

```
Name：		AppleIntelFramebufferAzul
Find：		01030303 00000002 00003001 00006000 00000060
Replace：	01030303 00000002 00003001 00009000 00000080
Comment:	1536MB -> 2048MB for HD4200_4400_4600 Mobile
```

> HD620 Mobile：

```
Name：		AppleIntelKBLGraphicsFramebuffer
Find：		01030303 00002002 00000000 00000060
Replace：	01030303 00002002 00000000 00000080 
Comment:	1536MB -> 2048MB for HD620 Mobile
```

> HD630 Mobile：

```
Name：		AppleIntelKBLGraphicsFramebuffer
Find：		01030303 00006002 00005001 00000060
Replace：	01030303 00006002 00005001 00000080
Comment:	1536MB -> 2048MB for HD630 Mobile
```

> HD520_530_540 Mobile：

```
Name：		AppleIntelSKLGraphicsFramebuffer
Find：		01030303 00002002 00005001 00000060
Replace：	01030303 00002002 00005001 00000080
Comment:	1536MB -> 2048MB for HD520_530_540 Mobile
```

> HD5500 Mobile：

```
Name：		AppleIntelBDWGraphicsFramebuffer 
Find: 		01030303 00002002 00005001 00000060
Replace: 	01030303 00002002 00005001 00000080
Comment:	1536MB -> 2048MB for HD5500 Mobile
```

### 开启`Trim`
```
Name: com.apple.iokit.IOAHCIBlockStorage
Find: 00415050 4C452053 534400
Replcae: 00000000 00000000 000000
Comment: Enable TRIM for SSD
```

### 花屏补丁
```
Name: com.apple.iokit.IOGraphicsFamily
Find: 4188C4EB 11
Replcae: 4188C4EB 31
Comment: Boot graphics glitch, 10.10.2/10.10.3
MatchOS: 10.10.2,10.10.3
```

```
Name: com.apple.iokit.IOGraphicsFamily
Find: 01000075 17
Replcae: 010000EB 17
Comment: Boot graphics glitch, 10.10.x/10.11.x (credit lisai9093, cecekpawon)
MatchOS: 10.10.x,10.11.x
```

```
Name: com.apple.iokit.IOGraphicsFamily
Find: 01000075 25
Replcae: 010000EB 25
Comment: Boot graphics glitch, 10.12.dp1 (credit denskop)
MatchOS: 10.12.x
```

```
Name: com.apple.iokit.IOGraphicsFamily
Find: 01000075 22
Replcae: 010000EB 22
Comment: Boot graphics glitch, 10.13 beta (based on denskop patch)
MatchOS: 10.13.x
```

### DVMT补丁
> Broadwell

```
Name: com.apple.driver.AppleIntelBDWGraphicsFramebuffer
Find: 39CF763C
Replcae: 39CFEB3C
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.10.x (based on Austere.J patch)
MatchOS: 10.10.x
```

```
Name: com.apple.driver.AppleIntelBDWGraphicsFramebuffer
Find: 4139C476 3E
Replcae: 4139C4EB 3E
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.11.beta (based on Austere.J patch)
MatchOS: 10.11.x
```

```
Name: com.apple.driver.AppleIntelBDWGraphicsFramebuffer
Find: 8945C839 C7764F
Replcae: 8945C839 C7EB4F
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.12.0 (based on Austere.J patch)
MatchOS: 10.12.x
```

```
Name: com.apple.driver.AppleIntelBDWGraphicsFramebuffer
Find: 4C895DB8 7644
Replcae: 4C895DB8 EB44
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.13.0/1 (credit PMHeart)
MatchOS: 10.13.0,10.13.1
```

```
Name: com.apple.driver.AppleIntelBDWGraphicsFramebuffer
Find: 4C8945C0 7644
Replcae: 4C8945C0 EB44
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.13.2/3 (credit RehabMan)
MatchOS: 10.13.2,10.13.3
```

> Skylake

```
Name: com.apple.driver.AppleIntelSKLGraphicsFramebuffer
Find: 4139C476 2A
Replcae: 4139C4EB 2A
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.11.4 (based on Austere.J patch)
MatchOS: 10.11.x
```

```
Name: com.apple.driver.AppleIntelSKLGraphicsFramebuffer
Find: 8945C839 C67651
Replcae: 8945C839 C6EB51
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.12.0 (based on Austere.J patch)
MatchOS: 10.12.x
```

```
Name: com.apple.driver.AppleIntelSKLGraphicsFramebuffer
Find: 4C8955B8 7640
Replcae: 4C8955B8 EB40
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.13.0/1 (credit PMHeart)
MatchOS: 10.13.0,10.13.1
```

```
Name: com.apple.driver.AppleIntelSKLGraphicsFramebuffer
Find: 4C895DB8 7640
Replcae: 4C895DB8 EB40
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.13.2/3 (credit PMHeart, , shdkpr2008)
MatchOS: 10.13.2,10.13.3
```

> Kabylake

```
Name: com.apple.driver.AppleIntelKBLGraphicsFramebuffer
Find: 4C895DC0 7646
Replcae: 4C895DC0 EB46
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.13.0/1 (credit PMHeart)
MatchOS: 10.13.0,10.13.1
```

```
Name: com.apple.driver.AppleIntelKBLGraphicsFramebuffer
Find: 4C896DB8 7646
Replcae: 4C896DB8 EB46
Comment: Disable minStolenSize less or equal fStolenMemorySize assertion, 10.13.2/3 (credit RehabMan)
MatchOS: 10.13.2,10.13.3
```

### 硬盘橙色
```
Name: AppleAHCIPort
Find: 45787465 726E616C
Replcae: 496E7465 726E616C
Comment: Define external drivers as internal to fix yellow drive icons
```

### 让没有`ECC`内存的机器利用`MacPro4,1`或者 `MacPro5,1`机型启动
```
Name: AppleTyMCEDriver
Find: 720A004D 61635072 6F342C31 004D6163 50726F35 2C310058
Replcae: 720A0000 00000000 00000000 00000000 00000000 00000058
Comment: Allow booting with a MacPro4,1 or MacPro5,1 SMBIOS definition without ECC memory
```

### 万能声卡将`Headphones`显示替代为`Telephones`
```
Name: VoodooHDA
Find: 48656164 70686F6E 657300
Replcae: 54656C65 70686F6E 657300
Comment: For VoodooHDA replacing the string Headphones with Telephones
```


