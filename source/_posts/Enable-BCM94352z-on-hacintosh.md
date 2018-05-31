---
title: Enable BCM94352z on your hacintosh
copyright: true
date: 2017-09-13
categories: Hackintosh
description: 黑苹果无线网卡 BCM94352z 驱动教程
tags:
- Hacintosh
- 黑苹果
- BCM94352z
---

## 黑苹果无线网卡 BCM94352z 驱动教程
<!--more-->

# 添加仿冒 ID 启用蓝牙：

```
config.plist -> Device -> FakeID -> WIFI 中填写 0x43a014e4 
```

# 在 Clover 的配置文件 config.plist -> Kernel and Kext Patches 添加以下代码块

```
<dict>
    <key>Comment</key>
    <string>10.11+-BT4LE-Handoff-Hotspot-lisai9093</string>
    <key>Disabled</key>
    <false/>
    <key>Find</key>
    <data>
    SIX/dEdIiwc=
    </data>
    <key>Name</key>
    <string>IOBluetoothFamily</string>
    <key>Replace</key>
    <data>
    Qb4PAAAA60Q=
    </data>
</dict>
```

# 下载并安装驱动

```
https://github.com/vit9696/Lilu/releases
https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads/   
https://bitbucket.org/RehabMan/os-x-brcmpatchram/downloads/
https://sourceforge.net/projects/airportbrcmfixup/files/?source=navbar
```

   将以下驱动拷贝到 CLOVER/EFI/CLOVER/kexts/Other 文件夹下(由于 AirportBrcmFixup.kext 是依赖于 Lilu 运行的插件，所以还需要确保该目录下必须存在 Lilu.kext)

```
AirportBrcmFixup.kext 
FakePCIID.kext 
FakePCIID_Broadcom_WiFi.kext 
BrcmPatchRAM2.kext 
BrcmFirmwareData.kext
Lilu.kext
```

# 重建缓存

```
sudo rm -rf /System/Library/Caches/com.apple.kext.caches/Startup/kernelcache
sudo rm -rf /System/Library/PrelinkedKernels/prelinkedkernel
sudo touch /System/Library/Extensions/ && sudo kextcache -u /
```

# 重启

