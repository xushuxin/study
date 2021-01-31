//注册全局组件
const install = (Vue) => {
  //第一个参数是当相对路径，指定查找的目录，“.”表示当前目录下
  //第二个参数是Boolean类型的值，指定是否查找子目录
  //第三个参数是正则表达式，匹配文件名
  const requireComponent = require.context('.', true, /\.vue$/);
  // console.log(requireComponent.keys())
  requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    const fileNameFormat = fileName.split('/').pop().replace(/\.\w+$/, '')
      // console.log(config);
    Vue.component(config.default.name || fileNameFormat, config.default)
  })
}

export default {
  install
}