---
title: Jenkins配置部署
date: 2018-08-16 18:55:05
categories: 
- Linux
- 运维
keywords: Jenkins
description: Jenkins配置部署
tags: 
- Jenkins
---

# <center>`Jenkins`配置部署</center>

## 简介&emsp;&emsp;Jenkins是一个开源的、提供友好操作界面的持续集成(CI)工具，起源于Hudson（Hudson是商用的），主要用于持续、自动的构建/测试软件项目、监控外部任务的运行。Jenkins用Java语言编写，可在Tomcat等流行的servlet容器中运行，也可独立运行。通常与版本管理工具(SCM)、构建工具结合使用；常用的版本管理系统有SVN、GIT，构建工具有Maven、Ant、Gradle。其具备以下特点：* 易于安装：不需要安装、不需要数据库，只需通过java -jar jenkins.war或部署到一个servlet容器中。* 易于配置：所有的配置都可能通过Jenkins提供的web界面完成，当然如果你喜欢，也可以通过手动修改xml文件进行配置。* 消息通知及测试报告：能够生成各类测试报告并通过消息通知机制（Email等）进行报告，包括单元测试、覆盖率测试、静态分析等。* 分布式构建：Jenkins支持多个Slave节点的动态挂载，完成分布式构建。* 资源动态调度：Jenkins的容器资源通过Kubernetes动态调度，动态扩容收缩。* 插件支持：Jenkins支持上千种插件，可以进行扩展，也可以根据需求近定制开发。

## 安装部署
&emsp;&emsp;以CentOS环境安装部署为例，详细介绍Jenkins安装部署整体过程和常用设置。

### 准备工作
#### 环境准备
&emsp;&emsp;如果使用Jenkins.war包的形式进行安装，需要提前准备以下环境。
##### Java环境准备
###### 去官网下载`JDK`：
[http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/81/1b33b7e9dbe92a1515154d0193194f.jpg)

###### 安装
* 将下载得到的`jdk-8u161-linux-x64.rpm`包保存到`Linux`主机

```bash
# rpm -ivh jdk-8u161-linux-x64.rpm
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/ad/4301bf0ab8d0d138ded7bc3709fd4a.jpg)

###### 环境变量
```bash
# vim ~/.bashrc
```

在文件的末尾添加以下行

```
export JAVA_HOME=/usr/java/jdk1.8.0_161export JRE_HOME=$JAVA_HOME/jreexport CLASSPATH=$JAVA_HOME/libexport PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin:$CLASSPATH
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/49/6ac74e90a641e355b29b9c4d17deb9.jpg)

使环境配置生效
```bash
# source ~/.bashrc
```

###### 测试`Java`环境

```bash
# java -version
```

&emsp;&emsp;查看是否正常显示版本信息，若显示则安装成功

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/2f/49c7d622b298ae690db3c13754c1b1.jpg)

##### Tomcat环境准备
###### 下载Tomcat
> 地址: http://mirrors.shu.edu.cn/apache/tomcat/tomcat-8/v8.5.32/bin/apache-tomcat-8.5.32.tar.gz

```bash
# wget http://mirrors.shu.edu.cn/apache/tomcat/tomcat-8/v8.5.32/bin/apache-tomcat-8.5.32.tar.gz
```

###### 安装Tomcat
```bash
# tar zxvf apache-tomcat-8.5.32.tar.gz
# mv apache-tomcat-8.5.32 /usr/local/
```

###### 配置Tomcat环境
```bash
# vim ~/.bashrc
```

在文件的末尾添加以下行

```
export CATALINA_BASE=/usr/local/apache-tomcat-8.5.32export TOMCAT_HOME=/usr/local/apache-tomcat-8.5.32export CATALINA_HOME=/usr/local/apache-tomcat-8.5.32export PATH=$PATH:$CATALINA_HOME/bin:$CATALINA_HOME/lib
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/66/1656ee9280886c6c7de6057c8835cd.jpg)

使环境配置生效
```bash
# source ~/.bashrc
```

###### 启动Tomcat服务
```bash
# startup.sh
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/f9/4e6e503aa6fe748959adfb182e3e1c.jpg)

