---
title: awk to use
date: 2018-08-05 18:01:00
categories: 
- Linux 
- 学习
keywords: awk
description: awk 使用小记
tags: 
- Linux
- 学习
---

# 简介
`awk`是`Linux`最常用的字符串处理工具

# awk 内置参数
- NR -- 行号
- NF -- 列总数
- FILENAME -- 当前文件名

> 实例

- 打印`/etc/passwd`每行的行号，每行的字符总数以及第一行(即每行的用户名)

  `print`实现

  ```bash
  $ awk -F ':' '{print "Line:"NR,"Col:"NF,"User:"$1}' /etc/passwd
  ```

  `printf`实现
  
  ```bash
  $ awk -F ':' '{printf "Line:%s,Col:%s,User:%s\n",NR,NF,$1}' /etc/passwd
  ```
  
- 打印`/etc/passwd`中`UID(即第三列)`大于100的行的行号，字符总数以及第一列(即每行的用户名)

  `print`实现
  
  ```bash
  $ awk -F ':' '{if ($3>100) print "Line:"NR,"Col:"NF,"User:",$1}' /etc/passwd
  ```
  
  `printf`实现
  
  ```bash
  $ awk -F ':' '{if ($3>100) printf("Line:%s,Col:%s,User:%s\n",NR,NF,$1)}' /etc/passwd
  ```
  
- 提取服务器日志`fresh.log`中`ERROR`行发生的时间

`fresh.log`内容格式如下图

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/7b/0fc81ccb4783036209f7ed10c01128.jpg)
  
  利用`sed`和`awk`

  ```bash
  $ sed '/ERROR/p' fresh.log | awk '{print $1}'
  ```
  
  只利用`awk`

  ```bash
  $ awk '/ERROR/{print $1}' fresh.log
  ```