function Vue(){
  this.$data={a:"1"};
  this.el=document.getElementById('app');
  this.virtualdom='';
  this.observe(this.$data);
  this.render();
}
//观察者（当获取或者修改this.$data中的数据时会触发get，set;get中收集依赖，set中根据收集的依赖更新dom）
Vue.prototype.observe=function(obj){
  var self=this;
  self.$data=new Proxy(self.$data,{
    get:function(target,key,receive){
      //vue中会依赖收集
      return target[key];
    },
    set:function(target,key,newVal,receive){
      target[key]=newVal;
      //vue中触发收集的依赖更新d
      self.render();//这里直接更新试图
    }
  })

}
Vue.prototype.render=function(){
  this.virtualdom='I am '+this.$data.a;
  this.el.innerHTML=this.virtualdom;
}