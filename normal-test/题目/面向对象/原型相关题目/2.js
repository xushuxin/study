function Fn() {
    let a = 1;
    this.a = a;
}
Fn.prototype.say = function() {
    this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;

Fn.prototype.b = function() {
    this.a = 3;
};
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);//in操作符：如果指定属性出现在指定对象或者其原型链上，则返回true
console.log(f1.constructor == Fn);//f1自身并没有constructor属性，但是它会通过原型链查找到原型上的constructor