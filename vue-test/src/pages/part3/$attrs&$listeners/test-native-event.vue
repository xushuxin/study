/** $attrs&$listener(nativeEvent) **/
<template>
<!-- .native是将事件转为根元素的原生事件，
如果根元素不是input框，focus事件绑定给根元素没有作用 
这时可以使用$listeners获取组件上绑定的所有事件监听器（不包含.native修饰的v-on事件），
并绑定给想要绑定给的元素
-->
  <div>
    <button @click="getValue">获取输入的值</button>
    <base-input :name="name" @focus="onFocus" v-model="value" @changeShowName="changeName"></base-input>
    <div>
      名字：{{name}}
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      value:'',
      name:'输入框名称'
    }
  },
  components: {

  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    onFocus(){
      console.log("输入框聚焦事件")
    },
    getValue(){
      alert(this.value)
    },
    changeName(value){
      this.name=value
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>