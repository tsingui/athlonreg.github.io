---
title: SonarQube安装部署
date: 2018-08-20 16:10:59
categories: 
- Linux
- 运维
keywords: 
- SonarQube
- sonar-scanner
description: SonarQube安装部署以及代码分析实例过程小记
tags: 
- SonarQube
- sonar-scanner
photos: 
- https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/83/71e7da548917e52b08eb37f385e000.jpg
---

# <center>SonarQube安装部署</center>
## 简介
SonarQube是一个管理代码质量的开放平台，可以从七个维度检测代码质量：* 复杂度分布（complexity）：代码复杂度过高将难以理解、难以维护；* 重复代码（duplications）：程序中包含大量复制粘度的代码是质量低下的表现；* 单元测试（unit tests）：统计并展示单元测试覆盖率；* 编码规范（coding rules）：通过Findbugs、PMD、CheckStyle等规范代码编写；* 注释（commments）：少了可读性差，多了看起来费劲；* 潜在的Bug（potential bugs）：通过Findbugs、PMD、CheckStyle等检测潜在bug；* 结构与设计（architecture & design）：依赖、耦合等。SonarQube 可以集成不同的测试工具（CppCheck、CheckStyle、Junit、CppUnit等），代码分析工具、持续集成工具（Jenkins）、IDE（VisualStudio）。Sonar通过对代码质量分析结果数据进行在加工处理，通过量化的方式来度量代码的质量变化，从而可以方便的对工程进行代码质量管理。支持语言：JAVA PHP C# C COBOL PL/SQL FLEX等20余种。

## 组成SonarQube平台的组成：* 数据库：存放SonarQube的配置数据、代码质量的快照数据。* Web服务：用于查看SonarQube的配置数据、代码质量的快照数据。* 分析器：对项目代码进行分析、生成质量结果数据并存入数据库中（分析器有多中，此处选择SonarQube Maven Plugin）。

## 安装环境
### 安装JDK
去官网下载`JDK`：[http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/81/1b33b7e9dbe92a1515154d0193194f.jpg)

安装`JDK`
将下载得到的`jdk-8u161-linux-x64.rpm`包保存到`Linux`主机

```bash
# rpm -ivh jdk-8u161-linux-x64.rpm
```

设置环境变量，编辑`~/.bashrc`，

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

测试`Java`环境，在终端输入：`java -version`查看是否正常显示版本信息，若显示则安装成功

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/2f/49c7d622b298ae690db3c13754c1b1.jpg)

**Note:**
如果已经预装了openjdk，请先卸载

```bash
# yum list installed | grep openjdk # 根据执行结果进行卸载
```

### 安装MySQL

MySQL的Server在CentOS 7上从默认软件列表中被移除了，用MariaDB来代替，所以这导致我们必须要去官网上进行下载，找到链接，用wget打开，然后再安装：

```bash
# wget http://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm
# rpm -ivh mysql57-community-release-el7-9.noarch.rpm
# yum -y install mysql mysql-server mysql-devel
```

启动MySQL服务

```bash
# systemctl start mysqld
```

获取安装MySQL时的初始密码并登录MySQL

```bash
# grep 'temporary password' /var/log/mysqld.log
# mysql -u root -p
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/4a/a001ae2bae5a494c7329cd78a477a3.jpg)

登录成功后修改密码，首先修改安全策略为0，然后将密码长度限制修改为1，最后修改密码

```mysql
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
mysql> set password for root@localhost=password('root');
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/a2/0f74ed53f3a426d1fe005228478d8f.jpg)

设置sonar的用户名和数据库

```bash
# adduser sonar
# passwd sonar # 修改sonar用户密码
# su sonar # 切换为sonar用户安装
```

```mysql
mysql> create user 'sonar'@'%' identified by 'sonar';
mysql> CREATE DATABASE sonar CHARACTER SET utf8 COLLATE utf8_general_ci;
mysql> grant all privileges on sonar.* to 'sonar'@'%';
mysql> flush privileges;
```

