import React from 'react';
class Button extends React.PureComponent{
  render(){
    console.log('触发Button组件 render函数')
    let {children,onClick} = this.props;
    return <button onClick={onClick}>{children||'删除'}</button>;
 }
}
export default Button