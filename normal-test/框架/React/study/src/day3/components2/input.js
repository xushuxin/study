import React from 'react';
//React中绑定原生事件也需要使用小驼峰
function Input(props){
  let {type="rext",value,onChange,onEnter} = props;
  let keydown =(e)=>{
    if(e.keyCode === 13){
      onEnter(e);
    }
  }
  return <div className=''>
    <input type={type} value={value} onChange={onChange} onKeyDown={keydown}/>
  </div>;
}

export default Input