<template>
  <div class="">
    <input type="text" v-model.trim = "value" @blur="doblur" @input="doInput" @change="doChange">
    <input type="text" v-model = "val2">
    <!-- 以下测试v-model原理 -->
    <!-- <input type="checkbox" v-model="val3" @input="doInput" @change="doChange">
    <input type="radio" value="1" v-model="val4" @input="doInput" @change="doChange">
    <input type="radio" value="2" v-model="val4" @input="doInput" @change="doChange">
    <div id="example-5">
      <select v-model="selected" @change="doChange" @input="doInput"> 
        <option disabled value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div> -->
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      val2:'',
      val1:'',
      val3:'',
      val4:'',
      selected:''
    }
  },
  props:{
    value:''
  },
  components: {

  },
  watch:{
    val:function(newVal,oldVal){
      if(newVal!==oldVal){
        this.$emit('input',newVal)
      }
    }
  },
  computed:{
    val(){
      console.log(typeof this.val1)
      return this.val1 + ' ' + this.val2;
    }
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    doInput(e){
      console.log('input value:',this.val);
    },
    doChange(e){
      console.log('change value',this.val);
    },
    doblur(){
      console.log('blur')
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>