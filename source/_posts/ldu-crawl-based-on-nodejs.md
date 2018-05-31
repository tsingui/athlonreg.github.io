---
title: Ldu crawl based on nodejs
copyright: true
date: 2018-01-10 19:40:02
categories: Study
description: 基于Nodejs实现的网络爬虫
tags:
- Nodejs
- crawl
- 爬虫
---

## 基于Nodejs实现的网络爬虫
<!--more-->

### 简介
基于Nodejs实现的网络爬虫，爬取鲁东大学官网指定数量的新闻保存至本地。

### 项目下载
终端执行：

```
$ git clone https://github.com/athlonreg/ldu-crawl-based-on-nodejs.git
```

`Windows`用户请去项目首页下载，如图：

![15155892546769](http://ovefvi4g3.bkt.clouddn.com/15155892546769.jpg)

### 项目目录结构
项目目录共有`data`、`image`、`node_modules`三个文件夹，其中`node_modules`为项目用到的`node`模块包，`data`和`image`分别用以存储抓取到的所有新闻，`data`用以保存文本内容，`image`用以保存所有文章内的图片，以文章标题命名。如下图所示：

![15155845693616](http://ovefvi4g3.bkt.clouddn.com/15155845693616.jpg)

`index.html`是程序的`web`主页面；
`server.js`用以启动服务器；
`spider.js`是爬虫主程序；
`test.sh`用以启动爬虫开始抓取工作。

### 程序运行方法
#### For Windows
> 两种方式，首先将项目放到桌面：

1、在根目录利用`cmd`或者`Git Bash`执行：

```
$ node spider.js
```

爬虫程序即开始执行。

2、双击`test.sh`或者利用`Git Bash`执行(若执行闪退请在`Git Bash`执行)：

```
$ chmod +x test.sh
$ ./test.sh
```

即可自动完成所有工作，抓取工作完成后，命令行自动退出。

#### For macOS
> 两种方式

1、假设项目放于桌面，打开终端执行：

```
$ cd ~/Desktop/ldu_crawl/
$ chmod +x test.sh
$ ./test.sh
```

即可自动完成所有工作，抓取工作完成后，命令行自动退出。

2、假设项目放于桌面，打开终端执行：

```
$ cd ~/Desktop/ldu_crawl/
$ node spider.js
```

### 预设界面查看
#### 启动服务器
终端执行：

```
$ node server.js
```

![2018-01-10](http://ovefvi4g3.bkt.clouddn.com/2018-01-10.png)

#### 打开浏览器
网址输入：

```
http://127.0.0.1:8080/
```

即可打开项目首页。如图所示：

![15155856514536](http://ovefvi4g3.bkt.clouddn.com/15155856514536.jpg)

![15155856857593](http://ovefvi4g3.bkt.clouddn.com/15155856857593.jpg)

点击了解使用方法即可查看详细使用说明。

