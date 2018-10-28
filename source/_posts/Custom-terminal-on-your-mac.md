---
title: iTerm2 + ohmyzsh + powerlevel9k + tmux 打造专属个性化终端
date: 2018-06-26 11:04:23
categories: 学习
description: iTerm2 + ohmyzsh + powerlevel9k + tmux 打造专属个性化终端
tags: 
- iTerm2
- tmux
- oh-my-zsh
- 终端美化
- archey
photos:
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/5c/d74f1affaf72faac5b2887dc78625d.jpg
top: 100
---

# 先来张图镇楼
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/5c/d74f1affaf72faac5b2887dc78625d.jpg)

# 首先搭建好安装`homebrew`环境

> 在`mac`上拥有一个好的包管理器是非常重要的，`Debian`家族有`apt`，`mac`有`homebrew`，非常好用。

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

# 安装`oh-my-zsh`

> `oh-my-zsh`是一款非常好用且美观的`shell`工具，其命令的补全等都是其他如`bash`、`csh`等所无法比拟的

> 安装方式两种

- 通过`curl`

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

- 通过`wget`

```bash
$ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

安装完成后设定`zsh`为默认`shell`

```bash
$ chsh -s /bin/zsh
```

# 设定`oh-my-zsh`的主题

> `oh-my-zsh`支持非常多的主题，这里我将我个人比较喜欢的主题`powerlevel9k`作为实例

```bash
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

然后修改`zsh`的配置文件

```bash
$ vim ~/.zshrc 
```

将`ZSH_THEME`设定为`powerlevel9k`，如图

![](http://ovefvi4g3.bkt.clouddn.com/15299841414317.jpg)

然后保存退出，使配置文件重新生效

```bash
$ source ~/.zshrc
```

# 安装`iTerm2`

> `iTerm2`是一款替代系统内置终端的工具，其功能更强大，可定义扩展性也更强

```bash
$ brew cask install iterm2
```

# 安装`archey`小工具

> `archey`是一个命令行美化工具，其可以在运行终端程序时为用户显示打印出一个七彩的苹果`logo`

> 这个工具的原作者是[`obihann`](https://github.com/obihann)，我将其按照自己的习惯进行了一些修改，并做了汉化，朋友们可以自行选择

- 原作者的安装方式

```bash
brew install archey
```

我个人修改的和汉化的可以通过我`GitHub`仓库中`Pages`页面的`README`说明文档进行安装，按照要求安装并配置完成后，退出终端再重新打开就可以发现终端可以自动打印图中的七彩苹果了。

[https://athlonreg.github.io/archey-osx/](https://athlonreg.github.io/archey-osx/)

# 安装`tmux`小工具

> `Tmux`是一个优秀的终端复用软件，类似`GNU Screen`，但来自于`OpenBSD`，采用`BSD`授权。

```bash
$ brew install tmux
```

安装完成后输入命令`tmux`即可打开软件，界面十分简单，类似一个下方带有状态栏的终端控制台

安装完成后，我们将其再美化一下

```bash
$ cd ; rm -rf .tmux
$ git clone https://github.com/gpakosz/.tmux.git
$ ln -s .tmux/.tmux.conf
$ cp .tmux/.tmux.conf.local .
```

# 美化结束
> 到这里，相信你应该和我开头的截图有一样的效果了，如果没有的话，可以在本文后面评论，我会尽快回复。
