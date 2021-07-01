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
// 广搜
// 1. 使用队列存储需要的信息
// 2. 依次从队列的头部取出元素进行判断，并存储下一层的信息
var isCousins = function (root, x, y) {
    let queue = [], d1, d2, father_x, father_y;
    queue.push(new Data(root, 0, null));
    while (queue.length) {
        let cur = queue.shift();
        if (cur.node.val === x) {
            d1 = cur.depth;
            father_x = cur.father;
        } else if (cur.node.val === y) {
            d2 = cur.depth;
            father_y = cur.father;
        }
        if (cur.node.left) queue.push(new Data(cur.node.left, cur.depth + 1, cur.node));
        if (cur.node.right) queue.push(new Data(cur.node.right, cur.depth + 1, cur.node));
    }
    return d1 === d2 && father_x !== father_y;
};
