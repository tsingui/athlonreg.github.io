---
title: Config NexT to beautify your blog with hexo
copyright: true
date: 2017-09-14 19:04:36
categories: Study
description: NexT使用详解
tags:
- 静态博客
- NexT
- hexo
---

## NexT使用详解
<!--more-->

## 前言
Hexo 是高效的静态站点生成框架，她基于 Node.js。 通过 Hexo 你可以轻松地使用 Markdown 编写文章，除了 Markdown 本身的语法之外，还可以使用 Hexo 提供的 标签插件 来快速的插入特定形式的内容。在这篇文章中，假定你已经成功安装了 Hexo，并使用 Hexo 提供的命令创建了一个站点。

在 Hexo 中有两份主要的配置文件，其名称都是 _config.yml。 其中，一份位于站点根目录下，主要包含 Hexo 本身的配置；另一份位于主题目录下，这份配置由主题作者提供，主要用于配置主题相关的选项。

为了描述方便，在以下说明中，将前者称为 站点配置文件， 后者称为 主题配置文件。

## 安装 NexT

Hexo 安装主题的方式非常简单，只需要将主题文件拷贝至站点目录的 themes 目录下， 然后修改下配置文件即可。具体到 NexT 来说，安装步骤如下。

### 下载主题

在终端窗口下，定位到 Hexo 站点目录下。使用 Git checkout 代码：
```
$ cd your-hexo-site
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
```

### 启用主题

与所有 Hexo 主题启用的模式一样。 当 克隆/下载 完成后，打开站点配置文件， 找到 theme 字段，并将其值更改为 next。

> 启用 NexT 主题

```
theme: next
```

### 验证主题

首先启动 Hexo 本地站点，并开启调试模式（即加上 --debug），整个命令是 hexo s --debug 。 在服务启动的过程，注意观察命令行输出是否有任何异常信息，如果你碰到问题，这些信息将帮助他人更好的定位错误。 当命令行输出中提示出：

```
INFO  hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.
```

此时即可使用浏览器访问 http://localhost:4000 ，检查站点是否正确运行。

成功安装并启用了 NexT 主题后。下一步我们将要更改一些主题的设定，包括个性化以及集成第三方服务。

## 主题设定

### 选择 Scheme

Scheme 是 NexT 提供的一种特性，借助于 Scheme，NexT 为你提供多种不同的外观。同时，几乎所有的配置都可以 在 Scheme 之间共用。目前 NexT 支持三种 Scheme，他们是：

```
Muse - 默认 Scheme，这是 NexT 最初的版本，黑白主调，大量留白
Mist - Muse 的紧凑版本，整洁有序的单栏外观
Pisces - 双栏 Scheme，小家碧玉似的清新
```

Scheme 的切换通过更改 主题配置文件，搜索 scheme 关键字。 你会看到有三行 scheme 的配置，将你需用启用的 scheme 前面注释 # 去除即可。

> 选择 Pisces Scheme

```
#scheme: Muse
#scheme: Mist
scheme: Pisces
```

### 设置 语言

编辑 站点配置文件， 将 language 设置成你所需要的语言。建议明确设置你所需要的语言，例如选用简体中文，配置如下：

```
language: zh-Hans
```

目前 NexT 支持的语言如以下表格所示：


| 语言 | 代码 | 示例 |
| --- | --- | --- |
| English | en | language: en |
| 简体中文 | zh-Hans | language: zh-Hans |
| Français | fr-FR | language: fr-FR |
| Português | pt | language: pt or language: pt-BR |
| 繁體中文 | zh-hk 或者 zh-tw | language: zh-hk |
| Русский язык | ru  | language: ru |
| Deutsch | de | language: de |
| 日本語 | ja | language: ja |
| Indonesian | id | language: id |
| Korean | ko | language: ko |


### 设置菜单

菜单配置包括三个部分，第一是菜单项（名称和链接），第二是菜单项的显示文本，第三是菜单项对应的图标。 NexT 使用的是 Font Awesome 提供的图标， Font Awesome 提供了 600+ 的图标，可以满足绝大的多数的场景，同时无须担心在 Retina 屏幕下 图标模糊的问题。

编辑 主题配置文件，修改以下内容：

设定菜单内容，对应的字段是 menu。 菜单内容的设置格式是：item name: link。其中 item name 是一个名称，这个名称并不直接显示在页面上，她将用于匹配图标以及翻译。

> 菜单示例配置

