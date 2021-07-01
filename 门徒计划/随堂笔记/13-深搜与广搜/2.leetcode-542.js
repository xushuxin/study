/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 先初始化一个二维数组，用于统计每个位置距离最近的0的距离的，初始化为每个位置都是-1，表示该位置还没有没遍历过
// 然后再把所有的0添加到vis数组
//然后开始层序遍历（利用队列），每遍历一个点都可以向上下左右四个方向扩展一层，每扩展一层，代表距离加1（边界判断）
// 方向数组direct用于扩展下一层
class Data {
    constructor(x, y, k) {
        this.x = x;
        this.y = y;
        this.k = k;
    }
}

var updateMatrix = function (mat) {
    var m = mat.length, n = mat[0].length;
    let queue = [];
    let vis = [];
    let direct = [[0, -1], [0, 1], [1, 0], [-1, 0]];//上下左右四方向
    initQueue(queue, mat, m, n, vis);//初始化队列

    while (queue.length) {
        let cur = queue.shift();
        //对当前点的上下左右四个方向的下个点进行判断和统计信息
        for (let i = 0; i < 4; i++) {
            let x = cur.x + direct[i][0];
            let y = cur.y + direct[i][1];
            // 边界判断
            if (x < 0 || x >= m) continue;
            if (y < 0 || y >= n) continue;
            // 已统计过的点直接跳过
            if (vis[x][y] !== -1) continue;
            vis[x][y] = cur.k + 1;//统计0距离下一个位置的距离
            queue.push(new Data(x, y, cur.k + 1));//将下一个位置的信息放入队列
        }
    }
    return vis;
};
var initQueue = function (queue, mat, m, n, vis) {
    // 初始化每个位置的距离为-1
    for (let i = 0; i < m; i++) {
        vis[i] = [];
        for (let j = 0; j < n; j++) {
            vis[i].push(-1);
        }
    }


    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j]) continue;
            queue.push(new Data(i, j, 0));//将所有的0的信息放入队列
            vis[i][j] = 0;// 统计每个0位置的距离自身的距离
        }
    }
}