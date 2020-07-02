var arrPro=Array.prototype;
var arrOb=Object.create(arrPro);
var arr=["push","pop","shift"];
//arr里的方法，既能保持原有方法，又能触发更新
//装饰者模式
arr.forEach(function(method,index){
  arrOb[method]=function(){
    var ret=arrPro[method].apply(this,arguments);
    console.log('监测到数组变动，触发更新')
    return ret;
  }
})
 var arr=[];
 arr.__proto__=arrOb;//把arrOb设置为数组的原型，这样才会调用arrOb的method
 arr.push(1)
