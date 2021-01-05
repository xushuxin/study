import React from 'react';
import Button from './button';
function List(props){
  let {data,onClick} =props;
  return <ul className=''>
    {data.map((item,index)=><li key={item.id}>
    <span>{item.text}</span>
      <Button onClick={(e)=>onClick(e,index,item)}>删除</Button>
    </li>)}
  </ul>;
}
export default List