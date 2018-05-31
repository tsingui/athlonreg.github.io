---
title: Sync the codes between native and remote by git 
copyright: true
date: 2017-09-27 22:54:26
categories: Study
description: 利用 git 实现本地和远程之间代码的同步
tags: 
- git 
- 同步 
- github 
---

## 利用 git 实现本地和远程之间代码的同步
<!--more-->

## 前言
> Sync the codes between native and remote by git
> 转载请注明[原出处](https://blog.iamzhl.top/2017/09/27/Sync%20the%20codes%20between%20native%20and%20remote%20by%20git/)

## 代码放到 git 仓库，然后本地修改同步至仓库，这在生活中是很常见的，下面是一个最简单的案例

### 远程仓库内容同步到本地仓库

> 新建一个本地仓库用于后续工作

```
$ cd ~/Desktop/
$ mkdir test 
$ cd test 
```

> 初始化这个本地目录

```
$ git init 
```

> 关联到远程仓库(以我新建的 Test 这个仓库为例)

```
$ git remote add origin https://github.com/athlonreg/Test.git 
```

> 合并远程仓库的文件到本地

```
$ git pull --rebase origin master
```

--------------------------------------

### 修改本地仓库并推送到远程仓库

> 对本地仓库的一些修改

```
$ mkdir inner 
$ cd inner 
$ touch a.txt 
```

#### 现在将我新建的 inner 目录和 a.txt 文档推送到远程仓库

> git add 命令添加新建目录与文件

```
$ git add . 
```

> git commit 提交修改，引号内为修改的概要

```
$ git commit -m "add some files" 
```

> 这里会提示配置用户身份(两条命令的引号内分别为你 github 账号绑定的邮箱和用户名)

```
$ git config --global user.email "15563836030@163.com" 
$ git config --global user.name "athlonreg" 
```

> 这是继续提交修改就可以了

```
$ git commit -m "add some files" 
```

> 推送修改后的本地仓库到远程仓库

```
$ git push -u origin master  
```

> 这时终端会让你输入你的 github 用户名和密码，根据提示输入完，就推送完成了，再去 github 网页端就发现仓库已经更新至和本地相同了。

### Windows 用户安装好 git 可以利用 git bash 来操作

> 下面是我在 Windows 下利用 git bash 工具的一些截图，大家可以作参考

![2017-09-27](http://ovefvi4g3.bkt.clouddn.com/2017-09-27-2017-09-27-03.PNG)

![2017-09-27-04](http://ovefvi4g3.bkt.clouddn.com/2017-09-27-2017-09-27-04.PNG)




