// 手写bind
Function.prototype.bind = function(...args){
    let thisArg = args[0];
    let outerArgs = args.slice(1);
    let orignFn = this;
    return function Fn(...innerArgs){
        if(this instanceof Fn) {//如果是new执行，this不修改
            thisArg = this;
        }
        orignFn.call(thisArg,...outerArgs,...innerArgs);
    }
}

/* 斐波那契数列第n项（n从0开始） */
var fib = function(n) {
    if(n === 1 || n === 0) return n
    let a = 0,b = 1,target;
    for(let i = 2;i <= n; i++){
        target = a + b;
        a = b;
        b = target;
    }
    return target;
};
console.log(fib(10));

/* 总共十级阶梯，每次只能走1步或者2步，总共有多少种走法？ */
//递归写法
function step(n){
    if(n === 1 || n === 2) return n;
    return step(n - 1) + step(n - 2);
}
console.log(step(10))

//迭代写法
function step(n){
    if(n === 2 || n === 1) return n;
    let a = 1,b=2,target;
    for(let i = 3;i <= n;i++){
        target = a + b;
        a = b;
        b = target;
    }
    return target;
}
console.log(step(10))