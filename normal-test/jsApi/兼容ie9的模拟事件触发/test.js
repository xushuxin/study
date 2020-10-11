/* 
 * JS中的模拟事件触发:无需手动操作，也可以基于一些代码触发事件「不兼容IE6~8」
 *   + createEvent 创建事件对象 「DOM2中事件参数是“复数”，DOM3中是“单数”」
 *      + MouseEvent
 *      + KeyboardEvent 「DOM3新增」
 *      + Event
 *      + ...
 *   + initMouseEvent/initKeyboardEvent/initEvent 模式事件对象数据
 *      + type 事件类型
 *      + bubbles 是否冒泡传播
 *      + cancelable 事件是否可以取消
 *      + ...
 *   + dispatchEvent 手动触发事件 
 * 
 * 自定义DOM事件
 *   + document.createEvent('CustomEvent') 或者 new CustomEvent('event_name',{'detail':xxx})
 */
(function(window) {
  try {
    new MouseEvent('test');
    return false; // No need to polyfill
  } catch (e) {
    // Need to polyfill - fall through
  }

  // Polyfills DOM4 MouseEvent
  var MouseEventPolyfill = function(eventType, params) {
    params = params || { bubbles: false, cancelable: false };
    var mouseEvent = document.createEvent('MouseEvent');
    mouseEvent.initMouseEvent(eventType,
      params.bubbles,
      params.cancelable,
      window,
      params.detail || 1,
      params.screenX || 0,
      params.screenY || 0,
      params.clientX || 0,
      params.clientY || 0,
      params.ctrlKey || false,
      params.altKey || false,
      params.shiftKey || false,
      params.metaKey || false,
      params.button || 0,
      params.relatedTarget || null
    );

    return mouseEvent;
  }

  MouseEventPolyfill.prototype = Event.prototype;

  window.MouseEvent = MouseEventPolyfill;
})(window);
//===========test============
document.body.onclick = function() {
  e = arguments[0];
  console.log(e.target)
  var dt = e.target,
    stag = dt.tagName.toLowerCase();
  document.getElementById("clickTarget").innerHTML = stag;
};
window.onload = function() {
  var el = document.getElementById('clickTarget');
  // DOM0事件绑定
  el.onclick = function(ev) {
    console.log('DOM0 CLICK', ev);
  };
  // DOM2事件绑定：事件池
  el.addEventListener('click', function(ev) {
    console.log('DOM2 CLICK', ev);
  });
  //推荐使用MouseEvent
  let event = new MouseEvent("click", {
    'view': window,
    'bubbles': true, //事件是否冒泡
    'cancelable': true, //事件能否被取消
    'detail': 1 //首次派发时触发一次事件
  });
  el.dispatchEvent(event);
  //以下方式不推荐使用(initMouseEvent:该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性)
  // var el = document.getElementById('clickTarget');
  // // 1.创建事件对象
  // var mouseEvent = document.createEvent('MouseEvent');
  // mouseEvent.initMouseEvent('click', true, true, window, 1)
  // // 2.自动触发事件 
  // el.dispatchEvent(mouseEvent)

}