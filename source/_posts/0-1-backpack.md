---
title: 0-1 backpack
copyright: true
date: 2018-01-17 16:51:25
categories: algorithm
description: 0-1背包问题
tags: 
- 0-1背包问题
- algorithm
- 算法
---

## 0-1背包问题
<!--more-->

### 递归
```
//
//  main.c
//  algorithm
//
//  Created by athlonreg on 17/01/2018.
//  Copyright © 2018 athlonreg. All rights reserved.
//

#include <stdio.h>

#define n 5
#define c 10

int weight[n]={2,2,6,5,4}, value[n]={6,3,5,4,6};

int f(int i,int j){
    int m1,m2;
    if(i==n-1){
        if(j>=weight[i])
            return value[i];
        return 0;
    }
    if(j<weight[i])
        return f(i+1,j);
    m1=f(i+1,j);
    m2=f(i+1,j-weight[i])+value[i];
    return m1>m2?m1:m2;
}

int main(int argc, const char * argv[]) {
    printf("%d\n",f(0,c));
    return 0;
}
```

### 运行结果
![2018-01-17-05](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-05.png)

### 动态规划
```
//
//  main.c
//  algorithm
//
//  Created by athlonreg on 17/01/2018.
//  Copyright © 2018 athlonreg. All rights reserved.
//

#include <stdio.h>

#define n 5
#define c 10

int weight[n]={2,2,6,5,4}, value[n]={6,3,5,4,6};

int main(int argc, const char * argv[]) {
    int s[n][c+1];
    int i,j;
    for(j=0;j<=c;j++){
        if(j>weight[n-1])
            s[n-1][j]=value[n-1];
        else
            s[n-1][j]=0;
    }
    for(i=n-2;i>=0;i--){
        for(j=0;j<=c;j++){
            if(j<weight[i])
                s[i][j]=s[i+1][j];
            else
                s[i][j]=s[i+1][j]>(s[i+1][j-weight[i]]+value[i])?s[i+1][j]:(s[i+1][j-weight[i]]+value[i]);
        }
    }
    printf("%d\n",s[0][c]);
    return 0;
}
```

### 运行结果
![2018-01-17-07](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-07.png)

### 回溯
```
//
//  main.c
//  algorithm
//
//  Created by athlonreg on 17/01/2018.
//  Copyright © 2018 athlonreg. All rights reserved.
//

#include <stdio.h>

#define n 5
#define c 10

int weight[n]={2,2,6,5,4}, value[n]={6,3,5,4,6};
int maxvalue, tempvalue, tempweight;

void traceback(int t){
    if(t==n){
        if(tempvalue>maxvalue)
            maxvalue=tempvalue;
        return;
    }
    if(tempweight+weight[t]<=c){
        tempweight+=weight[t];
        tempvalue+=value[t];
        traceback(t+1);
        tempweight-=weight[t];
        tempvalue-=value[t];
    }
    traceback(t+1);
}

int main(int argc, const char * argv[]) {
    traceback(0);
    printf("%d\n",maxvalue);
    return 0;
}
```

### 运行结果
![2018-01-17-06](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-06.png)

