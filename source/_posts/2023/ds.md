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


##### 优点
1. 插入删除速度快 
2. 内存利用率高 
3. 大小没有固定，拓展很灵活
##### 一些概念
1. 节点

链表的一个数据单元，结构分为数据域和指针域。

下面为一个单链表节点示例
```cpp
typedef struct node {
   ElementType data;
   struct node *next;
} node;
```

1. 单链表

  每个节点具有数据域和一个指向后继节点的指针的链表

3. 双链表

每个节点具有数据域和两个分别指向前驱节点和后继节点的指针的链表

4. 循环链表

将单链表的最后一个节点的指针域由NULL改为指向第一个节点从而首尾相连的链表

5. 头指针

  头指针是链表的必要结构，意思为：指向链表第一个节点的指针。

  头指针具有标识作用，一般用头指针来作为链表的名字
  比如后文代码中的L。

6. 头节点

在链表的开始节点之前的设立的节点叫做头结点，头结点的数据域可以不存任何数据，也可以储存链表长度等数据，next指针域指向开始节点。

注：链表一般都含有头结点

7. 尾指针

  指向链表最后一个节点的指针。

8. 尾结点

尾结点指链表中最后一个结点，他的指针域为NULL。
// 图

由以上概念排列组合可以得到：

带头结点的单链表，头指针是？尾指针是？尾结点是？

带头结点的双链表，头指针是？尾指针是？尾结点是？

带头结点的仅有尾指针的单循环链表

其相比仅有头指针的单循环链表的优点：往尾部插入节点和删除第一个节点的时间复杂度都是O(1)。

而仅有头指针的单循环链表往尾部插入节点的时间复杂度是O(n),即要遍历到尾部才可以插入。

##### 操作
1. 建立
   
   尾插法：

   将新节点逐个从最末端的节点插入链表。

   头插法：

   利用指针指向下一个结点元素的方式进行逐个创建，使用头插入法最终得到的结果是逆序的。（也可以理解为从头节点不停的尾插节点）


2. 遍历

通过指针访问直接遍历即可：
```cpp
void printLinkedList(struct Node* head) {
    struct Node* p = head;
    while (p != NULL) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\n");
}
```
3. 插入

遇事不决就画图

插入可分为三种情况

1.头部插入（插入在头节点后面）2.中间节点插入3.尾部插入（插入到尾部，next指针指NULL）


单链表的插入

![单链表插入](/images/ds/link-insert.png)

```cpp
Status ListInsert_L(LinkList &L, int i, ElemType e)
{//在带头结点的单线性链表L中第i个位置之前插入元素e
 LinkList p,s; int j;
 p = L; j = 0;
 while ( p && j<i-1 )
      { p = p->next; ++j; }          //寻找第i-1个结点
 if  (!p||j>i-1)  return ERROR;     //i 小于1或者大于表长
 s = (LinkList )malloc(sizeof(LNode));   //生成新结点
 s->data = e; s->next = p->next;                 //插入L中
 p->next = s;
 return OK;
}
```

双链表的插入

![双链表插入](/images/ds/doublelinked-insert.png)

```cpp
//在p结点之后插入s结点
bool InsertNextDNode(DNode *P, DNode *s)
{
	s->next = p->next;	//将结点*s插入到结点*p之后， 如上图步骤1
	p->next->prior = s;  //如上图步骤2
	s->prior = p;     //如上图步骤3
	p->next = s;      //如上图步骤4
}

```
4. 搜索
遍历的同时寻找节点的数据，代码同遍历。
5. 删除

单链表删除

![单链表删除](/images/ds/delete.png)

```cpp
Status ListDelete_L(LinkList &L, int i,  ElemType &e)
{ // 在带头结点的单链线性表L中,删除第i个元素,并由e返回其值
 int j;
 LinkList p,q;
 p = L;  j = 0;
 while( p->next && j<i-1 )
  { p = p->next; ++j; }      //寻找第i个元素,并令p指向其前驱
 if (!(p->next)||j>i-1)  return ERROR;   //删除位置不合理
 q = p->next;   
 p->next = q->next;             //删除并释放结点
 e = q->data;
 free(q);
 return OK;
}
```

双链表删除

![双链表删除](/images/ds/delete.png)

```cpp
//删除p的后继结点q,
p->next = q->next;
q->next->prior = p;
free(q);
```
##### 代码
```cpp
typedef  int Status;
typedef  int ElemType;

//–––––线性表的链式存储结构–––––
typedef  struct  LNode
{  ElemType       data;
  struct  LNode *next;
}LNode, *LinkList;

//--------------基本操作-----------------
Status InitList_L(LinkList &L)
{ //建立一个空的链表，L为带头结点的单链表的头指针.
   L=(LinkList)malloc(sizeof(LNode));   //生成头结点
   if(!L) return ERROR;
   L->next=NULL; 
     return OK;
} //InitList_L

Status ListInsert_L(LinkList &L, int i, ElemType e)
{//在带头结点的单线性链表L中第i个位置之前插入元素e
 LinkList p,s; int j;
 p = L; j = 0;
 while ( p && j<i-1 )
      { p = p->next; ++j; }          //寻找第i-1个结点
 if  (!p||j>i-1)  return ERROR;     //i 小于1或者大于表长
 s = (LinkList )malloc(sizeof(LNode));   //生成新结点
 s->data = e; s->next = p->next;                 //插入L中
 p->next = s;
 return OK;
}//ListInsert_L

int LocateElem_L(LinkList L,ElemType e, Status (*compare)(ElemType,ElemType))
{ //在线性链表L中查找第1个值与e满足compare()的元素的位序
  //若找到,则返回其在L中的位序,否则返回0
 int i; LinkList p;
 i = 1;                                            //i的初值为第1个元素的位序
 p = L->next;                         //p的初值为第1个元素的存储位置
 while(  p && !compare(p->data, e) )
 {  ++i; p=p->next;}
 if (p) return i;
 else return ERROR;
}//LocateElem_Sq

Status GetElem_L(LinkList L, int i, ElemType &e)
{ //L为带头结点的单链表的头指针.
  //当第i个元素存在时,其值赋给e并返回OK,否则返回ERROR
 LinkList p; int j;
  p = L->next; 
  j = 1; 
 while ( p&& j<i )
  {                   //顺指针向后查找,直到p指向第i个元素或p为空
   j++; p = p->next;
  }
 if (!p||j>i)  return ERROR ;          //第i个元素不存在
 e = p->data;                           //取第i个元素
 return OK;
} //GetElem_L

int ListEmpty_L(LinkList L)
{ if (L->next == NULL) return TRUE;
  else return FALSE;
}

int ListLength_L(LinkList L)
{LinkList p;
 int len=0;
 p=L->next;
 while(p)
 {
    len++; p = p->next;
 }
 return len;
}

Status ListDelete_L(LinkList &L, int i,  ElemType &e)
{ // 在带头结点的单链线性表L中,删除第i个元素,并由e返回其值
 int j;
 LinkList p,q;
 p = L;  j = 0;
 while( p->next && j<i-1 )
  { p = p->next; ++j; }      //寻找第i个元素,并令p指向其前驱
 if (!(p->next)||j>i-1)  return ERROR;   //删除位置不合理
 q = p->next;   
 p->next = q->next;             //删除并释放结点
 e = q->data;
 free(q);
 return OK;
}
```

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