/**原生 js实现图片懒加载 */
export function lazyLoad({ preview = 1 }) {
  var imgs;

  //用来判断bound.top<=clientHeight的函数，返回一个bool值
  function isIn(el) {
    var bound = el.getBoundingClientRect();
    var clientWidth = window.innerWidth;
    var clientHeight = window.innerHeight;
    return bound.left <= clientWidth && bound.top <= clientHeight;
  }
  var event = {
    $on(eventName, callback) {
      this[eventName] = this[eventName] || [];
      this[eventName].push(callback); //把回调函数存到属性中(列表)
      console.log(this[eventName])
    },
    $emit(eventName) {
      this[eventName].forEach(item => item())
    }
  }

  event.$on('changeAttr', function() {
    console.log('属性修改')
    check();
  })

  /**
   * 观察具有 transform 属性的元素，当其值发生修改时，check
   * attrChangeFunc 触发属性修改时调用的函数
   */
  function observe(el, attrChangeFunc) {
    // 选择需要观察变动的节点
    const targetNode = el;

    // 观察器的配置（需要观察什么变动:属性，子节点的添加和删除，子节点的属性变化）
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    // 当观察到变动时执行的回调函数
    const callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          init();
          console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
          // console.log(mutation)
          attrChangeFunc();
          // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
      }
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);

    // 之后，可停止观察
    // observer.disconnect();
    window.onunload = function() { //onunload触发
      observer.disconnect();
    }
  }

  //检查图片是否在可视区内，如果不在，则加载
  function check() {
    imgs && Array.from(imgs).forEach(function(el) {
      if (isIn(el)) {
        loadImg(el);
      }
    })
  }

  function loadImg(el) {
    if (!el.isLoaded) {
      var source = el.dataset.src;
      console.log("加载了图片：", source)
      el.src = source;
      el.isLoaded = true;
    }
  }

  function init() {
    imgs = document.querySelectorAll('img.lazy-load');
    // check();
  }
  init();
  //监视页面所有元素是否发生属性修改
  observe(document.documentElement || document.body, () => event.$emit('changeAttr'))
  window.onscroll = function() { //onscroll页面滚动触发
    check();
  }
}