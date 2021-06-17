##### Object.prototype.toString()的原理

返回类型的是Object实例的 Symbol.toStringTag 属性值（字符串）

例：    

```js
 let obj = {
   0:'a',
   1:'b'
 };
obj[Symbol.toStringTag] = 'ArrayLike';
Object.prototype.toString.call(obj);//"[object ArrayLike]"
```

##### 封装一个检测数据类型的方法（jQuery源码）

jQuery中关于数据类型检测的源码(自己有改动)：

```js
var class2type = {};
var getProto = Object.getPrototypeOf;
var toString  = class2type.toString;//Object.prototype.toString 检测数据类型
var hasOwn = class2type.hasOwnProperty;//Object.prototype.hasOwnProperty
var fnToString = hasOwn.toString;//Function.prototype.toSting 把函数转换字符串（this只能是函数）
var ObjectFunctionString = fnToString.call(Object);//“function Object(){[native code]}”

//循环数据中的每一项（目的：建立数据类型检测的映射表）
//[object Boolean]/[objecy Number]/[object String]都是为了处理基于new创建的基本数据值的引用数据类型值，最后期望返回的值依然是 "boolean"/"number"/"string"
["Boolean","Number","String","Symbol","BigInt","Array","Object",{"GeneratorFunction":"function"},"RegExp","Date","Error"].forEach(function(item){
  //generatorfunction可以处理成 function
  var name = typeof item === "object" ?  Object.keys(item)[0] : item;
  var value = typeof item === "object" ?  Object.values(item)[0] : item;
  class2type["[object " + name + "]"] = value.toLowerCase(); 
});

//检测数据类型的函数
function toType(obj){
  //null/undefined
  if(obj == null){
    return obj + "";
  }

  //如果是函数，也要使用class2type的原因是:低版本浏览器(Chrome 1-12)中typeof正则对象的结果是"function"
  return typeof obj === "object" || typeof obj === "function"?class2type(toString.call(obj)) || "object": typeof obj;
  
}



//检测的是否为一个函数
var isFunction = function isFunction(obj){
  //Chrome <=57, Firefox <=52 `typeof document.createElement('object') === "function"` 
  //低版本浏览器(Chrome 1-12)中typeof正则对象的结果是"function"
  //我们不想把任何DOM节点或者正则对象归类为一个函数
  return typeof obj === "function" && typeof obj.nodeType !== "number" && class2type(toString.call(obj)) !== "regexp" ;
};

//检测是否为window
var isWindow = function isWindow(obj){
  //1.null/undefined无法进行成员访问
  //2.window === window.window,符合这个条件的就是window对象
  return obj != null && obj === obj.window;
}

//检测是否为引用类型值(自己加的)
function isReferenceValue(obj){
  return obj!==null && typeof obj === "object" || typeof obj === "function";
}

//检测是否为数组或者类数组(JQ把字符串也当做类数组了)
function isArrayLike(obj){
  //length可能为false或者具体的数字
  //in操作符用来检测length属性是否存在对象上（ios 8.2真机bug，当对象的属性名为数字时，虽然没有length属性，但是可能到length值,值为最高属性名+1）
  //这里不用hasOwn的原因是：IE上NodeList的length检测的结果是false
  var length = !!obj && "length" in obj && obj.length,
      type=toType(obj);
  
  //函数和window都具备length属性（函数的length是形参的个数，window.length为当前窗口中包含的框架数量）
  if(isFunction(obj)|| isWindow(obj)){
    return false;
  }
  //判断的条件：类型为数组 / length为0 / length为数字并且大于0并且length-1的索引（最大）存在
  return type === 'array' || length === 0 || typeof length==='number'&& length >0 &&( length - 1) in obj;
}

//检测的是否为一个纯粹对象
function isPlainObject(obj){
  var proto，
  		Ctor,
      type = toType(obj);
  //不存在或者检测数据类型的结果不是object，一定不是纯粹的对象
  if(!obj || type !== "object"){
    return false;
  }
  
  //不存在原型的情况：Object.create(null)
  proto = getProto(obj);
  if(!proto) {
    return true;
  }
  
  //获取当前值原型对象上的constructor,结果是false或者对应的构造函数
  Ctor = hasOwn.call(proto,"constructor") && proto.constructor;
  
  //有构造函数并且构造函数一定是内置类Object（排除了自定义类和NodeList等的实例）
  //fnToString.call(Object) === ObjectFunctionString
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

//检测是否为一个空对象（jQuery是用for...in循环，只要进入循环就返回false，这样不太好，会遍历到原型上扩充的方法，如果仅仅原型上有扩充方法，也会不当作空对象；或者有Symbol属性，也会当成空对象）
function isEmptyObject(obj){
  var keys = [
    ...Object.getOwnPropertyNames(obj),//包括不可枚举的属性，Object.keys不包括不可枚举的私有属性
    ...Object.getOwnPropertySymbols(obj)
  ];
  return keys.length === 0;
}

```





