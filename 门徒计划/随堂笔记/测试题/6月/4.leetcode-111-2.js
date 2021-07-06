// 深度遍历
var minDepth = function (root) {
    if (!root) return 0;
    let left = minDepth(root.left);
    let right = minDepth(root.right);
    //考虑只有一边有子树的情况
    if (left === 0) return right + 1;
    if (right === 0) return left + 1;
    return Math.min(left, right) + 1;
};