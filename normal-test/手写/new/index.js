// 实现一个new操作符
function _new(Ctor, ...args){
    let obj = {};//默认创建一个对象
    obj.__proto__ = Ctor.prototype;//通过new创建的对象可以访问原型链
    let res = Ctor.apply(obj, args);//this指向创建的对象，获取返回结果
    return (typeof res === 'object' && res !== null ) ? res : obj;//如果函数执行的返回值是一个对象，则返回返回值，否则返回默认创建的对象
}

// 实现一个new操作符2
function _new2(Ctor, ...args){
    let obj = Object.create(Ctor.prototype);//默认创建一个对象
    let res = Ctor.apply(obj, args);//this指向创建的对象，获取返回结果
    return (typeof res === 'object' && res !== null ) ? res : obj;//如果函数执行的返回值是一个对象，则返回返回值，否则返回默认创建的对象
}

// test
var fn = function(sex){
    this.age = 16;
    this.sex = sex || null;
}
var  a = _new(fn, "男");
console.log(a);
console.log(a.__proto__ === fn.prototype);