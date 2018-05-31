---
title: Install jdk on macOS
copyright: true
date: 2017-08-28
categories: Study
description: Mac 下搭建 Java 开发环境
tags:
- Java
- 搭建
- Mac
- 环境
---

## Install macOS High Sierra on HP OMEN by HP Laptop
<!--more-->

## 安装 jdk 
Mac系统自带jdk，但是版本比较老，我们可以去官网下载最新的Jdk，安装比较简单，这里不再赘述。

## 配置 jdk 环境变量
打开终端输入 vim ~/.bash_profile 回车，然后按i进入编辑模式，在最后面输入以下内容： 
    
```
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_60.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.

export JAVA_HOME
export PATH
export CLASSPATH
```

按下 esc ，然后输入 :wq 回车，保存退出
    
然后输入 source ~/.bash_profile 回车文件修改就生效了。

输入 java -version 回车可以查看 Java 版本，whereis java 可以查看 Java 位置，echo $JAVA_HOME 可以打印出 JAVA_HOME 。

 
## 安装eclipse
为了更方便的进行开发工作，我们还需要安装Eclipse，去官网下载完成后解压，把.app文件拖进应用程序(Application)就可以了，然后创建一个workspace，也就是工作目录，用来存放工作代码。

