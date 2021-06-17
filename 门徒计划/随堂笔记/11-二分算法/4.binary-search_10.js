/**
 * 二分查找 - 10泛型
 * 「1111111000000」查找最后一个出现的1的索引
 * 可以转化为查找第一个出现的0的索引，索引减1就是最后一个1的索引
 * 0对应的是不满足条件，1对应的是满足条件
 * @param {待查找数组} arr 
 * @param {待查找数组的长度} n 
 * @param {待查找元素} x 
 */
function binary_search_10(arr, n, x) {
    // 定义三个指针，头、尾、中
    let head = 0, tail = n - 1, mid;
    while (head < tail) {
        // mid = (head + tail) >> 1;//计算中指针（head + tail可能超过安全整数范围）
        mid = head + (tail - head >> 1);//计算中指针（防止越界）
        if (arr[mid] < x) head = mid + 1;//如果中指针的值是1(满足条件)，调整头指针到中指针后一位
        else tail = mid;//如果中指针的值是0（不满足），调整尾指针到中指针的位置（这个0的前一位有可能就是我们要找到那个1）
    }
    // 这里head === tail，head和tail都指向第一个不满足条件的，减1就是最后一个满足条件的
    return head - 1;
}

/* 测试 */
let arr = new Array(10).fill(null).map(() => Math.random() * 10 >> 0).sort();
let x = 5
console.log(`查找最后一个小于${x}的数的索引：`);
console.log(arr.join('      '))
let arr2 = [], arr3 = [], index = binary_search_10(arr, arr.length, x);
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