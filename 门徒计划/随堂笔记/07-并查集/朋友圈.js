
import UnionSet from './quick-find';

class Friend{
    constructor(n){//总共有n个人
        this.u = new UnionSet(m);//初始化一个n的并查集
    }
    
    operate(a,b,c){
       if(a ==='1'){ //让b和c成为朋友关系，合并操作
         this.u.merge(b,c)
        }else  if(a === '2'){//查询b和c是否为朋友关系
            if(this.find(b) === this.find(b)){
                return 'YES'
            }else{
                return 'NO'
            }
        }
    }
}
let f = new Friend(6);
console.log(f.operate(1,1,2))
console.log(f.operate(2,1,3))
console.log(f.operate(1,2,4))
console.log(f.operate(1,4,3))
console.log(f.operate(2,1,3))