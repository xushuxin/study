/*
 * MutationObserver：可以在DOM被修改时，异步执行回调  「不兼容IE6~10」
 *   + 等到当前所有DOM操作都结束后才触发（异步触发方式），而事件绑定是触发操作后立即执行
 *   + 把DOM变动记录封装成一个数组进行处理，而不是一条条地个别处理DOM变动
 *   + 即可以观察发生在DOM节点的所有变动，也可以观察某一类变动
 *   
 *   mob.observe([target],[options]) 监听DOM的改变
 *      + childList：子元素的变动
 *      + attributes：属性的变动
 *      + attributeOldValue：记录变动前的属性值
 *      + attributesFilter：需要观察的特定属性  例如：['class', 'index'...]
 *      + characterData：节点内容或节点文本的变动
 *      + characterDataOldValue：记录变动前的数据值
 *      + subtree：后代节点的变动
 *   mob.disconnect() 停止DOM的监听
 *   mob.takeRecord() 清除变动记录，即不再处理“未处理的变动”
 *     
 *   MutationRecord对象
 *      + type:观察的变动类型（attribute、characterData或者childList）
 *      + target:发生变动的DOM对象
 *      + addedNodes:新增的DOM对象
 *      + removeNodes:删除的DOM对象
 *      + previousSibling:前一个同级的DOM对象，如果没有则返回null
 *      + nextSibling:下一个同级的DOM对象，如果没有就返回null
 *      + attributeName:发生变动的属性，如果设置了attributeFilter，则只返回预先指定的属性
 *      + oldValue:变动前的值，这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null
 */


// 创建DOM监听器
let config = {
  childList: true,
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
  // subtree: true
};
let mob = new MutationObserver(records => {
  console.log('监听DOM变化', records);
});

// 具体的操作
let box = document.querySelector('.box');
mob.observe(box, config);

box.addEventListener('click', function() {
  console.log('BOX CLICK 1');
  // 属性变化
  this.classList.add('clearfix');
  this.id = 'box';
});
box.addEventListener('click', function() {
  console.log('BOX CLICK 2');
  // 子节点变化
  let link = document.createElement('a');
  link.innerHTML = '珠峰培训';
  this.appendChild(link);
});

document.body.addEventListener('click', function() {
  console.log('BODY CLICK');
});
