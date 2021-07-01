/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 1. 先查找四条件以及和四条边相邻的O，将它们都值为o
// 2. 然后再遍历整个矩阵，把剩余的O替换为X，o替换为O
var solve = function (board) {
    let m = board.length, n = board[0].length;
    for (let i = 0; i < m; i++) {
        if (board[i][0] === 'O') dfs(i, 0, board, m, n);
        if (board[i][n - 1] === 'O') dfs(i, n - 1, board, m, n);
    }
    for (let j = 0; j < n; j++) {
        if (board[0][j] === 'O') dfs(0, j, board, m, n);
        if (board[m - 1][j] === 'O') dfs(m - 1, j, board, m, n);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';
            else if (board[i][j] === 'o') board[i][j] = 'O';
        }
    }
};
var dfs = function (x, y, board, m, n) {
    board[x][y] = 'o';
    let direct = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let i = 0; i < 4; i++) {
        let x2 = x + direct[i][0];
        let y2 = y + direct[i][1];
        if (x2 < 0 || y2 < 0 || x2 >= m || y2 >= n) continue;
        if (board[x2][y2] !== 'O') continue;
        dfs(x2, y2, board, m, n);
    }
}