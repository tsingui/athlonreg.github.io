---
title: Resolve short duration lag after wake and after login on haswell or broadwell
copyright: true
date: 2017-10-07 03:06:04
categories: Hackintosh
description: Resolve short duration lag after wake and after login on haswell or broadwell
tags: 
- short duration lag
- 黑苹果
---

## Resolve short duration lag after wake and after login on haswell or broadwell
<!--more-->

### 写在前面

> 本文来自 [tonymacx86.com](https://www.tonymacx86.com/threads/readme-common-some-unsolved-problems-in-10-12-sierra.202316/page-94#post-1485104) 
> 原作者 [RehabMan](https://www.tonymacx86.com/members/rehabman.429483/)
> 转载请注明 [原出处](https://blog.iamzhl.top/2017/10/07/Resolve%20short%20duration%20lag%20after%20wake%20and%20after%20login%20on%20haswell%20or%20broadwell/)

### 开工

> 在 macOS Sierra 10.12.4 中，有不少 Haswell 和 Broadwell 机器出现了一种情况，就是在开机后的登录界面会有大约 20s 的无响应延迟状态，这种情况在之前是没有出现的，如果你的机器恰好是这两个平台的一种并且出现了这种情况，那么请注意，你会需要对你的 config.plist 做一些调整，如下: 

```
Comment: 0x0a260006 9MB cursor bytes (vbo), 2 ports only (RehabMan)
Find: <0600260a 01030303 00000002 00003001 00006000>
Replace: <0600260a 01030202 00000002 00003001 00009000>
```

```
Comment: 0x0a260006 disable 0204 port, change 0105 DP port to 0204 HDMI (RehabMan)
Find: <01050900 00040000 87000000 02040900 00040000 87000000>
Replace: <02040900 00080000 87000000 FF000000 01000000 40000000>
```

将这两个 patch 打到 config.plist -> Kernel and Kext Patches -> KextsToPatch 处，保存即可，如果你的机器是 Haswell 的 HD4600 并且上面的 patch 不能解决这个问题，请尝试放 AzulPatcher4600.kext 到 /EFI/CLOVER/Kexts/Other ，此项目 GitHub 地址: 

```
https://github.com/coderobe/AzulPatcher4600
```

