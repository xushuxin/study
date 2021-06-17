import {setStateKey,genStateKey,getStateKey} from "./util/state-key.js";
class HistoryRoute {
  constructor(){
    this.current = {
      path:'/'
    };
  }
}
class VueRouter {
  constructor(options){
    //设置路由模式，默认是hash模式
    this.mode = options.mode || 'hash';

    //获取路由配置数组
    this.routes = options.routes || [];
    //根据路由数组转为{path:component}格式的对象
    this.routesMap = this.createRoutesMap(this.routes);
    //创建路由记录对象
    this.history = new HistoryRoute();
   
    //初始化操作(获取hash，设置默认值，监听url改变)
    this.init();
  }
  init(){
    // hash模式
    if(this.mode === 'hash'){
      location.hash?null:location.hash = '/';//如果没有hash，添加一个/作为hash
      //页面加载时，获取到hash，去除#号
      window.addEventListener('load',()=>{
        this.history.current.path = location.hash.slice(1);
      })
      //监听hash改变
      window.addEventListener('hashchange',()=>{
        this.history.current.path  = location.hash.slice(1);
      })
    }else if(this.mode === 'history'){
      window.addEventListener('popstate',(e)=>{
        this.history.current.path = location.pathname;//路径部分，不包括查询字符串 
      })
    }
  }
  // 转换数据结构，生成方便取值的对象
  createRoutesMap(routes){
    return routes.reduce((total,item)=>{
      total[item.path] = item.component;
      return total;
    },{})
  }
}
VueRouter.install = function(Vue){
  // 防止重复注册VueRouter
  if(VueRouter.install.installed) return;
  VueRouter.install.installed = true;

  //给每个组件混入beforeCreate钩子函数（每个组件实例创建之前都会调用）
  Vue.mixin({
    beforeCreate(){
      //只有根实例存在router属性(这段操作是为了保证仅根实例挂载路由实例，子组件引用方式获取)
      if(this.$options&&this.$options.router){
        //根组件
        this._routerRoot = this;
        //保存根实例的路由实例
        this._router = this.$options.router;
        //定义响应式数据(主要是为了把第三个参数（必须是对象）变成响应式)
        Vue.util.defineReactive(this,'_route',this._router.history.current);
      }else{
        //子组件通过_routerRoot指向根组件（父beforeCreate => 子beforeCreate）
        this._routerRoot = this.$parent._routerRoot;
      }
    }
  })

  //注册全局组件router-view
  Vue.component('router-view',{
    //当页面更新时会自动触发render函数，重新渲染
    //(前提是，render函数中使用了响应式数据)
    render(h){
      console.log(this)
      let path = this._routerRoot._route.path;
      let routesMap = this.$router.routesMap;
      return h(routesMap[path]);//根据path获取对应组件并渲染
    }
  })

  function guardEvent(e){
    //...more control
    e.preventDefault&&e.preventDefault()//阻止a标签href的默认跳转事件
    return true;
  }

  function extend(a,b){
    for(const key in b){
      a[key] = b[key];
    }
    return a;
  }

  function getUrl (path) {
    //完整的地址包括协议到片段标识符
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
  }
  //注册全局组件router-link
  Vue.component('router-link',{
    props:{
      to:{
        required:true
      },
      event:{
        type:[String,Array],
        default:'click'
      },
      replace:{
        type:Boolean,
        default:false
      }
    },
    render(h){
      const url = this.$router.mode ==='hash'?getUrl(this.to):this.to;//history需要添加参数及hash作为唯一标识
      const href = this.$router.mode === 'hash'?'#'+this.to : this.to;
      const handler = (e)=>{
          if(guardEvent(e)){
            if(this.replace){
              const stateCopy = extend({},history.state);
              stateCopy.key = getStateKey();
              this.$router.history.current.path = this.to;
              history.replaceState(stateCopy,'',url)
            }else{
              this.$router.history.current.path= this.to;//手动修改路由参数，触发router-view的渲染函数
              history.pushState({key:setStateKey(genStateKey())},'',url)
            }
          }
      }
      const on ={};
      if(Array.isArray(this.event)){
        this.event.forEach(item=>{
          on[item] = handler;
        })
      }else{
        on[this.event] = handler;
      }
      const data = {
        on,
        attrs:{
          href
        }
      };
      return h('a', data ,
        this.$slots.default
      );
    }
  })

  //定义Vue原型上的属性$router和$route的getter
  //返回根组件上的router实例和当前路由对象
  //Vue实例均可获取
  Object.defineProperty(Vue.prototype,'$router',{
    get(){
      return this._routerRoot._router;
    }
  })
  Object.defineProperty(Vue.prototype,'$route',{
    get(){
      return this._routerRoot._route;
    }
  })
}
export default VueRouter;