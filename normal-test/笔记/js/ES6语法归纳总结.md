let、const、解构赋值、扩展运算符、Promise、async/await、Set和Map数据结构、for..of循环（只能遍历具有Iterator接口的数据结构）、Generator函数（async/await的原理可以用Generator函数配合Promise实现）、Class

#### 数组

实例方法：find,includes,flat

静态方法：Array.from	Array.of(将一组数转为数组)

#### 对象

静态方法：

Object.is（与三个等号的区别是①+0和-0不相等②NaN等于NaN）

Object.assign 将一个或多个对象的所有可枚举属性(包含Symbol属性)复制到

Object.keys/Object.values/Object.entries

Object.fromEntries 将一个键值对数组转为对象。

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

