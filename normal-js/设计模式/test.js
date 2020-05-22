//在不支持Object.create方法的浏览器中，兼容实现
Object.create=Object.create||function(obj){
  var F=function(){};
  F.prototype=obj;
  return  new F();
}
//ECMAScript 5提供的获取原型对象的方法
var obj1={};
Object.getPrototypeOf(obj1)
//原型编程范型的一些规则
// 1.所有的数据都是对象
// 2.要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
// 3.对象会记住它的原型
// 4.如果对象无法响应某个请求，它会把这个请求委托给它自己的原型
class Animal{
  constructor(name){
    this.name=name;
  }
  getName(){
    return this.name;
  }
}
class Dog extends Animal { 
  constructor(name) { 
    super(name); 
  } 
  speak() { 
    return "woof"; 
  } 
}
var dog =new Dog("Scamp");
console.log(dog.getName()+' says ' +dog.speak());


class Animal {
  constructor(name){
    this.name=name;
  }
  getName(){
    return this.name;
  }
}
class Dog extends Animal {
  constructor(name){
    super(name);
  }
}