###### 测试Tomcat
&emsp;&emsp;打开浏览器，在地址栏中输入http://IP:8080回车，如果看到Tomcat自带的一个JSP页面，说明你的Tomcat已搭建成功

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/43/36596794bdf3af70f1ecd35f8c40a0.jpg)

### 安装部署
#### 下载war文件
```
# wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/97/169dde525ae2cf9e018cc780e72836.jpg)

#### 安装Jenkins
&emsp;&emsp;将下载后的war包放到/usr/local/apache-tomcat-8.5.32/webapps/目录下，启动tomcat即可， 或者用命令`java -jar jenkins.war`，其默认启动端口8080,如果需要修改，打开安装目录下的jenkins.xml文件，修改<arguments>-Xrs -Xmx256m -Dhudson.lifecycle=hudson.lifecycle.WindowsServiceLifecycle -jar "%BASE%\jenkins.war" --httpPort=8081</arguments>后保存，启动jenkins服务。

#### 测试
&emsp;&emsp;打开浏览器输入http://IP:8080/jenkins回车即可看到jenkin初始配置界面，按照提示进行设置。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/27/4f737ebea43eb34f747fb68a08b6fa.jpg)

### 常用设置
#### 邮件设置
&emsp;&emsp;邮件设置在持续集成及反馈中地位很高，所有消息、状态信息等通知皆通过邮件进行反馈。Jenkins可以很好的集成邮件机制，通过其邮件插件。
##### 安装插件&emsp;&emsp;Jenkins->系统管理->插件管理，检索安装邮件插件，常用的两个插件为：* Email Extension* Mailer
##### 邮件设置&emsp;&emsp;Jenkins->系统管理->系统设置，弹出如下图所示：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b0/075e39aad15468d3eb9cc0f6bf37f7.jpg)

* SMTP服务器：为邮箱服务地址。
  * QQ: smtp.qq.com
  * 163: smtp.163.com* 用户默认后缀：可以自动识别，只需填写用户即可。* 其他配置为Jenkins邮箱默认用户及采用的认证方式。

##### Job设置
&emsp;&emsp;在需要邮件通知的Job设置里面增加"构建后操作步骤" -> 选择E-mail Notification。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/82/3005620b29b6fc4b2c9e3ce729af8b.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/9e/a3153b262215e17561eb34674635e2.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/6d/dce01f6fa0a84d625f0eb55759c422.jpg)

##### 扩展插件设置&emsp;&emsp;但是如果你群发的收件人列表比较多，或者每次通知的人不一样，比如每次只想通知导致构建失败的那个人（即最后一次上传代码的人），那么简单的E-mail Notification就不能满足要求，需要使用Email extension plugin插件。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/18/0775061dcf193cc08da229cef10eda.jpg)

* SMTP server -- 设置SMTP服务器地址
* Default user E-mail suffix -- 设置用户默认邮件后缀
* Default Content Type -- 默认内容类型(Plain Text HTML)
* Default Subject -- 默认邮件主题
* Default Content -- 默认邮件内容，可以设置模板
* Default Triggers -- 触发器

* [ ] 全局配置&emsp;&emsp;根据实际情况勾选需要触发邮件通知的事件。点击上图右下角Default Trigger，弹出如下触发项：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/69/3127442cf5a527b984d83738c31e6f.jpg)

* [ ] 项目配置&emsp;&emsp;进入到具体的项目配置界面点击"配置，在配置界面点击"增加构建后操作步骤"，选择"Editable Email Notification"。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/71/133a454b2ee120f2b1df930b4ca9fe.jpg)

&emsp;&emsp;可以在“Advanced Settings”中针对该项目进行个性化的配置。可以针对该项目定义该项目通知的收件人列表、主题、内容、附件等。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/53/67346392186853caab6ee621418aa4.jpg)

#### 任务创建
##### 构建项目类型&emsp;&emsp;点击 Jenkins 首页"创建一个新任务"的链接，弹出如下图所示页面。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/04/c97a32a6b1285a76a6edb8497a1cd3.jpg)

&emsp;&emsp;Jenkins 提供了六种类型的任务。* 构建一个自由风格的软件项目这是Jenkins的主要功能。Jenkins 会结合任何 SCM 和任何构建系统来构建你的项目, 甚至可以构建软件以外的系统。* Pipeline(流水线)Orchestrates long-running activities that can span multiple build slaves. Suitable for building pipelines (formerly known as workflows) and/or organizing complex activities that do not easily fit in free-style job type. – 很难用一两句话说清 Pipeline, 参考 , 后面另起一文来介绍。* 构建一个多配置项目适用于多配置项目,例如多环境测试、平台指定构建,等等。* GitHub OrganizationScans a GitHub organization (or user account) for all repositories matching some defined markers. – 这个主要针对由 Github 托管的项目。* Multibranch Pipeline(多分支流水线)Creates a set of Pipeline projects according to detected branches in one SCM repository. 根据一个SCM存储库中检测到的分支创建一组 Pipeline 项目。* 文件夹创建一个可以嵌套存储的容器。利用它可以进行分组。 视图仅仅是一个过滤器，而文件夹则是一个独立的命名空间， 因此你可以有多个相同名称的的内容，只要它们在不同的文件 夹里即可。
&emsp;&emsp;这里选择第一个：构建一个自由风格的软件项目， 输入项目名称：python test project ，点击"确定"按钮。
##### 构建 Windows 测试任务&emsp;&emsp;假设，有一个 Python 编写的测试脚本 py_tests.py ，其绝对路径为/root/py_tests.py，内容如下：

```python
print "Hello world"
```

在Linux下怎么执行这个测试用例，打开终端

```
[root@centos-7 ~]# cd
[root@centos-7 ~]# ll py_tests.py
-rw-r--r--. 1 root root 20 8月  16 16:07 py_tests.py
[root@centos-7 ~]# python py_tests.py
Hello world
[root@centos-7 ~]#
```

下面回到Jenkins的配置过程中

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/ab/46e2f5d22700eb539eac4128e19c85.jpg)

&emsp;&emsp;添加项目的描述：Python 测试项目，打印Hello world。
&emsp;&emsp;剩下的选项都不要管，拖到页面底部，构建 选项。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/e0/dab0e9e3d049db8a84ee83f85582de.jpg)

选择`执行shell`选项，执行Linux shell命令。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/c6/ef1db64d383033d03b465af7f3771d.jpg)

&emsp;&emsp;如上图，输入你在 Linux 终端下所输的命令`python /root/py_tests.py`。 点击`保存`。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/8f/6c232d4632eb024fa2cadcf0fbfc13.jpg)

&emsp;&emsp;一个极简的，基于 Linux 系统的 Python 脚本测试持续集成项目就创建完成了。

#### 节点添加
&emsp;&emsp;Jenkins有个很强大的功能：分布式构建(在Jenkins的配置中叫做节点)，分布式构建能够让同一套代码在不同的环境(如：Windows和Linux系统)中编译、测试等。而且Jenkins构建的代码和产物最后自动拷贝到主节点。
**注意：如果节点主机上不存在JDK，Jenkins会去自动下载。**
**建议：所有Unix或者Windows机器的环境路径统一(如：JDK、Ant、Maven)，好处是便于管理、不容易出现奇葩问题。**
##### 新建节点系统管理 → 管理节点 → 新建节点(左上角)，如下图所示：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/1e/067a4f7fa85272fa79f85208c937c0.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/eb/3eb8f07110c1e29abe65035fdc2b04.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/bb/e82fc1380ecf612e70e06bc156e17e.jpg)

&emsp;&emsp;节点名称：建议使用字母、数字或字母和数字的组合。最好见名知意。不建议使用标点符号和中文(中文命名没有问题，但Job中无法引用)。##### 配置节点* Name(名称)：节点名称* Description(描述)：节点描述，支持中文* 并发构建数：最大同时构建数量(根据机器的性能定，单颗四核cpu建议不要超过5) - 必须为数字* 远程工作目录：节点的根目录(注意：如果目录不存在，会自动创建目录。你必须对该目录有读写权限，不然会报错)* 标签：标记(又叫做标签)用来对多节点分组,标记之间用空格分隔.例如'refression java6'将会把一个节点标记上'regression'和'java6'.
> &emsp;&emsp;举例来说,如果你有多个Linux系统的构建节点并且你的Job也需要在Linux系统上运行,那么你可以配置所有的Linux系统节点都标记为'windows', 然后把Job也标记为'Linux'.这样的话你的Job就不会运行在除了Linux节点以外的其它节点之上了.> &emsp;&emsp;Linux用法：尽可能的使用这个节点/只允许运行绑定到这台机器的Job(根据你的需求，二选一)
* 启动方式：  * Linux节点：推荐 -- Launch slave agents via SSH， 在Unix(包括Linux)机器上通过SSH通道连接节点 (适用于Unix和Linux)  * Host(主机)：节点主机的ip地址  * Credentials：凭据(如果为空或者不可选择，请在系统管理→Manage Credentials中配置。Manage Credentials的配置非常简单，这里就不在描述了。Manage Credentials配置完成后，需刷新节点配置页面才会显示。)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/35/d7416430314fd19e34a01ac59ff464.jpg)

##### 节点连接
&emsp;&emsp;以Launch slave agents via SSH为例，选择Manually trusted key Verification Strategy，然后点击最下面的保存。

&emsp;&emsp;Jenkins -> 系统管理 -> 系统设置，设置SSH Server

* Name: 这个可以随意写
* Hostname: 远程主机的IP地址
* Username: 远程主机登录的用户名
* Remote Directory: 远程目录

如图设置好信息后，点击下面的保存

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/3f/b787c0c1b5bab76ad878fbb47542ad.jpg)

&emsp;&emsp;Jenkins -> 系统管理 -> 管理节点，点击刚刚配置好的节点，上线节点

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/1d/1f61d958c23269f4fcc4a7ae295b0b.jpg)

回到节点列表后发现节点就已经成功上线了

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/a4/346c91e15903e43bc6759a7c566502.jpg)

#### 角色权限
&emsp;&emsp;由于jenkins默认的权限管理体系不支持用户组或角色的配置，因此需要安装第三发插件来支持角色的配置，本文将使用Role Strategy Plugin，介绍页面：https://wiki.jenkins-ci.org/display/JENKINS/Role+Strategy+Plugin。
##### 配置插件安装插件后，进入系统设置页面，配置如下：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/89/a69327d3e04b1b57ff022132e9f5a5.jpg)

##### 配置权限
&emsp;&emsp;在系统管理页面点击Manage and Assign Roles进入角色管理页面

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/90/a06f0b7e2eff8c0a9d81576497ff0c.jpg)

进入之后

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/be/1bbe3e8858dbac44ac5a1fa2451883.jpg)

* 管理角色（Manage Roles）选择该项可以创建全局角色、项目角色，并可以为角色分配权限。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b8/ea91c0ea7091dca3faf3c86356da16.jpg)

&emsp;&emsp;如上图，分别创建了admin、anonymous两个全局角色，Online Program、test两个项目角色。
&emsp;&emsp;项目角色与全局角色的区别就是，项目角色只能管理项目，没有管理jenkins的权限配置。
&emsp;&emsp;添加项目角色时，需要指定匹配项目的模式，如上图中的Pattern，官方文档介绍该选项支持正则表达式，如"Roger-."表示所有以Roger-开头的项目，`(?i)roger-.*`表示以roger-开头的项目并且不区分大小写，如以ABC开头的项目可以配置为"ABC|ABC.*"，也可以使用"abc|bcd|efg"直接匹配多个项目。
* 创建用户在分配角色之前需要先创建用户。在系统管理页面，点击管理用户：

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/2e/6a8a273181a5357a4ca587a5c2ced9.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/60/d8fa2030fff834872c259f65720958.jpg)

&emsp;&emsp;点击新建使用者可以创建新用户，点击用户ID或名称都可以修改用户信息。

&emsp;&emsp;选择Assign Roles可以为用户分配所属角色，可以分配全局角色和项目角色。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/57/385c466d213dd9ead86034162d9029.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/93/ddef492ecd2995c5731ea8eb1e9ee1.jpg)

&emsp;&emsp;如上图，将不同的用户分别分配给不同的角色，这样用户就可以具有角色所拥有的权限。

### 运行与维护
#### Jenkins升级
* 说明：Jenkins迭代更新很频繁，一般1周更新一次，半年一个大版本。* 升级：下载新的war包，替换旧的war包，重启即可。下载地址为http://mirrors.jenkins-ci.org/。
**PS：升级前，请测试该版本和你本地数据的兼容性。如何测试：将JENKINS_HOME拷贝一份到新的机器，用新版的程序启动。测试对应的插件和配置。**
#### Jenkins迁移和备份&emsp;&emsp;首先找到JENKINS_HOME，一般在用户根目录下.jenkins目录，因为Jenkins的所有的数据都是以文件的形式存放在JENKINS_HOME目录中。所以不管是迁移还是备份，只需要操作JENKINS_HOME就行了。
* 迁移：建议将JENKINS_HOME打包后再拷贝，Windows上可以用zip，rar等，Linux上有zip，tar等。然后将打包的文件解压到新的JENKINS_HOME目录就行了。
* 备份：如果是临时备份，整个压缩文件就行了。
* 恢复：恢复的时候需要先停止jenkins。
#### 移动，删除或修改jobs&emsp;&emsp;对于移动或删除jobs，只需要简单地移动或删除`$JENKINS_HOME/jobs`目录。对于修改jobs的名字，只需要简单地修改`$JENKINS_HOME/jobs`下对应job的文件夹的名字。对于不经常使用的job，只需要对`$JENKINS_HOME/jobs`下对应的jobs的目录zip或tar后存储到其他的地方。
#### Jenkins 启动时的命令行参数 
| `--httpPort=$HTTP_PORT` | 用来设置jenkins运行时的web端口。  |
| --- | --- |
| `--httpsPort=$HTTP_PORT` | 表示使用https协议。 |
| ~~~~--httpListenAddress=$HTTP_HOST | 用来指定jenkins监听的ip范围，默认为所有的ip都可以访问此jenkins server。 |
#### 修改jenkins的timezone&emsp;&emsp;如果jenkins所在的server的timezone不同于用户的timezone，这时候需要修改jenkins的timezone，需要在jenkins启动的时候增加下列参数-Dorg.apache.commons.jelly.tags.fmt.timeZone=TZ。
#### 查看jenkins的系统信息&emsp;&emsp;以在jenkins的管理页面下的系统信息中，查看所有的jenkins的信息，例如jenkins的启动配置，所依赖的系统的环境变量，所安装的plugins。

#### Jenkins中执行batch和Python&emsp;&emsp;Jenkins的job -> build 支持Ant，maven，windows batch和Shell， 但是我们知道python，perl，ruby等脚本其实也是shell脚本，所以这里的Shell可以扩展为python，perl，ruby等。如图

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/99/04a1d6c847be966e185435823bb110.jpg)

