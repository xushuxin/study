/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 1. 递归的过程中对当前项的可能性进行枚举
//    递归的结束条件：数组遍历完成
// 2. 回溯过程中统计下一层中符合条件的结果，并将结果传给上一层
// 3. 提高查找效率：记忆化，存储函数的结果
let hash_map = new Map();
let hash_func = (i, target) => {
    return i + '-' + target;
};
var findTargetSumWays = function (nums, target) {
    hash_map.clear();//每次查找需要清空哈希表
    return dfs(0, target, nums)
};
var dfs = function (i, target, nums) {
    if (i === nums.length) return target === 0;
    let hash_index = hash_func(i, target);
    if (hash_map.has(hash_index)) return hash_map.get(hash_index);
    var ans = 0;
    ans += dfs(i + 1, target - nums[i], nums);//+ 
    ans += dfs(i + 1, target + nums[i], nums);//-
    hash_map.set(hash_index, ans);
    return ans;
}
