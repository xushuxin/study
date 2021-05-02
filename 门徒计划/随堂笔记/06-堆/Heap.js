//最小堆
class MinHeap{
    constructor(data){
        this.data = data;
        this.heapify();
    }
    //堆的大小
    size(){
        return this.data.length;
    }

    //查看堆顶元素
    top(){
        if(!this.size()) return null;
        return this.data[0];
    }

    //
    heapify(){
        if(this.size() < 2){
            return;
        }
        //对每个值都进行向上调整，构建最小堆
        for(let i = 0 ;i < this.size(); i++){
            this.shift_up(i);
        }
    值

    //添加元素
    push(val){
        this.data.push(val);
        this.shift_up(this.size() -1);
    }
    //取出元素
    pop(){
        if(this.size() === 0) return null;
        if(this.size() === 1) return this.data.pop();//只有一位直接删除并返回值
        let item = this.data[0];
        this.data[0] = this.data.pop();//最后一位放到第一位
        this.shift_down(0);//向下调整
        return item;//返回取出的元素
    }

    //交换data数组中两个索引位置的元素
    swap(i,j){
        [this.data[i],this.data[j]] = [this.data[j],this.data[i]];
    }

    //向上调整
    shift_up(i){
        while(i){
            //父节点的索引（根节点索引为0）
            const parentIndex = (i-1) >> 1;//右移一位，相当于除以2取整
            //如果子节点的值小于父节点的值，将父子节点交换
            if(this.data[i] < this.data[parentIndex]){
                this.swap(i,parentIndex);
                i = parentIndex;
            }else{
                break;
            }
        }   
    }

    //向下调整
    shift_down(i){
        let end = this.size() - 1;
      
        while(i <= end){
            //依次比较当前节点和左右子节点的值，求得最小值，放到当前节点
            let temp = i;
            //如果有左子节点
            if(i*1+1 <= end&&this.data[temp] > this.data[i*2+1]){
                temp = i * 2 + 1;
            }
            //如果有右子节点
            if(i*2+2 <= end&&this.data[temp] > this.data[i*2+2]){
                temp = i * 2 + 2;
            }
            if(temp === i) break;//如果左右子节点没有比当前节点小的值，直接不用交换
            this.swap(i,temp);//否则交换当前节点和较小的节点
            i = temp;
        }
    }

}
// test
let arr = [5,4,3,2,6,8,7,9,10];
let minHeap = new MinHeap(arr);

console.log(minHeap.pop())
console.log(minHeap.data)
