/**
 * 函数的防抖：对于频繁触发某个操作，我们只识别一次（只触发一次函数）
 * @params
 *    func[function]:最后要触发执行的函数
 *    wait[number]:设定"频繁"的界限
 *    immediate[boolean]:默认多次操作，我们只识别最后一次，但是immediate=true,让其识别第一次
 * @return
 *    可以被调用执行的函数
 */
/* 主体思路：在当前点击完成之后，我们等wait这么长的事件，看是否还会触发第二次，如果没有触发第二次，属于非频繁操作，我们直接执行想要执行的函数func;如果触发了第二次，则之前的点击不算，从当前这次再开始等待 */
function debounce(func, wait = 300, immediate = false) {
  let timer;
  return function anonymous(...params) {
    let now = immediate && !timer; //没有定时器时，为初始状态

    //每次点击，如果有定时器，会被清除（如果wait时间内重复点击了，会清除原先的定时器）
    clearTimeout(timer);

    timer = setTimeout(() => { //设置一个定时器，wait ms后执行func
      timer = null; //手动回归初始状态
      !immediate && func.call(this, ...params)
    }, wait)
    now && func.call(this); //初始状态点击立即执行
  }
}
// =================test===================
button.onclick = debounce(function() {
  console.log('我被点击了')
}, 1000, true)