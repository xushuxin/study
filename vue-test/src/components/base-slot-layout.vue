/****/
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {

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