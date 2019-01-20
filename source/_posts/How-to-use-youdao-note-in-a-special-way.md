---
title: 高效利用有道云笔记
date: 2019-01-20 21:12:25
password: 
categories: 高效利用有道云笔记
keywords: 
- 有道云笔记
- Picbed
- 图床
description: 高效利用有道云笔记
tags: 
- 有道云笔记
- Picbed
- 图床
photos:
- https://ws1.sinaimg.cn/large/006dLY5Ily1fzdem32mcej320w1e0nep.jpg
top:
- 105
---

## 前言

先说几个博主和其他的码字农民工比较头疼的问题

- 云同步

现在是云的时代，没有云同步的码文环境不是一个好的环境，可能每个人都有不止一个码文平台，比如工作配的机器和私人的机器，我在其中一台机器写好的文章还要再写一份到另外的机器。。。简直不要太lower。可能有人说我们用某度网盘。。。What's that？已经放弃好久，本文不做赘述，想用的就用吧。。。

- 跨平台

这里假设上面的环境成立，你有两台机器，私人的是Mac环境，工作机器是Windows，那么问题来了，之前我在Mac非常喜欢MWeb，因为它的图床集成让我着迷 ，截图粘贴一张引用外链的图片就这么完成了，就是这么快，但是现在也已经放弃了，因为Windows平台人家不做，不要问我为什么，我不想喷Windows太垃圾🌝🌝但是无奈单位只有Windows，于是我要用两套环境。。。记住两套快捷键。。。

- MarkDown

关于MarkDown的介绍这里不赘述。于我而言，不支持MarkDown解析的编辑器，我是绝对不会用的，Word就工作用用。。。为何呢？因为MarkDown太优雅了，在我看来，Word和MarkDown就像50岁的大妈和20岁的妙龄少女，写文档发博文用Word简直是遭罪，用MarkDown简直是享受，当然啦，纯属个人看法，不喜勿喷。。。

- 图床

说完了MarkDown和云的问题，有一个问题很明显，云上的数据文字可以，图片甚至视频怎么办？难道我还要买个云存储甚至是云服务器？当然不用啦！国内有些大公司还是相当良心的，先神秘一下，具体用什么，下面详细说😄

## 环境准备

- 编辑器
  - [Typora](https://www.typora.io)
- 截图工具
  - Windows：[Snip](https://snip.qq.com)
  - macOS：[Xnip](https://zh.xnipapp.com)
- 图床
  - Sina Weobo账号(Sina的微博平台提供了一个图床服务，自带cdn)
  - [PicGo](https://github.com/Molunerfinn/PicGo/releases)
- 云同步
  - [有道云笔记](http://note.youdao.com)

## 配置PicGo

其他的都没什么好说的，说一下PicGo的配置吧！首先在新浪微博官网登录微博账号，然后打开[minipublish](https://weibo.com/minipublish)页面，如下图所示

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fzde3dq3hvj326w1e047w.jpg)

然后打开调试窗口，`Chrome`快捷键为`F12`，然后调到网络选项卡，如下图所示

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fzde59wlkyj326w1e0gzx.jpg)

点击`minipublish`，查看一下Cookie值如下图所示

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fzde6i4je7j326w1e0tpj.jpg)

选中Cookie后面那一串字符，拷贝一下，打开`PicGo`窗口，找到图床设置 -> 新浪图床，在Cookie后面的输入框粘贴刚才的字符串，勾选cookie模式，点击确定 -> 设为默认图床，如下图

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fzde7rnurvj31eo0v847r.jpg)

这时候，用前文所说的截图工具或者自己喜欢的工具截图，然后按下刚刚设置的快捷键，图片就会上传到新浪微博的图床服务器，然后将图片的外链返回给剪贴板了。

在有道云随便建一个MarkDown文档，粘贴一下，如图

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fzdem32mcej320w1e0nep.jpg)

文档保存后，有道云笔记会自动帮我们进行云同步，从此不必担心其3G的空间不够用了。

当然啦，快捷键根据个人习惯在PicGo设置里面自行定义吧。

