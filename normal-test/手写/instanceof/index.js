function _instanceOf(obj, Ctor){
    if( typeof obj !== 'object' || obj === null) return false;// 不是对象直接返回false
    let proto = obj.__proto__;//获取原型
    if(!proto) return false;//查找到原型为null时返回false
    if(proto.constructor !== Ctor) return _instanceOf(proto, Ctor);//有原型并且和传入的构造函数不同，则继续判断原型的原型的构造函数
    return true;
}

class MyClass{

}
let obj = new MyClass;
console.log(_instanceOf(obj, Object));