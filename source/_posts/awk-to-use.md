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
  
# `START` `END`

> `awk`提供了一个简单的方式在利用`awk`处理编程需求时的问题，例如制表时需在表前打印表头、表后打印表尾。

> 举一个案例，制表显示`/etc/passwd`的行号、列号和用户名

> 思路是首先在开头打印"Line Col User"，然后依次打印`/etc/passwd`每一行的行号、列号和用户名，最后另起一行打印`--------`并在中间加入`awk`操作的文件名以结束制表

```bash
$ awk -F ':' 'BEGIN{print "Line    Col    User"}{print NR,NF,$1}END{print "------",FILENAME,"------"}' /etc/passwd | grep -v "#"
```

> 其中的`grep -v "#"`用以过滤掉`/etc/passwd`中开头的无用说明信息

## 运行结果

> 为截图方便这里只截了前面的一些行和最后的一些行

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/93/04d33ecfbe22a469a95806f4d7e33f.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/6a/599d7e553eddcb04e05d87118fe358.jpg)

