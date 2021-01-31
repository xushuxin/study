"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//定义一个number类型的值
var a = 123;
//定义一个数组
var arr = [1, 2, 'str'];
var arr1 = [1, 2];
var arr2 = [1, 2, 3];
var arr3 = [1, 2, true];
//元组
var arr4 = [1, 'str', true];
//枚举
var Person;
(function (Person) {
    Person[Person["man"] = 200] = "man";
    Person[Person["women"] = 1] = "women";
    Person[Person["girl"] = 199] = "girl";
})(Person || (Person = {}));
console.log(Person); //{1: "women",199: "girl",200: "man",girl: 199,man: 200,women: 1}
//设置any，表示任意数据类型，和写js就一样了
var b = 1;
b = "str";
//null undefined
//默认可以赋值给所有的类型，但是如果开启了强类型校验，则不能赋值给其他类型
var arr5 = [];
var a2 = 123;
a2 = undefined;
a2 = null;
//void 没有任何类型，定义的变量只能赋值为null或者undefined
//当前函数没有任何返回
function aaa() {
    return;
}
//函数的返回值是number类型
function bbb() {
    return 234;
}
//定义参数类型
function f(a, b) {
    return a + b;
}
f(1, 2);
//定义参数类型2
function f2(a, b) {
    return a + b;
}
f2(1, ' ');
//参数非必传
//b,c 可以不传，可选参数只能放到最后
function f3(a, b, c) {
    b = b || '';
    return a + b + c;
}
f3(1, '', '2');
//参数默认值-1
function f4(a, b) {
    b = b || 10;
    console.log(a + b);
}
f4(1);
//参数默认值-2
function f5(a, b) {
    if (b === void 0) { b = 10; }
    console.log(a + b);
}
f5(1);
//剩余参数
function f6(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
    console.log(a, b);
}
f6(1, 2, 3, 4, 5, 6, 7, 8);
//函数的重载
//给一个函数，指定了几种可执行的方式
var obj = {};
function f7(a) {
    if (typeof a === 'number') {
        obj.age = a;
    }
    else {
        obj.name = a;
    }
}
// f7(1);//不符合第一个重载定义
f7('zhufeng');
// f7(true);//不符合第二个重载定义
var School = /** @class */ (function () {
    function School() {
        this.name2 = 'zhufeng1';
        this.name3 = 'zhufeng2';
        this.name = "珠峰";
    }
    School.prototype.getName = function () {
        return this.name;
    };
    School.age = 100; //类的静态属性的赋值与声明
    return School;
}());
var s1 = new School();
console.log(s1.name);
var School2 = /** @class */ (function (_super) {
    __extends(School2, _super);
    function School2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    School2.prototype.getName2 = function () {
        console.log(this.name2);
        // console.log(this.name3);//private的作用
    };
    return School2;
}(School));
var s2 = new School2();
s2.getName2();
// s2.name2;//protect的作用
var School3 = /** @class */ (function (_super) {
    __extends(School3, _super);
    function School3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.age2 = 100; //只读属性
        return _this;
        // changeAge(val){
        //   this.age2 = val//readonly报错
        // }
    }
    return School3;
}(School));
var s3 = new School3();
//表示此对象必须符合ISpeak接口的要求
var obj2 = {
    name: "zhufeng",
    age: 12
};
var obj3 = {
    name: 'zhufeng',
    age: 17,
    q: true,
    fn: function () { }
};
var obj4 = {
    talk: function (a, b) {
        return a + b;
    }
};
console.log(obj4.talk('hello', '你好'));
//类去实现接口 让当前的类遵循接口(必须包含指定所有接口的所有属性)
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function () {
        console.log(666);
    };
    Animal.prototype.play = function (name) {
        return name;
    };
    return Animal;
}());
var animal = new Animal();
var student = {
    age: 123,
    play: function () {
        console.log('play');
    },
    learn: function (type) {
        return 'hao';
    }
};
var f1 = function (a, b, c) {
    console.log(c);
    return a + b;
};
f1(11, 1, 'aaa');
console.log(111);
//泛型  
//使用了泛型，就不能把固定类型赋值给定义泛型的变量，具体类型由实例初始化时来决定
function createAry(length, value) {
    var ary = [];
    for (var i = 0; i < length; i++) {
        ary[i] = value;
    }
    return ary;
}
//调用函数时才声明指定的类型
console.log(createAry(3, '2'));
console.log(createAry(3, 2));
//指定接口作为T的 类型
console.log(createAry(3, { name: 'q', age: 1 }));
//在类中使用泛型
var MyAry = /** @class */ (function () {
    function MyAry() {
        this.list = [];
    }
    MyAry.prototype.add = function (value) {
        this.list.push(value);
    };
    return MyAry;
}());
//初始化一个number类型的数组
var ary = new MyAry();
ary.add(12); //只允添加number类型数据
//定义多个泛型，用逗号隔开
var MyAry2 = /** @class */ (function () {
    function MyAry2() {
        this.list = [];
    }
    MyAry2.prototype.add = function (value) {
        this.list.push(value);
    };
    return MyAry2;
}());
var ary2 = new MyAry2();
var list123 = {
    list: [1, 2]
};
var list124 = {
    list: ['1']
};
//定义一个自定义的对象类型（一般不直接这么写，会写成接口）
var list125 = {
    list: [{ name: 'hh', age: 18 }]
};
