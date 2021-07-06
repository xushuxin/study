import {sayProblem} from './chuanzhang.js' //发起一个http请求获取模块
import {createApp} from 'vue' //转化成浏览器支持的，并且后端去node_modules立取
import App from './App.vue'
import './index.css'
// 开发的时候，不需要先打包
// webpack需要打包放内存里之后，才能启动dev-server
// 这就是为什么很多项目dev需要1分钟的原因
// vite是开发体验（代表未来），打包依然走的是rollup
// sayProblem()

// console.log(createApp)
createApp(App).mount('#app')

// vite还做了什么
// .vue单文件组件的支持（浏览器办不到）
// 热更新hmr 
// 预打包（）