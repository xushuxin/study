#### Symbol

ES6中新加入的原始数据类型（基本数据类型/值类型），代表唯一值

应用：

+ 给对象设置唯一属性：防止同名属性，以及被改写或覆盖
+ 可以用于变量宏管理设置唯一值，消除魔术字符串：代码中多次出现的强耦合的字符串或数值，应避免这种情况而使用含义清晰的变量代替

语法：

+ Symbol函数不能被new

+ Symbol不能与其他类型的值计算

  + 数学计算：不能转为数字，也不可以显示转换
  + 字符串拼接：隐式转换不可以，但是可以显示转换
  + 模板字符串：也是隐式转换，不可以

+ Symbol不参与for...in/of循环

  只能通过Object.getOwnPropertySymbols获取所有Symbol属性

Symbol实例是基本数据类型值，可以通过Object方法转为引用数据类型

##### 内置的Symbol值

ES6提供很多内置的Symbol值，指向语言内部使用的方法

+ Symbol.hasInstance 对象的Symbol.hasInstance属性，指向一个内部方法，当其他对象用instanceof运算符，判断是否为该对象实例时，会调用这个方法
+ Symbol.isConcatSpreadable 值为布尔值，表示该对象用于Array.prototype.concat时，是否可以展开
+ Symbol.iterator  拥有此属性的对象被称为可迭代的对象，可以使用for...of循环
+ Symbol.toPrimitive 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值
+ Symbol.toStringTag  在对象上面调用Object.prototype.toString方法时，如果这个属性值存在，它的返回值会出现在toString方法返回的字符串中，表示对象的类型

##### instanceof 的原理

答：调用Function原型上的Symbol.hasInstance方法（因为所有构造函数都是Function.prototype的实例）

```
var a = {}
console.log(a instanceof Object)
console.log(Object[Symbol.hasInstance](a))
```

##### 如何使用concat合并两个数组，但是不展开数组

答：把数组实例的Symbol.isConcatSpeadable属性设置为false

```js
let arr1=[1,2,3];
let arr2 =[4,5,6];
arr1[Symbol.isConcatSpreadable]=false;
arr2[Symbol.isConcatSpreadable]=false;
console.log(arr1.concat(arr2));
```

##### 如何让普通对象可迭代

答：给普通对象添加Symbol.iterator属性，属性值为数组原型上的Symbol.iterator属性值

```js
let obj ={
  0:1,
  1:2,
  length:2,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for (let item of obj){
  console.log(item);
}
```

##### 如何构造一个类数组

创建一个classl类，设置公有属性Symbol.iterator属性，属性值是generator函数，函数中为每一项元素添加yield表达式

```js
//构造一个类数组
class ArrayLike{
  *[Symbol.iterator](){
    let i= 0;
    while(this[i] !== undefined){
      yield this[i];
      i++;
    }
  }
}
var arrLike = new ArrayLike;
console.log(arrLike)
arrLike[0]=1;
arrLike[1]=2;
for(let item of arrLike){
  console.log(item)
}
```



##### 如何打印出OK

对象数据类型转换为原始值类型的原理：

1. 首先，优先调用对象的Symbol.toPrimitive方法，前提是存在
2. 否则，如果hint是"string" ，则尝试调用对象的toString和valueOf方法
3. 如果hint是"number"或者"default"，则尝试调用对象的valueOf和toString方法

```js
if(a==1&&a==2&&a==3){
	console.log('OK');
}
```

解:

给对象添加Symbol.toPrimitive方法

或者重写对象的toString、valueOf方法

```js
let a={
  n:0,
  // [Symbol.toPrimitive](hint){
  //   return ++a.n;
  // }
  // toString(){
  //   return ++a.n;
  // }
  valueOf(){
    return ++a.n;
  }
};
if(a==1&&a==2&&a==3){
	console.log('OK');
}
```

##### 如何让我们自定义的类的实例具有类型而不是[object Object]

给自定义的类添加一个Symbol.toStringTag getter

```js
class Person{
  get [Symbol.toStringTag](){
    return 'Person'
  }
}
let p1= new Person();
console.log(({}).toString.call(p1));//"[object Person]"
```



#### Generator生成器/Iterator迭代器及实战中的运用

Iterator是ES6引入的一种新的遍历机制

+ 通过Symbol.iterator创建一个迭代器，指向当前数据结构的起始位置

+ 随后通过next方法进行向下迭代指向下一个位置，next方法会返回当前位置的对象，对象包含了value和done两个属性，value是当前属性的值，done用于判断是否遍历结束

+ 当done为true时则遍历结束

迭代器是新的数据结构，具有next方法

创建迭代器的方式

```js
let arr = [1,2,3],
	  it = arr[Symbol.iterator](arr);//创建一个数组的迭代器
```

```js
let str ="123",
		it = str[Symbol.iterator](str);//创建一个字符串的迭代器
```

自己实现一个生成迭代器的方法

```js
function createiterator(items){
  let count=0;
  return {
    next(){
      let done,value;
      if(count>=items.length){
        done = true
      }else{
        done=false
        value = items[count++];
      }
      return {
        done,
        value
      }
    }
  }
}
let arr =[1,2,3];
let it =createiterator(arr);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

利用generator实现async/await原理

面试回答：

首先创建一个generator函数 ，generator函数中通过yield表达式接收每个promise并进行类似于同步的操作，然后通过generator函数执行返回一个生成器对象，首次调用一次生成器的next方法，然后每次promsie resolve之后，递归调用next方法并传递结果作为上一个yield表达式的返回值，递归结束条件是next方法返回值的done属性值为true

```js
//模拟请求接口
function API(data){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(data);
    },1000)
  })
  // return data;
}

function asyncFunc(gen){
  const it = gen();
  const next =(data)=>{
    let {done,value} = it.next(data);//把上次的请求结果传递给上个节点返回值
    if(done) return;
    if(typeof value !=='function') value = Promise.resolve(value);
    value.then(data=>{
      next(data)
    })
  }
  next();//首次没有传递值
}
asyncFunc(function* (){
  let data = yield API(10);
  data = yield API(data+10);
  console.log(data);
})
```

