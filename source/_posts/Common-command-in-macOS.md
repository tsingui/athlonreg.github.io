---
title: Common command in macOS
copyright: true
date: 2018-03-30 20:32:47
categories: Hackintosh
description: macOS下一些常用命令
tags: 
- command
- macOS
---

## macOS下一些常用命令
<!--more-->

### Trim
> 开启
```
$ sudo trimforce enable
```

> 关闭
```
$ sudo trimforce disable
```

### 查看启用的`ig-platform-id`
```
$ ioreg -l | grep -y platform-id
```

### 笔记本开启插电源出提示音:
> 开启:
```
$ defaults write com.apple.PowerChime ChimeOnAllHardware -bool true; open /System/Library/CoreServices/PowerChime.app &
```

> 关闭:
```
$ defaults write com.apple.PowerChime ChimeOnAllHardware -bool false; killall PowerChime
```

### 去掉`apfs.efi`最新版本的日志调试显示
```
$ cd ~/Desktop						
& cp /usr/standalone/i386/apfs.efi .
$ perl -i -pe 's|\x00\x74\x07\xb8\xff\xff|\x00\x90\x90\xb8\xff\xff|sg' ./apfs.efi
```

### 提取显示器`EDID`及设备`ID`厂商`ID`
> EDID
```
$ ioreg -lw0 | grep -i "IODisplayEDID" | sed -e 's/.*<//' -e 's/>//'
```

> PID
```
$ ioreg -l | grep "DisplayProductID"    
```

> VID
```
$ ioreg -l | grep "DisplayVendorID"  
```

### 为`macOS Sierra`以上的`OS X`开启任何来源
```
$ sudo spctl --master-disable
```

### 查看加载的非官方内核扩展 -- `kext`
```
$ kextstat | grep -v "com.apple" | grep -v Energy
```

### 查看显示器硬件信息
> EDID
```
$ ioreg -l | grep "IODisplayEDID"
```

> ProductID
```
$ ioreg -l | grep "DisplayProductID"
```

> VendorID
```
$ ioreg -l | grep "DisplayVendorID"
```

### 设置系统语言
```
$ languagesetup
```

### 磁盘工具
```
$ diskutil 
$ fdisk 
$ df 
```

### `kext`工具
```
$ kextstat 
$ kextfind
$ kextlibs
$ kextcache
```

### 系统设置工具
```
# systemsetup
```

### 系统控制工具
```
$ sysctl 
$ sysadminctl
```

### 系统状态查看工具
```
$ systemstats 
$ system_profiler
$ ioreg
$ iostat
$ bdmesg
```

### `nvram`工具
```
$ nvram
```

### `pkg`工具
```
$ pkgutil
```
### `clover`生成工具
```
$ clover-genconfig
```

### 查看启动参数
```
$ sysctl -n kern.bootargs 
```

### 查看`CPU`内核数
```
$ sysctl -n hw.physicalcpu 
```

### 查看`CPU`线程数
```
$ sysctl -n hw.logicalcpu 
```

### 查看机型`SMBIOS`
```
$ sysctl -n machdep.cpu.brand_string 
```

### 查看网络是否连通
```
$ ping -c 2 www.baidu.com &>/dev/null&& echo "Internet: Connected" || echo "Internet: Disconnected" 
```

### 查看当前登录用户
```
$ who 
```

### 查看`DNS`
```
$ cat /etc/resolv.conf | sed -n '16p' | awk '{print $2}' 
```

### 查看`IP`
```
$ osascript -e "IPv4 address of (system info)" //内网
$ dig +short myip.opendns.com @resolver1.opendns.com //公网
```

### 查看运行时间
```
$ uptime | sed 's/.*up \([^,]*\), .*/\1/'
```

### 查看电量剩余
```
$ ioreg -c AppleSmartBattery -r | awk '$1~/Capacity/{c[$1]=$3} END{OFMT="%.2f%"; max=c["\"MaxCapacity\""]; if (max>0) { print 100*c["\"CurrentCapacity\""]/max;} }' 
```

### 查看电池充电状态
```
$ pmset -g batt | sed -n '2p' | awk '{print $4}' | sed 's/;//g' 
```

### 查看系统版本
```
$ sw_vers -productVersion 
```

### 查看系统版本号
```
$ sw_vers -buildVersion
```

### 查看内存容量
```
$ echo $(($(sysctl -n hw.memsize) / 1024 / 1024))
```

### 查看操作系统型号
```
$ sysctl -n hw.model
```

### 待续...


