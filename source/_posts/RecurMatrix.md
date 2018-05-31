---
title: RecurMatrix
copyright: true
date: 2018-01-17 15:54:02
categories: algorithm
description: 矩阵连乘问题
tags: 
- 矩阵连乘问题
- 算法
- algorithm
---

## 矩阵连乘问题
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

#define n 6

int a[n+1]={30,35,15,5,10,20,25};
int b[n+1][n+1];

int RecurMatrix(int i, int j){
    if(i==j)
        return 0;
    int minvalue=RecurMatrix(i, i)+RecurMatrix(i+1, j)+a[i-1]*a[i]*a[j];
    b[i][j]=i;
    for(int k=i+1;k<j;k++){
        int tempvalue=RecurMatrix(i, k)+RecurMatrix(k+1, j)+a[i-1]*a[k]*a[j];
        if(tempvalue<minvalue){
            minvalue=tempvalue;
            b[i][j]=k;
        }
    }
    return minvalue;
}

void traceback(int i, int j){
    if(i==j)
        return;
    traceback(i, b[i][j]);
    traceback(b[i][j]+1, j);
    printf("A[%d-%d]*A[%d-%d]\n", i, b[i][j], b[i][j]+1, j);
}

int main(int argc, const char * argv[]) {
    printf("%d\n", RecurMatrix(1, n));
    traceback(1, n);
    return 0;
}

```

### 运行结果
![2018-01-17-02](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-02.png)



