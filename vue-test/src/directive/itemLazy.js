/**
 * 实现懒加载元素
 * 使用：在需要懒加载的图片上添加 v-xxx（xxx由自己注册指令时的命名决定）
 * 效果：元素到临界值且未出现在可视区时会加载该图片（默认图片替换为网络资源）
 */
//创建一个监听器
let observer = new IntersectionObserver((entries) => {
  //entries 是所有被监听对象的集合
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      //当被监听元素到临界值且未加载图片时触发
      !entry.target.isLoaded && showItem(entry.target, entry.target.originEl)
    }
  })
})

function showItem(el, originEl) {
  console.log('加载了元素')
  el.parentNode.replaceChild(originEl, el);
  el.isLoaded = true;
}
export default {
  inserted(el) {
    // console.log('类名', ...el.classList)
    // let placeNode = document.createElement(el.tagName)
    // placeNode.style.cssText = el.style.cssText;
    // placeNode.classList.add(...el.classList);
    let placeNode = el.cloneNode(false); //仅克隆节点本身，不包括子节点
    console.log(placeNode)
    el.parentNode.replaceChild(placeNode, el);
    placeNode.originEl = el;
    observer.observe(placeNode);
  },
  unbind(el) {
    //停止监听
    observer.observe(el);
  }
}