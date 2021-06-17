// 基准值三点取中间
// 大数据切分成多个小数据，小数据使用插入排序

let threshold = 16;
// 三个值取中间的（保证 a < c, a < b, b < c 返回b即可）
const getMid = function (a, b, c) {
    let temp;
    if (a > b) { // a <=> b
        temp = a;
        a = b
        b = temp;
    }
    if (a > c) { // a <=> c
        temp = a;
        a = c;
        c = temp;
    }

    if (b > c) { // b <=> c
        temp = b;
        b = c;
        c = temp;
    }
    return b;
}

const swap = function (arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function __quick_sort_v3(arr, l, r) {
    // 当数组长度大于16，使用快速排序切分成多个长度为16的数组
    while (r - l > threshold) {
        let x = l, y = r, base = getMid(arr[l], arr[(l + r) / 2 >> 0], arr[r]);
        do {
            while (arr[x] < base) x++;//从左到右找小于base的值，找到时停止循环 x 为找到的值的索引
            while (arr[y] > base) y--;//从右到左找大于base的值，找到时停止循环 y 为找到的值的索引

            if (x <= y) {//如果两个查找指针未交叉过，说明需要进行正常的交换（交叉说明至少有一边是没有查找到需要的值的）
                swap(arr, x, y);
                x++, y--;//继续分别从下一个索引开始查找
            }
        } while (x <= y);

        __quick_sort_v3(arr, x, r);//右半部分继续递归处理
        r = y;//左半部分利用循环处理
    }
    return;

}

/* 插入排序 */
function final_insert_sort(arr, l, r) {
    let indx = l;//假设的最小值索引，从0开始

    //遍历数组，找出数组中最小值的索引
    for (let i = l + 1; i <= r; i++) {
        if (arr[i] < arr[indx]) indx = i;
    }

    //如果最小值的索引大于0，将最小值一步一步和前面的值交换，往前挤
    while (indx > l) {
        swap(arr, indx, indx - 1);
        indx--;
    }
    //到这，第一位一定是数组中的最小值

    //从第三位（第二位也会操作到）开始，遍历数组，将数组从小到大排序
    for (let i = l + 2; i <= r; i++) {
        let j = i;
        //如果当前位的值比前一位大的，交换当前位置和前一位的值，一直到最小值放到第二位
        while (arr[j] < arr[j - 1]) {
            swap(arr, j, j - 1);
            j--;
        }
    }

    return;
}

function quick_sort_v3(arr, l, r) {
    __quick_sort_v3(arr, l, r);//数量超过16时，快速排序将数组切分为多个小数组（16为一个区间）
    final_insert_sort(arr, l, r);//插入排序
}

var arr = [3, 5, 2, 7, 6, 9, 1, 3, 2, 7, 0, 3, 6];
quick_sort_v3(arr, 0, arr.length - 1)
console.log(arr)