### 安装SonarQube
```bash
$ wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-7.3.zip
$ unzip sonarqube-7.3.zip  //若提示unzip命令找不到，用yum -y install unzip安装即可
$ mv sonarqube-7.3 sonarqube 
$ mv sonarqube /usr/local/
# chown -R sonar:sonar /usr/local/sonarqube
```

## 配置sonar
```bash
$ vim /usr/local/sonarqube/conf/sonar.properties
```

如图设置以下选项

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/46/56cfe2c33866ab48ab8c9bdd402acc.jpg)

## 启动sonar

```bash
$ /usr/local/sonarqube/bin/linux-x86-64/sonar.sh start
```

成功启动后，访问本地 http://IP:9000，SonarQube 初始管理员账号为 admin，默认密码为 admin，登录后可修改密码。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/25/5b9f14a21cdaf024ea8b3ce551dd7a.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/83/71e7da548917e52b08eb37f385e000.jpg)

**Note:**
如果遇到Sonar启动不起来，查看日志自动关闭的问题，可以采用以下方法解决

```bash
# echo -e "vm.max_map_count=262144" >> /etc/sysctl.conf
# sysctl -p
# echo -e "sonar hard nofile 65536" >> /etc/security/limits.conf 
# echo -e "sonar soft nofile 65536" >> /etc/security/limits.conf 
```

然后注销sonar用户重新以sonar身份登录后再次启动:

```bash
$ /usr/local/sonarqube/bin/linux-x86-64/sonar.sh start
```

插件安装：如果需要下载插件的话，各个版本不一样，如图所示，先点击Administration,再打开Marketplace就可以看到Plugins各种插件了。

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/c6/cef3a943ab5d4347d4af8f3332a196.jpg)

SonarQube 支持分析的语言有很多，像Java、Python、Php、C/C++、C#、HTML、JavaScript、PL/SQL、Objective C等20+语言，当我们需要支持分析什么语言时，只需要去插件中心安装对应语言的插件即可，非常方便，可扩展性强，根据自己的需要去选择插件。

## 实验验证
> 本次实验验证以Java工程为例

### 安装配置sonar-scanner
* 获取sonar-scanner

```bash
# wget https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.2.0.1227-linux.zip
# unzip sonar-scanner-cli-3.2.0.1227-linux.zip
# mv sonar-scanner-3.2.0.1227-linux sonar-scanner
# mv sonar-scanner /usr/local/
# chown -R sonar:sonar sonar-scanner
```

* 配置sonar-scanner环境变量

```bash
# vim ~/.bashrc
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/40/6ea5e9c0aee37c056f4583b32c048d.jpg)

* 使配置生效

```bash
# source ~/.bashrc
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/70/524b2333bbfb3e6a50b77f92eb201d.jpg)

* 检查环境配置是否成功

```bash
$ sonar-scanner -version
```

* 配置sonar-scanner.properties文件

```bash
$ vim /usr/local/sonar-scanner/conf/sonar-scanner.properties
```

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/46/849b0c5cac635e91e9efcf07ba5fbd.jpg)

### 验证过程
* 添加Java Maven测试工程

编写测试工程

* 添加sonar-project.properties文件

在工程根目录中添加sonar-project.properties文件，格式如下

```
sonar.projectKey=com.geovis         //项目的唯一标识
sonar.projectName=helloworld        //项目的名字
sonar.projectVersion=1.0            //项目的版本
sonar.sources=/root/helloworld/src  //项目的源码目录，多目录以英文逗号分隔
```

例如我的项目结构如下

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/6a/e62e31b74ec65b783f21f4d8cda98e.jpg)

那么此项目配置文件应为

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/98/4f0aa2e69db09a846cfd6da4a3442f.jpg)

* 代码质量检查
设置完后，终端运行`sonar-scanner`命令，开始项目源代码的分析

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/77/64ffb2ce43fdba046811cce438845c.jpg)

* 查看结果
命令运行完成之后，访问http://localhost:9000，输入账号密码即可查看分析结果，如下图

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b4/92864641223d1537b6f4dfa27a6358.jpg)

![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/97/221636aa330d56dea8bb870957f29a.jpg)

