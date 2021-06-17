import React,{Component,createRef,useRef} from 'react';
import ReactDOM from 'react-dom';
// useRef和createRef可以用来存储任何值，不仅是DOM实例。
//使用规范：useRef用于函数式组件；createRef用于类组件
/**
 * React类组件使用ref的方式：
 * 1.直接使用在元素/组件上使用ref，给组件起别名，通过 this.refs.别名 获取该元素/组件
 * 2.在组件或者元素上使用ref，传入回调函数，回调函数会被React执行，并传递组件或者元素本身给第一个参数，我们用变量接收，即可使用；
 * 3.使用createRef()创建一个包含current属性的对象比如ref1，然后把这个对象传递给元素/组件上的ref属性，然后我们就可以通过this.ref1.current获取该元素/组件
 * PS:useRef hook不能用于类组件
 * 
 */
class Child extends Component{
  render(){
    return <div>
      child
    </div>
   }
}
class App extends React.Component{
  ref1 = createRef();
  get=()=>{
    console.log(this.refs.box)
  }
  getComponent=()=>{
    console.log(this.refs.child)
  }
  getComponent2=()=>{
    console.log(this.child2)
  }
  getCreateRefComponnet=()=>{
    console.log(this.ref1.current)
  }
  render(){
    return <div className=''>
      <div ref='box'>ref-box</div>
      <button onClick={this.get}>获取</button>
      <Child ref='child'/>
      <button onClick={this.getComponent}>获取组件</button>
      <Child ref={el=>this.child2=el}/>
      <button onClick={this.getComponent2}>获取函数式ref</button>
      <Child ref={this.ref1}/>
      <button onClick={this.getCreateRefComponnet}>获取CreateRef-ref1</button>
      <Child ref={this.ref2}/>
      <button onClick={this.getUseRefComponnet}>获取useRef</button>
    </div>
 }
}

/**
 * React函数式组件（也叫静态组件）的ref获取方式：
 * 1.使用useRef hook获取ref（常用）
 * 2.回调函数方式获取ref
 * PS：1.也可以使用createRef获取ref，但是一般不建议使用于函数式组件
 * 2.静态组件不能使用字符串获取ref
 */
function App2(){
  let o;
  let h1 = useRef();
  let h2 = createRef();
  let fn = function(){
    console.log('静态组件回调函数方式获取ref',o);
    console.log('静态组件useRef获取ref',h1)
    console.log('静态组件createRef获取ref',h2);
  };
  return <div>
    <h2 ref={h2}>APP2</h2>
    <h2 ref={(el)=>{o = el}}>APP2</h2>
    <h1 ref={h1}>dfgdfg</h1>
    <button onClick={fn}>按钮</button>
  </div>
}
ReactDOM.render(<><App/><App2/></>,document.getElementById('root'))