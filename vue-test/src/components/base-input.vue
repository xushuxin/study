/****/
<template>
  <label>
    哈哈哈 
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on="inputListeners"
    >
    <!-- 在该孙子组件内任可通过$attrs获取父组件的props(注意除当前组件已注册的props外) -->
    <!-- 在该孙子组件内任可通过$emit触发祖父组件的事件并传值 -->
    <base-input-child v-bind="$attrs" v-on="$listeners"></base-input-child>
  </label>
</template>

<script type="text/javascript">
export default {
  inheritAttrs:false,//该属性默认值为true，组件内未被注册的props属性将作为普通元素属性渲染到根元素上；设置为false，表示禁止该行为
  data() {
    return {

    }
  },
  props:{
    value:{
      type:String,
      default:''
    }
  },
  components: {

  },
  computed:{
    //利用计算属性获取处理后的事件对象
    inputListeners:function(){
      let vm=this;
      return {
        ...this.$listeners,//获取组件上去所有绑定的事件
        'input':function(event){//保证v-model的使用
          vm.$emit('input',event.target.value)
        }
      }
    }
  },
  created(){
    console.log("组件绑定的属性",this.$attrs)
    console.log("组件绑定的监听器",this.$listeners)
  },
  mounted(){

  },
  updated(){

  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped>
</style>