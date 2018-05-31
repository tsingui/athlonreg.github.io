---
title: Use GitHub for team development
copyright: true
date: 2018-04-21 22:07:42
categories: Study
description: 利用 GitHub 进行团队开发
tags: 
- GitHub
- 团队开发
- 分支管理
---

## 利用 GitHub 进行团队开发
<!--more-->

### 创建项目
本文以`GitHub`项目为例: 

```
https://github.com/athlonreg/Common-patches-for-hackintosh.git
```

然后在本地克隆项目代码： 

```
$ git clone https://github.com/athlonreg/Common-patches-for-hackintosh.git
```

查看项目分支情况可以使用命令

```
$ git branch 
* master 
```

可以看到当前项目坐在的分支是`master`（*号后边为当前所在分支名）。
 
而且项目目前也只有一个分支，就是`master`。

### 团队开发
但是我们在实际项目开发中，通常都是以团队开发为主，所以为了维护线上主干代码的稳定，我们也都会采取创建分支 -> 开发 -> 测试 -> 合并 -> 上线的形式进行实际操作的。

接下来描述一下简单的团队开发`Git`项目。

#### 本地分支

工程师`A`需要对原来的代码做改动，这时他需要创建一个开发分支，假设名字为`dev`

```
$ git branch dev
$ git branch
  dev
* master
```
这个时候我们看到本地工作区已经有两个分支：`master`和`dev`。但当前工作区还是在`master`上（注意*号位置），需要手动切换到`dev`上。只需使用`git checkout`命令

```
$ git checkout dev
Switched to branch 'dev'
$ git branch
* dev
  master
```

当然有人希望创建分支后直接切换到新的分支：

```
$ git checkout -b dev
Switched to a new branch 'dev'
```

这样就将当前工作区切换到新的分支中，我们可以发现此时的`dev`分支中的内容是`master`的复制。 

#### 远程分支

现在的`dev`分支只是存在于`A`的本地环境，当工程师`B`打算协同`A`进行相同业务的开发时，他也需要拿到`dev`分支的代码，那该怎么获取呢？此时需要`A`将本地分支推送到远程分支，以供给其他工程师共同开发。 

使用`git branch -a`能够查询当前所有分支，包括本地分支和远程分支（下边`remotes/origin`开头）

```
$ git branch -a
* dev
  master
  remotes/origin/master
```

发现并没有远程分支里并没有新建的`dev`，这时需要执行`git push origin dev`命令，将本地`dev`分支推送到`GitHub`服务器，生成远程分支。

```
$ git push origin dev
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/athlonreg/Common-patches-for-hackintosh
 * [new branch]      dev -> dev
```

这时再用`git branch -a`查看分支。

```
$ git branch -a
* dev
  master
  remotes/origin/dev
  remotes/origin/master
```

可以看到多了一个名为`remotes/origin/dev`的分支，即为创建的远程分支。

好了，现在`B`和其他任何工程师都可以通过拉取远程分支获取`A`创建的`dev`分支代码。 

`B`先做一次分支查询

```
$ git branch -a
* master
  remotes/origin/dev
  remotes/origin/master
```

发现存在`remotes/origin/dev`远程分支。 
此时只需执行`git fetch origin dev:dev`将远程分支代码拉取到本地.。

```
$ git fetch origin dev:dev
From https://github.com/athlonreg/Common-patches-for-hackintosh
 * [new branch]      dev    -> dev
$ git branch -a
  dev
* master
  remotes/origin/dev
  remotes/origin/master
```

再通过查询可以看到本地多了一个`dev`本地分支。 
`git fetch origin dev:dev`这个命令的意思是将远程`dev`分支代码拉取到本地`dev`分支中。这是一个快捷的方式，如果`B`本地没有`dev`分支，该命令会创建一个名为`dev`的分支，如果`B`本地有自己的分支，如`B_dev`，则可以执行`git fetch origin dev:B_dev`或者先切到`B_dev`分支内，执行`git fetch origin dev`即可。

