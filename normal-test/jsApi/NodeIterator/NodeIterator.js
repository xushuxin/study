/*
 * NodeIterator和TreeWalker：基于给定的起点对DOM结构进行深度优先（depth-first）的遍历操作  「不兼容IE6~8」
 *  「NodeIterator」
 *     + var nodeIterator = document.createNodeIterator(root, whatToShow, filter)
 *         + root:遍历根节点的节点
 *         + whatToShow:要访问哪些节点的数字代码（NodeFilter定义这些掩码）
 *         + filter:过滤函数或者对象，表示是否接收或跳过特定的节点
 *     + NodeFilter
 *         + SHOW_ALL 显示所有类型的节点 
 *         + SHOW_ELEMENT 显示元素节点
 *         + SHOW_TEXT 显示文本节点
 *         + SHOW_COMMENT 显示注释节点
 *         + ...
 *         whatToShow=NodeFilter.SHOW_ALL
 *         whatToShow=NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT
 *     + 过滤器
 *     + 方法 NodeIterator.previousNode()/NodeIterator.nextNode()
 *  「TreeWalker」
 *     + 他是NodeIterator的进阶版，返回的实例中除了支持nextNode/previousNode之外，还提供了
 *         + firstChild
 *         + lastChild
 *         + parentNode
 *         + nextSibling
 *         + previousSibling
 *     + 其余语法和NodeIterator基本一致
 */
let course = document.querySelector('.course');
// let course = document.documentElement;


/* let iterator = document.createNodeIterator(course, NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
let node = iterator.nextNode();
while (node !== null) {
  console.log(node);
  node = iterator.nextNode();
} */


//filter对象的acceptNode方法会对遍历的每一个节点调用一次
/*const filter = {
    acceptNode(node) {
        return node.tagName === "LI" ?
            NodeFilter.FILTER_ACCEPT :
            NodeFilter.FILTER_SKIP;
    }
}; */
//可以用一个简单的回调函数代替acceptNode()
const filter = node => {
  //FILTER_ACCEPT: 接受该节点
  //FILTER_REJECT: 跳过该节点包括其子节点
  //FILTER_SKIP: 跳过该节点但不包括其子节点
  //console.log(NodeFilter.FILTER_ACCEPT)//1
  //console.log(NodeFilter.FILTER_REJECT)//2
  //console.log(NodeFilter.FILTER_SKIP)//3
  return node.tagName === "LI" ?
    NodeFilter.FILTER_ACCEPT :
    NodeFilter.FILTER_SKIP;
};
let iterator = document.createNodeIterator(course, NodeFilter.SHOW_ELEMENT, filter);
let node = iterator.nextNode();
while (node !== null) {
  console.log(node);
  node = iterator.nextNode();
}