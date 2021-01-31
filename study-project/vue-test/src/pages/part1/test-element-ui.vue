/**改造element-ui的input输入框**/
<template>
  <div class="box">
    <el-input type="textarea" v-model="value" placeholder="请输入内容">
      <div slot="prepend">prepend</div>
      <div slot="append">append</div>
    </el-input>
    <el-input type="input" v-model="value" placeholder="请输入内容">
      <div slot="prepend">prepend</div>
      <div slot="append">append</div>
    </el-input>
  </div>
</template>

<script type="text/javascript">
export default {
  components:{
  },
  data() {
    return {
      value:''
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

  }
}
</script>

<style lang="stylus" scoped>
.box{
  padding:50px;
}
</style>