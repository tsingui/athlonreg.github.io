---
title: Intro about iterator in struts2
copyright: true
date: 2018-04-11 10:12:17
categories: Study
description: struts2中s:iterator 标签的使用详解
tags: 
- struts2
- iterator
- 框架
---

## struts2中s:iterator 标签的使用详解
<!--more-->

### 简单的`Demo`
> s:iterator 标签有三个属性：

- value: 被迭代的集合
- id: 指定集合中元素的`id`
- status: 迭代元素的索引

#### `jsp`页面定义元素写法 数组或`list`
```
<s:iterator value="{'1','2','3','4','5'}" >
    <s:property value='number'/>A
</s:iterator>
```

打印结果为: 1A2A3A4A5A

#### 索引的用法
> 如果指定了status，每次的迭代数据都有IteratorStatus的实例，它有以下几个方法

- int getCount() -- 返回当前迭代了几个元素
- int getIndex() -- 返回当前元素索引
- boolean isEven() -- 当前的索引是否偶数
- boolean isFirst() -- 当前是否第一个元素
- boolean isLast() -- 当前是否最后一个元素
- boolean isOdd() -- 当前元素索引是否奇数

```
<s:iterator value="{'a','b','c'}" status='st'>
    <s:if test="#st.Even">
        现在的索引是奇数为:<s:property value='#st.index'/>
    </s:if>
    当前元素值：<s:property value='char'/>
</s:iterator>
```

#### 遍历`map`
`value`可以直接定义为：

```
value="#{"1":"a","2":"b"}"
```

每个元素以逗号隔开，元素之间的`key`和`value`冒号隔开。

`value`也可以是数据栈里面的`java.util.Map`对象

> 遍历写法如下：

```
<s:iterator value="map" status="st">
    key : <s:property value='key'/>
    value:<s:property vlaue='value'/>
</s:iterator>
```
当然`key`和`value`都可以是`java`的 `Object`。

#### 遍历数据栈 -- 简单的`List`类
```
List<Attr> class Attr{
    String attrName;
    String getAttrName()
    {
        return "123";
    }
}

<s:iterator value="label" >
    <s:property value="#id.attrName" />
</s:iterator>
```
当然`value`还可以写成`value="%{label}"`，`label`可以用`.`操作`label`的属性`List`，可以写成`value="%{label.list}"`，相当于: `getLabel().getList()`；

#### 遍历 2 个`list`
```
List<AttrName> attrN {color,size,style}
List<AttrValue> attrV {red,20,gay}
```

这 2 个`list`的元素是一一对应的，一个attrN对应一个attrV

```
<s:iterator value="%{attrN}" status="status">
    index    is : <s:property value='status.index'/>
    attrName is : <s:property value='id'/> or <s:property value='%{id}'/>
    attrName is : <s:property value='%{attrV[#status.index]}'/>
</s:iterator>

<s:bean>
    <s:param value="5" />
    <s:param value="10" />
    <s:iterator>
        counter:<s:property/>
    </s:iterator>
</s:bean>
```

> 这个标签主要的的作用就是迭代出集合。
> value属性表示需要跌代显示出来的值。
> status属性，又来保存迭代时的一些状态值。

**注：**

- 如果需要引用`valueStack`中的值，需要使用这样的形式。

```
<s:iterator value="#userList" /> //userList
```

> 在`action`部分被保存在`Request`中，所以使用`#`加属性名来引用值。

- 如果集合的值是通过`action`的方法，假设我们的`action`中有一个`getListMenu`方法，返回一个`List`集合。我们可以使用如下的形式来引用这个集合，并用`s:iterator`来输出。

```
<s:iterator value="listMenu" />
```

- `iterator`的`value`使用定义好的方式，如：

```
<s:iterator value="{1,2,3,4}" />    //这样跌代输出的值就是1.2.3.4这四个值。
```

### `iterator`中输出具体值
如果，在上面我们的`list`中的对象，有两个属性，都是`String`类型，一个是`name`，一个是`url`。
我们可以这样来引用。

```
<s:property value="name" />     //这样我们将可以输出迭代对象的name属性值。
```

如果我们希望使用`<s:url />`来将跳转过后的`url`进行处理，该如何来做？

```
<s:url value="%{url}"/>     //%{}ognl的表达式，这样的值能够将url的值进行<s:url/>的处理
实际上就是转为绝对路径。这样，我们就可以对付一些因跳转换产生的路径问题。
```

**原因：**
因为`<s:iteratotr />`以后，当前的对象应该就在`ValueStack`顶部了，这样当然的`url`实际上就是对象的`url`属性了。

### 使用ognl输出对应的值
```
<s:textfield value="%{#request.loginNames}"/>
```

使用此表达式，会生成一个文本框，并且，如果`request.attribute`中有`loginNames`属性，将会做为些文本框的默认值。

如果只使用`#request.loginNames`在`struts2`的标签内部，是不会显示任何值的，注意外面加上的`%{}`符号，才会被正常的使用。

如果希望如`EL`语言一样直接输出文件，如在一个`<a></a>`之间的`innerHTML`文本为`#request.loginNames`的值，我们只要使用：`<s:property value="#request.loginNames" />`便可以正常使用！

