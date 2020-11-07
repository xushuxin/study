//实现new
var Dog = function() {
  this.name = arguments[0];
  this.age = arguments[1];
}
Dog.prototype.bark = function() {
  console.log('汪汪')
}

Dog.prototype.sayName = function() {
  console.log(this.name);
}
Dog.prototype.sayAge = function() {
  console.log(this.age);
};

// let _new = function _new(Ctor, ...params) {
//   let obj = {};
//   obj.__proto__ = Ctor.prototype;
//   let result = Ctor.call(obj, ...params);
//   if (/^(object|function)$/.test(typeof result)) {
//     return result;
//   } else {
//     return obj;
//   }
// };

//实现Object.create
Object.create = function(pro) {
  function Proxy() {};
  Proxy.prototype = pro;
  return new Proxy;
}

let _new = function _new(Ctor) {
  var obj = Object.create(Ctor.prototype);
  var params = [].slice.call(arguments, 1);
  var result = Ctor.apply(obj, params);
  if (/^(object|function)$/.test(typeof result)) {
    return result
  }
  return obj;
};

// var dog1 = new Dog('三毛', 6);
var dog1 = _new(Dog, '三毛', 6);
console.log(dog1);
dog1.bark();
dog1.sayName();
dog1.sayAge();