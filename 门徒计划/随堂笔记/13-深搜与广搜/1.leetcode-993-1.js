/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
// 深搜
// 重点：
//1.向下递归查找过程中需要更新记录父节点的地址，用于最后判断非同父节点
//2.深度在回溯过程中不断累加
var isCousins = function (root, x, y) {
    let father_x = { ref: null }, father_y = { ref: null };
    let d1 = dfs(root, x, father_x);
    let d2 = dfs(root, y, father_y);
    return d1 === d2 && father_x.ref !== father_y.ref;
};
var dfs = function (root, x, father) {
    if (root === null) return -1;
    if (root.val === x) return 0;
    father.ref = root;
    let d;
    d = dfs(root.left, x, father);
    if (d !== -1) return d + 1;
    father.ref = root;
    d = dfs(root.right, x, father);
    if (d !== -1) return d + 1;
    return -1;
};
