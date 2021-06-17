import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  state = {//实例私有属性
    name:'珠峰'
  }
  fn(params,e){//e是react处理后的事件对象，原生事件对象通过nativeEvent获取
    //this=>react实例(bind方法)
    //这种传参之后，e变成最后一位参数(bind的原理)
    console.log(e,params);
  }
  fn2(e,params){//原型上的公有方法
    //this=>react实例（也是箭头函数的原理）
    // 这种传参顺序正常
    console.log(e,params)
    console.log(this);
  }
  fn3 = (e)=>{//实例私有方法
    //this=>react实例(箭头函数没有this)
    //这种不能传参
    console.log(e)
    console.log(this);
  }
  render(){
    return <div className=''>
      <button onClick={this.fn.bind(this,{params:'传参1'})}>按钮1</button>
      <button onClick={(e)=>{this.fn2(e,{params:'传参2'})}}>按钮2</button>
      <button onClick={this.fn3}>按钮3</button>
    </div>
 }
}
ReactDOM.render(<App/>,document.getElementById('root'))