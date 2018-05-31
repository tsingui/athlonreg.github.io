---
title: Reverse part of array
copyright: true
date: 2018-01-17 16:23:37
categories: algorithm
description: 将数组从指定位置逆置，如从4开始逆置{1，4，2，6，8，5，7，3}，则输出{8，5，7，3，1，4，2，6}。
tags: 
- algorithm
- 算法
- 逆置
---

## 将数组从指定位置逆置，如从4开始逆置{1，4，2，6，8，5，7，3}，则输出{8，5，7，3，1，4，2，6}
<!--more-->

### 代码
```
//
//  main.c
//  algorithm
//
//  Created by athlonreg on 17/01/2018.
//  Copyright © 2018 athlonreg. All rights reserved.
//

#include <stdio.h>
#include <math.h>

#define n 8

int a[n]={1,4,2,6,8,5,7,3};

void print(){
    for(int i=0;i<n;i++){
        printf("%3d", a[i]);
    }
    putchar('\n');
}

void swap(int *a, int *b){
    int temp=*a;
    *a=*b;
    *b=temp;
}

void swapposition(int a[], int low, int high, int k){
    int i, j;
    for(i=low,j=k-1;i<j;i++,j--)
        swap(&a[i], &a[j]);
    for(i=k,j=high;i<j;i++,j--)
        swap(&a[i], &a[j]);
    for(i=low,j=high;i<j;i++,j--)
        swap(&a[i], &a[j]);
}

int main(int argc, const char * argv[]) {
    int k;
    print();
    scanf("%d", &k);
    swapposition(a, 0, n-1, k);
    print();
    return 0;
}
```

### 运行结果
![2018-01-17-04](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-04.png)



