/**测试keep-alive应用到tab栏**/
<template>
  <div>
    <header>
      <nav>
        <button @click="component='channel1'">channel1</button>
        <button @click="component='channel2'">channel2</button>
      </nav>
    </header>
    <main>
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </main>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
Vue.component('channel1',{
  template:`<div style="display:flex;">
    <nav style="border-right:1px solid #ddd;padding:10px;margin-right:10px;">
      <div @click="channelContent='hahaha'">channel1-tap1</div>
      <div @click="channelContent='hehehe'">channel1-tap2</div>
    </nav>
    <section style="display:flex;align-items:center;justify-content:center;">
      {{channelContent}}
    </section>
  </div>`,
  data(){
    return {
      channelContent:'hahaha'
    }
  }
})
Vue.component('channel2',{
  template:`<div>
    <section>
      {{channelContent}}
    </section>
  </div>`,
  data(){
    return {
      channelContent:'channel2hahaha'
    }
  }
})
export default {
  data() {
    return {
      component:'channel1'
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
</style>