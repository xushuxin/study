<template>
  <div id="app">
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
        var htmlFontSize = document.documentElement.clientWidth*2 / 750 * 100 + 'px';
        document.documentElement.style.fontSize=htmlFontSize;
      }
      setRootFont()
      window.onresize=setRootFont;
    })()
  }
}
</script>

<style>
#app {
  width:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin:0;
}
</style>
