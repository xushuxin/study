import Vue from 'vue';//Vue用来创建子类
import Main from './Message.vue'//引入模板，每个消息弹框都一次为模板

//创建一个Vue的子类，并配置Message的默认组件对象
//Vue.extend会调用mergeOptions方法，合并
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];//用于维护消息组件列表
let seed = 1;//id，用于区分是哪一个消息组件

const Message = function(options){
  options = options || {};

  //Message('xxx')这种方式调用，直接将message属性设置为传入的值即可
  if(typeof options === 'string'){
    options = {
      message:options
    }
  }

  let userOnClose = options.onClose;//关闭弹框时调用的方法
  let id = 'message_' + seed++;//获取id，并将id+1

  
  //重写onClose方法，调用自己的close方法
  options.onClose = function(){
    Message.close(id,userOnClose)
  }

  //创建一个子类实例
  instance = new MessageConstructor({
    data:options
  })

}

Mseeage.close = function(id,userOnClose){

}