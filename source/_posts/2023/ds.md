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
```c++
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
```c++
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

```c++
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

```c++
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

```c++
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

```c++
//删除p的后继结点q,
p->next = q->next;
q->next->prior = p;
free(q);
```
##### 代码
1. 单链表
```c++
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

2. 双向链表

非书上代码仅供参考,From[CSDN薛定谔的猫ovo](https://blog.csdn.net/weixin_44162361/article/details/115819742)

```c++
#include<bits/stdc++.h>
using namespace std;

typedef struct DNode{
    int data;
    struct DNode *prior,*next;
}DNode, *DLinkList;

//初始化
void InitList(DLinkList &L){
    L = (DNode *)malloc(sizeof(DLinkList));
    L->prior = NULL;
    L->next = NULL;
}

//遍历操作
void PrintList(DLinkList L){
    DNode *p = L->next;
    while(p){
        cout<<p->data<<" ";
        p = p->next;
    }
    cout<<endl;
}

//求双链表的长度
int Length(DLinkList L){
    DNode *p = L->next;
    int len = 0;
    while(p){
        len++;
        p = p->next;
    }
    return len;
}

//头插法建立双链表
DLinkList HeadInsert(DLinkList &L){
    InitList(L); //初始化
    int x;
    cin>>x;
    while(x!=9999){
        DNode *s = (DNode *)malloc(sizeof(DNode));
        s->data = x;
        if(L->next == NULL){
            s->next = NULL;
            s->prior = L;
            L->next = s;
        }else{
            s->next = L->next;
            L->next->prior = s;
            s->prior = L;
            L->next = s;
        }
        cin>>x;
    }
    return L;
}

//尾插法建立双链表
DLinkList TailInsert(DLinkList &L){
    InitList(L);
    DNode *s,*r=L;
    int x;
    cin>>x;
    while(x!=9999){
        s = (DNode *)malloc(sizeof(DNode));
        s->data = x;
        s->next = NULL;
        s->prior = r;
        r->next = s;
        r = s;
        cin>>x;
    }
    return L;
}

//按值查找：查找x在L中的位置
DNode *LocateElem(DLinkList L, int x){
    DNode *p = L->next;
    while(p && p->data != x){
        p = p->next;
    }
    return p;
}

//按位查找：查找在双链表L中第i个位置的结点
DNode *GetElem(DLinkList L, int i){
    int j=1;
    DNode *p = L->next;
    if(i==0)return L;
    if(i<1)return NULL;
    while(p && j<i){
        p = p->next;
        j++;
    }
    return p; //如果i大于表长，p=NULL,直接返回p即可
}

//将x插入到双链表L中*p结点的下一个结点
void Insert(DLinkList &L, DNode *p, int x){
    DNode *s = (DNode *)malloc(sizeof(DNode));
    s->data = x;
    s->next = p->next;
    p->next->prior = s;
    s->prior = p;
    p->next = s;
}

//删除操作:将双链表中的第i个结点删除
void Delete(DLinkList &L, int i){
    if(i<1 || i>Length(L)){
        cout<<"delete failed: index is wrong."<<endl;
        return;
    }
    DNode *p = GetElem(L,i-1);
    DNode *q = p->next;
    p->next = q->next;
    q->next->prior = p;
    free(q);
}

//判空操作
bool Empty(DLinkList L){
    if(L->next == NULL){
        cout<<"L is null"<<endl;
        return true;
    }else{
        cout<<"L is not null"<<endl;
        return false;
    }
}


int main(){
    //尾插法建立双链表，并遍历单链表
    DLinkList L = TailInsert(L);
    cout<<"L: ";
    PrintList(L);
    
    DNode *p;
    //按值查找
    p = LocateElem(L,2);
    cout<<"值为2的结点的下一个结点值是："<<p->next->data<<endl;
    cout<<"值为2的结点的上一个结点值是："<<p->prior->data<<endl;
    //按位查找
    p = GetElem(L,3);
    cout<<"第三个结点值是："<<p->data<<endl;
    
    //插入操作
    Insert(L,p,7);
    cout<<"在第三个结点后面插入值为7的结点后L： ";
    PrintList(L);
    
    //删除操作
    Delete(L, 5);
    cout<<"删除第五个结点后L： ";
    PrintList(L);
    
    //求表长
    cout<<"表长为："<<Length(L)<<endl;;
    
    //判空
    Empty(L);
    return 0;
}
```

3. 循环链表
```c++
#include<stdio.h>
#include<stdlib.h>

#define TRUE 1
#define FALSE 0
#define OK  1
#define ERROR  0
#define OVERFLOW -2

typedef  int Status;
typedef  int ElemType;

//–––––线性表的链式存储结构–––––
typedef  struct  LNode
{  ElemType       data;
   struct  LNode  *next;
}LNode, *LinkList;

//--------------基本操作-----------------
Status InitList(LinkList &L)
{ //建立一个空的链表，L为头结点指针.
   L=(LinkList )malloc(sizeof(LNode));   //生成头结点
   if(!L) return ERROR;
   
L->next=L;
   return OK;
} //InitList

Status DestroyList(LinkList &L)
{ LinkList p,q;
  p=L->next;
  while(p!=L)
  {q=p->next;
   free(p);
   p=q;
  }
  free(L);
  return OK;
}

int ListEmpty(LinkList L)
{ if (L->next==L) return TRUE;
  else return FALSE;
}

Status GetElem(LinkList L, int i, ElemType &e)
{ //L为带头结点的循环单链表的头指针.
  //当第i个元素存在时,其值赋给e并返回OK,否则返回ERROR
 LinkList p; int j;
 p =L->next;
 j= 1;      //初始化,p指向第一个结点,j为计数器
 while (j!=i&&p!=L)
  {                   //顺指针向后查找,直到p指向第i个元素
    p = p->next ;   ++j;
  }
 if (p==L||j>i)  return ERROR ;          //第i个元素不存在
 e =p->data;                                               //取第i个元素
 return OK;
} //GetElem

Status ListInsert(LinkList &L, int i, ElemType e)
{//在带头结点的循环链表L中第i个位置之前插入元素e
 LinkList p,s; int j;
 p = L; j = 0;
 while ( (p->next!=L)&&(j!=i-1))
      { p = p->next; ++j; }                     //寻找第i-1个结点
 if  (  j>i-1||j<i-1)  return ERROR; //i 小于1或者大于表长
 s = (LinkList )malloc(sizeof(LNode));   //生成新结点
 if(!s) return ERROR;
 s->data = e; 
 s->next = p->next;                 //插入L中
 p->next=s;
 return OK;
}

Status ListDelete(LinkList &L, int i,  ElemType &e)
{ // 在带头结点的循环单链线性表L中,删除第i个元素,并由e返回其值
 int j;
 LinkList p,q;
 p = L;  j =0;
 while( (p->next!=L)&&(j!=i-1))
  { p = p->next; ++j; }      //寻找第i个元素,并令p指向其前驱
 if (j<i-1||j>i-1)  return ERROR;   //删除位置不合理
 q = p->next;
 p->next = q->next;             //删除并释放结点
 e = q->data;
 free(q);
 return OK;
}
```

## 栈（Stack）

先进后出，后进先出是栈

### 定义

栈（Stack）：是操作受限的只允许在一端进行插入或删除的线性表。

栈顶（Top）：线性表允许进行插入删除的那一端。

栈底（Bottom）：固定的，不允许进行插入和删除的另一端。

空栈：不含任何元素的空表。

### 栈的顺序储存结构

#### 栈的顺序储存

采用顺序存储的栈称为顺序栈，它利用一组地址连续的存储单元存放自栈底（base）到栈顶的数据元素，同时附设一个指针（top）指示当前栈顶元素的下一个位置。

若存储栈的长度为stacksize，则栈顶位置top必须小于stacksize。当栈存在一个元素时，下标为0所以top等于0，因此通常把空栈的判断条件定位top等于-1。（本文代码将top==base作为判定条件）

```c++
#define STACK_INIT_SIZE   100       //存储空间初始分配
#define STACKINCREMENT  10       //存储空间分配增量
typedef int Status;
typedef struct
{SElemType *base;//开空间的base
 SElemType *top; //栈顶指针
 int stacksize;
}SqStack;

```
#### 栈的操作及代码
1. 初始化
```c++
Status InitStack(SqStack &s)
{s.base=(SElemType *)malloc(STACK_INIT_SIZE*sizeof(SElemType));
 if (!s.base) exit(OVERFLOW);            //存储分配失败
 s.top=s.base;
 s.stacksize = STACK_INIT_SIZE;
 return OK;
}
```
2. 获得栈顶元素
```c++
Status GetTop(SqStack s, SElemType &e)
{ if(s.top == s.base) return ERROR;
  e=*(s.top - 1);
  return OK;
}

```
3. push元素
```c++
Status Push(SqStack &s,SElemType e)
{//插入元素e为新的栈顶元素
  if(s.top-s.base>=s.stacksize)
  {//栈满,追加存储空间
   s.base = (SElemType*)realloc(s.base, (s.stacksize+STACKINCREMENT)*sizeof(SElemType));
   if(!s.base)exit(OVERFLOW);           //存储分配失败
   s.top = s.base + s.stacksize;
   s.stacksize +=STACKINCREMENT;
  }
  *s.top++ = e;
  return OK;
}
```
4. 弹出元素pop
```c++
Status Pop(SqStack &s,SElemType &e)
{ if(s.top == s.base) return ERROR;
  e=*(--s.top);
  return OK;
}
```
5. 判空
```c++
Status StackEmpty(SqStack s)
{ if(s.top==s.base) return OK;
  else return ERROR;
}

```
### 栈的链式储存结构

链栈，顾名思义：采用链式存储结构实现的栈称为链栈。

#### 栈的链式储存

链栈通常采用单链表来实现，因此其结构与单链表的结构相同。
#### 操作

由于栈的插入和删除操作仅限制在栈顶位置进行，所以采用单链表的头指针作为栈顶指针。

同时，为了操作方便，使用带头节点的单链表来实现链表。数据入栈或出栈时，使表头节点的指针指向新的表首节点即可，再入栈时，需要为新的数据元素动态的开辟存储单元，并修改头结点的指针域；而在出栈时，除了改变头结点的指针域，还要释放原栈顶元素所占用的空间。

其余的操作思路和顺序栈一致，代码和链表一致

#### 代码

非书上代码仅供参考，From [CSDN:九芒星#](https://blog.csdn.net/weixin_48701521/article/details/107687403)

```c++
#include <stdio.h>
#include <stdlib.h>
typedef int elemtype;
typedef struct LinkedStackNode 
{	
	elemtype data;
	struct LinkedStackNode * next;
} LinkedStackNode, * LinkedStack;                                  
  LinkedStack top;

//初始化
LinkedStack Init_LinkedStack()                                       
{	
	LinkedStack top=(LinkedStackNode * )malloc (sizeof( LinkedStackNode));
	if(top!=NULL)//申请空间成功
	top->next=NULL;//设置栈顶指针为空
	return top;
}

//判栈空
int LinkedStack_Empty(LinkedStack top)                            
{	
	if(top->next==NULL)//检查栈顶指针的值 
	{
		return 1;//栈S为空，函数返回1
	}	
	else
	{
		return 0;
	}
}

//入栈
int Push_LinkedStack(LinkedStack top,elemtype x)                     
	//插入数据元素x为新的栈顶元素
{	
	LinkedStackNode * node;
	node=(LinkedStackNode * )malloc(sizeof(LinkedStackNode));
	if(node==NULL)
	{
		return 0;//申请结点空间失败,插入失败，函数返回0
	}
	else
	{
		node->data=x;//设置新结点的数据域
		node->next=top->next;//设置新结点的指针城
		top->next=node;//设置头结点指针城指向新的栈顶元素
		return 1;//插入成功，函数返回1
	}
}

//求栈长
int Length_LinkedStack(LinkedStack top)                                       
{
	int count = 0;
	while(top->next!=NULL) 
	{
		++count;
		top=top->next;
	}
	return count;
}

//出栈
int Pop_LinkedStack(LinkedStack top, elemtype *x)                    
{	LinkedStackNode * node;
	if(top->next==NULL)
	{
		return 0;
	}
	else
	{
		node=top->next;//将原栈顶数据元素弹出并赋给node
		*x=node->data;//将原栈顶数据元素的数据赋值给x
		top->next=node->next;//top指向链栈中的下一个数据元素
		free (node);//释放原栈顶数据元素所占的空间
		return 1;
	}
}  

//取栈顶元素
int GetTop_LinkedStack(LinkedStack top)                
{ 
	if(top->next)
      {
            return top->next->data;

      }
      return -1;
}

//主函数
void main()
{
	int i,t,x,a[20];
	LinkedStack top=Init_LinkedStack();//初始化栈
	x=LinkedStack_Empty(top);//判栈空结果赋值给X
	if(x=0)
	{
		printf("栈为空\n");
	}

	printf("请依次输入5个数,开始入栈：\n");
	for(i=0;i<5;i++) 
	{
		scanf("%d",&a[i]);
		Push_LinkedStack(top,a[i]);
		x=GetTop_LinkedStack(top);
		if(x!=-1)
		{
			printf("当前栈顶元素为%d\n",x);
		}
	}
	printf("入栈结束\n");
	printf("栈长为%d\n",Length_LinkedStack(top));
	printf("开始出栈:\n");
	for (i=0;i<5;i++)
	{
		Pop_LinkedStack(top,&t);
        printf("%d",t);
	}
	printf("\n");
	printf("出栈后栈长为%d\n",Length_LinkedStack(top));
}

```

### 笔试题做题技巧
（做题时牢记后进先出的特性）
1. 判断出栈合法问题

入栈是降序排列：任意数A的后面比A大的数都是按照升序排列的

入栈是升序排列：任意数A的后面比A小的数都是按照降序排列的

### 栈的应用
1. 递归栈


2. 用栈深度优先搜索走迷宫

    用栈存储路径，遇到死路弹出该路径点，然后取栈顶路径点并走没走过的路。

3. 中后缀表达式的计算

    中缀表达式：就是我们平时用的标准四则运算表达式，运算符在操作数中间，例如：$9+（3-1）*3+10/2$

    后缀表达式：也称为逆波兰表达式，是将运算符写在操作数之后的表达式，例如上式的后缀表达式为：$9 3 1 - 3 * + 10 2 / +$
  
    1)**中后缀转换**的思路：从左到右遍历中缀表达式的每个数字和符号，若是数字就输出，即成为后缀表达式的一部分；若是符号，则判断其与栈顶符号的优先级，是右括号或优先级低于栈顶符号（乘除优先加减）则栈顶元素依次出栈并输出，并将当前符号进栈，一直到最终输出后缀表达式为止。
    
    具体可以互联网搜索 也可以看[中后缀表达式转换及后缀表达式计算 From：CSDN](https://blog.csdn.net/Amentos/article/details/127182926)

    2)**后缀表达式**计算思路：从左到右遍历后缀表达式的每个数字和符号，遇到数字就进栈，遇到是符号，就将处于栈顶两个数字出栈，进行运算，运算结果进栈，一直到最终获得结果。（具体步骤可以互联网搜索）

4. 符号配对（如括号 冒号之类）

   思路：遍历整个字符串过程中，遇到左符号时用栈存储，遇到右符号就和栈顶元素匹配，成功则出栈，若遍历结束后栈为空则符号配对，否则配对失败。

## 队列（Queue）

本部分参考[CSDN: Jacky_Feng博客](https://blog.csdn.net/Jacky_Feng/article/details/108595654)

队列也是操作受限的线性表，其先进先出。
### 定义
队列：先进先出

队头：允许删除的，元素出队的一端

队尾：允许插入的，元素入队的一端
### 队列的顺序储存
#### 定义
用一组地址连续的存储单元，依次存放从队头到队尾的数据元素，称为顺序队列。

需要附设两个指针：队头指针（front）和队尾指针（rear），分别指向队头元素和队尾元素。
#### 操作

1. 入队
 元素加入的同时队尾指针自增
2. 出队
  取队头元素并队头指针自增

以下是一个操作示意
  ![示意](https://img-blog.csdnimg.cn/20200915114223135.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0phY2t5X0Zlbmc=,size_16,color_FFFFFF,t_70)

3. “假溢出”问题

    如果在插入E的基础上再插入元素F，将会插入失败。因为rear==MAXSIZE，尾指针已经达到队列的最大长度。但实际上队列存储空间并未全部被占满，这种现象叫做“假溢出”

**为了克服这个问题一般写顺序的循环队列**
### 循环队列
#### 定义

将队列的头尾相接的顺序存储结构称为循环队列。

示意图：
![text](/images/ds/image.png)

问题：当循环对列为空或满时，都是队尾指针等于队头指针，即rear==front 。当rear==front时，该是判满还是判空呢？

解决方案(请根据题目给出的方案选择代码)：

方案一：设置一个计数器，开始时计数器设为0，新元素入队时，计数器加1，元素出队，计数器减1。当计数器==MAXSIZE时，队满；计数器==0时，队空。

方案二：保留一个元素空间，当队尾指针指的空闲单元的后继单元是队头元素所在单元时，队满。

队满的条件为（Q.rear+1）%MAXSIZE==Q.front；

队空的条件为Q.rear==Q.front
#### 操作
1. 入队的改变处
```c++
  q.base[q.rear]=e;
  q.rear=(q.rear+1)% MAXQSIZE;
```
2. 出队的改变处
```c++
  e=q.base[q.front];
  q.front=(q.front+1)% MAXQSIZE;
```
#### 代码实现

```c++
//–––––循环队列──队列的顺序存储结构–––––
#define MAXQSIZE   100      //最大队列长度
typedef  struct
{QElemType * base;   //初始化的动态分配存储空间
 int front;  //头指针,若队列不空,指向队列头元素
 int rear;   //尾指针,若队列不空,指向队列尾元素的下一个位置
}SqQueue;
Status InitQueue(SqQueue &Q)
{//  构造一个空队列Q
  Q.base = (QElemType *)malloc(MAXQSIZE * sizeof(QElemType));
  if (!Q.base)  exit(OVERFLOW);  //存储分配失败
  Q.front = 0;
  Q.rear = 0;
  return OK;
}
int QueueLength(SqQueue Q)
{//返回Q的元素个数,即队列的长度
  return (Q.rear - Q.front + MAXQSIZE) % MAXQSIZE;
}
Status EnQueue(SqQueue &Q,QElemType e)
{// 插入元素e为Q的新的队尾元素
   if( (Q.rear + 1) % MAXQSIZE == Q.front )   //队列满
        return ERROR;                                      
   Q.base[Q.rear]=e;
  Q.rear = (Q.rear + 1) % MAXQSIZE;
   return OK;
}
Status DeQueue(SqQueue &Q, QElemType &e)
{// 删除队头元素，送给变量e
  if( Q.base[Q.front] ) return ERROR;   //队列空
  e= Q.front;
  (Q.front + 1) % MAXQSIZE;
  return OK;
}
Status QueueEmpty(SqQueue Q)
{ if( Q.front == Q.rear ) return TRUE;
  return FALSE;
}
```
### 队列的链式储存
基本上和链栈的方式一样不做过多阐述直接上代码
#### 代码实现
```c++
typedef  int  Status;
typedef char QElemType;

//–––––队列的链式存储结构–––––
typedef  struct QNode
{QElemType     data;
 struct QNode   *next;
}QNode, *QueuePtr;

typedef struct
{  
  QueuePtr front;      //队头指针   
  QueuePtr rear;        //队尾指针
}LinkQueue;

Status InitQueue(LinkQueue &Q)
{// 构造一个空队列Q
 Q.front = Q.rear =(QueuePtr)malloc(sizeof(QNode));
 if(!Q.front) exit(OVERFLOW);     //存储分配失败
 Q.front->next=NULL;
 return OK;
}

Status DestroyQueue(LinkQueue &Q)
{// 销毁队列Q
while(Q.front)
 { Q.rear = Q.front->next;  
free(Q.front);
   Q.front = Q.rear;
 }
return OK;
}

int QueueLength(LinkQueue Q)
{//返回Q的元素个数,即队列的长度
  QueuePtr p;
  int len=0;
  p=Q.front->next;
  while(p != Q.rear)
  {
      len++;
    p=p->next;
  }
  return len;
}
Status EnQueue(LinkQueue &Q, QElemType e)
{// 插入元素e为Q的新的队尾元素
  QueuePtr p;
  p = (QueuePtr)malloc(sizeof(QNode));
  if(!p)  exit(OVERFLOW);        //存储分配失败
  p->data = e;   p->next = NULL;
  Q.rear->next=p;  
    Q.rear =p;
  return OK;
}

Status DeQueue(LinkQueue &Q, QElemType &e)
{//若队列不空,则删除Q的队头元素,用e返回其值,
//并返回OK;  否则返回ERROR
  QueuePtr p;
  if( Q.front==Q.rear) return ERROR;
  p = Q.front->next; 
    e = p->data;
  
Q.front->next=p->next;
  if(Q.rear==p)Q.rear = Q.front;
  free(p);
  return OK;
}

Status QueueEmpty(LinkQueue Q)
{ if(Q.front==Q.rear) return TRUE;
  return FALSE;
}
```

## 字符串（String）
课内只讲述了定义和类型实现,

请阅读此篇博客来解决问题（注：空格串即空白串）
[数据结构：串(String)【详解】](https://blog.csdn.net/Real_Fool_/article/details/113877781)

## 数组和广义表（Array and Table）


此内容个人认为ppt讲述较为完善，请查看课内ppt附件。

数据的学习目标大概为:
1. 会计算按行、按列、按页优先顺序存放的数组元素a[i][j][k]的存储地址。解决ppt习题。
2. 特殊矩阵的定义，其压缩存储办法和储存地址的计算方法。解决ppt后习题。
3. 广义表的定义和画图表示

## 树（Tree）
施工中

![数据结构：树(Tree)【详解】 From CSDN ](https://blog.csdn.net/Real_Fool_/article/details/113930623)

### 基本定义及术语
1. 定义
树是n（n>=0）个结点的有限集。

当n = 0时，称为空树。在任意一棵非空树中应满足：有且仅有一个特定的称为根的结点。

当n>1时，其余节点可分为m（m>0）个互不相交的有限集T1,T2,…,Tm，其中每个集合本身又是一棵树，并且称为根的子树。

显然，树的定义是递归的，即在树的定义中又用到了自身，树是一种递归的数据结构。树作为一种逻辑结构，同时也是一种分层结构，具有以下两个特点：

树的根结点没有前驱，除根结点外的所有结点有且只有一个前驱。树中所有结点可以有零个或多个后继。

因此n个结点的树中有n-1条边。
2. 术语

结合实例理解树的术语 

### 二叉树

### 遍历二叉树和线索二叉树

pta答案补充

```cpp

//非递归中序遍历算法。

Status InOrderTraverse(BiTree T,Status(*Visit)(BiTree e))
{ //采用二叉链表存储结构
   //中序历遍二叉树T的非递归算法，对每个数据元素调用函数Visit。
 SqStack S;
 BiTree p;
 InitStack(S);
 p=T;
 while(p || !StackEmpty(S) )
 {  if(p)
       {Push(S,p);p=p->lchild; }   //根指针进栈, 历遍左子树
    else
        { Pop(S,p);   //根指针退栈，访问结点，历遍右子树
          (*Visit)(p);
         p=p->rchild;
        }//else
 }
 return OK;
}
```
### 树和森林

### 赫夫曼树及应用（编码）



## 图（Graph）

施工中

![数据结构 图（Group【详解】 From CSDN](https://blog.csdn.net/Real_Fool_/article/details/114141377)
### 图的定义及术语

### 存储结构
#### 邻接表和邻接矩阵

```cpp
//无向图采用邻接矩阵结构存储，本题要求实现无向图的基本操作，请填空。
#include <stdio.h>
#include <string.h>

// 图的数组(邻接矩阵)存储表示
#define MAX_VERTEX_NUM 20 // 最大顶点个数
enum GraphKind{DG,DN,AG,AN}; // {有向图,有向网,无向图,无向网}

typedef char VertexType[6];

// 顶点关系类型。对无权图，用1(是)或0(否)表示相邻否； 对带权图，则为权值类型
typedef int ArcCell,AdjMatrix[MAX_VERTEX_NUM][MAX_VERTEX_NUM];

struct MGraph
{
  VertexType vexs[MAX_VERTEX_NUM]; // 顶点向量
  AdjMatrix arcs; // 邻接矩阵
  int vexnum,arcnum; // 图的当前顶点数和弧数
  GraphKind kind; // 图的种类标志
};

// 图的数组(邻接矩阵)存储基本操作
int LocateVex(MGraph G,VertexType u)
{ // 初始条件:图G存在,u和G中顶点有相同特征
  // 操作结果:若G中存在顶点u,则返回该顶点在图中位置;否则返回-1
  int i;
  for(i=0;i<G.vexnum;++i)
    if(strcmp(G.vexs[i], u) == 0)
      return i;
  return -1;
}

Status CreateAG(MGraph &G)
{ // 采用数组(邻接矩阵)表示法,由文件构造没有相关信息的无向图G
  int i,j,k;
  VertexType va,vb;
  printf("请输入无向图G的顶点数,边数:");
  scanf("%d",&G.vexnum);
  scanf("%d",&G.arcnum);
  printf("\n请输入%d个顶点的值:\n",G.vexnum);
  for(i=0;i<G.vexnum;++i) // 构造顶点向量
    scanf(" %s", G.vexs[i]);
  for(i=0;i<G.vexnum;++i) // 初始化邻接矩阵
    for(j=0;j<G.vexnum;++j)
      G.arcs[i][j]=0;
  printf("请输入%d条边的顶点1 顶点2:\n",G.arcnum);
  for(k=0;k<G.arcnum;++k)
  {
    scanf(" %s%s",va,vb);
    i=LocateVex(G, va);
    j=LocateVex(G, vb);
    G.arcs[i][j]=G.arcs[j][i]=1; // 无向图
  }
  G.kind=AG;
  return OK;
}

void DestroyGraph(MGraph &G)
 { // 初始条件: 图G存在。操作结果: 销毁无向图G
   G.vexnum=0;
   G.arcnum=0;
 }

Status PutVex(MGraph &G,VertexType v,VertexType value)
{ // 初始条件: 图G存在，v是G中某个顶点。操作结果: 对v赋新值value
  int k;
  k=_LocateVex(G, v); // k为顶点v在图G中的序号
  if(k<0)
    return ERROR;
  strcpy(G.vexs[k], value);
  return OK;
}

int FirstAdjVex(MGraph G,VertexType v)
{ // 初始条件: 图G存在,v是G中某个顶点
  // 操作结果: 返回v的第一个邻接顶点的序号。若顶点在G中没有邻接顶点,则返回-1
  int i,j=0,k;
  k=LocateVex(G, v); // k为顶点v在图G中的序号
  for(i=0;i<G.vexnum;i++)
    if(G.arcs[i][k] == 1)   //无向图
      return i;
  return -1;
}

int NextAdjVex(MGraph G,VertexType v,VertexType w)
{ // 初始条件: 图G存在,v是G中某个顶点,w是v的邻接顶点
  // 操作结果: 返回v的(相对于w的)下一个邻接顶点的序号,
  //           若w是v的最后一个邻接顶点,则返回-1
  int i,j=0,k1,k2;
  k1=LocateVex(G, v); // k1为顶点v在图G中的序号
  k2=LocateVex(G, w); // k2为顶点w在图G中的序号
  for(i=k2+1;i<G.vexnum;i++)
    if(G.arcs[i][k1] == 1)
      return i;
  return -1;
}

void InsertVex(MGraph &G,VertexType v)
{ // 初始条件: 图G存在,v和图G中顶点有相同特征
  // 操作结果: 在图G中增添新顶点v(不增添与顶点相关的弧,留待InsertArc()去做)
  int i;
  strcpy(G.vexs[G.vexnum],v); // 构造新顶点向量
  for(i=0;i<=G.vexnum;i++)
  {
    G.arcs[G.vexnum][i]=0; // 初始化该行邻接矩阵的值(无边或弧)
    G.arcs[i][G.vexnum]=0; // 初始化该列邻接矩阵的值(无边或弧)
  }
G.vexnum++; // 图G的顶点数加1
}

Status DeleteVex(MGraph &G,VertexType v)
{ // 初始条件: 图G存在,v是G中某个顶点。操作结果: 删除G中顶点v及其相关的弧
  int i,j,k;
  k=LocateVex(G,v); // k为待删除顶点v的序号
  if(k<0) // v不是图G的顶点
    return ERROR;
  for(j=0;j<G.vexnum;j++)
    if(G.arcs[j][k]!=0) // 有边
      G.arcnum--; // 修改边数
  for(j=k+1;j<G.vexnum;j++) // 序号k后面的顶点向量依次前移
    strcpy(G.vexs[j-1], G.vexs[j]);
  for(i=0;i<G.vexnum;i++)
    for(j=k+1;j<G.vexnum;j++)
      G.arcs[i][j-1]=G.arcs[i][j]; // 移动待删除顶点之后的矩阵元素
  for(i=0;i<G.vexnum;i++)
    for(j=k+1;j<G.vexnum;j++)
      G.arcs[j-1][i]=G.arcs[j][i]; // 移动待删除顶点之下的矩阵元素
  G.vexnum--; // 更新图的顶点数
  return OK;
}

Status InsertArc(MGraph &G,VertexType v,VertexType w)
{ // 初始条件: 图G存在,v和W是G中两个顶点
  // 操作结果: 在G中增添弧<v,w>,若G是无向的,则还增添对称弧<w,v>
  int i,l,v1,w1;
  v1=LocateVex(G, v); // 尾
  w1=LocateVex(G, w); // 头
  if(v1<0||w1<0)
    return ERROR;
  G.arcnum++; // 弧或边数加1
  G.arcs[v1][w1] = G.arcs[w1][v1] = 1;
  return OK;
}

Status DeleteArc(MGraph &G,VertexType v,VertexType w)
{ // 初始条件: 图G存在,v和w是G中两个顶点
  // 操作结果: 在G中删除弧<v,w>,若G是无向的,则还删除对称弧<w,v>
  int v1,w1;
  v1=LocateVex(G, v); // 尾
  w1=LocateVex(G, w); // 头
  if(v1<0||w1<0) // v1、w1的值不合法
    return ERROR;
  G.arcs[v1][w1] = G.arcs[w1][v1]=0;
  G.arcnum--;    //修改边数
  return OK;
}
void Display(MGraph G)
{ // 输出无向图G
  int i,j;
  printf("%d个顶点%d条边的无向图\n",G.vexnum,G.arcnum);
  for(i=0;i<G.vexnum;++i) // 输出G.vexs
    printf("G.vexs[%d]=%s\n",i,G.vexs[i]);
  printf("G.arcs:\n"); // 输出G.arcs.adj
  for(i=0;i<G.vexnum;i++)
  {
    for(j=0;j<G.vexnum;j++)
      printf("%2d",G.arcs[i][j]);
    printf("\n");
  }
}

int main()
{
  int i,j,k,n;
  VertexType v1,v2;
  MGraph g;
  CreateAG(g);
  Display(g);
  printf("修改顶点的值，请输入原值 新值: \n");
  scanf("%s%s",v1,v2);
  PutVex(g,v1,v2);
  printf("删除一条边或弧，请输入待删除边或弧的弧尾 弧头：\n");
  scanf("%s%s",v1,v2);
  DeleteArc(g,v1,v2);
  Display(g);
  printf("插入新顶点，请输入顶点的值: ");
  scanf("%s",v1);
  InsertVex(g,v1);
  printf("\n插入与新顶点有关的边，请输入边数: ");
  scanf("%d",&n);
  for(k=0;k<n;k++)
    {
      printf("\n请输入另一顶点的值: ");
      scanf("%s",v2);
      InsertArc(g,v1,v2);
    }
  printf("\n");
  Display(g);
  printf("删除顶点及相关边，请输入顶点的值: ");
  scanf("%s",v1);
  printf("\n");
  DeleteVex(g,v1);
  Display(g);
  DestroyGraph(g);
  return 0;
}
```

```c++
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define ERROR 0
#define OK 1
typedef  int  Status;

 #define MAX_VERTEX_NUM 30 // 最大顶点个数
 enum GraphKind{DG,DN,AG,AN}; // {有向图,有向网,无向图,无向网}

 //图的邻接表存储表示
 typedef char VertexType[6];
 struct ArcNode
 {
   int adjvex; // 该弧所指向的顶点的位置
   ArcNode *nextarc; // 指向下一条弧的指针
   int info; // 网的权值
 }; // 表结点
 typedef struct
 {
   VertexType data; // 顶点信息
   ArcNode *firstarc; // 第一个表结点的地址,指向第一条依附该顶点的弧的指针
 }VNode,AdjList[MAX_VERTEX_NUM]; // 头结点
 struct ALGraph
 {
   AdjList vertices;
   int vexnum,arcnum; // 图的当前顶点数和弧数
   int kind; // 图的种类标志
 };

 int LocateVex(ALGraph G,VertexType u)
 { // 初始条件: 图G存在,u和G中顶点有相同特征
   // 操作结果: 若G中存在顶点u,则返回该顶点在图中位置;否则返回-1
   int i;
   for(i=0;i<G.vexnum;++i)
     if(strcmp(G.vertices[i].data, u) == 0)
       return i;
   return -1;
 }

 Status CreateGraph(ALGraph &G)
 { //采用头插法,构造有向网
   int i,j,k;
   int w; // 权值
   VertexType va,vb;
   ArcNode *p;
   G.kind=DN;
   printf("请输入图的顶点数,弧数: ");
   scanf("%d,%d",&G.vexnum, &G.arcnum);
   printf("\n请输入%d个顶点的值:\n",G.vexnum);
   for(i=0;i<G.vexnum;++i) // 构造顶点向量
   {
     scanf("%s",G.vertices[i].data);
     G.vertices[i].firstarc=0;
   }
   printf("请依次输入每条弧弧尾和弧头、权值(以空格作为间隔):\n");
   for(k=0;k<G.arcnum;++k) // 构造表结点链表
   {
     scanf("%s%s%d",va,vb,&w);
     i=LocateVex(G, va); // 弧尾
     j=LocateVex(G, vb); // 弧头
     p=(ArcNode*)malloc(sizeof(ArcNode));
     p->adjvex=j;
     p->info=w;
     p->nextarc=G.vertices[i].firstarc; // 插在表头
     G.vertices[i].firstarc=p;
   }
   return OK;
 }

 void DestroyGraph(ALGraph &G)
 { // 初始条件: 图G存在。操作结果: 销毁图G
   int i;
   ArcNode *p,*q;
   for(i=0;i<G.vexnum;++i)
   {
     p=G.vertices[i].firstarc;
     while(p)
     {
       q=p->nextarc;
       free(p);
       p=q;
     }
   }
     G.vexnum=0;
   G.arcnum=0;
 }

  Status PutVex(ALGraph &G,VertexType v,VertexType value)
 { // 初始条件: 图G存在,v是G中某个顶点
   // 操作结果: 对v赋新值value
   int i;
   i=LocateVex(G, v);
   if(i>-1) // v是G的顶点
   {
      strcpy(G.vertices[i].data, value);
     return OK;
   }
   return ERROR;
 }

 int FirstAdjVex(ALGraph G,VertexType v)
 { // 初始条件: 图G存在,v是G中某个顶点
   // 操作结果: 返回v的第一个邻接顶点的序号。若顶点在G中没有邻接顶点,则返回-1
   ArcNode *p;
   int v1;
   v1=LocateVex(G, v); // v1为顶点v在图G中的序号
   p=G.vertices[v1].firstarc;
   if(p)
     return ____16____;
   else
     return -1;
 }

 int NextAdjVex(ALGraph G,VertexType v,VertexType w)
 { // 初始条件: 图G存在,v是G中某个顶点,w是v的邻接顶点
   // 操作结果: 返回v的(相对于w的)下一个邻接顶点的序号。
   //           若w是v的最后一个邻接点,则返回-1
   ArcNode *p;
   int v1,w1;
   v1=____17____; // v1为顶点v在图G中的序号
   w1=____18____; // w1为顶点w在图G中的序号
   p=G.vertices[v1].firstarc;
   while(____19____) // 指针p不空且所指表结点不是w
     p=p->nextarc;
   if(!p||!p->nextarc) // 没找到w或w是最后一个邻接点
     return -1;
   else
     return ____20____; // 返回v的(相对于w的)下一个邻接顶点的序号
 }

 void InsertVex(ALGraph &G,VertexType v)
 { // 初始条件: 图G存在,v和图中顶点有相同特征
   // 操作结果: 在图G中增添新顶点v(不增添与顶点相关的弧,留待InsertArc()去做)
   strcpy(G.vertices[G.vexnum].data,v); // 构造新顶点向量
   ____21____;
   ____22____; // 图G的顶点数加1
 }

 Status DeleteVex(ALGraph &G,VertexType v)
 { // 初始条件: 图G存在,v是G中某个顶点
   // 操作结果: 删除G中顶点v及其相关的弧
   int i,j;
   ArcNode *p,*q;
   j=____23____; // j是顶点v的序号
   if(j<0) // v不是图G的顶点
     return ERROR;
   p=____24____; // 删除以v为出度的弧
   while(p)
   {
     ____25____;
     p=p->nextarc;
     free(q);
     ____26____; // 弧或边数减1
   }
   ____27____; // 顶点数减1
   for(____28____;i<G.vexnum;i++) // 顶点v后面的顶点前移
     G.vertices[i]=G.vertices[i+1];
   for(i=0;i<G.vexnum;i++) // 删除以v为入度的弧且必要时修改表结点的顶点位置值
   {
     p=G.vertices[i].firstarc; // 指向第1条弧
     while(p) // 有弧
     {
       if(p->adjvex==j)
       {
         if(p==G.vertices[i].firstarc) // 待删结点是第1个结点
         {
           ____29____;
           free(p);
           p=____30____;
           G.arcnum--; // 弧数减1
         }
         else
         {
          ____31____;
           free(p);
           p=____32____;
           G.arcnum--; // 弧减1
         }
       }
       else
       {
         if(____33____)
           p->adjvex--; // 修改表结点的顶点位置值(序号)
         q=p;
         p=p->nextarc;
       }
     }
   }
   return OK;
 }

 Status InsertArc(ALGraph &G,VertexType v,VertexType w)
 { // 初始条件: 图G存在,v和w是G中两个顶点
   // 操作结果: 在G中增添弧<v,w>
   ArcNode *p;
   int w1,i,j;
   i=____34____; // 弧尾的序号
   j=____35____; // 弧头的序号
   if(i<0||j<0)
     return ERROR;
   G.arcnum++; // 图G的弧或边的数目加1
   printf("\n请输入弧%s→%s的权值: ",v,w);
   scanf("%d",&w1);
   p=(ArcNode*)malloc(sizeof(ArcNode));
   p->adjvex=____36____;
   p->info=____37____;
   p->nextarc=____38____; // 插在表头
   G.vertices[i].firstarc=____39____;
   return OK;
 }

 Status DeleteArc(ALGraph &G,VertexType v,VertexType w)
 { // 初始条件: 图G存在,v和w是G中两个顶点
   // 操作结果: 在G中删除弧<v,w>
   ArcNode *p,*q;
   int i,j;
   i=____40____; // i是顶点v(弧尾)的序号
   j=____41____; // j是顶点w(弧头)的序号
   if(i<0||j<0||i==j)
     return ERROR;
   p=G.vertices[i].firstarc; // p指向顶点v的第一条出弧
   while(____42____) // p不空且所指之弧不是待删除弧<v,w>
   { // p指向下一条弧
     q=p;
     p=p->nextarc;
   }
   if(____43____) // 找到弧<v,w>
   {
     if(p==G.vertices[i].firstarc) // p所指是第1条弧
       ____44____; // 指向下一条弧
     else
       ____45____; // 指向下一条弧
     free(p); // 释放此结点
     G.arcnum--; // 弧或边数减1
   }
   return OK;
 }

void Display(ALGraph G)
 { // 输出图的邻接矩阵G
   int i;
   ArcNode *p;
   printf("%d个顶点：\n",G.vexnum);
   for(i=0;i<G.vexnum;++i)
     printf("%s ",G.vertices[i].data);
   printf("\n%d条弧:\n",G.arcnum);
   for(i=0;i<G.vexnum;i++)
   {
     p=G.vertices[i].firstarc;
     while(p)
     {
        printf("%s→%s ",G.vertices[i].data,G.vertices[p->adjvex].data);
        printf(":%d ",p->info);
        p=p->nextarc;
        printf("\n");
     }
   }
 }

int main()
 {
   int i,j,k,n;
   ALGraph g;
   VertexType v1,v2;
   CreateGraph(g);
   Display(g);
   printf("删除一条弧，请输入待删除弧的弧尾 弧头：");
   scanf(" %s%s",v1,v2);
   DeleteArc(g,v1,v2);
   printf("\n修改顶点的值，请输入原值 新值: ");
   scanf(" %s%s",v1,v2);
   PutVex(g,v1,v2);
   printf("\n插入新顶点，请输入顶点的值: ");
   scanf("%s",v1);
   InsertVex(g,v1);
   printf("\n插入与新顶点有关的弧，请输入弧数: ");
   scanf("%d",&n);
   for(k=0;k<n;k++)
   {
     printf("\n请输入另一顶点的值: ");
     scanf("%s",v2);
     InsertArc(g,v2,v1);
   }
   printf("\n");
   Display(g);
   printf("删除顶点及相关的弧，请输入顶点的值: ");
   scanf("%s",v1);
   DeleteVex(g,v1);
   printf("\n");
   Display(g);
   DestroyGraph(g);
   return 0;
 }
```
### 遍历
#### 深度优先和广度优先

### 联通问题

#### 深度、广度生成树、森林（不联通）

#### 最小生成树

##### prim

##### kruskal

###  有向无环图及其应用（拓扑排列、关键路径）


### 最短路径问题

#### 单源最短路

#### 多源最短路


## 查找（Search）
重点：求查找成功和失败的ASL（平均查找长度）
### 有序表的查找

#### 哨兵遍历

#### 折半二分查找

### 二叉排序树和平衡二叉树

### B-tree和B+树

### 哈希表


## 内部排序（Sort）

### 插入排序

#### 插入排序

#### 希尔排序

### 交换排序

#### 冒泡排序

#### 快速排序

### 归并排序

### 选择排序

#### 选择排序

####  堆排序

### 桶（基数）排序



# 可能出简答题的比较难的知识点

## 二叉树和树转换

把所有的兄弟节点连虚线，保留第一个连线，把其他的连线去掉，转换。

## B-tree的构建

## 哈夫曼树及哈夫曼编码

## 拓扑排序

## 关键路径

## dijisktra

## prim

## kruskal

## 哈希表求ASL

## 快排

## 堆排
