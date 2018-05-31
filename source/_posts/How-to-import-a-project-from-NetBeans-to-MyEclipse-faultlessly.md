---
title: How to import a project from NetBeans to MyEclipse faultlessly
copyright: true
date: 2017-10-30 16:03:27
categories: Study
description: 将 NetBeans 的项目导入 MyEclipse 并减少错误与乱码现象
tags:
- NetBeans
- MyEclipse
---

## 将 NetBeans 的项目导入 MyEclipse 并减少错误与乱码现象
<!--more-->

## 金币阵列问题
<!--more-->

## 写在前面
最近，在一次网络编程课中，实验室的 `PC` 机有好多 `NetBeans` 打不开，经过一节课的摸索和董老师的帮助，终于找到一种方法将 `NetBeans` 写的项目导入 `MyEclipse` 中，并且可以减少很多错误以及乱码的情况出现

### 进入主题
> 将 `NetBeans` 写的项目导入 `MyEclipse` 中的时候最常见的错误有以下三种：

- 在 `NetBeans` 中如果一条语句过长会有自动换行的情况，但在 `MyEclipse` 中并不能识别这种换行，于是像 `try-catch` 和 `if` 语句这种代码往往在导入工程之后跑到了注释后面，造成语法错误；
- `MyEclipse` 默认编码方式为 `GBK`,所以将 `NetBeans` 写的项目导入 `MyEclipse` 中的时候，项目代码里面的中文注释将会出现乱码；
- 如果 `NetBeans` 中的 `Java` 代码在一个自己建的 `package` 下，会出现很多需要将代码移动到这个 `package` 下的错误。

### 针对这些常见的情况，可以找到下面一种方法进行导入操作
- 在 `MyEclipse` 新建一个 `Java Project`；
- 右键这个 `Project` -> 属性 -> Text file encoding，将编码方式设置为 `UTF-8`；

![2017-10-30-05](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-05.png)

![2017-10-30-04](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-04.png)

- 展开这个 `Project`，右键其下面的 `src` 包，新建一个 `Package`，这里我用 `cn.edu.ldu` 来表示；

![2017-10-30-06](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-06.png)

![2017-10-30-07](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-07.png)

- 右键新建的 `cn.edu.ldu` 包 -> Import -> General -> File System -> Next，在 `From directory` 中选择要导入的项目，然后在弹出的对话框中勾选这个项目，选择 `Finish` 就可以了。

![2017-10-30-01](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-01.png)

![2017-10-30-02](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-02.png)

![2017-10-30-03](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-03.png)

- 操作完成之后只剩下一些内部包的导入工作需要额外操作，其余均比较完美

![2017-10-30-08](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-08.png)

- 运行结果也很好

![2017-10-30-09](http://ovefvi4g3.bkt.clouddn.com/2017-10-30-09.png)

- 大家快去试一下吧

### 收工咯



