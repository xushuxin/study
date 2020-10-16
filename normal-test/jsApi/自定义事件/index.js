/* 
 * 自定义DOM事件
 *   + document.createEvent('CustomEvent') 
 *   或者 new CustomEvent('event_name',{'detail':xxx})
 */
let box = document.querySelector('.box');

// 创建自定义事件
let ev = document.createEvent('CustomEvent');
ev.initCustomEvent('zhufeng', false, true, {
  clientX: 10,
  clientY: 20
});

document.body.addEventListener('zhufeng', ev => {
  console.log('BODY', ev);
});

box.addEventListener('zhufeng', ev => {
  console.log('box', ev);
});

setTimeout(() => {
  box.dispatchEvent(ev);
}, 1000);