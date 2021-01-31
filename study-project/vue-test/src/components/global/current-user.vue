/****/
<template>
  <div class="">
    <slot v-bind:user="user">
      {{user.firstName}}<!--默认值-->
    </slot>
    <slot name="first"></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      user:{
        firstName:'徐',
        lastName:'哈哈'
      }
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