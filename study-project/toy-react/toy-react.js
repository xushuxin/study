class ElementWrapper{
  constructor(type){
    this.root = document.createElement(type);
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value);
  }
  appendChild(component){
    this.root.appendChild(component.root);
  }
}
class TextWrapper{
  constructor(content){
    this.root = document.createTextNode(content);
  }
}

export class Component{
  constructor(){
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(name,value){
    this.props[name] = value;
  }
  appendChild(component){
    this.children.push(component)
  }
  get root(){
    if(!this._root){
      this._root = this.render().root;
    }
    return this._root;
  }
}
export function createElement(type,attributes,...children){
  let el ;
  //当type是string，当做标签名来创建元素节点
  if(typeof type === 'string'){
    el = new ElementWrapper(type);
  }else{
    //否则是自定义类
    el = new type;
  }
  for(let a in attributes){
    el.setAttribute(a,attributes[a]);
  }
  let insertChildren = (children) => {
    for(let c of children){
      typeof c === 'string' ? c = new TextWrapper(c):null;//字符串则创建一个文本节点
      if(Array.isArray(c)){//处理为数组的情况（this.children）
        insertChildren(c)//递归处理
      }else{
        el.appendChild(c);
      }
    }
  }
  //插入子组件
  insertChildren(children);
  return el;
}
export function render(component,parentElement){
  parentElement.appendChild(component.root);
}