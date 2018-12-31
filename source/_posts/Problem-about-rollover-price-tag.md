---
title: 价牌翻转问题
copyright: true
date: 2017-09-18
categories: 算法
description: 价牌翻转问题
tags:
- C语言
- 算法
- 价牌翻转
---

## 价牌翻转问题
<!--more-->

# 问题描述

​	小李的店里专卖其它店中下架的样品电视机，可称为：样品电视专卖店。
​	其标价都是4位数字（即千元不等）。
​	小李为了标价清晰、方便，使用了预制的类似数码管的标价签，只要用颜色笔涂数字就可以了。
​	这种价牌有个特点，对一些数字，倒过来看也是合理的数字。如：1 2 5 6 8 9 0 都可以。这样一来，如果牌子挂倒了，有可能完全变成了另一个价格，比如：1958 倒着挂就是：8561，差了几千元啊!!
​	当然，多数情况不能倒读，比如，1110 就不能倒过来，因为0不能作为开始数字。

​	有一天，悲剧终于发生了。某个店员不小心把店里的某两个价格牌给挂倒了。并且这两个价格牌的电视机都卖出去了!庆幸的是价格出入不大，其中一个价牌赔了2百多，另一个价牌却赚了8百多，综合起来，反而多赚了558元。
# 思路

1、已知是一个四位数，那么共有1001-9999种情况；
2、一个数颠倒之后，数字顺序颠倒并且每个数字颠倒，例如1269颠倒之后就是6921；
3、0不能是第一位也不能是最后一位。

# 代码实现

```c
//
//  main.c
//  rollover-price-tag
//
//  Created by Canvas on 2018/12/31.
//  Copyright © 2018 Canvas. All rights reserved.
//

#include<stdio.h>
#include<math.h>

int array[4]={0};

int inverse(int a){//求一个数颠倒之后的结果
    int b=0;
    int arr[4]={0};
    
    for(int i=0;i<4;i++){
        arr[i]=(int)(a/pow(10,3-i))%10;
        if(arr[i]==9)
            b+=6*pow(10,i);
        else if(arr[i]==6)
            b+=9*pow(10,i);
        else
            b+=arr[i]*pow(10,i);
    }
    return b;
}

int main(){
    int i,j;
    int k=0,l=0;
    int temp;
    int flag;
    int up[50]={0},down[50]={0};//分别存放赚钱和赔钱的价牌
    
    for(i=1001;i<10000;i++){
        temp=i;
        flag=1;
        for(j=0;j<4;j++){
            array[j]=(int)(temp/pow(10,3-j))%10;
            
            if(array[j]==3||array[j]==4||array[j]==7){//分割数字排除不能翻转的数字
                flag=0;
                break;
            }
        }
        if(flag){
            
            if(array[0]==0 || array[3]==0)//0不能位于第一位和最后一位
                continue;
            if(inverse(i)-i>800&&inverse(i)-i<900)
                up[k++]=i;
            if(i-inverse(i)>200&&i-inverse(i)<300)
                down[l++]=i;
        }
    }
    for(i=0;i<50;i++){//依次输出赚钱的原价，颠倒价、赚的钱、赔钱的原价、颠倒价、赔的钱
        for(j=0;j<50;j++){
            if((inverse(up[i])-up[i])-(down[j]-inverse(down[j]))==558){
                printf("%d\t%d\t%d\t",up[i],inverse(up[i]),inverse(up[i])-up[i]);
                printf("%d\t%d\t%d\n",down[j],inverse(down[j]),down[j]-inverse(down[j]));
            }
        }
    }
    return 0;
}
```

运行结果：

![image-20181231154932718](/Users/canvas/Library/Application Support/typora-user-images/image-20181231154932718.png)


