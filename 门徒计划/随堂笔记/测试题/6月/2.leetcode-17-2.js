/**
 * @param {string} digits
 * @return {string[]}
 */
//  深搜
var letterCombinations = function (digits) {
    let map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
    let ret = [];
    dfs('', 0, map, digits, ret);
    return ret;
};
function dfs(cur, n, map, digits, ret) {
    if (!digits.length) return;
    if (cur.length === digits.length) return ret.push(cur);
    let str = map[digits[n]];
    for (let c of str) {
        dfs(cur + c, n + 1, map, digits, ret)
    }
    return cur
}