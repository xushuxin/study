<template>
  <div class="scrollbox" @scroll.passive="onScroll">
    <div class="do-check-box" @click.capture="doCheck">
      <el-button @click="submit">提交</el-button>
    </div>
    <div class="do-check-box color-2" @click="doCheck">
      <div style="color:#fff;">点击元素自身才触发</div>
      <el-button @click.self="submit">提交</el-button>
    </div>
    <div class="white-box"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    doCheck(e) {
      console.log("当前点击元素-currentTarget", e.currentTarget);
      console.log("当前点击元素-target", e.target);
      console.log("doCheck");
    },
    submit(e) {
      console.log("当前点击元素", e.currentTarget);
      console.log("submit");
    },
    onScroll() {
      console.log("scroll");
    },
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.scrollbox {
  height: 100vh;
  background: linear-gradient(to bottom right, skyblue, pink);
  overflow: scroll;
}
.do-check-box {
  background-color: skyblue;
  padding: 20px;
  text-align: center;
  &.color-2 {
    background: purple;
  }
}
.white-box {
  padding-bottom: 2000px;
}
</style>
