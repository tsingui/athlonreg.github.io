---
title: Problem about Sending out death squads
copyright: true
date: 2017-09-18
categories: algorithm
description: 派遣敢死队问题
tags:
- C语言
- 算法
- 派遣敢死队
---

## 派遣敢死队问题
<!--more-->

# 问题描述

![2017-09-18-03](http://ovefvi4g3.bkt.clouddn.com/2017-09-18-03-1.png)

# 思路

1、首先将所有士兵直属上级的编号放于数组a； 
2、每个人有两种选择，去和不去，用0和1表示，转换为二进制放于数组b；
3、最后判断每个士兵是不是与其直属上级同时执行任务，进而对count进行统计。 

# 代码实现

```
#include <stdio.h> 
#include <math.h> 

int main() {
	int number;
	int count=0;
	int flag;
	scanf("%d",&number);//派遣的人数 
	
	int i,j;
	int temp; 
	int a[number],b[number];//a
	a[0]=0;//将军 
	
	for(i=1;i<number;i++){
		scanf("%d",&a[i]);//每个人的直属上级 
	}
	
	for(i=1;i<pow(2,number);i++){
		temp=i;
		for(j=0;j<number;j++){
			//遍历所有情况 
			b[j]=temp%2;
			temp/=2;
		}
		
		flag=1;
		for(j=1;j<number;j++){
		//将军没有上级，不用判断
			if(b[j]==1&&b[a[j]-1]==1){
			//判断是否士兵和上级同时执行任务 
			//b[j]为编号为j+1的士兵去不去
			//b[a[j]-1]为编号为j+1的士兵的直接上级去不去
				flag=0;
				break;
			}
		}
		
		if(flag==1)
			count++;
	}
	
	printf("%d\n",count);
	return 0;
}
```

# 运行结果

![2017-09-18-04](http://ovefvi4g3.bkt.clouddn.com/2017-09-18-04-1.png)