```
menu:
  home: /
  archives: /archives
  #about: /about
  #categories: /categories
  tags: /tags
  #commonweal: /404.html
```

> 若你的站点运行在子目录中，请将链接前缀的 / 去掉

NexT 默认的菜单项有

| 键值 | 设定值 | 显示文本 |
| --- | --- | --- |
| home | home: / | 主页 |
| archives | archives: /archives | 归档页 |
| categories | categories: /categories | 分类页  |
| tags | tags: /tags | 标签页  |
| about | about: /about | 关于页面 |
| commonweal | commonweal: /404.html | 公益 404 |

2.设置菜单项的显示文本。在第一步中设置的菜单的名称并不直接用于界面上的展示。Hexo 在生成的时候将使用 这个名称查找对应的语言翻译，并提取显示文本。这些翻译文本放置在 NexT 主题目录下的 languages/{language}.yml （{language} 为你所使用的语言）。

以简体中文为例，若你需要添加一个菜单项，比如 something。那么就需要修改简体中文对应的翻译文件 languages/zh-Hans.yml，在 menu 字段下添加一项：

```
menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  commonweal: 公益404
  something: 有料
```

3.设定菜单项的图标，对应的字段是 menu_icons。 此设定格式是 item name: icon name，其中 item name 与上一步所配置的菜单名字对应，icon name 是 Font Awesome 图标的 名字。而 enable 可用于控制是否显示图标，你可以设置成 false 来去掉图标。

> 菜单图标配置示例

```
menu_icons:
  enable: true
  # Icon Mapping.
  home: home
  about: user
  categories: th
  tags: tags
  archives: archive
  commonweal: heartbeat
```
> 在菜单图标开启的情况下，如果菜单项与菜单未匹配（没有设置或者无效的 Font Awesome 图标名字） 的情况下，NexT 将会使用 ? 作为图标。

> 请注意键值（如 home）的大小写要严格匹配

### 设置 侧栏

默认情况下，侧栏仅在文章页面（拥有目录列表）时才显示，并放置于右侧位置。 可以通过修改 主题配置文件 中的 sidebar 字段来控制侧栏的行为。侧栏的设置包括两个部分，其一是侧栏的位置， 其二是侧栏显示的时机。

1.设置侧栏的位置，修改 sidebar.position 的值，支持的选项有：

```
left - 靠左放置
right - 靠右放置
```

> 目前仅 Pisces Scheme 支持 position 配置。影响版本5.0.0及更低版本。

```
sidebar:
  position: left
```

2.设置侧栏显示的时机，修改 sidebar.display 的值，支持的选项有：

| post | 默认行为，在文章页面（拥有目录列表）时显示 |
| :-: | :-: |
| always | 在所有页面中都显示 |
| hide | 在所有页面中都隐藏（可以手动展开） |
| remove | 完全移除 |

```
sidebar:
  display: post
```

> 已知侧栏在 use motion: false 的情况下不会展示。 影响版本5.0.0及更低版本。

### 设置 头像

编辑 主题配置文件， 修改字段 avatar， 值设置成头像的链接地址。其中，头像的链接地址可以是：

| 地址 | 值 |
| :-: | :-: |
| 完整的互联网URI | http://example.com/avatar.png |
| 站点内的地址 | 将头像放置主题目录下的 source/uploads/ (新建 uploads 目录若不存在)，配置为：avatar: /uploads/avatar.png；或者 放置在 source/images/ 目录下，配置为：avatar: /images/avatar.png |

> 头像设置示例

```
avatar: http://example.com/avatar.png
```

### 设置作者昵称

编辑站点配置文件， 设置 author 为你的昵称。

### 站点描述

编辑站点配置文件， 设置 description 字段为你的站点描述。站点描述可以是你喜欢的一句签名 : )

## 主题配置

### 设置 RSS

NexT 中 RSS 有三个设置选项，满足特定的使用场景。 更改 主题配置文件，设定 rss 字段的值：

```
false： 禁用 RSS，不在页面上显示 RSS 连接。
留空： 使用 Hexo 生成的 Feed 链接。 你可以需要先安装 hexo-generator-feed 插件。
具体的链接地址：适用于已经烧制过 Feed 的情形。
```

### 添加「标签」页面

新建「标签」页面，并在菜单中显示「标签」链接。「标签」页面将展示站点的所有标签，若你的所有文章都未包含标签，此页面将是空的。 底下代码是一篇包含标签的文章的例子：

