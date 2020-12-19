import React from 'react';
import ReactDOM from 'react-dom';
//children有四种类型 
// string 组件标签内只写了文本
// array 组件标签内写了一个以上元素或者文本
// object 组件标签内写了一个元素标签
// undefined 组件标签内没有写内容
class Child extends React.Component{
  render(){
    console.log(this.props)
    return <div>
      {this.props.children}
    </div>
   }
}
class App extends React.Component{
  render(){
    return <div className=''>
       <Child>
         哈哈哈，珠峰
         <h2>666</h2>
         哈哈哈，珠峰2
       </Child>
    </div>
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))