---
title: Use Hibernate reverse engineering to generate entity classes and mapping files automatically
copyright: true
date: 2018-05-31 21:07:42
categories: Study
description: 使用Hibernate反向工程自动产生实体类和映射文件
tags: 
- GitHub
- 团队开发
- 分支管理
---

# 使用`Hibernate`反向工程自动产生实体类和映射文件
一、首先建立一个项目工程

![](http://ovefvi4g3.bkt.clouddn.com/15277723472277.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15277723650082.jpg)

二、建立数据库表 -- 以`student`表为例

![](http://ovefvi4g3.bkt.clouddn.com/15277723715962.jpg)

三、在项目中配置好数据库并建立一个`model`包

![](http://ovefvi4g3.bkt.clouddn.com/15277723817153.jpg)

四、生成数据库映射

![](http://ovefvi4g3.bkt.clouddn.com/15277723907995.jpg)

五、配置数据源、数据表，生成注解，加入`session`工厂等

![](http://ovefvi4g3.bkt.clouddn.com/15277724158885.jpg)

六、弹出确认导入数据库的窗口点击`Yes`

![](http://ovefvi4g3.bkt.clouddn.com/15277724212068.jpg)

七、这时带有注解的Student类和配置好映射的`hibernate.cfg.xml`就成功生成了

![](http://ovefvi4g3.bkt.clouddn.com/15277724421831.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15277724461962.jpg)

![](http://ovefvi4g3.bkt.clouddn.com/15277724509277.jpg)