```
title: 标签测试文章
tags:
  - Testing
  - Another Tag
---
```

> 请参阅 [Hexo 的分类与标签文档](https://hexo.io/zh-cn/docs/front-matter.html#分类和标签)，了解如何为文章添加标签或者分类。

#### 新建页面

在终端窗口下，定位到 Hexo 站点目录下。使用 hexo new page 新建一个页面，命名为 tags ：

```
$ cd your-hexo-site
$ hexo new page tags
```

#### 设置页面类型

编辑刚新建的页面，将页面的类型设置为 tags ，主题将自动为这个页面显示标签云。页面内容如下：

```
title: 标签
date: 2014-12-22 12:39:04
type: "tags"
---
```

#### 在菜单中添加链接。编辑 主题配置文件 ， 添加 tags 到 menu 中，如下:

```
menu:
  home: /
  archives: /archives
  tags: /tags
```

> 注意：如果有集成评论服务，页面也会带有评论。 若需要关闭的话，请添加字段 comments 并将值设置为 false，如：

> 禁用评论示例

```
title: 标签
date: 2014-12-22 12:39:04
type: "tags"
comments: false
---
```

### 添加「分类」页面

新建「分类」页面，并在菜单中显示「分类」链接。「分类」页面将展示站点的所有分类，若你的所有文章都未包含分类，此页面将是空的。 底下代码是一篇包含分类的文章的例子：

```
title: 分类测试文章
categories: Testing
---
```

> 请参阅 [Hexo 的分类与标签文档](https://hexo.io/zh-cn/docs/front-matter.html#分类和标签)，了解如何为文章添加标签或者分类。

#### 新建页面

在终端窗口下，定位到 Hexo 站点目录下。使用 hexo new page 新建一个页面，命名为 categories ：

```
$ cd your-hexo-site
$ hexo new page categories
```

#### 设置页面类型

编辑刚新建的页面，将页面的 type 设置为 categories ，主题将自动为这个页面显示分类。页面内容如下：

```
title: 分类
date: 2014-12-22 12:39:04
type: "categories"
---
```

#### 修改菜单

在菜单中添加链接。编辑 主题配置文件 ， 添加 categories 到 menu 中，如下:

```
menu:
  home: /
  archives: /archives
  categories: /categories
```

> 注意：如果有集成评论服务，页面也会带有评论。 若需要关闭的话，请添加字段 comments 并将值设置为 false，如：

> 禁用评论示例

```
title: 分类
date: 2014-12-22 12:39:04
type: "categories"
comments: false
---
```

### 设置字体

> 注意： 此特性在版本 5.0.1 中引入，要使用此功能请确保所使用的 NexT 版本在此之后

为了解决 Google Fonts API 不稳定的问题，NexT 在 5.0.1 中引入此特性。 通过此特性，你可以指定所使用的字体库外链地址；与此同时，NexT 开放了 5 个特定范围的字体设定，他们是：

```
全局字体：定义的字体将在全站范围使用
标题字体：文章内标题的字体（h1, h2, h3, h4, h5, h6）
文章字体：文章所使用的字体
Logo字体：Logo 所使用的字体
代码字体： 代码块所使用的字体
各项所指定的字体将作为首选字体，当他们不可用时会自动 Fallback 到 NexT 设定的基础字体组：

非代码类字体：Fallback 到 "PingFang SC", "Microsoft YaHei", sans-serif
代码类字体： Fallback 到 consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace
```

另外，每一项都有一个额外的 external 属性，此属性用来控制是否使用外链字体库。 开放此属性方便你设定那些已经安装在系统中的字体，减少不必要的请求（请求大小）。

> 配置示例

```
font:
  enable: true

  # 外链字体库地址，例如 //fonts.googleapis.com (默认值)
  host:

  # 全局字体，应用在 body 元素上
  global:
    external: true
    family: Monda

  # 标题字体 (h1, h2, h3, h4, h5, h6)
  headings:
    external: true
    family: Roboto Slab

  # 文章字体
  posts:
    external: true
    family:

  # Logo 字体
  logo:
    external: true
    family: Lobster Two
    size: 24

  # 代码字体，应用于 code 以及代码块
  codes:
    external: true
    family: PT Mono
```

### 设置代码高亮主题

NexT 使用 Tomorrow Theme 作为代码高亮，共有5款主题供你选择。 NexT 默认使用的是 白色的 normal 主题，可选的值有 normal，night， night blue， night bright， night eighties。

更改 highlight_theme 字段，将其值设定成你所喜爱的高亮主题，例如：

> 高亮主题设置示例

```
# Code Highlight theme
# Available value: normal | night | night eighties | night blue | night bright
# https://github.com/chriskempson/tomorrow-theme
highlight_theme: normal
```

### 侧边栏社交链接

侧栏社交链接的修改包含两个部分，第一是链接，第二是链接图标。 两者配置均在 主题配置文件 中。

1.链接放置在 social 字段下，一行一个链接。其键值格式是 显示文本: 链接地址。

> 配置示例

```
# Social links
social:
  GitHub: https://github.com/your-user-name
  Twitter: https://twitter.com/your-user-name
  微博: http://weibo.com/your-user-name
  豆瓣: http://douban.com/people/your-user-name
  知乎: http://www.zhihu.com/people/your-user-name
  ```

2.设定链接的图标，对应的字段是 social_icons。其键值格式是 匹配键: Font Awesome 图标名称， 匹配键 与上一步所配置的链接的 显示文本 相同（大小写严格匹配），图标名称 是 Font Awesome 图标的名字（不必带 fa- 前缀）。 enable 选项用于控制是否显示图标，你可以设置成 false 来去掉图标。

> 配置示例

```
# Social Icons
social_icons:
  enable: true
  # Icon Mappings
  GitHub: github
  Twitter: twitter
  微博: weibo
```

### 开启打赏功能 由 habren 贡献

越来越多的平台（微信公众平台，新浪微博，简书，百度打赏等）支持打赏功能，付费阅读时代越来越近，特此增加了打赏功能，支持微信打赏和支付宝打赏。 只需要 主题配置文件 中填入 微信 和 支付宝 收款二维码图片地址 即可开启该功能。

> 打赏功能配置示例

```
reward_comment: 坚持原创技术分享，您的支持将鼓励我继续创作！
wechatpay: /path/to/wechat-reward-image
alipay: /path/to/alipay-reward-image
```

### 友情链接 由 iamwent 贡献

编辑 主题配置文件 添加：

> 友情链接配置示例


```
# title
links_title: Links
links:
  MacTalk: http://macshuo.com/
  Title: http://example.com/
```

### 站点建立时间

这个时间将在站点的底部显示，例如 © 2013 - 2015。 编辑 主题配置文件，新增字段 since。

> 配置示例

```
since: 2013
```

### 设置「动画效果」

NexT 默认开启动画效果，效果使用 JavaScript 编写，因此需要等待 JavaScript 脚本完全加载完毕后才会显示内容。 如果您比较在乎速度，可以将设置此字段的值为 false 来关闭动画。

编辑 主题配置文件， 搜索 use_motion，根据您的需求设置值为 true 或者 false 即可：

```
use_motion: true  # 开启动画效果
use_motion: false # 关闭动画效果
```

### 设置「背景动画」

NexT 自带两种背景动画效果

编辑 主题配置文件， 搜索 canvas_nest 或 three_waves，根据您的需求设置值为 true 或者 false 即可：

> 注意： three_waves 在版本 5.1.1 中引入。只能同时开启一种背景动画效果。

> canvas_nest 配置示例

```
# canvas_nest
canvas_nest: true //开启动画
canvas_nest: false //关闭动画
three_waves 配置示例
# three_waves
three_waves: true //开启动画
three_waves: false //关闭动画
```

### 腾讯公益 404 页面 由 xirong 贡献

腾讯公益404页面，寻找丢失儿童，让大家一起关注此项公益事业！

效果如下

![2017-09-14](http://ovefvi4g3.bkt.clouddn.com/2017-09-14.png)

使用方法，新建 404.html 页面，放到主题的 source 目录下，内容如下：

```
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8;"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="robots" content="all" />
  <meta name="robots" content="index,follow"/>
  <link rel="stylesheet" type="text/css" href="https://qzone.qq.com/gy/404/style/404style.css">
</head>
<body>
  <script type="text/plain" src="http://www.qq.com/404/search_children.js"
          charset="utf-8" homePageUrl="/"
          homePageName="回到我的主页">
  </script>
  <script src="https://qzone.qq.com/gy/404/data.js" charset="utf-8"></script>
  <script src="https://qzone.qq.com/gy/404/page.js" charset="utf-8"></script>
</body>
</html>
```

## Credits
> NexT基本使用
> 转自[官方说明文档](http://theme-next.iissnan.com/getting-started.html)

