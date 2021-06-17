import React from 'react';
function Button(props){
  let {children,onClick} = props;
  return <button onClick={onClick}>{children||'删除'}</button>;
}
export default Button