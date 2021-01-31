/**
 * 函数的节流：在一段频繁操作中，可以触发多次，但是触发频率由自己来定
 * @params
 *    func[function]:最后要触发执行的函数
 *    wait[number]:设定触发的频率
 * @return
 *    可以被调用执行的函数
 */

function throttle(func, wait = 300) {
  let timer = null,
    previous = 0; // 记录上一次操作的时间
  return function anonymous(...params) {
    let now = new Date(),
      remaining = wait - (now - previous); //记录还差多久达到我们一次触发的频率
    if (remaining <= 0) {
      // 两次操作的间隔时间已经超过wait了
      clearTimeout(timer);
      timer = null;
      previous = now;
      func.call(this, ...params);
    } else if (!timer) {
      // 两次操作的间隔时间还不符合触发的频率
      timer = setTimeout(() => {
        timer = null;
        previous = new Date();
        func.call(this, ...params);
      }, remaining);
    }
  };
}

//节流（自己的）
//每次执行时计算当前时间与上一次执行函数的时间的差值，如果差值小于我们指定的时间间隔，则设置定时器在差值时间后执行函数
function throttle(fn,time){
  let timer = null,prev = 0;
  return function (...params){
      let now = new Date;
      let remain = time - (now - prev);
      if(timer) return;//如果定时器还在，不要执行了，等定时器函数执行完成之后再执行
      if(remain>0){
        timer = setTimeout(()=>{
          fn.apply(this,params);
          timer = null;
          prev = new Date;
        },remain)
      }else {
        fn.apply(this,params);
        timer = null;
        prev = new Date;
      }
  }
}
// =================test===================

function handle() {
  console.log('OK');
}
// window.onscroll = handle; //每一次滚动过程中，浏览器有最快反应时间(5~6ms 13~17ms)，只要反应过来就会触发执行一次函数（此时触发频率5ms左右）
window.onscroll = throttle(handle); // 我们控制频率为300ms触发一次
// window.onscroll = function anonymous() {}; //每隔5ms触发一次匿名函数,我们自己可以匿名函数中控制执行handle的频率