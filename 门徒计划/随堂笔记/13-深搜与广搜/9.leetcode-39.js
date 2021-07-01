/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 这道题的状态是当前选择的数字以及剩余目标和
// 每个数字都有选取和不选取两种，任意组合的过程中记录达到目标值的组合即可
var combinationSum = function (candidates, target) {
    let buff = [], ret = [];
    dfs(0, target, candidates, buff, ret);
    return ret;
};
var dfs = function (ind, target, candidates, buff, ret) {
    if (target < 0) return;
    if (target === 0) {
        ret.push([...buff]);
        return;
    }
    if (ind === candidates.length) return;

    dfs(ind + 1, target, candidates, buff, ret);//不选取当前的数
    buff.push(candidates[ind]);
    dfs(ind, target - candidates[ind], candidates, buff, ret);//选取当前的数(可重复选取)
    buff.pop();
};