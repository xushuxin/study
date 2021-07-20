var distributeCandies = function (candyType) {
    let s = new Set(candyType);//去重
    let len = s.size;
    // 如果去重后的糖果数量小于等于全部糖果数量的一半,直接返回去重后的糖果的数量
    if (len <= candyType.length >> 1) {
        return len;
    } else {//否则去重后的糖果数量大于全部糖果数量的一半，直接返回全部糖果数量的一半
        return candyType.length >> 1
    }
};