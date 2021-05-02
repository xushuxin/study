// weighted-quick-union算法：对quick-union算法的优化，根据要合并的两个树的节点数量来决定谁的根节点当爸爸
// 优化合并方案：最好的合并参考是节点数量，数量多的做爸爸，数量少的做儿子，这样可以减少降级元素的数量（降级代表查找次数加1）
// 优化的目标就是减少平均查找次数（总查找次数/总节点数量）
/* 
    假设 a 和 b需要合并，a树的节点数量为sa,总查找次数为 la , b树的节点数量为sb，总查找次数为lb
    a作为爸爸，b作为儿子，b树上的所有节点降1级，计算合并后的平均查找次数： (la + lb + sb) / (sa + sb)
    b作为爸爸，a作为儿子，a树上的所有节点降1级，计算合并后的平均查找次数： (la + lb + sa) / (sa + sb)
    从上面公式可以看出影响合并后的平均查找次数的唯一因素为：a和b树的节点数量大小，谁小谁作为儿子，这样才能使平均查找次数最小
*/
class UnionSet{
    nodes = [] //保存每个节点父节点位置的数组
    size = []//存储每个索引位置的节点数量，merge的时候，将对应节点的数量加给被挂载节点索引位置的数量

    constructor(n){
        for(let i= 0; i <= n; i++){
            this.nodes[i] = i;// 初始化的时候父节点是自己（都是根节点）
            this.size[i] = 1; //初始化的时候数量都是1
        }
    }

    find(i){
        if(this.nodes[i] === i) return i;
        return this.find(this.nodes[i]);
    }

    merge(a , b){
        let rootA = this.find(a), rootB = this.find(b);
        if(rootA === rootB) return;//如果a和b的根节点是同一个，不用合并

        if(this.size[a] < this.size[b]){//谁的节点数量多，谁当爸爸
            this.nodes[a] = rootB;//当爸爸就是索引被儿子保存
            this.size[b] += this.size[a];//当爸爸的节点数量要加上儿子的节点数量
        }else{
            this.nodes[b] = rootA;
            this.size[a] += this.size[b]; 
        }

    }   
}

export default UnionSet