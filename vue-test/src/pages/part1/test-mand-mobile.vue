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
      var reg=new RegExp('[^\da-zA-Z]','g');
      this.text=this.text.trim().replace(reg,'')
      this.$refs.inputItem.inputValue=this.text;
      console.log(this.$refs.inputItem)
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="stylus">
.my-input
  width:300x;
</style>  