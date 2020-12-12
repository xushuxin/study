<template>
  <div>
    <h3>测试math.js</h3>
    
  </div>
</template>

<script>
// import {
//   atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
// } from 'mathjs';
export default {
  name:'test-mathjs',
  components:{
  },
  data(){
    return {
    }
  },
  methods:{
    toRouter(router){
      this.$router.push(router)
    }
  },
  async mounted(){
    let mathjs = await import('mathjs');//异步加载
    console.log(mathjs)
  }
}

</script>

<style lang="css">

</style>