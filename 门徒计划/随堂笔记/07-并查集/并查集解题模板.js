// 仅使用 path-compress即可，合并和查找的时间复杂度都接近O(1)
class UnionSet{
    fa = []

    constructor(n){
        for(let i = 0; i<= n; i++){// 等于n，防止有1-n的情况
            this.fa[i] = i;
        }
    }

    get(i){
        return this.fa[i] = this.fa[i] === i ? x :this.get(this.fa[i]);//
    }

    merge(a, b){
        this.fa[i] = this.get(b);
    }
}

// 根据算法第四版的描述进行封装的，count方法不确定是否能满足具体需求
class UnionSet2{
    id = []
    constructor(n){
        for(let i = 0;i < n;i++){
            this.id[i] = i;
        }
    }
    find(i){
        return this.id[i] = this.id[i] === i ? i : this.find(this.id[i]);
    }
    union(a,b){
        this.id[this.find(a)] = this.find(b);
    }

    count(){
        let cnt = 0
        for(let i = 0; i< this.id.length;i++){
            if(this.find(i) === i) cnt++;
        }
        return cnt;
    }
    connected(a,b){
        return this.find(a) === this.find(b);
    }
}