import React from 'react';
import "./model.scss";
class App extends React.Component{
  render(){
    const {isShow,onClose,onOk,onCancel,className,title} = this.props;
    return isShow?<div className={'model_box '+className}>
      <div className="mask"></div>
      <div className="content">
        {title?title:<header>默认标题</header>}
        <main>
          内容
        </main>
        <footer>
          <button onClick={onOk}>确定</button>
          <button onClick={onCancel}>取消</button>
        </footer>
        <button onClick={onClose} className="close-x">X</button>
      </div>
    </div>
    :
    <></>
 }
}
export default App