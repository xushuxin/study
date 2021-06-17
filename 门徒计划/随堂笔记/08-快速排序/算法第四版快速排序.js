/* 算法第四版描述的快速排序 */
function quick_sort(arr, l, r){
    if(l >= r) return;

    let j = partition(arr, l, r);//partition的过程
    
    quick_sort(arr, l, j - 1);//同理处理左数组

    quick_sort(arr, j + 1, r);//同理处理右数组
}

function partition(arr, l, r){
    let i = l, //左指针
        j = r + 1,//右指针
        base = arr[i];//切分元素，取第一个
    while(true){
        while(arr[++i] < base){
            if(i === r) break;
        }
        while(arr[--j] > base){
            if(j === l)  break;
        }
        // 到这里有几种情况：
        //1. arr[i] >= base arr[j] <= base，交换i，j位置的元素
        //2. 左右两边找了一遍了都没找到，i >= j ,此时 i 指向右数组第一个, j指向左数组最后一个 ，停止当前循环，外面的swap还是正常交换
        //3. 左边找了一遍了没找到，右边找到了（就是左数组最后一个了），i >= j ,此时 i 指向右数组第一个, j指向左数组最后一个 ，停止当前循环，外面的swap还是正常交换
        //4. 左边找到了（右数组的第一个），右边没找到，i >= j ,此时 i 指向右数组第一个, j指向左数组最后一个 ，停止当前循环，外面的swap还是正常交换
        if(i >= j) break;
        swap(arr, i, j);      
    }
    swap(arr, l, j);//交换切分元素和左数组最后一个元素（实现切分）
    return j;//返回切分元素最终的位置（中间位置）
}

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
var arr = [3,5,2,7,6,9,1,3,2,7,0,3,6];
quick_sort(arr, 0, arr.length-1)
console.log(arr)