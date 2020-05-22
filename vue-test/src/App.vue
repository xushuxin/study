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
      // 根据iPhone6s的宽度为基准，设置根字体大小
      var htmlFontSize = document.documentElement.clientWidth / 750 * 100 + 'px'
      var bodyFontSize = '16px'// 设置body元素字体大小（公共字体大小）
      var styleDom = document.createElement('style') // 生成style标签

      styleDom.innerHTML = `html{font-size:${htmlFontSize}!important;}body{font-size:${bodyFontSize}!important}`
      document.getElementsByTagName('head')[0].appendChild(styleDom)
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
  margin-top: 60px;
}
body{
  margin:0;
}
</style>
