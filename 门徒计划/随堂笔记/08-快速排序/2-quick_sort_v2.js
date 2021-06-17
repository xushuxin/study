// 单边递归优化（也叫做左递归），减少递归次数，从而减少系统栈的使用
function quick_sort_v2(arr, l, r){
    
    while(l < r){
        let x = l,y = r,base = arr[l];
        while(x < y){
            while(x < y && arr[y] > base) y--;
            if(x < y) arr[x++] = arr[y];
            while(x < y && arr[x] < base) x++;
            if(x < y) arr[y--] = arr[x];  
        }
        arr[x] = base;
        quick_sort_v2(arr, x + 1, r);//右侧依旧使用递归实现
        r = x - 1;//左边的递归使用循环来代理
    }
   
}
var arr = [3,5,2,7,6,9,1,3,2,7,0,3,6];
quick_sort_v2(arr, 0, arr.length-1)
console.log(arr)