// import Button from './Button'
// import ButtonGroup from './ButtonGroup'
// import Icon from './Icon'
const install = (Vue)=>{
  // 把所有组件设置成全局组件
  // Vue.component(Button.name,Button)
  // Vue.component(ButtonGroup.name,ButtonGroup)
  // Vue.component(Icon.name,Icon)
  //☆ 提升幸福感，利用require.context拿到所有vue文件内容
  const requireComponent=require.context('.',true,/\.vue$/);
  console.log(requireComponent.keys())
  requireComponent.keys().forEach(fileName=>{
    const config =requireComponent(fileName);
    console.log(config);
    Vue.component(config.default.name,config.default);
  })
}
export default {
  install
}