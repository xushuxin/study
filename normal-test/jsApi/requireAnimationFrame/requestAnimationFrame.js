/*
 * 定时器动画
 *   + setInterval/clearInterval
 *   + setTimeout/clearTimeout
 *  「弊端」
 *   + 容易出现卡顿、抖动的现象 「丢帧」
 *      + 定时器设定的等待执行时间是不可靠的
 *      + 不同设备的刷新频率不一样，我们设定的等待时间和刷新频率不一致
 *      
 * 扩展:屏幕刷新频率（图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数）
 *   + 60赫兹(Hz):显示器以每秒60次的频率不断的更新屏幕上的图像
 *   + 视觉停留效应:16.7MS
 * 
 * requestAnimationFrame/cancelAnimationFrame   「不兼容IE6~9」
 *   + 由系统来决定回调函数的执行时机
 *   + CPU节能:当页面被隐藏或最小化时,setTimeout仍然在处理中;requestAnimationFrame只有在页面处于激活状态下才会执行;
 *   + 函数节流:回调函数在屏幕每一次的刷新间隔中只被执行一次
 *   + requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，在隐藏或不可见的元素中，将不会进行重绘或回流...
 * 兼容处理：https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
 * 
 * requestIdleCallback:在浏览器的空闲时段内调用的函数，这样一些不重要的任务可以延后执行，防止页面卡顿
 *    + requestIdleCallback([callback],[options->timeout])
 *    + 只有新版浏览器(例如:Edge/Chrome/Firefox...)才支持
 */

let box = document.querySelector('.box'),
    minL = 0,
    maxL = document.documentElement.clientWidth - box.offsetWidth,
    direction = 'right',
    step = 10,
    timer = null;

function move() {
    // 获取当前的位置，在这个基础上，向左或者向右移动
    let curL = parseFloat(getComputedStyle(box)['left']);
    if (direction === 'right') {
        curL += step;
        if (curL >= maxL) {
            curL = maxL;
            direction = 'left';
        }
    } else {
        curL -= step;
        if (curL <= minL) {
            curL = minL;
            direction = 'right';
        }
    }
    box.style.left = `${curL}px`;

    timer = requestAnimationFrame(move);
}
// timer = setInterval(move, 16.7);
timer = requestAnimationFrame(move);