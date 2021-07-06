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
 * @return {number}
 */
//  广度遍历
var minDepth = function (root) {
    if (!root) return 0;
    let que = [root], count = 0;
    while (que.length) {
        let temp = [];
        count++;
        while (que.length) {
            let cur = que.shift();
            if (!cur.left && !cur.right) return count;
            if (cur.left) {
                temp.push(cur.left);
            }
            if (cur.right) {
                temp.push(cur.right);
            }
        }
        que = temp;
    }
};