<template>
  <div id="app">
    <zf-button>默认按钮</zf-button>
    <zf-button type="primary">默认按钮</zf-button>
    <zf-button type="info">默认按钮</zf-button>
    <zf-button type="success">默认按钮</zf-button>
    <zf-button type="warning">默认按钮</zf-button>
    <zf-button type="danger">默认按钮</zf-button>
    <zf-icon icon="iconfontxingxing">小图标</zf-icon>
    <zf-button type="success" icon="iconfontxingxing" icon-position="left">收藏</zf-button>
    <zf-button type="success" icon="iconfontxingxing" icon-position="right">收藏</zf-button>
    <!-- <zf-button type="success" icon="iconfontxingxing" icon-position="top">收藏</zf-button> -->
    <zf-button type="success" loading>加载中</zf-button>
    <zf-button type="success" @click="fn">点击事件</zf-button>
    <div>
      <button @click="showMessage">
        点击弹出消息框
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
// import Message from './plugins/Message/Message.js'
import Message from './plugins/Message/Message2.js'
Vue.use(Message);
export default {
  name: 'App',
  methods:{
    fn(e){
      console.log(e)
    },
    showMessage(){
      this.$message.info({
        message:'你好',
        duration:2000
      })
    }
  }
}
</script>

