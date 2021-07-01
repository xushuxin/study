/**
 * @param {string} digits
 * @return {string[]}
 */
//  广搜
//  状态是当前拼接成的字母字符串和输入的数字字符串的长度
var letterCombinations = function (digits) {
    let map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
    let que = [''], ret = [];
    for (let i = 0; i < digits.length; i++) {
        let levelLen = que.length;
        for (let j = 0; j < levelLen; j++) {
            let cur = que[j];
            let str = map[digits[i]];
            for (let c of str) {
                //符合要求的数字
                if ((cur + c).length === digits.length) ret.push(cur + c);
                que.push(cur + c);
            }
        }
    }
    return ret;
};