/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
    if (grid[0][0] === 1) return -1;
    var m = grid.length, n = grid[0].length;
    var vis = [], queue = [], direct = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    initQueue(queue, m, n, vis, grid);

    while (queue.length) {
        let cur = queue.shift();
        if (cur.x === m - 1 && cur.y === n - 1) return cur.d;
        for (let i = 0; i < 8; i++) {
            let x = cur.x + direct[i][0];
            let y = cur.y + direct[i][1];
            if (x < 0 || y < 0 || x >= m || y >= n) continue;//边界
            if (grid[x][y]) continue;//条件判断
            if (vis[x][y]) continue;//判重
            vis[x][y] = 1;
            queue.push({ x, y, d: cur.d + 1 })
        }
    }
    return -1;
};
var initQueue = function (queue, m, n, vis, grid) {
    for (let i = 0; i < m; i++) {
        vis[i] = [];
        for (let j = 0; j < n; j++) {
            vis[i].push(0);
        }
    }
    queue.push({ x: 0, y: 0, d: 1 });
}