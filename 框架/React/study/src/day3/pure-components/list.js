import React from 'react';
import Button from './button'
class List extends React.PureComponent{
  render(){
    console.log('触发List组件的render函数')
    let {data} =this.props;
    return <ul className=''>
      {data.map((item,index)=><li key={item.id}>
      <span>{item.text}</span>
        <Button onClick={(e)=>this.props.onClick(e,index)}>删除</Button>
      </li>)}
    </ul>;
 }
}
export default List