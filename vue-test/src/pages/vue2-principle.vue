//vue2响应式原理
<template>
  <div></div>
</template>
<script>
  export default {
    name:'vue2-principle',
    data(){
      return{

      }
    },
    created(){},
    methods:{
      test(){
        var obj1={
          a:'1',
          b:'2'
        }
        Object.defineProperty(obj1,'b',{
          writable:true,
          enumerable:false,
          configurable:false
        })
        for(var key in obj1){
          console.log(key)
        }
        console.log(Object.getOwnPropertyDescriptor(obj1,'b'))
      },
      freeze(){
        var obj1={
          a:'1',
          b:'2'
        }
        //将对象writable的属性设置为false（不可重写）
        Object.freeze(obj1)
        obj1.a="3";
        console.log(obj1)
      },
      seal(){
        var obj1={
          a:'1',
          b:'2'
        }
        //将对象configurable的属性设置为false（不可删除）
        Object.seal(obj1)
        delete obj1.a;//false
        console.log(obj1)
      },
      getSeter(){
        var obj={a:'1',b:'2'};
        var value=obj.b;
        Object.defineProperty(obj,'b',{
          get(){
            console.log('you get b');
            return value;
          },
          set(newVal){
            console.log('this newVal is '+newVal)
            value=newVal
          }
        })
        obj.b;
        obj.b="666";
      },
      vue(){
        function Vue(){
          this.$data={a:"1"};
          this.el=document.getElementById('app');
          this.virtualdom='';
          this.observe($data);
          this.render();
        }
        Vue.prototype.observe=function(obj){
          var self=this;
          var value;
          for (var key in obj){
            value=obj[key];
            if(typeof value==='object'){
              this.observe(value)
            }else{
              Object.defineProperty(this.$data.key,{
                get:function(){
                  //vue中会依赖收集
                  return value;
                },
                set:function(newVal){
                  value=newVal;
                  //vue中触发收集的依赖更新
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
      }
    },
  }
</script>
<style lang="sass">

</style>
