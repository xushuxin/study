// Generator生成器/Iterator迭代器及实战中的运用
// Iterator是ES6引入的一种新的遍历机制
// + 通过Symbol.iterator创建一个迭代器，指向当前数据结构的起始位置
// + 随后通过next方法进行向下迭代指向下一个位置，next方法会返回当前位置的对象，对象包含了value和done两个属性，value是当前属性的值，done用于判断是否遍历结束
// + 当done为true时则遍历结束

// 迭代器是新的数据结构，具有next方法
// 创建迭代器的方式
// ```
// let arr = [1,2,3],
//     it = arr[Symbol.iterator](arr);//创建一个数组的迭代器

// let str ="123",
//     it = str[Symbol.iterator](str);//创建一个字符串的迭代器
// ```

// // 自己实现一个生成迭代器的方法

// function createiterator(items){
//   let count=0;
//   return {
//     next(){
//       let done,value;
//       if(count>=items.length){
//         done = true
//       }else{
//         done=false
//         value = items[count++];
//       }
//       return {
//         done,
//         value
//       }
//     }
//   }
// }
// let arr =[1,2,3];
// let it =createiterator(arr);
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

/* //async/await的实现原理
function asyncFunc(gen){
  const it = gen();
  const next = (data)=>{
    let {done,value} = it.next(data);//数据传递给上一个节点的yield产出值
    if(done) return;
    if(typeof value.then !== 'function') value=Promise.resolve(value);
    value.then(data=>{
      next(data)
    })
  } 
  next();
}
asyncFunc(function* (){
  let data = yield API(10);
  data = yield API(data+10);
  console.log(data);
}); */

//模拟请求接口
// function API(data){
//   return new Promise(resolve=>{
//     setTimeout(()=>{
//       resolve(data);
//     },1000)
//   })
//   // return data;
// }

// function asyncFunc(gen){
//   const it = gen();
//   const next =(data)=>{
//     let {done,value} = it.next(data);//把上一次的请求结果传递给上个节点的返回值
//     if(done) return;
//     if(typeof value !=='function') value = Promise.resolve(value);
//     value.then(data=>{
//       next(data)
//     })
//   }
//   next();//首次没有传递值
// }
// asyncFunc(function* (){
//   let data  = yield API(10);
//   var a = data = yield API(data+10);
//   console.log(a);
//   console.log(data);
// })
