/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
class Data {
    constructor(x, y, d) {
        this.x = x; this.y = y; this.d = d;
    }
}
var movingCount = function (m, n, k) {
    let store = new Set();
    let que = [], direct = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let ans = 0;
    store.add(0)
    que.push(new Data(0, 0));
    while (que.length) {
        let cur = que.shift();
        ans += 1; //如果要统计广搜过程中的所有经过的面积，只需要在每次从队列中拿出元素时进行累加1即可
        for (let i = 0; i < 4; i++) {
            let x = cur.x + direct[i][0];
            let y = cur.y + direct[i][1];
            if (x < 0 || y < 0 || x >= m || y >= n) continue;
            if ((x / 10 >> 0) + (x % 10) + (y / 10 >> 0) + (y % 10) > k) continue;
            if (store.has(x * n + y)) continue;
            store.add(x * n + y);
            que.push(new Data(x, y));
        }
    }
    return ans;
};