// 并查集的quick-find算法（染色法）：颜色相同的表示是连通在一块的
//优点：find操作时间复杂度为O(1)，速度快
//缺点：Union操作复杂度为O(n)，连通（合并）操作慢
class UnionSet{
    color = [];//维护一个颜色数组，来表示连通关系
    constructor(n){//n由具体实现的需求来决定
        //初始化n + 1个颜色点用索引来表示不同颜色（也可以是n个点）
        //刚开始每个数的颜色都是不同的，随着合并，颜色会越来越少
        for(let i = 0;i<=n;i++){
            this.color[i] = i;
        }
    }

    find(i){//查找对应索引元素的颜色
        return this.color[i];
    }

    merge(a,b){//连通操作，a,b为需要连通的两个元素的索引，将所有和b元素颜色相同的变为a颜色
        if(this.find(a) === this.find(b)) return;//如果a和b本来就是一种颜色，本来就是连通的
        let ca = this.find(a);
        let cb = this.find(b);
        for(let i =0;i<=n;i++){
            if(this.find[i] === cb){
                this.color[i] = ca;//连通操作，将所有和b颜色一样的点，设置为a的颜色
            }
        }
    }
}

export default UnionSet