import React from 'react';
import ReactDOM from 'react-dom';
import qqq from 'prop-types'
import H1 from './h1'
/* 
  祖宗组件
  static childContextTypes = {
    给后代的属性名：属性类型限制
  }
  getChildContext(){
    return {
      给后代的属性名：给后代的属性值
    }
  }


  后代组件
  static contextTypes = {
    要使用的属性名:类型限制
  }


*/

class App extends React.Component {
  static childContextTypes = {
    // 给后代使用的属性的类型限制
    theme: qqq.string,
    num: qqq.number
  }
  getChildContext() {
    // 用来设置给后代的属性  对应的属性值
    return {
      theme: this.props.theme,
      num: 100
    }
  }
  render() {
    return <div className=''>
      <H1 />
    </div>;
  }
}

ReactDOM.render(<App theme='dark' />, document.getElementById('root'))