/**
 * 实现懒加载图片
 * 使用：在需要懒加载的元素上添加 v-xxx（xxx由自己注册指令时的命名决定）
 * 效果：元素到临界值且未出现在可视区时会加载该元素(生成改元素)
 */
import baseImg from 'img/default-image.png';

//创建一个监听器
let observer = new IntersectionObserver((entries) => {
  //entries 是所有被监听对象的集合
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      //当被监听元素到临界值且未加载图片时触发
      !entry.target.isLoaded && showImage(entry.target, entry.target.dataset.src)
    }
  })
})

function showImage(el, imgSrc) {
  console.log('加载了图片')
  el.src = imgSrc;
  el.isLoaded = true;
  //停止监听该元素
  observer.unobserve(el);
}
export default {
  inserted(el, binding) {
    el.src = baseImg;
    el.dataset.src = binding.value;
    observer.observe(el);
  }
}