#### 多人开发
![20160430221106224](http://ovefvi4g3.bkt.clouddn.com/20160430221106224.png)

![2018042201](http://ovefvi4g3.bkt.clouddn.com/2018042201.png)

此时`A`和`B`就可以切到本地`dev`分支进行开发了。

假如`B`的开发修复了某个`BUG`，需要提交推送申请

```
$ git add .
$ git commit -m "Some fix"
$ git push origin dev 
```

在`B`将分支推送到她的远程仓库（不是别人维护的正式仓库，是他`fork`的仓库）后，去`GitHub`网页端点击`Pull requests`提交合并申请。弹出表单并要求他设置源分支、目标仓库和目标分支，默认设置`B`的仓库为源仓库。

`A`需要合并他的代码，所以他设置他的分支为源分支，目标仓库为`A`的共有正式仓库，目标分枝为主干分支`dev`，还需要输入标题和提交的修改描述。

![](http://ovefvi4g3.bkt.clouddn.com/15243256764217.jpg)

提交申请后，`A`就会通过邮件或者订阅收到通知。

`A`在网页端点击`Pull requests`后`Merge requests`即可合并提交。

这时如果`A`想再次进行开发，就必须要将远程`dev`分支`fetch`到本地，如下: 

开发过程中每个工程师在推送代码之前要先执行拉取操作，因为远程仓库有更新的话，不先拉取（`pull/fetch`）是无法推送（`push`）的，尽量少使用`git pull`进行拉取，而是先用`git fetch`拉取再进行`git merge`。 

```
$ git fetch origin dev    
From https://github.com/athlonreg/Common-patches-for-hackintosh
 * branch            dev        -> FETCH_HEAD
Updating 23b74f3..ea1c09f
Fast-forward
 config_patches.plist | 178 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 178 insertions(+)
```

当然`git pull`也可以

```
$ git pull origin dev
From https://github.com/athlonreg/Common-patches-for-hackintosh
 * branch            dev        -> FETCH_HEAD
Updating 23b74f3..ea1c09f
Fast-forward
 config_patches.plist | 178 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 178 insertions(+)
```

在每个开发阶段都及时地提交代码（`git commit`）并推送（`git push`）至远程仓库，可以使用`git status`检查工作区是否还有未处理的代码和文件。在提交代码的时候写好优秀的注释。

```
$ git add .
```

```
$ git commit -m "Some fix (credit by A)"
```

```
$ git push origin dev 
```

在项目代码将要合并到主干`master`的时候，要由一名工程师做最后的合并处理，如创建分支的`A`。由于在合并代码时极易产生冲突，所以一定要先与主干代码版本做对比（`git diff`），合并时可以使用`git merge`，当然如果`dev`可以废除的话，也可以使用`git rebase`做最后的合并。 

```
$ git checkout master     
Switched to branch 'master'

$ git merge dev           
Updating 23b74f3..ea1c09f
Fast-forward
 config_patches.plist | 178 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 178 insertions(+)
 
 $ git push origin master 
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/athlonreg/Common-patches-for-hackintosh
   23b74f3..ea1c09f  master -> master
```

最后在分支代码合并到主干或者代码上线后，`dev`分支完成了自己的任务，可以删除本地分支和远程分支。 

#### 删除本地分支：

```
$ git branch -d dev
Deleted branch dev (was 1fe1352).
$ git branch -a
* master
  remotes/origin/dev
  remotes/origin/master
```

#### 删除远程分支：

```
$ git push origin --delete dev
To https://github.com/athlonreg/Common-patches-for-hackintosh
 - [deleted]         dev
$ git branch -a
* master
  remotes/origin/master
```

#### 解决冲突

在代码的合并阶段（`git pull`或者`git merge`命令），通常会产生代码冲突。如果是其他工程师造成的冲突，需要转给相关工程师处理，也造成大量的沟通成本。为了减少冲突，建议每个工程师各自单独负责模块，业务互相不冲突。 
在解决冲突时，需要使用`git log`和`git diff`来检查历史版本的修改信息

```
$ git log README.md
```

![](http://ovefvi4g3.bkt.clouddn.com/15243250721465.jpg)

`git log`可以列出该文件的历史提交版本，能看到提交的版本号和提交的注释信息。 

然后使用`git diff`来对比该文件两个版本的不同。

```
$ git diff 
```

需要回退到某一版本，可以使用`git reset`命令

```
$ git reset --hard 265886db0d6868cc669e0ef253e6e9ac1e39319c 
```

如果文件尚未提交，也可以用`git checkout filename`恢复到提交前。

```
$ git status
On branch dev
nothing to commit, working tree clean

$ git checkout README.md 
```

### 开发规范

```
$ git config --global user.name "用户名"。 
$ git config --global user.email "电子邮件" 。
```

- 团队开发禁止在主干直接修改代码，一定要开分支，而且是远程分支进行开发。

- 创建分支可以打标签，`git tag`。

- 拉取代码时最好先`git fetch`再`git merge`而不是直接`git pull`。

- 提交代码和推送代码以及代码上线之前，一定要先和原来版本对比`git diff`。

- 提交代码加注释`git commit -m 'B developed'`。



