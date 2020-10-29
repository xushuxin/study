//=>深克隆：克隆后数组的每一级都和原始数组没有关联
// 深克隆的方案
// 方案1:整体变为字符串，再重新变为对象，这样浏览器会重新开辟全套的内存空间存储信息 JSON.stringify/JSON.parse
//   这种办法存在BUG:把对象中的某些属性值变为字符串，会存在问题
//   + 正则/Math对象会变为{}
//   + 日期对象变为日期字符串
//   + Symbol/function/undefined等会消失
//   + 基本类型的包装类型会转为原始值  
//   + BigInt会报错
//   + ...
//   所以这种办法适用于数据中只有 “number/string/boolean/null/普通对象/数组对象” 等内容的时候
// let newArr = JSON.parse(JSON.stringify(arr));
// let newObj = JSON.parse(JSON.stringify(obj));
// console.log(obj, newObj);
/**方案2:函数正常不需要克隆，如果需要克隆使用eval或者bind */
const isNeedClone = function isNeedClone(value) {
  // return typeof value === 'object' && value !== null
  return /^(object|function)$/.test(typeof value) && value !== null //克隆函数的类型判断
}

const getOwnProps = function getOwnProps(obj) {
  if (obj == null) return []; //避免报错Object.keys(null)报错
  let keys = [
    ...Object.keys(obj), //如果需要克隆不可迭代属性，可以把这里改为Object.getOwnPropertyNames()
    ...Object.getOwnPropertySymbols(obj)
  ];
  return keys;
}
Object.prototype.myDeepClone = function myDeepClone(cache = new Set()) {
    //this=>所有值都可以使用，因为都是Object的实例
    let _this = this;
    if (isNeedClone(_this)) return _this; //不是对象不克隆

    /*缓存克隆过的对象，如果有克隆过，是浅克隆一下就行，为了避免对象中的某个属性用的还是这对象，导致的循环嵌套(死递归) 代码本身就应该避免循环嵌套 */
    if (cache.has(_this)) return {..._this };
    cache.add(_this);

    //我们默认创建一个普通对象(不能用new来创建对应实例，因为类数组（如arguments/dom集合等）或者自定义类我们不能使用其constructor)
    let obj = {};

    //数组
    if (Array.isArray(_this)) {
      obj = [];
    }
    // if (typeof _this === 'function') { eval(`obj = ${_this}`) };//克隆函数需要利用eval才可以完美克隆（name、属性、代码块）
    if (typeof _this === 'function') { //或者使用call克隆函数(name不能克隆)
      obj = function() {
        _this.call(this);
      }
    };
    //基本类型值的对应的引用类型或者是Date对象有原始值（new Date().valueOf()是时间戳，number类型）或者是正则对象，使用其构造函数来创建一个新对象
    let Ctor = _this.constructor;
    if (/^(RegExp|Date|String|Number|Boolean)$/.test(Ctor.name)) {
      obj = new Ctor(_this);
    }

    //ArrayBuffer的处理
    if (/^(ArrayBuffer)$/.test(Ctor.name)) {
      obj = new Ctor(_this.byteLength);
    }

    // console.log(getOwnProps(_this))
    getOwnProps(_this).forEach(key => {
      let item = _this[key];
      obj[key] = isNeedClone(item) ? item.myDeepClone(cache) : item;
    })
    return obj;
  }
  /****************** test *******************/
let num = new Number(11),
  str = new String('string'),
  bool = new Boolean(true),
  reg = /^\d+$/,
  fn = function() { console.log('function') };
num.attr = "num";
str.attr = "str";
bool.attr = "bool";
reg.attr = "reg";
fn.attr = "fn";
var obj = {
  a: 100,
  b: [10, 20, 30],
  c: {
    x: 10
  },
  d: reg,
  e: {
    f: undefined,
    g: null,
    h: 'string',
    i: 11,
    j: true,
    k: num,
    l: str,
    m: bool,
    n: Symbol('Symobol'),
    o: BigInt(111),
    p: fn,
    q: new Date(),
    r: new ArrayBuffer(1000),
    s: Math //需要获取不可遍历属性才能实现克隆
  },
  [Symbol('symbol')]: { aa: 1 }
};
obj.self = obj;
var arr = [10, [100, 200], {
  x: 10,
  y: 20
}];
var newObj = obj.myDeepClone()
console.log(obj, newObj)
console.log(arr.myDeepClone())
obj.e.p();
obj.myDeepClone().e.p(); //克隆的函数执行结果
console.log(obj.e.p === obj.myDeepClone().e.p) //克隆的函数和原来是否是同一个