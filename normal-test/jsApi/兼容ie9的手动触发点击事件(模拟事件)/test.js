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
  //推荐使用MouseEvent
  let event = new MouseEvent("click", {
    'view': window,
    'bubbles': true,
    'cancelable': true,
    'detail': 1
  });
  el.dispatchEvent(event);
  // var el = document.getElementById('clickTarget');
  // var mouseEvent = document.createEvent('MouseEvent');
  // mouseEvent.initMouseEvent('click', true, true, window, 1)
  // el.dispatchEvent(mouseEvent)

}