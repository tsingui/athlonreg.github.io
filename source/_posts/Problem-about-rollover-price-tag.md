---
title: Problem about rollover price tag
copyright: true
date: 2017-09-18
categories: algorithm
description: 价牌翻转问题
tags:
- C语言
- 算法
- 价牌翻转
---

## 价牌翻转问题
<!--more-->

# 问题描述

![2017-09-18-01](http://ovefvi4g3.bkt.clouddn.com/2017-09-18-01-1.png)

# 思路

1、已知是一个四位数，那么共有1001-9999种情况；
2、一个数颠倒之后，数字顺序颠倒并且每个数字颠倒，例如1269颠倒之后就是6921；
3、0不能是第一位也不能是最后一位。

# 代码实现

```
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

![2017-09-18-02](http://ovefvi4g3.bkt.clouddn.com/2017-09-18-02-1.png)


