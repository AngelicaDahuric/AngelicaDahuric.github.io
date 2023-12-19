---
title: How to learn Data Structure and Algorithm in ONE DAY
date: 2023-12-19 21:20:59
---
数据结构课程期末复习

如果您的 C 语言有问题请去网上看 C 语言教程，请额外关注指针与结构体部分。

第一部分：思路 第二部分 把所有的填空题可能出现的代码粘上去 第三部分 做题技巧

# 总览

本部分讲解数据结构的类型与实现

## 线性表（LinkList）

线性表是一种线性结构，它由 $n$ 个数据元素 $a_1, a_2, ..., a_n$ 组成。


### 逻辑结构

线性表：数据元素之间是一对一的关系，即除第一个和最后一个数据元素之外，其它数据元素都是首尾相接的。

### 物理结构

![线性表](/images/ds/xxb.png)

#### 顺序表（SeqList）

（一句话：就是可动态增加空间的数组）

##### 定义

顺序表是用一段物理地址连续的存储单元依次存储数据元素的线性结构，一般情况下采用数组存储。在数组上完成数据的增删查改。

##### 优点

1. 支持随机访问，可以通过下标直接访问 
2. 可以排序

##### 代码实现

代码用

```c++
#include <vector>
std::vector<int> arr;
```

动态分配顺序表（复习用）
1. 建表及基本操作
```c++
#include <stdio.h>
#include <stdlib.h>

typedef  int Status;
typedef  int ElemType;

#define TRUE 1
#define FALSE 0
#define  OK  1
#define  ERROR  -1
#define  OVERFLOW -2

typedef  int Status;
typedef  int ElemType;

//–––––线性表的动态分配顺序存储结构–––––
 #define LIST_INIT_SIZE    30  //线性表存储空间的初始分配
 #define LISTINCREMENT     10  //线性表存储空间的分配增量
 typedef   struct {
  ElemType   *elem;      //存储空间基址
  int        length;     //当前长度
  int        listsize;   //当前分配的存储容量(以sizeof(ElemType)为单位)
 }SqList;

//--------------基本操作-----------------
 Status InitList_Sq(SqList  &L)
 { L.elem=(ElemType *)malloc(sizeof(LIST_INIT_SIZE*sizeof(ElemType)));
   if(!L.elem)exit(OVERFLOW);
   L.length=0;
   L.listsize=LIST_INIT_SIZE;
   return OK;
 }//InitList_Sq      算法2.3

int ListLength_Sq(SqList L)
{
   return L.length;
}

Status GetElem_Sq(SqList L,int i, ElemType &e)
{ if(i<1||i>L.length) return ERROR;
  e=L.elem[i-1];
  return OK;
}


Status ListInsert_Sq(SqList &L,int i,ElemType e)
{//  在顺序线性表L中第i个位置之前插入新的元素e,
  //  i的合法值为1≤i≤ListLength_Sq(L)+1
   ElemType *newbase,*p,*q;
   if (i<1||i>L.length+1) return ERROR;     //i 值不合法
   if (L.length>=L.listsize)                //当前存储空间已满,增加分配
     { newbase=(ElemType *)realloc(L.elem,(L.listsize+LISTINCREMENT)*sizeof(ElemType));
      if(!newbase)exit(OVERFLOW);           //存储分配失败
      L.elem=newbase;                       //新基址
      L.listsize +=LISTINCREMENT;           //增加存储容量
    }
   q = &L.elem[i-1];                           //q为插入位置
   if(L.length>=1)
     for(p=&L.elem[L.length];p>=q;--p)
           *p = *(p-1);
   *q=e;                          //插入e
   L.length++;
   return OK;
 }//ListInsert_Sq


int LocateElem_Sq(SqList L,ElemType e, Status (*compare)(ElemType,ElemType))
{
 int i; ElemType *p;
 i = 1;
 p = L.elem;                                  //p的初值为第1个元素的存储位置
 while(i<=L.length && !(*compare)(*p++,e)) ++i;
 if (i<=L.length)  return i;
 else return 0;
}//LocateElem_Sq

```

2. 例题

```c++
// 函数实现！
// 已知顺序线性表La和Lb的元素按值非递减排列，合并La和Lb得到新的顺序线性表Lc, Lc的元素也按值非递减排列
void MergeList_Sq(SqList La,SqList Lb, SqList &Lc)
{ int i,j,k;
  int La_len,Lb_len;
  ElemType ai,bj;
  InitList_Sq(Lc)
  i=j=1;k=0;
  La_len=La.length;
  Lb_len=Lb.length;
  while((i<=La_len) && (j<=Lb_len))        //La和Lb均为空
   { GetElem_Sq(La,i,ai);GetElem_Sq(Lb,j,bj);
     if(ai<=bj) {ListInsert_Sq(Lc, ++k, ai);++i;}
     else{ListInsert_Sq(Lc, ++k, bj);++j;}
   }
  while(i<=La_len)
   { GetElem_Sq(La, i++, ai); ListInsert_Sq(Lc, ++k, ai);}
  while(j<=Lb_len)
   { GetElem_Sq(Lb, j++, bj); ListInsert_Sq(Lc, ++k, bj);}
}
```

```c++
// 指针实现！
void MergeList_Sq(SqList La,SqList Lb, SqList &Lc)
{ElemType *pa,*pb,*pc,*pa_last,*pb_last;
 pa = La.elem;
 pb = Lb.elem;
 Lc.listsize = Lc.length = La.length + Lb.length;
 pc = Lc.elem =(ElemType *)malloc(Lc.listsize * sizeof(ElemType));
 if (!Lc.elem) exit(OVERFLOW);            //存储分配失败
 pa_last = La.elem + La.length - 1;
 pb_last = Lb.elem + Lb.length - 1;
 while (pa<=pa_last && pb<=pb_last)       //归并
  {if ( *pa<= *pb) *pc++ = *pa++;
   else *pc++ = *pb++;
  }
 while( pa <= pa_last )  *pc++=*pa++;
 while( pb <= pb_last )  *pc++=*pb++;
}
```
#### 链表（Link List）
比较重要！
##### 定义

链表是一种物理存储结构上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。

![链表](/images/ds/lb.png)

```cpp
typedef struct node {
   ElementType data;
   struct node *next;
} node;
```
##### 优点
1. 插入删除速度快 
2. 内存利用率高 
3. 大小没有固定，拓展很灵活
##### 一些概念
1. 单链表
2. 双链表
3. 循环链表
4. 头节点
5. 尾节点
##### 操作
1. 建立
   
   尾插法：

   将新节点逐个从最末端的节点插入链表

   头插法：

   利用指针指向下一个结点元素的方式进行逐个创建，使用头插入法最终得到的结果是逆序的（也可以理解为从头节点不停的尾插节点）


2. 遍历

3. 插入

遇事不决就画图

单链表的插入

![单链表插入](/images/ds/link-insert.png)

双链表的插入

![双链表插入](/images/ds/doublelinked-insert.png)


4. 删除

5. 搜索

## 栈（Stack）


## 队列（Queue）

## 字符串（String）

## 数组和广义表（Array and Table）

## 树（Tree）

## 图（Graph）

## 查找（Search）

## 内部排序（Sort）

# 代码实现及详解

# 做题注意事项及技巧