---
title: RW NTFS partition natively on macOS
copyright: true
date: 2017-10-27
categories: Hackintosh
description: 实现 MAC 原生读写 NTFS 分区
tags:
- Hacintosh
- 黑苹果
- NTFS
---

## 实现 MAC 原生读写 NTFS 分区
<!--more-->

### 实现 MAC 原生读写 NTFS 分区

> 打开终端，输入命令

```
$ diskutil list
```

> 输入命令

```
$ sudo vim /etc/fstab
```

> 编辑内容如下

```
LABEL=Win\040Ntfs\040Drive none ntfs rw,auto,nobrowse
```

> 注意

**`Win\040Ntfs\040Drive` 这串字符中`\040`代表空格，`Win\040Ntfs\040Drive` 这一串出现在`diskutil list`那个屏幕里面，比如下图就是`HD-E1`**

![2017-10-27-01](http://ovefvi4g3.bkt.clouddn.com/2017-10-27-01.png)

> 最后一步

```
$ sudo ln -s /Volumes ~/Desktop/Volumes
```

### Credit

> 转自[爱情守望者](https://www.waitsun.com)
> 
> 转载请注明[原帖地址](https://www.waitsun.com/aboutus/help)


