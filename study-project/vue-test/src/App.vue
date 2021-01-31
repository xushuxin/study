<template>
  <div id="app">
    <div class="title-bar" @click="$router.back()">
      <span>标题</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    (function () {
      var bodyFontSize = "0.16rem";// 设置body元素字体大小（公共字体大小）
      document.body.style.fontSize=bodyFontSize;
      // 根据iPhone6s的宽度为基准，设置根字体大小
      function setRootFont(){
        var htmlFontSize = document.documentElement.clientWidth * 2/ 750 * 100 + 'px';
        document.documentElement.style.fontSize=htmlFontSize;
      }
      setRootFont()
      window.onresize=setRootFont;
    })()
  }
}
</script>

<style lang="stylus" scoped>
#app {
  width:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top:50px;
}
*{
  margin:0;
  padding:0;
}
.title-bar{
  height:50px;
  display :flex;
  align-items:center;
  justify-content:center;
  background:#66b1ff;
  position:fixed;
  width:100%;
  top:0;
  left:0;
  &:before{
    content:'';
    display:block;
    position:absolute;
    left:20px;
    top:50%;
    width:32px;
    height:32px;
    transform:translateY(-50%);
    background:url("~img/left-arrow.svg") no-repeat;
    background-size:32px;
  }
}
</style>
