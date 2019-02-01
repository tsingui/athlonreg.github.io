---
title: CentOS 安装配置 GitLab
date: 2019-02-01 10:55:52
password:
categories: 运维
keywords: 
- GitLab
- frame
description: CentOS 安装配置 GitLab
tags: 
- GitLab
- frame
photos:
- https://ws1.sinaimg.cn/large/006dLY5Ily1fzqrihx44gj326w1e0npf.jpg
top: 102
---

## CentOS 安装 GitLab

## 安装依赖

```bash
# yum -y install curl
# yum -y install postfix
# systemctl start postfix
# systemctl enable postfix
```

### 下载 GitLab 的 RPM 包

```bash
# wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-11.7.0-ce.0.el7.x86_64.rpm
```

在[https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/)找自己需要的版本，下载到本地，然后安装即可

```bash
# rpm -ivh  gitlab-ce-11.7.0-ce.0.el7.x86_64.rpm
```

也可以这样

```bash
# yum localinstall gitlab-ce-11.7.0-ce.0.el7.x86_64.rpm
```

## 配置 gitlab repo

为了后续升级方便，建议添加`gitlab`的`repo`源

```bash
# curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sh
```



## 端口修改

```bash
# vi /etc/gitlab/gitlab.rb
```

修改下面的属性

```properties
external_url 'http://devops.iamzhl.top:8090'
unicorn['port'] = 8070
nginx['listen_port'] = 8090
```

_请根据个人需要进行定制_

## 重新部署并重启

```bash
# gitlab-ctl reconfigure
# gitlab-ctl restart
```

## 设置页面嵌套支持

```bash
# vi /var/opt/gitlab/nginx/conf/gitlab-http.conf
```

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fzqr3dsb7gj31p818kgzc.jpg)

如图，添加标注的属性设置后重启`GitLab`

```bash
# gitlab-ctl restart
```

