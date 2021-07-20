/**
 * 二分查找 - 01泛型 + 最后几步用顺序查找
 * 「000001111111」查找第一个出现的1的索引
 * 0对应的是不满足条件，1对应的是满足条件
 * @param {待查找数组} arr 
 * @param {待查找数组的长度} n 
 * @param {待查找元素} x 
 */
function binary_search_01(arr, n, x) {
    // 定义三个指针，头、尾、中
    let head = 0, tail = n - 1, mid;
    while (tail - head > 3) {//左右指针距离大于3时使用二分查找
        // mid = (head + tail) >> 1;//计算中指针（head + tail可能超过安全整数范围）
        mid = head + (tail - head >> 1);//计算中指针（防止越界）
        if (arr[mid] < x) head = mid + 1;//如果中指针的值是0，调整头指针到中指针后一位
        else tail = mid;//如果中指针的值是1，调整尾指针到中指针的位置（这个1有可能就是我们要找到那个）
    }

    for (let i = head; i <= tail; i++) {//间距等于3时，使用顺序查找
        if (arr[i] >= x) return i;
    }
}

/* 测试 */
let arr = new Array(10).fill(null).map(() => Math.random() * 10 >> 0).sort();
let x = 5
console.log(`查找第一个大于等于${x}的数的索引：`);
console.log(arr.join('      '))
let arr2 = [], arr3 = [], index = binary_search_01(arr, arr.length, x);
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