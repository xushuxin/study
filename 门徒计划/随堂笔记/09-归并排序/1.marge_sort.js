function merge_sort(arr, l, r){
    if(l >= r) return;
    var mid = (l + r) >> 1;
    merge_sort(arr, l, mid);//left sort 
    merge_sort(arr, mid + 1, r);//right sort

    //到这的时候，获得了左右两个有序数组（）

    let temp = [];//额外的存储空间，js用数组模拟

    var k = 0,// k指向额外存储空间中的末尾的索引
        p1 = l,// p1指向左数组的当前需要拿来做比较的元素，初始值是待排序数组的开始索引
        p2 = mid + 1;//p2指向右数组中当前需要拿来做比较的元素，初始值是待排序数组的中间索引的下一位

    while(p1 <= mid || p2 <= r){//当左数组或者右数组中还有元素
        //两种情况下，我们需要放入左数组中的元素（p1指向的）
        //①左数组有元素，右数组中没有元素了
        //②右数组中有元素，并且p1指向的值小于等于p2指向的值
        if(p2 > r || (p1 <= mid && arr[p1] <= arr[p2])){
            temp[k++] = arr[p1++];
        }else{
            //①右数组中有元素，并且p2的值小于p1
            //②右数组中有元素，但是左数组中没有元素了（p1 > mid）
            //应该放入右数组中的元素（p2指向的）
            temp[k++] = arr[p2++];
        }
    }
    // for(var i = 0;i <= r;i++){
    //     arr[i + l] = temp[i];
    // }
    for(var i = l;i <= r;i++){
        arr[i] = temp[i - l];//temp是从0开始取值的，i是从l开始的，所以要减去开始索引l
    }

    return;
}
let arr = [6, 9, 7, 8,3,5,4,1,2,0]
merge_sort(arr, 0, arr.length-1);
console.log(arr)