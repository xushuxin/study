var MaxQueue = function () {
    this.q = [];//队列
    this.mq = [];//单调递减队列
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
    if (this.mq.length === 0) return -1;
    return this.mq[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
    this.q.push(value);
    while (this.mq.length && value > this.mq[this.mq.length - 1]) this.mq.pop();
    this.mq.push(value);
    return;
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
    if (this.q.length === 0) return -1;
    if (this.q[0] === this.mq[0]) this.mq.shift();//删除队首元素时，判断在单调队列中是否存在，如果存在则删除
    return this.q.shift();
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */