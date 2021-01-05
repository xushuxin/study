import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function App() {

  let [color, setColor] = useState('red')
  useLayoutEffect(() => {
    alert(color)
    // console.log('Layout', color)
  })
  useEffect(() => {
    // alert(color)
    console.log('effect', color)
  })

  return <>
    <h2 style={{ background: color }}>颜色</h2>
    <button onClick={() => setColor('green')}>绿</button>
    <button onClick={() => setColor('blue')}>蓝</button>
    <button onClick={() => setColor('yellow')}>黄</button>
    <button onClick={() => setColor('black')}>黑</button>
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))