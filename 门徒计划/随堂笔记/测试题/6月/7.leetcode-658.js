
//  二分查找
var findClosestElements = function (arr, k, x) {
    let low = 0, high = arr.length - 1, mid;
    while (low < high) {
        mid = low + (high - low >> 1);
        x - arr[mid] > arr[mid + k] - x ? low = mid + 1 : high = mid;
    }
    return arr.slice(low, low + k);
};