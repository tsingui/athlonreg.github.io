---
title: BinarySearch
copyright: true
date: 2018-01-17 15:29:36
categories: algorithm
description: 二分查找
tags:
- 算法
- 二分查找
- algorithm
---

## 二分查找
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

#define n 5

int arr[n]={1,2,3,4,5};

int BinarySearch(int a[], int low, int high, int k){
    while(low<high){
        int mid=(low+high)/2;
        if(a[mid]==k)
            return mid;
        else if(a[mid]>k)
            return BinarySearch(a, low, mid-1, k);
        else
            return BinarySearch(a, mid+1, high, k);
    }
    return -1;
}

int main(int argc, const char * argv[]) {
    int x=4;
    printf("%d\n", BinarySearch(arr, 0, n-1, x));
    return 0;
}

```

### 运行结果
![2018-01-17-01](http://ovefvi4g3.bkt.clouddn.com/2018-01-17-01.png)



