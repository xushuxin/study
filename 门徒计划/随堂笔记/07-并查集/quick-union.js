/* 并查集的quick-union算法 ：使用树型结构来维护连通关系 */
// 优点：连通（合并）速度快，直接挂载即可，时间复杂度 O(1)
// 缺点： 查找速度慢（需要递归查找所属根节点），最差时间复杂度为O(n)，形成了链表
// 有效的减小树高，可以加快查找效率

class UnionSet{

    boss = []

    constructor(n){
        for(let i = 0 ;i <= n ;i++){
            this.boss[i] = i;//初始化时，每个节点都是根节点，随着合并操作，被挂载的元素存储的值变成其父元素索引，也就不是根节点了
        }
    }

    find(i){//找到索引 i 位置元素所属的根节点（存储的值不等于自身的都指向过其它节点，只有根节点保存的值等于自身索引）
        if(this.boss[i] === i) return i;//最终会找到根节点
        return this.find(this.boss[i]);//存储的值不等于自身，则存储的值为父节点的索引，看父节点是否是根节点
    }

    merge(a, b){
        let rootA = this.find(a), rootB = this.find(b);

        if(rootA === rootB) return;

        //把rootA挂载到rootB上，这个操作之后原来a的根节点存储的值就变成了b的根节点存储的值
        //下一次找a的根节点，就会递归的方式找到b的根节点
        //根节点是没有挂载过到其它节点的，所以他的索引就和保存的值是一致的（初始化的状态）
        this.boss[rootA] = rootB;
    }
}
export default UnionSet