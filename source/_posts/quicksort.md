---
title: quicksort
date: 2018-07-20 12:53:01
categories: 算法
keywords: 快速排序, 快排
description: 快速排序算法实现
tags: 
- 快速排序
---

# 代码
```c
#include "stdio.h"

void quicksort(int a[], int left, int right) 
{ 
	int i, j, t, temp; 
	if(left > right) 
	   return; 
				
	temp = a[left];
	i = left; 
	j = right; 
	while(i != j) 
	{ 
		while(a[j] >= temp && i < j) 
			j --; 
		while(a[i] <= temp && i < j) 
			i ++; 
		if(i < j) 
		{ 
			t = a[i]; 
			a[i] = a[j]; 
			a[j] = t; 
		} 
	} 
	a[left] = a[i]; 
	a[i] = temp; 
							 
	quicksort(a, left, i-1);
	quicksort(a, i+1, right);
} 

int main(){
	int i, j, t; 
	int n = 5;
	scanf("%d", &n);
	int a[n];
	for(i = 1;i <= n; i++) 
		scanf("%d", &a[i]); 
	
	quicksort(a, 1, n);

	for(i=1; i <= n; i++) 
		printf("%d ", a[i]); 
	putchar('\n');
	return 0; 	
}
```

# 运行结果
![](https://raw.githubusercontent.com/athlonreg/BlogImages/master/Images/b8/847de187a667d431036df4a77966d9.jpg)
