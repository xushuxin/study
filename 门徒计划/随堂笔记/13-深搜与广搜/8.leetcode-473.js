/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
// 1. 初始化一个数组作为容器，长度为4代表四个桶，初始化每个桶的深度为火柴总长度的1/4（如果对4取余不为0，直接返回false）
// 2. 将火柴数组从高到低排序，从最高的火柴开始依次放入桶中
// 3. 如果火柴的长度大于剩余桶深度，跳过这个桶
// 4. 如果火柴的长度等于剩余桶深度(如果火柴的长度 + 火柴数组中最短的火柴) 小于等于 桶的深度，放入桶，继续查找下一根火柴
// 5. 如果发现火柴无论怎么放都没办法正好等于桶深度，把当前桶所有放入的火柴全部取出来，尝试下一个桶
// 6. 如果火柴能全部被放入桶中，代表可以满足题目要求
var makesquare = function (matchsticks) {
    let sum = matchsticks.reduce((total, item) => total + item, 0);
    if (sum % 4) return false;
    let arr = new Array(4).fill(sum / 4);
    matchsticks.sort((a, b) => b - a);
    return dfs(0, matchsticks, arr);
};
var dfs = function (ind, ms, arr) {
    if (ind === ms.length) return true;
    for (let i = 0; i < 4; i++) {
        if (arr[i] < ms[ind]) continue;
        if (arr[i] === ms[ind] || arr[i] >= ms[ind] + ms[ms.length - 1]) {
            arr[i] -= ms[ind];
            if (dfs(ind + 1, ms, arr)) return true;//如果最终的结果是true返回true
            arr[i] += ms[ind];//否则拿出火柴，还原桶深度（尝试下一个桶）
        }
    }
    return false;
}