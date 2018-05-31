---
title: Check CPU frequences by using AppleIntelInfo
copyright: true
date: 2017-09-05
categories: Hackintosh
description: 利用 AppleIntelInfo 查看变频
tags:
- AppleIntelInfo
- 变频
- Hacintosh
- 黑苹果
---

## 利用 AppleIntelInfo 查看变频
<!--more-->

# 前言
很多朋友在查看自己机器变频时利用 CPU-S 发现并不准确，这里我教给大家一种比较准确的方法----利用 AppleIntelInfo 查看变频

# 开工
## 首先下载 AppleIntelInfo 源码编译，打开终端，输入：
```
cd ~/Desktop 
```

回车继续敲：

```
git clone https://github.com/athlonreg/AppleIntelInfo.git
```
  
回车后就把 AppleIntelInfo 源码下载在桌面了

然后打开 AppleIntelInfo 的工程文件进行编译生成 .kext 内和扩展文件，这一部分这里不再赘述，如果不会的话参考我的另一个帖子，里面有提到，链接在这(后面的汉字也是地址的一部分哦)：

```
http://athlonreg.top/2017/08/31/解决Lilu造成的一些问题/
```
 
将编译后的 AppleIntelInfo.kext 放到桌面
    
## 然后开始利用命令行看变频数据
打开终端，输入：

```
cd ~/Desktop 
```
  
回车后继续敲

```
sudo chown -R root:wheel AppleIntelInfo.kext 
```
    
回车会提示输入密码，输入之后回车继续敲：

```
sudo kextutil AppleIntelInfo.kext 
```
  
再回车，接着敲：

```
sudo cat /tmp/AppleIntelInfo.dat 
```
  
回车之后变频数据就出来了，例如我的机器：

![2017-09-05-01](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-01-1.png)

![2017-09-05-02](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-02-1.png)

![2017-09-05-03](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-03-1.png)

![2017-09-05-04](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-04-1.png)

![2017-09-05-05](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-05-1.png)

![2017-09-05-06](http://ovefvi4g3.bkt.clouddn.com/2017-09-05-06-1.png)

一般我们只看最后一行就可以了哦

比如我的机器就是 800、 1000、 ...... 、 2700 ，单位是MHz，正好符合我的机器，最低 800MHz ，最高2.4GHz，可超频到2.7GHz。


# 完工
行胜于言，快去试试你的机器是不是变频正常吧！！






