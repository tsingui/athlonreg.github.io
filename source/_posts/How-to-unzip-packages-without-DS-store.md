---
title: How to unzip packages without .DS_store
copyright: true
date: 2018-03-15 17:11:43
categories: Hackintosh
description: mac 下解压压缩包避免生产.DS_store文件
tags: 
- .DS_store
---

## mac 下解压压缩包避免生产.DS_store文件
<!--more-->

### Mac下面压缩的时候总会自动生成 .DS_store 文件，用户可以自行选择是否需要生成，执行下面命令之后需要重启Mac生效。

- 禁止 .DS_store生成：

```
$ defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
```

- 恢复 .DS_store生成：

```
$ defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```

