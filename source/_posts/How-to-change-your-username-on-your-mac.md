---
title: How to change your username on your mac
copyright: true
date: 2018-03-15 17:19:00
categories: Hackintosh
description: 更改 mac 的帐户名、主机名和计算机名
tags: 
    - 账户名
    - 主机名
    - 计算机名
    - mac
---

## 更改 mac 的帐户名、主机名和计算机名
<!--more-->

### 帐户信息修改
```
System Preferences > Users & Groups > 右单击当前用户 > Advanced Options
```

_注意：用了一段时间的电脑不建议修改，可能会导致很多软件要重新安装。_

### 主机名修改
```
$ sudo scutil --set HostName MacBookPro
```

### 计算机名修改
```
$ sudo scutil --set ComputerName MacBookPro
```

