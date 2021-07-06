/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {

    // 求出可能组合成结果的数的数组
    let nums = [];
    let i = 1;
    while (i ** 2 <= n) {
        nums.push(i ** 2);
        i++;
    }

    // 广度遍历，特殊点在于每层将之前的求和给覆盖
    let que = new Set([0]), count = 0;
    while (que.size) {
        let temp = new Set();
        count++;//每一层count+1
        for (let x of que) {//遍历当前层
            for (let y of nums) {
                let add = x + y;//组合各种求和的结果
                if (add === n) return count;//最先达到和为n的count最小
                temp.add(add);
            }
        }
        que = temp;//替换累加和为至当前层的累加和
    }
};