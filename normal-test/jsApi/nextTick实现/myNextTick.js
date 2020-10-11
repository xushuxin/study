var _global = new Function('return this')();
console.log(_global);
let callbacks = [];

function flushCallback() {
  callbacks.forEach(cb => cb())
}

function nextTick(cb) {
  callbacks.push(cb);
  let timeFunc = function() {
    flushCallback();
  }
  if (typeof Promise !== 'undefined') {
    return Promise.resolve().then(timeFunc)
  }
  if (typeof MutationObserver !== 'undefined') {
    let observer = new MutationObserver(timeFunc);
    let textNode = document.createTextNode(1);
    observer.observe(textNode, { characterData: true });
    textNode.textContent = 2;
    return;
  }
  if (typeof setImmediate !== 'undefined') {
    return setImmediate(timeFunc)
  }
  setTimeout(timeFunc, 0);
}

function test(cb) {
  _global.Promise = undefined;
  nextTick(cb);
}
test(() => {
  console.log(1)
})