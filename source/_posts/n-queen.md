---
title: n queen
copyright: true
date: 2018-01-17 16:04:05
categories: algorithm
description: n皇后问题
tags: 
- n皇后问题
- 算法
- algorithm
---

## n皇后问题
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

int a[n];
int count=0;

int judge(int t){
    if(t==n)
        return 0;
    for(int i=0;i<t;i++){
        for(int j=i+1;j<=t;j++){
            if(a[i]==a[j])
                return 0;
            if(abs(i-j)==abs(a[i]-a[j]))
                return 0;
        }
    }
    return 1;
}

void traceback(int t){
    int i;
    if(t==n){
        count++;
        for(i=0;i<n;i++)
            printf("%3d", a[i]);
        printf("\n");
    }
    for(i=0;i<n;i++){
        a[t]=i;
        if(judge(t))
            traceback(t+1);
    }
}

int main(int argc, const char * argv[]) {
    traceback(0);
    printf("%d\n", count);
    return 0;
}
```

### 运行结果
![2018-01-17-03](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-03.png)



