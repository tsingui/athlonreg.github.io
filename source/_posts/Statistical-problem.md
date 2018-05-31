---
title: Statistical problem
copyright: true
date: 2017-08-29
categories: algorithm
description: 统计数字问题
tags:
- C语言
- 算法
- 统计数字
---

## 统计数字问题
<!--more-->

# 问题描述

一本书的页码从自然数 1 开始计数，直到自然数 n 。书的页码按照通常的习惯编排，每个页码都不包含多余的前导数字 0 。例如，第 6 页用数字 6 表示，而不是 06 或 006 等。数字计数问题要求对给定书的总页码 n ，计算出书的全部页码中分别用到多少次数字 0，1，2，...，9 。


# 思路:
  
暴力求解。
本题关键在于将每一页码的数字进行分解，这种方式可以利用整数的除法和对10取余计算。


# 代码实现

```
#include <stdio.h>
#include <math.h>
    
int main(int argc, const char * argv[]) {
    // insert code here...
    int array[10] = {0};                                    //存放0~9出现的次数
    int low, temp, high;                                    //以temp为分割点 将页数分为三部分 high和low分别代表高位和低位的数值 
    int paginations;                                        //存放总页数
    int i, j;
    
    printf("一共多少页: ");
    scanf("%d", &paginations);
    
    int count = 0;                                          //存放除去最高位后总页码的位数
    count = (int)log10(paginations);
    
    for(i = count; i >= 0; i --) { 				//i表示低位（low）的位数
        low = paginations % (int)pow(10, i);                //计算low的数值
        temp = paginations / (int)pow(10, i) % 10;          //计算temp的数值
        high = paginations / (int)pow(10, i + 1);           //计算high的数值
        
        for(j = 0; j < temp; j ++)
            array[j] += (high + 1) * pow(10, i);            //计算 0<中间位<temp 出现的次数
        array[temp] += high * pow(10, i) + low + 1;         //计算 中间位=temp 出现的次数
        for(j = temp + 1; j < 10; j ++)                     //计算 temp<中间位<9 出现的次数
            array[j] += high * pow(10, i);
    }
    
    for(i = count; i >= 0; i --)                            //除去多统计的a[0]出现的次数
        array[0] -= pow(10, i);
    printf("0~9分别出现的次数为:\n");
    for(i = 0; i < 10; i ++)                                //打印0~9分别出现的次数
        printf("%d\n", array[i]);
    
    return 0;
}
```

![2017-08-30](http://ovefvi4g3.bkt.clouddn.com/2017-08-30-1.png)


