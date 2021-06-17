##### 二分算法

1. 二分查找
+ 二分的是区间范围
+ 在有序数组中查找某个值
+ 是对顺序查找的优化
+ 有两个指针，min和max，min是头指针，max是尾指针，他们标记的是查找区间，中间指针mid = (min+max)/2
+ 单次调整：
    - 如果arr[mid] < x ,min = mid + 1
    - 如果arr[mid] > x, max = mid - 1
    - 如果arr[mid] == x, 找到结果
    终止条件：min > max

+ 每一次调整都会将查找区间的范围缩小为原来的1/2，经过logN次调整后，查找区间只剩1个元素即停止，时间复杂度：logN

+ 我们需要通过若干（logN）次操作，不断的缩小查找区间的范围，以此来找到我们想要的答案

![image-20210604070437942](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210604070437942.png)

![image-20210604070629505](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210604070629505.png)

![image-20210604070904520](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210604070904520.png)


##### 二分查找--泛型情况

![image-20210604130928535](/Users/xushuxin/Library/Application Support/typora-user-images/image-20210604130928535.png)

①01泛型：找到第一个1

②10泛型：找到最后一个1（可转化为01泛型：找到第一个0，然后再往前找一位）

