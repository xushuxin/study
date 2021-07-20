/**
 * @param {number[]} numbers
 * @return {number}
 */
//  二分查找
var minArray = function (numbers) {
    let head = 0, tail = numbers.length, mid;
    while (head < tail) {
        mid = head + (tail - head >> 1);
        //如果mid的值小于右非降序数组的最后一个，说明mid在右数组，最小数字一定在mid或者其左侧
        if (numbers[mid] < numbers[tail]) {
            tail = mid;
            // 如果mid的值大于右排序数组的最后一个，说明mid在左数组，最小数字一定在mid右侧
        } else if (numbers[mid] > numbers[tail]) {
            head = mid + 1;
        } else {//相等
            tail--;
        }
    }
    return numbers[head];
};