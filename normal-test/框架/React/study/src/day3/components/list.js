import React from 'react';
import Button from './button';
class List extends React.Component{
  
  render(){
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