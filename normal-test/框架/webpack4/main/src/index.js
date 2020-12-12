import $ from 'jquery';
// import Vue from 'vue';
import 'moment/locale/zh-cn'; //单独引入moment中文包，测试webpack.IgnorePlugin
import lodash from 'lodash'; //引入lodash，测试splitChunks分包
console.log(lodash);
console.log($);
console.log(new Vue); //Vue配置了webpack.ProvidePlugin,自动引入
//注释1
var a = require('./a.js');
//注释2
var b = require('./b.js');
//测试devServer proxy
require('./test-proxy')
  // debugger
require('./css/1.css');
require('./css/2.less');
import img from "./images/1.jpg";
let image = new Image();
image.src = img;
document.body.appendChild(image);
console.log(a);
var name = 'haha';
// name.a();

const d = {};
@logger(666)
class AAA {
  a = 1 //私有属性
  static b = function b() {} //静态方法
  c = () => {}
}

function logger(value) {
  return function(target, key, descriptor) {
    console.log(target, key, descriptor)
    target.prototype.attr = value;
  }
}
console.log(new AAA);

//使用@babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 进行编译
/* async function fn() {
  console.log('调用了async函数');
  await console.log(123);
  console.log(456);
}
fn() */


const g = '测试@babel/preset-env不设置.browserslistrc的效果';
console.log(g);

var arrLike = { 0: 'a', 1: 'b', length: 2 };
var arr = Array.from(arrLike); //corejs3支持转化
console.log(arr);

var p = new Promise(function(resolve, reject) { //corejs3支持转化
  resolve('promise resolve');
})
p.then(res => {
  console.log(res);
})

fetch('./').then(res => { //未被corejs3转化
  console.log(res);
}).catch(err => {
  console.log(err);
})