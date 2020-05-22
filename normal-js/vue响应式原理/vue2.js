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
  var value;
  for (var key in obj){
    value=obj[key];
    if(typeof value==='object'){
      self.observe(value)
    }else{
      Object.defineProperty(self.$data,key,{
        get:function(){
          //vue中会依赖收集
          return value;
        },
        set:function(newVal){
          value=newVal;
          //vue中触发收集的依赖更新d
          self.render();//这里直接更新试图
        }
      })
    }
  }

}
Vue.prototype.render=function(){
  this.virtualdom='I am '+this.$data.a;
  this.el.innerHTML=this.virtualdom;
}