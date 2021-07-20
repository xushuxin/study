// 哈希表 + 深搜 + 记忆化 
var findMinHeightTrees = function (n, edges) {
    // 哈希表记录每个点的所有相连节点
    let map = new Map();

    for (let i = 0; i < n; i++) {
        map.set(i, new Set)
    }
    for (let x of edges) {
        map.get(x[0]).add(x[1]);
        map.get(x[1]).add(x[0]);
    }

    let minDep = 20001, ans = [],
        memo = new Map();;//memo用于记忆化，存储dfs结果
    for (let i = 0; i < n; i++) {
        let depth = dfs(memo, map, i, i);
        if (depth < minDep) {
            ans = [i];
            minDep = depth;
        } else if (depth === minDep) {
            ans.push(i);
        }
    }
    return ans;
}

// 深搜
function dfs(memo, map, i, root) {
    if (memo.has(hash_func(i, root))) return memo.get(hash_func(i, root));
    let depth = -1;
    for (let x of map.get(i)) {
        if (x === root) continue;//root用于防止重复遍历当前节点  
        depth = Math.max(depth, dfs(memo, map, x, i))//深搜的过程中找出最大深度
    }

    memo.set(hash_func(i, root), depth + 1);
    return depth + 1;
}
function hash_func(a, b) {
    return a + '-' + b;
}
