// 维护单调递减队列
var maxSlidingWindow = function (nums, k) {
    let que = [], ans = [], n = nums.length;
    for (let i = 0; i < n; i++) {
        while (que.length && nums[que[que.length - 1]] < nums[i]) que.pop();
        que.push(i);
        if (i - que[0] === k) que.shift();//队首元素在窗口范围之外时需要移除
        if (i + 1 >= k) ans.push(nums[que[0]]);//不足k个元素时跳过
    }
    return ans;
};