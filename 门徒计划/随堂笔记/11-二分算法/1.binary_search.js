/**
 * 二分查找算法
 * @param {待查找数组} arr 
 * @param {待查找数组的长度} n 
 * @param {待查找元素} x 
 */
function binary_search(arr, n, x) {
    // 定义三个指针，头、尾、中
    let head = 0, tail = n - 1, mid;
    while (head <= tail) {
        // mid = (head + tail) >> 1;//计算中指针（head + tail可能超过安全整数范围）
        mid = head + (tail - head >> 1);//计算中指针（防止越界）
        if (arr[mid] === x) return mid;// 如果中指针的值就是查找的值
        else if (arr[mid] < x) head = mid + 1;//如果中指针的值小于要查找的值，调整头指针到中指针后一位
        else tail = mid - 1;//如果中指针的值大于要查找的值，调整尾指针到中指针的前一位
    }
    return -1;
}

/* 测试 */
let arr = new Array(10).fill(null).map(() => Math.random() * 10 >> 0).sort();
console.log(arr.join('      '))
let arr2 = [], arr3 = [], index = binary_search(arr, arr.length, 5);
if (index === -1) arr2.push(-1);
for (var i = 0; i <= index; i++) {
    if (i !== index) {
        arr3.push('  ')
        arr2.push('  ')
    }
    else {
        arr3.push(i);
        arr2.push('↑');
    }
}

console.log(arr2.join('     '))
console.log(arr3.join('     '))