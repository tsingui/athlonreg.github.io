---
title: Solve problem of subset sum with backtracking method
copyright: true
date: 2017-12-12 14:12:40
categories: algorithm
description: 回溯法求子集和问题
tags:
- 子集和问题
- 回溯
---

## 回溯法求子集和问题
<!--more-->

### 问题描述
子集和问题的一个实例为<S,t>。其中，S={x<sub>1</sub>,x<sub>2</sub>,x<sub>3</sub>,&hellip;,x<sub>n</sub>}是一个正整数的集合，c是一个正整数。子集和问题判定是否存在S的一个子集S<sub>1</sub>，使得 S<sub>1</sub>中的所有元素之和等于c。
试设计一个解子集和问题的回溯法。

### 输入 
第1行有2个正整数n和c，n表示S的大小，c是子集和的目标值。接下来的1行中，有n个正整数，表示集合S中的元素。

### 输出
输出子集和问题的解。当问题无解时，输出`No solution!`。

### 样例输入
```
5 10
2 2 6 5 4
```

### 样例输出
```
2 2 6
```

### 代码实现
```
#include <stdio.h>

#define n 5
#define c 10

int array[n]={2,2,6,5,4};
int a[n]={0};
int sum=0;
int flag=0;

void traceback(int t)
{
    if(t==n){
        if(sum==c){
            flag=1;
            for(int i=0;i<n;i++){
                if(a[i]){
                    printf("%3d",array[i]);
                }
            }
            printf("\n");
            return;
        }
    }
    else{
        sum+=array[t];
        a[t]=1;
        traceback(t+1);
        a[t]=0;
        sum-=array[t];
        traceback(t+1);
    }
}

int main()
{
    traceback(0);
    if(!flag){
        printf("No Solutions!\n");
    }
    return 0;
}

```

### 结果输出
![Screen Shot 2017-12-12 at 2.26.24 PM](http://ovefvi4g3.bkt.clouddn.com/Screen Shot 2017-12-12 at 2.26.24 PM.png)



