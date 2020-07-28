<template>
  <div class="content">
    <md-input-item ref="inputItem" @change="preventInput" class="my-input" title="录入" v-model="text"></md-input-item>
    <md-button @click="preventInput" type='primary'>修改值</md-button>
  </div>
</template>
<script>
import {InputItem,Button} from 'mand-mobile';
export default{
  name:'test-mand-mobile',
  components:{
    InputItem,
    Button
  },
  data(){
    return {
      text:''
    }
  },
  methods:{
    preventInput(){
      var reg=new RegExp('\\d','g');
      this.text=this.text.trim().replace(reg,'')
      this.$refs.inputItem.inputValue=this.text;//解决bug（对输入值进行过滤时，输入框内容不变）
      console.log(this.$refs.inputItem)
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped lang="stylus">
.my-input
  width 301.05678px
  letter-spacing 1px
</style>  