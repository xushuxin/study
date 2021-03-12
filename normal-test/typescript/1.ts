//定义一个number类型的值
var a:number  = 123;

//定义一个数组
var arr:Array<number|string>=[1,2,'str']
var arr1:Array<number>=[1,2]
var arr2:number[] = [1,2,3]
var arr3:(number|boolean)[] = [1,2,true];

//元组 类似一个数组 它是一个长度和类型都固定的数组
//1长度固定 2类型可以不一样
var arr4 :[number,string,boolean] = [1,'str',true];

//枚举
enum Person{
  man = 200,
  women = 1,
  girl = 199
}
console.log(Person)//{1: "women",199: "girl",200: "man",girl: 199,man: 200,women: 1}
enum Week{
  Monday = 1,
  Tuesday = 2
}
console.log(Week);

//常数枚举
const enum Colors{
  Red,
  Yellow,
  Blue
}
console.log(Colors.Red,Colors.Yellow,Colors.Blue)

//设置any，表示任意数据类型，和写js就一样了
//第三方库没有类型定义、类型转换、数据结构太复杂太灵活的时候使用
//不写any时，ts会根据数据进行类型判断
let b:any = 123;
b = 'str';

//ts为dom提供了一整套的类型声明
let root:HTMLElement|null=document.getElementById('root');
root!.style.color = 'red';//!断言不为空

//null undefined
//空    未定义
//它们都是其他类型的子类型，可以把它们赋给其他类型的变量
//默认可以赋值给所有的类型，但是如果开启了strict:true,默认strictNullChecks:true,不能赋值给其他类型,
//需要设置strictNullChecks:false，才可以随意赋值给其他类型
let arr5:number[]= [];
let a2 = 123;
a2 = undefined;
a2 = null;

//void 没有任何类型，定义的变量只能赋值为null或者undefined

//当前函数没有任何返回
function aaa():void{
  return;
}

//函数的返回值是number类型
function bbb():number{
  return 234;
}

//定义参数类型
function f(a:number,b:number):number{
  return a + b;
}
f(1,2)

//定义参数类型2
function f2(a:number,b:string):any{
  return a + b;
}
f2(1,' ')

//参数非必传
//b,c 可以不传，可选参数只能放到最后
function f3(a:number,b?:string,c?:string):string|number{
  b = b || '';
  return a + b + c;
}
f3(1,'','2')

//参数默认值-1
function f4(a:number,b?:number):void{
  b = b || 10;
  console.log(a+b);
}
f4(1)

//参数默认值-2
function f5(a:number,b:number=10):any{
  console.log(a + b);
}
f5(1)

//剩余参数
function f6(a:number,...b:number[]){
  console.log(a,b);
}
f6(1,2,3,4,5,6,7,8)

//函数的重载
//给一个函数，指定了几种可执行的方式
let obj:any = {};

//以下两个函数规定重载的参数个数及类型
function f7(a:number,b:number):void;
function f7(a:string):void;
function f7(a:any){
  if(typeof a === 'number'){
    obj.age = a;
  }else{
    obj.name = a;
  }
}
// f7(1);//不符合第一个重载定义
f7('zhufeng');
// f7(true);//不符合第二个重载定义

class School{
  //public 不写 默认就是publc
  //protected 受保护的属性 在当前类及子类中时可以访问的
  //private 私有属性，只能在类中使用，不能在类外部访问
  name:string//实例的属性需要在这个地方声明类型
  protected name2:string = 'zhufeng1'
  private name3:string = 'zhufeng2'
  static age:number = 100//类的静态属性的赋值与声明
  constructor(){
    this.name = "珠峰";
  }
  getName():string{
    return this.name;
  }
}

let s1 = new School();
console.log(s1.name);

class School2 extends School{
  getName2(){
    console.log(this.name2);
    // console.log(this.name3);//private的作用
  }
}
let s2 = new School2();
s2.getName2();
// s2.name2;//protect的作用

class School3 extends School{
  public readonly age2 :number = 100//只读属性
  // changeAge(val){
  //   this.age2 = val//readonly报错
  // }
}
let s3 = new School3();

//接口 不是前后端交互的接口 是ts的一个语法
//表示行为的规范 或者 对象的描述
//接口中的分割可以是逗号或者分号 或者啥也不写
interface ISpeak{
  name: string,//;或者不写
  age: number,
  sex?:number //sex是可选参数
}

//表示此对象必须符合ISpeak接口的要求
let obj2:ISpeak = {
  name:"zhufeng",
  age:12
}
//ISpeak2接口表示：使用这个接口的对象必须有name和age属性
//其他属性不限
interface ISpeak2{
  name:string
  age:number
  [key:string]:any
}

let obj3:ISpeak2={
  name:'zhufeng',
  age:17,
  q:true,
  fn:function(){}
}

//ISpeak2接口表示：使用这个接口的对象必须有name和age属性
//其他属性不限
interface ISpeak3{
  talk(name:string,age:string):string //对象中必须有talk函数,必须有两个入参并且必须是字符串，返回值必须是一个字符串
}

let obj4:ISpeak3={
  talk(a:string,b:string){
    return a + b;
  }
}

console.log(obj4.talk('hello','你好'))

//行为的约束
interface Ieat {
  eat(): void
}

interface Iplay{
  play(a:string):string
  // play2(a:number):number
}

//类去实现接口 让当前的类遵循接口(必须包含指定所有接口的所有属性)
class Animal implements Ieat,Iplay{
  eat(){
    console.log(666);
  }
  play(name:string){
    return name
  }
}
let animal = new Animal()

// 接口的继承
interface Student{
  learn(a:string):string
  readonly age:number//设置只读属性
}

interface YouEr extends Student{
  play():void
}

let student:YouEr = {
  age:123,
  play(){
    console.log('play')
  },
  learn(type:string){
    return 'hao'
  }
}


//对函数的约束，函数类型的接口
interface Ifn{
  (age:number,sex:number,name:string):number
}

let f1:Ifn = function(a:number,b:number,c:string){
  console.log(c);
  return a + b; 
}
f1(11,1,'aaa')
console.log(111);

//泛型  
//使用了泛型，就不能把固定类型赋值给定义泛型的变量，具体类型由实例初始化时来决定
function createAry<T>(length:number,value:T):Array<T>{
  let ary: T[] =[];
  for(let i= 0;i<length;i++){
    ary[i] = value;
  }
  return ary;
}
//调用函数时才声明指定的类型
console.log(createAry<string>(3,'2'));
console.log(createAry<number>(3,2));

interface Iobj{
  name:string,
  age:number
}
//指定接口作为T的 类型
console.log(createAry<Iobj>(3,{name:'q',age:1}));

//在类中使用泛型
class MyAry<T>{
  private list: T[] = [];
  add(value:T){
    this.list.push(value);
  }
}
//初始化一个number类型的数组
let ary = new MyAry<number>();

ary.add(12);//只允添加number类型数据

//定义多个泛型，用逗号隔开
class MyAry2<T,M,Q>{
  private list: T[] = [];
  add(value:T){
    this.list.push(value);
  }
}
let ary2 = new MyAry2<number,string,boolean>();

//接口的泛型
interface IList<T>{
  list: T[]
}

let list123 :IList<number> = {
  list:[1,2]
}

let list124: IList<string> = {
  list :['1']
}

//定义一个自定义的对象类型（一般不直接这么写，会写成接口）
let list125:IList<{name:string,age:number}> = {
  list:[{name:'hh',age:18}]
}