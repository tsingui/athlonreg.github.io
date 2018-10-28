---
title: mac 上使用字符串处理神器 sed 的正确姿势
date: 2018-07-07 22:04:34
categories: 学习
description: mac上使用字符串处理神器sed的正确姿势
tags: 
- sed
- gnu-sed
- xnu-sed
photos:
- http://ovefvi4g3.bkt.clouddn.com/Xnip2018-07-07_22-37-25.png
---

## 简介
`sed`是`shell`中字符串处理的三大神器之一，利用`sed`进行字符串处理对从事`Linux`相关职业的人来说是必不可少的，但是在`mac`上的`sed`与`Linux`的`sed`是有一定区别的，为什么呢，因为`mac`实质上和`Linux`就是不一样的，尽管其中很多基本命令是通用的，例如`ls`、`cd`、`pwd`等。`mac`是`unix`内核，是基于`FreeBSD`的，而我们常用的`Linux`如`Ubuntu`、`CentOS`等是`Linux`内核。

## `sed`的不同
非常大的一个坑就是`sed`命令的不统一，`Linux`的`sed`是基于`GNU`的`sed`，而`FreeBSD`中的`sed`则是基于`XNU`的，其用法有些不同，下面会做对比简要说明。

拿最常用的追加行来说，我们假设一个场景，我需要对`test.txt`文件实时写入，在文件第二行添加`1234`，文件初始内容如下所示

```bash
$ cat test.txt
3333
1112
3333
test
4444
5555
```

在`Linux`下，我们只需要执行下面的命令即可实现追加

```bash
$ sed -i -e '1a\1234' test.txt
```

但是在`mac`下这条命令会报错如下

```
sed: 1: "1a\1234": extra characters after \ at the end of a command
```

这是因为`xnu`的`sed`命令用法不同于`gnu`，具体可以通过下面的命令查看`sed`命令手册

```bash
$ man sed
```

![](http://ovefvi4g3.bkt.clouddn.com/Xnip2018-07-07_22-37-25.png)

那么我想用我习惯的`Linux`的`GNU-sed`怎么解决呢，我们可以安装`gnu-sed`来代替系统内的`sed`，具体方法如下

首先我们需要`Homebrew`包管理器

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

然后，通过`brew`来安装`gnu-sed`

```bash
$ brew install gnu-sed
```

默认`brew`会将`gnu-sed`安装到`/usr/local/Cellar/`目录下，这时我们就可以利用`gsed`来执行了

```bash
$ gsed -i -e '1a\1234' test.txt
```

如果提示命令找不到的话，只需要将下面的路径添加到`PATH`环境变量就可以了

```
/usr/local/Cellar/gnu-sed/4.5/bin/
```

或者将`/usr/local/Cellar/gnu-sed/4.5/bin/gsed`添加别名都可以。

网上也有人用下面的命令安装

```bash
$ brew install gnu-sed --with-default-names
```

貌似这种方式直接替代了系统内的`sed`，我个人不是很推荐这种方式，不是说不好，而是当我们的机器不只是一个人用，是做服务器用的，或者有一些我们正在用的脚本里面有`xnu`的`sed`调用，那么这种方式就会造成一些问题，所以我个人认为安装了`gnu-sed`后，利用别名、环境变量、配置文件等方式调用是更好的一种方法，当然，这个根据个人需求决定就好了。