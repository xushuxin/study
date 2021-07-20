/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
    // 1.前缀和数组
    let sum = [0];
    for (let i = 0; i < nums.length; i++) {
        sum[i + 1] = sum[i] + nums[i];
    }
    // 2.遍历前缀和数组
    let q = [0], pos = -1, ans = -1;
    for (let i = 1; i < sum.length; i++) {
        // 以当前前缀和结尾，求出最后一个符合条件的索引pos
        while (q.length && sum[i] - sum[q[0]] >= k) {
            pos = q.shift();
        }
        // 当前的i - pos 与 上个ans进行对比，取更小的ans
        if (pos !== -1 && (i - pos < ans || ans === -1)) {
            ans = i - pos;
        }

        // 维护一个递增序列
        while (q.length && sum[i] < sum[q[q.length - 1]]) q.pop();
        q.push(i);
    }
    return ans;
};