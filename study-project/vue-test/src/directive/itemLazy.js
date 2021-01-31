/**
 * 实现懒加载元素
 * 使用：在需要懒加载的元素上添加 v-xxx（xxx由自己注册指令时的命名决定）
 * 效果：元素到临界值且未出现在可视区时显示的是一个空的外层标签，没有内容
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
  //停止监听
  observer.unobserve(el);
}
export default {
  inserted(el) {
    let placeNode = el.cloneNode(false); //仅克隆节点本身外层标签及属性，不包括子节点
    console.log(placeNode)
    el.parentNode.replaceChild(placeNode, el); //用空标签替换原始元素占位
    placeNode.originEl = el; //保存原始元素
    observer.observe(placeNode);
  }
}