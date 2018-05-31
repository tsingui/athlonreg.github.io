---
title: Connect Network in Windows 10
copyright: true
date: 2017-10-15 21:59:01
categories: Study
password: password
description: Windows 10 开机自动连接宽带
tags: 
- 自动连接
- 宽带
---

## Windows 10 开机自动连接宽带
<!--more-->

### 开工

* 首先右击我的电脑->管理->任务计划程序->任务计划程序

![2017-10-15-01](http://ovefvi4g3.bkt.clouddn.com/2017-10-15-01.png)

* 中间窗口空白处右键 -> 创建基本任务

![2017-10-15-02](http://ovefvi4g3.bkt.clouddn.com/2017-10-15-02.png)

* 弹出的下列窗口名称处输入 PPPOE

![2017-10-15-03](http://ovefvi4g3.bkt.clouddn.com/2017-10-15-03.png)

* 继续选择 当用户登录时

![2017-10-15-04](http://ovefvi4g3.bkt.clouddn.com/2017-10-15-04.png)

* 选择 启动程序

![2017-10-15-05](http://ovefvi4g3.bkt.clouddn.com/2017-10-15-05.png)

* 在 程序或脚本 处按照以下格式输入你的本地宽带连接账号

```
rasdial 宽带连接 宽带账号 宽带密码
```

> 比如我的则为
> 
> 经网友反馈，发现图中“宽带连接”后少了一个空格，请大家自主添加

![2017-10-15-06](http://ovefvi4g3.bkt.clouddn.com/2017-10-15-06.png)

* 一路下一步直到完成


