// 最简单的快速排序算法，不做任何优化
//分析过程：
/**
 * 
 * @param {待排序数组} arr 
 * @param {开始索引} l 
 * @param {结束索引} r 
 */
function quick_sort(arr, l, r){
    if(l >= r) return;
    let x = l,y = r, base = arr[l];//选择第一个数作为基准值
    // partition start
    while(x < y){
        while(x < y && arr[y] >= base) y--; // 从右往左查找比基准值小的数
        if(x < y) arr[x++] = arr[y]; //找到了一个比基准值小的数，这时候arr[y] < base，x是基准值的索引，我们可以认为其已空出，将arr[y]赋值给 arr[x]，x加1，下次从左往右查找，从下个索引开始
        while(x < y && arr[x] < base) x++;//从左往右查找大于等于基准值的数
        if(x < y) arr[y--] = arr[x];//找到了一个大于等于基准值的数，这时arr[x] >= base，y是刚才从右往左查找，找到的数的位置，已经空出，将查找到的x位置的值赋值给这个空出的y位置，y减1，下次从右往左查找从前一个索引开始
    }
    arr[x] = base;// 到这里时 x === y , 在数组的中间会空出一个位置，将基准值赋值给这个位置即可
    // partition end
    quick_sort(arr, l, x - 1);//递归处理左半部分
    quick_sort(arr, x + 1, r);//递归处理右半部分
    return;
}
var arr = [3,5,2,7,6,9,1,3,2,7,0,3,6];
quick_sort(arr, 0, arr.length-1)
console.log(arr)

