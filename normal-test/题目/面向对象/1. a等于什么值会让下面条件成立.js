// 面试题：a等于什么值会让下面条件成立
// 方法1：
// 调用优先级：Symbol.toPrimitive > valueOf > toString 
var a = {
    val:0,
    [Symbol.toPrimitive](hint){
        console.log('Symbol.primitive',hint);//hint表示当前值将会转为哪种值
        return ++this.val;
    },
    valueOf(){
        console.log('valueOf')
        return ++this.val;
    },
    toString(hint){
        console.log('toString')
        return ++this.val;
    }
};

// 方法2：
let i = 0;
Object.defineProperty(globalThis,'a',{
    get(){
        console.log('defineProperty')
        return ++i;
    }
})

if (a == 1 && a == 2 && a == 3) {// hint = default
    console.log('OK');
}