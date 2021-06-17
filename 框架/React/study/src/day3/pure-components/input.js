import React from 'react';
//React中绑定原生事件也需要使用小驼峰
class Input extends React.PureComponent{
  keydown =(e)=>{
    if(e.keyCode === 13){
      this.props.onEnter(e);
    }
  }
  render(){
    let {type="rext",value,onChange} = this.props;
    return <div className=''>
      <input type={type} value={value} onChange={onChange} onKeyDown={this.keydown}/>
    </div>;
 }
}
export default Input