**注：**
- `${}`是`EL`语言的`%{}`这样的形式是`ognl`表达式语言的，在`struts2`的标签内部，使用`%{}`这样的形式，在标签外部可以使用`${}` `EL`语言的方式。如果在`struts2`的标签内部使用`${}`这样的方式，会出现以下的错误提示：

```
According to TLD or attribute directive in tag file, attribute value does not accept any expressions
```

2.很多时候，我们使用`struts2`的一些标签，属性是需要接受集合的，如果集合是保存在`request,session`，或者是值栈(非根对象的栈顶)，可以使用`#变量名`的方式，如果获取的值是在`Action`中通过特定的方法来获取，就需要使用如`value="userList"`这样的方式，只是去掉了前面的`#`。

### `struts2`中的`OGNL`用法
#### `User`对象属性获取
如`User`中有`username`和`password`字段

- 获取`username`属性
```
<s:property value="user.username" />
```
- 获取`password`属性
```
<s:property value="user.password" />
```

若`User`中又包含定义了`address`对象，`address`对象中包含有`addr`属性，则可以这样访问获取`addr`属性: 
```
<s:property value="user.address.addr" />
```

若`User`中还包含一个`get()`的普通方法，可以这样调用
```
<s:property value="user.get()" />
```

以上是调用值栈中对象的普通方法，`user`为值栈中的对象

----

调用`action`中的静态方法`get()`，普通方法不能直接调用

```
<s:property value="@com.netshuai.action.ManagerAction@get()" />
```

以上为调用非值栈中的静态方法

----

调用`JDK`中类的静态方法

```
<s:property value="@java.lang.Math@floor(32.56)" />
```

上例也可写成

```
<s:property value="@@floor(32.56)" />
```

省略前面的类则默认使用`java.lang.Math`类，其他类不可省略

----

调用普通类中的静态属性

```
<s:property value="@com.netshuai.model.Address@city" />
```

`address`中的`city`静态属性要用`public`声明

----

调用普通类的构造方法，如构造方法为

```
public User(String username)
{
    this.username=username;
}
```

调用方法为

```
<s:property value="new com.netshuai.model.User('hello').username" />
```

则返回`username`值为`hello`

----

- 获取`List`

```
<s:property value="list" />
```

- 获取`List`中的某一个元素

```
<s:property value="list[0]" />
```

- 获取`List`的大小

```
<s:property value="list.size" />
```

- 获取`Set`

```
<s:property value="set" />
```

无法获取`Set`中的某一个元素，因为`Set`没有顺序

- 获取`Map`

```
<s:property value="map" />
```

- 获取`Map`中所有`key`的值

```
<s:property value="map.keys" />
```

- 获取`Map`中所有`value`的值

```
<s:property value="map.values" />
```

- 获取`Map`中的某一个元素

```
<s:property value="map['k1']" />
```

- 获取`List`所有对象

```
<s:property value="listObject" />
```

需要重写`toString()`方法才能正常显示对象的值

- 利用投影获取`List`中所有对象的`username`属性

```
<s:property value="listObject.{username}" />
```

- 利用投影获取`List`中第一个对象的`username`属性

```
<s:property value="listObject.{username}[0]" />
```

- 利用选择获取`List`中年龄大于 30 的对象

```
<s:property value="listObject.{?#this.age>30}" />
```

- 利用选择获取`List`中年龄大于 30 的对象的`username`

```
<s:property value="listObject.{?#this.age>30}.{username}" />
```

- 利用选择获取`List`中年龄大于 30 的第一个对象的`username`

```
<s:property value="listObject.{?#this.age>30}.{username}[0]" />
```

或

```
<s:property value="listObject.{^#this.age>30}.{username}" />
```

- 利用选择获取`List`中年龄大于 30 的最后一个对象的`username`

```
<s:property value="listObject.{$#this.age>30}.{username}" />
```

- 获取`parameters`中的属性

```
<s:property value="#parameters.name" />
```

- 获取`request`中的属性

```
<s:property value="#request.name" />
```

- 获取`session`中的属性

```
<s:property value="#session.name" />
```

- 获取`application`中的属性

```
<s:property value="#application.name" />
```

- 按顺序遍历上面四个对象，然后返回首先找到的值

```
<s:property value="#attr.name" />
```

- `%{}`可以取出存在值堆栈中的`Action`对象，直接调用它的方法，如`%{getText('key')}`可以取出国际化信息

- `${}`可以用在国际化资源文件中和`struts2`配置文件中

- 使用`top`获取值栈中第二个对象

```
<s:property value="[1].top.user"/>
```

- 使用`top`获取值栈中第二个对象的属性

```
<s:property value="[1].user"/>
```

- 调用值栈中`action`的静态方法(`vs`也可写做`vs1`)

```
get()<s:property value="@vs@get()"/>
```

- 调用值栈中第二个`action`的静态方法

```
get()<s:property value="@vs2@get()"/>
```

- 将一个对象放入值栈

```
ActionContext.getContext().getValueStack().push(user);
```

### 转载自
[http://tomfish88.iteye.com/blog/1489506](http://tomfish88.iteye.com/blog/1489506)

