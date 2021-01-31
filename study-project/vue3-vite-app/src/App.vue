<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Vote :msg="msg" />
</template>

<script>
import Vote from './components/Vote.vue'

export default {
  name: 'App',
  components: {
    Vote
  },
  data(){
    return {
      msg:'Hello Vue 3.0 + Vite'
    }
  },
  mounted(){
    setTimeout(()=>{
      this.msg = 'Vue好还是React好';
    },1000)
  }
}
</script>
