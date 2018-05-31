---
title: Problem about coin array
copyright: true
date: 2017-09-03
categories: algorithm
description: 金币阵列问题
tags:
- C语言
- 算法
- 金币阵列
---

## 金币阵列问题
<!--more-->

# 问题描述
有m*n枚金币在桌面上排列成一个m行n列的金币阵列。每一枚金币或正面朝上，或背面朝上。用数字表示金币状态，0表示正面朝上，1表示背面朝上。


# 金币阵列游戏的规则
1、每次将任一行金币翻过来放在原来的位置上;	
2、每次可以任选2列，交换这2列金币的位置.


# 任务
给定金币的初始状态和目标状态，编程计算按金币游戏规则，将金币排列从初始状态变换到目标状态所需的最少变换次数。


# 思路
本例的实质是将一个二进制矩阵从一种形式利用相应规则变换到另一种形式。提供的规则有两种： 
1、将某一行的金币翻转; 
2、将某两列进行交换。

在这两种操作中，第一种操作可能会影响到某一行或者某一列中已经排列好的相关元素，因此，首先利用该规则进行变换，而后续的操作则不再利用该规则。
    
那么在程序中应该如下操作：
1、将矩阵中的每一列作为第1列，并利用第一个规则将第1列中的相关元素与目标矩阵中第1列的元素进行配对，如果不相同，则利用每1个规则进行翻转；
    
2、从第2列开始，将处理后的列与目标列进行比较，如果相同，则转下一列；如果不同，看是否可以通过列的交换完成，如果可以，则继续扫描，否则无解。
    

# 代码实现
```
#include <stdio.h>

#define row 4
#define col 3

int source[row][col] = {1,0,1,0,0,0,1,1,0,1,0,1};                       //source
int target[row][col] = {1,0,1,1,1,1,0,1,1,1,0,1};                       //target
int temparr[row][col];
nt number = 0;                                                         //转换的次数
int minnum = 9999;

void raw_change(int i) {                                                //行翻转
    int j;
    for(j=0; j<col; j++) {
        temparr[i][j] = 1-temparr[i][j]; 
    }
    number++;
}

void col_exchange(int i, int j) {                                       //列交换
    int temp, k;
    int temp, k;
    		
    for(k=0; k<row; k++) {
        temp = temparr[k][i];
        temparr[k][i] = temparr[k][j];
        temparr[k][j] = temp;
    }
    if(i != j)
        number++;  
}

int judge(int i, int j) {                                               //temparr的i列是否和target的j列相同
    int flag;
    for(int k=0; k<row; k++) {
        flag=1;
        if(temparr[k][i] != target[k][j]) {
            flag=0;
            break;
        }
    }    
    return flag;
}

int main() {
    // insert code here...
    		
    int i,j,k;
    for(i=0; i<col; i++) {                                        	//代表source的列
        for(j=0; j<row; j++) {
            for(k=0; k<col; k++) {
                temparr[j][k] = source[j][k];  		//给替身数组赋值
            }
        }
        
        number=0;
        col_exchange(0,i);                                  	//temparr数组的列先做交换，把其他列放到第一列的位置
        
        for(j=0; j<row; j++) {                                	//判断temparr的0号列和target的0号列是否相同，不同则翻转
            if(temparr[j][0] != target[j][0]) {
                raw_change(j);            		//如果第1列不匹配，那么行全部翻转
            }
        }
        
        int found;
        for(j=0; j<col; j++) {                    		//代表target，从第2行开始，到最后一行
            found=0;
            for(k=j; k<col; k++) {             		//代表temparr，从第2行开始，直到最后一行
                if(judge(k, j)) {  
                    found=1;
                    col_exchange(k, j);
                    break;
                }
            }
            if(!found) {
                break;
            }
        }
        if(found) {
            minnum=number;
        }
    }
    if(minnum<9999) {
        printf("一共变换%d次！\n", minnum);
    }
    else{
        printf("无解！\n");
    }
    return 0;
}
```
![2017-09-03-1](http://ovefvi4g3.bkt.clouddn.com/2017-09-03-1-1.png)

![2017-09-03-2](http://ovefvi4g3.bkt.clouddn.com/2017-09-03-2-1.png)


