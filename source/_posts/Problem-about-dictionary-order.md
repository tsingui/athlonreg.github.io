---
title: Problem about dictionary order
copyright: true
date: 2017-08-31
categories: algorithm
description: 字典序问题
tags:
- C语言
- 算法
- 字典序
---

## 字典序问题
<!--more-->

# 问题描述

在数据加密和数据压缩中常需要对特殊的字符串进行编码。给定的字母表A由26个小写字母组成。该字母表产生的升序字符串中字母从左到右出现的次序与字母在字母表中出现的次序相同，且每个字符最多出现1次。例如，a,b,ab,bc,xyz等字符串都是升序字符串。现在对字母表中产生的所有长度不超过6的升序字符串，计算它在字典中的编码。


# 思路

首先判断字符串长度为3，先算长度为1和2的所有情况，即从26个字母中选1个或两个字母，因为是升序，即sum=C（26，1）+C（26，2）；
	
之后再看字符串的第一个字符，为'd',之前有以a,b,c开头的长度为3的字符串，以a开头，后边2位需要在25个字母中选择（除了a），以b开头的后2位需要在24个字母中选择（除了a,b），以c开头的在23个字母（除了a,,b,c）中选择，即sum+=(C(25,2)+C(24,2)+C(23,2));
	
然后再看下一个字母'g'，d与g之间有e,f,需要算以de开头以及以df开头的所有情况，即sum+=(C(21,1)+C(20,1))；
	
最后再加上h-'a'+1;


# 代码实现
```
#include <stdio.h>
#include <string.h>

int getCombinatorialNumber(int m, int n) {
    int n_Product=1, m_Product=1;
    int i;
    
    for(i=1; i<=n; i++) 
        n_Product*=i;
    for(i=m; i>m-n; i--) {
        m_Product*=i;
        return m_Product/n_Product;
    }
}
int main(int argc, const char * argv[]) {
    int number;                                             		//要统计字符串的个数
    int sum;                                                		//存放字符串的序号
    int length;
    char str[10];                                           		//存放字符串
    int a[10];                                              		//存放字符串的每一位字符的值
    int i, j;
    scanf("%d", &number);
    
    while(number--) {
        getchar();
        sum=1;
        scanf("%s", str);
        length=(int)strlen(str);
        
        for(i=1; i<length; i++) {
            sum += getCombinatorialNumber(26, i);             	//小于字符串长度的字符串个数
        }
        
        for(i=0; i<length; i++) {
            a[i]=str[i]-96;                                 	//计算每个字符从a开始的序号数值, a~z分别对应1~26
            //printf("%d ", a[i]);
        }
        //printf("%d\n", f(26, 2));
        
        int temp=1;
        for(i=length; i>0; i--) {
            for(j=temp; j<a[length-i]; j++) {
                sum += getCombinatorialNumber(26-j, i-1);     //依次扫描字符，计算所有情况
            }
            temp=a[length-i]+1;
        }
        printf("%d\n", sum);
    }
    return 0;
}
```

![20170831-zidianxu](http://ovefvi4g3.bkt.clouddn.com/20170831-zidianxu-1.png)


