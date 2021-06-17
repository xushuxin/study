
import UnionSet from './1.quick-find.js';
// import UnionSet from './2.quick-union.js';
// import UnionSet from './3.weighted-quick-union.js';
// import UnionSet from './4.qucik-union-pc.js';
// import UnionSet from './5.weighted-quick-union-pc.js';

class Friend{
    constructor(n){//总共有n个人
        this.u = new UnionSet(n);//初始化一个n的并查集
    }
    
    operate(a,b,c){
       if(a ===1){ //让b和c成为朋友关系，合并操作
         this.u.merge(b,c)
        }else  if(a === 2){//查询b和c是否为朋友关系
            if(this.u.find(b) === this.u.find(c)){
                return 'YES'
            }else{
                return 'NO'
            }
        }
    }
}
let f = new Friend(6);
console.time('测试操作耗时')
console.log(f.operate(1,1,2))
console.log(f.operate(2,1,3))
console.log(f.operate(1,2,4))
console.log(f.operate(1,4,3))
console.log(f.operate(2,1,3))
console.log(f.operate(1,5,4))
console.log(f.operate(1,6,5))
console.log(f.operate(2,1,5))
console.log(f.operate(2,1,4))
console.log(f.operate(2,3,6))
console.timeEnd('测试操作耗时')