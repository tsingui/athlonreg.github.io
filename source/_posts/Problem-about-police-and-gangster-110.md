---
title: 警匪110问题
copyright: true
date: 2017-09-18
categories: 算法
description: 警匪110问题
tags:
- C语言
- 算法
- 警匪110
---

# 问题描述

​	匪警请拨110,即使手机欠费也可拨通！

​	为了保障社会秩序，保护人民群众生命财产安全，警察叔叔需要与罪犯斗智斗勇，因而需要经常性地进行体力训练和智力训练！

   某批警察叔叔正在进行智力训练：

    12 3 4 5 6 7 8 9 =110;

​	请看上边的算式，为了使等式成立，需要在数字间填入加号或者减号（可以不填，但不能填入其它符号）。之间没有填入符号的数字组合成一个数，例如：12+34+56+7-8+9 就是一种合格的填法；123+4+5+67-89 是另一个可能的答案。

​	请你利用计算机的优势，帮助警察叔叔快速找到所有答案。

   	每个答案占一行。形如：

- 12+34+56+7-8+9

- 123+4+5+67-89

# 思路

1、一共九个数字，八个操作符； 
2、每个操作符有三种情况，即留空、加或者减，分别用0、1和2表示；
3、共有 3^8 种情况，遍历每种情况判断输出； 
4、需要注意的是留空和'+'、'-'需要分开处理，因为留空之后需要将其前后的数据连在一起。 
5、以12+34+56+7-8+9为例，给和sum赋初值为0，第一次循环操作符为留空，需要先加上第一位的1，然后进行这一次运算，即1x10+2，然后下一次循环操作符为+，需要计算的就是12+3，同理在3、4之间的空需要计算的是3x10+4，而不是（12+3）x10+4，所以需要一个临时变量来记录上次的操作数，还需要一个变量来记录上次的操作符将上次的结果进行统计处理，原因就在于我们无法确定下次的操作符是不是留空。 
6、由于我们在统计和时，只有在下一次循环才能处理最后一个操作数，所以需要将9最后单独处理。 

# 代码实现

```c
#include <stdio.h> 
#include <math.h> 

int main() {
	int a[9]={1,2,3,4,5,6,7,8,9};
	int sum; 
	int temp; 
	int oper,lastoper;  
    int number; 
    int i,j;
    
	for(i=0;i<pow(3,8);i++)  
    {  
        sum=0; 
		temp=1; 
		lastoper=1;  
        number=i;  
        
        for(j=1;j<=8;j++)  
        {  //操作八次 
            oper=number%3; 
			number=number/3;  
            
			if (!oper) 
				temp=temp*10+a[j];  //留空单独处理 
				
            if (oper==1) {  //当前操作符 
                if(lastoper==1){ //前一次操作符 
					sum=sum+temp; 
					temp=a[j];
				}  
                if(lastoper==2){
					sum=sum-temp; 
					temp=a[j];
				}  
                lastoper=oper;  //更新上次操作符 
            }  
            
            if(oper==2){  
                if(lastoper==1){
					sum=sum+temp; 
					temp=a[j];
				}  
                if(lastoper==2){
					sum=sum-temp; 
					temp=a[j];
				}  
                lastoper=oper;  
            }  
        }  
  
        if(lastoper==1) 	//第九次操作单独处理 
			sum=sum+temp;  
        if(lastoper==2) 
			sum=sum-temp;     
  
        if(sum==110)  
        {  
            number=i;  
            for(j=1;j<=8;j++)  
            {  
                printf("%d",a[j-1]);  
                oper=number%3; 
				number=number/3;  
                if(oper==1) 
					printf("+");  
                if(oper==2) 
					printf("-");
				else
					continue;
            }             
            printf("9\n");  
        }  
    }
	return 0;
}
```

# 运行结果

![](https://ws1.sinaimg.cn/large/006dLY5Ily1fypyfpkfu0j32701f6ne8.jpg)


