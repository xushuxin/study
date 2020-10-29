/* 生成器对象是由一个generator function 返回的，并且它符合可迭代协议和迭代器协议 */
//每执行一次next,会把对应节点前的代码执行，并且返回一个包含当前生成器的节点的值和遍历是否完成的对象，如：{value:xxx，done:false},done为true时，表示生成器的所有节点已遍历完成，后续执行返回的对象都是value为undefined,done为true
/*
+ generator函数执行时，this指向window
+ generator函数执行返回的生成器对象是当前generator函数的一个实例
+ 也是GeneratorFunction的一个实例
  + next:依次遍历对应的值
  + return:结束遍历并且return指定的值
  + throw
+ 但是func本身是无法new执行的
+ 它拥有Symbol(Symbol.iterator)这个属性值：说明我们获取的结果是具备Iterator规范的
*/
function* func() {
  console.log(this); //window
  this.NO = 'NO';
  yield 1;
  yield 2;
  yield 3;
}
func.prototype.OK = 'OK';
var generator = func();
generator.next();
console.log(generator.OK); //'OK'
console.log(generator.NO); //undeifned
console.log(generator.__proto__ === func.prototype); //true
console.log(generator instanceof func); //true
// new func(); //Uncaught TypeError: func is not a constructor
function* func() {
  console.log(generator);
  console.log('A');
  yield 1;
  console.log('B');
  yield 2;
  console.log('C');
  yield 3;
  console.log('D');
  return 4;
}
var generator = func();
console.log(generator); //生成器对象，其原型上有next/return/throw三个方法
console.log(generator.next()); //{ value: 1, done: false }
console.log(generator.next()); //{ value: 2, done: false }
console.log(generator.next()); //{ value: 3, done: false }
console.log(generator.next()); //{ value: 4, done: true }
console.log(generator.next()); //{ value: undefined, done: true }
console.log(generator.next()); //{ value: undefined, done: true }

/* 
+ yield表达式只能在generator函数中执行
+ yield表达式的返回值为下一次next函数执行传递的值
+ yield表达式参与计算时需要用圆括号包起来
*/
function* func() {
  var x = 2 * (yield 1);
  console.log(yield 2) //30
  console.log(x); //20
}
var generator = func();
generator.next();
generator.next(10);
generator.next(30);

/* generator函数内部可以用yield*表达式添加另一个generator函数 */
function* func1() {
  yield 1;
  yield 2;
}

function* func2() {
  var x = yield 3;
  console.log(x);
  yield* func1(); //转让执行权
  yield 4;
}
var generator = func2();
console.log(generator.next()); //{done:false.value:3}
//undefined
console.log(generator.next()); //{done:false,value:1}
console.log(generator.next()); //{done:false,value:2}
console.log(generator.next()); //{done:false,value:4}
console.log(generator.next()); //{done:true,value:undefined}



//想要每隔1000m打印一个结果
var func = x => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(++x);
    }, 1000);
  })
};
//实现异步串行效果
//1.
// func(0).then(x => {
//   console.log(x); //1
//   return func(x);
// }).then(x => {
//   console.log(x);
//   return func(x); //2
// }).then(x => {
//   console.log(x); //3
// });

//2.
// (async function anonymous() {
//   var x = await func(0);
//   console.log(x);

//   x = await func(x);
//   console.log(x);

//   x = await func(x);
//   console.log(x);

// })();

function* Generator(x) {
  x = yield func(x); //实参x是Generator执行传入，第一个节点返回值x是第二次调用next传入的参数
  console.log(x);

  x = yield func(x);
  console.log(x);

  x = yield func(x);
  console.log(x);
}
var generator = Generator(0); //首次参数是由Generator函数执行时传入的
var result = generator.next(); //获取到第一个promise(节点1的func(x)返回值,x => 初始化参数)
result.value.then(x => { //把第一个promise.then执行获取结果
  result = generator.next(x); //结果传递给上一个节点（第一个）的返回值，获得到第二个promise(节点2的func(x)返回值，x  => 节点1的返回值)
  result.value.then(x => { //把第二个promise.then执行获取结果
    result = generator.next(x); //结果传递给上一个节点（第二个）的返回值，获得到第三个promise(节点3的func(x)返回值,x => 节点2的返回值)
    result.value.then(x => { //把第三个promise.then执行，获取其结果
      generator.next(x) //不存在节点四，所以返回值为{done:true,value:undefined},目的是把生成器函数中后续代码执行，结果传递给最后一个节点的返回值，供后续代码执行使用
    })
  })
})

var func = function func(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(++x);
    }, 1000)
  })
}

function* Generator(x) {
  x = yield func(x);
  console.log(x);
  x = yield func(x);
  console.log(x);
  x = yield func(x);
  console.log(x);
};
//使用Generator函数实现async&await的效果
/**
 * 
 * @param {生成器函数} GeneratorFn 
 * @param  {初始执行生成器函数传递的实参} params 
 */
function Async(GeneratorFn, ...params) {
  var generator = GeneratorFn(...params);
  const next = function getValue(x) {
    let { value: promise, done } = generator.next(x);
    if (done) return;
    promise.then(x => {
      next(x)
    })
  }
  next();
}
Async(Generator, 0);

// Generator函数还可以用于数组扁平化
function* flatGenerator(arr) {
  for (var item of arr) {
    Array.isArray(item) ? yield* flatGenerator(item) : yield item;
  }
}
var arr = [
  [1, 2, [3, 4]],
  [5, 6],
  [7, 8]
]
var generator = flatGenerator(arr)
console.log([...generator]); //展开运算符也是调用数组的Symbol.iterator函数返回的遍历器对象遍历数组项（每次循环调用iterator.next()获取value）