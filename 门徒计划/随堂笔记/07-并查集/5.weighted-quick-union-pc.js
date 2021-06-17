/* 
    weighted-quick-union-path-compress算法：结合了按质优化和路径压缩
    weight 按质优化（节点数量）
    path-compress 路径压缩
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
        let root = this.find(this.nodes[i]);//递归找到根节点
        this.nodes[i] = root;//每递归过程中的个节点都保存根节点的索引（路径压缩），下一次查找这个节点的根节点，直接查找两次就找到了
        return root;
    }

    merge(a , b){
        let rootA = this.find(a), rootB = this.find(b);
        if(rootA === rootB) return;//如果a和b的根节点是同一个，不用合并

        if(this.size[a] < this.size[b]){//b节点数量多，b当爸爸
            this.nodes[a] = rootB;//b当爸爸就是索引被儿子a保存
            this.size[b] += this.size[a];//b的节点数量要加上儿子a 的节点数量
        }else{
            this.nodes[b] = rootA;
            this.size[a] += this.size[b]; 
        }

    }   
}

export default UnionSet