---
title: Sync your hexo with several terminal
copyright: true
date: 2017-10-14 23:35:54
categories: Study
description: 对多设备之间 hexo 搭建的 blog 进行同步
tags: 
- git 
- 同步 
- github
---

对多设备之间`hexo`搭建的`blog`进行同步
<!--more-->

## 前言
> Sync your hexo with several terminal
> 转载请注明[原出处](https://blog.iamzhl.top/2017/10/14/Sync-your-hexo-with-several-terminal/)

## 准备工作

* 首先在 GitHub 建立一个分支用于存储 hexo 本地源文件

## 本地 hexo 源上到 GitHub 

在本地博客根目录下使用 git 指令上传项目到 GitHub 的 hexo 分支

```
$ git init           
$ git remote add origin 仓库地址    
$ git checkout -b hexo     
$ git add .       
$ git commit -m ""        
$ git push origin hexo    
```

--------------------------------------------------------------------

## 其它设备同步

### 建立同步目录

```
$ mkdir blog
```

### 同步 hexo 源

```
$ cd blog/
$ git init
$ git remote add origin 仓库地址
$ git pull -r origin hexo 
```

### 本地搭建 hexo 环境

* 需要安装 Git 和 Node.js 

```
$ npm install hexo --save
$ npm install 
```

* 第一次运行需要验证 GitHub 和 coding 账号 ( 取决于你用什么部署的 blog )

```
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
```

------------------------------------------------------------------------

## 完工

* 做完上面的步骤就可以在这一台设备继续发博文了

```
$ hexo new post "新建博客名字" 
$ hexo clean 
$ hexo g
$ hexo d -g
```

