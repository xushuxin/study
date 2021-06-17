在leetcode上使用lodash优先队列：

最大堆：

```js
//element：存入堆中的元素
//priorityFn会在内部比较时调用，并用返回值来进行比较（返回值也可以称为优先级）
let priorityFn =(element)=>element.charCodeAt(0);

let h = new MaxPriorityQueue({priority:priorityFn})

h.enqueue('a') //向堆中添加一个元素

h.dequeue();//弹出堆顶元素

h.front().element;//返回堆顶元素

h.front().priority;//返回堆顶元素的优先级

h.isEmpty();//检查堆是否为空

h.size();//获取堆的大小

hs[u.get(i)]._heap._nodes//访问堆中的数据

[
  { _key: 98, _value: 'b' },
  { _key: 100, _value: 'd' }
]//外部访问时获取到的数据格式
```

最小堆：

```js
构造函数为：MinPriorityQueue
其他与最大堆无区别
```





