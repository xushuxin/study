import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function useCounter(n = 100) {
  let [count, setCount] = useState(n);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(++count)
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  }, [])
  return count
}

function Child1() {
  // let [count, setCount] = useState(100);

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     setCount(++count)
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])
  let count = useCounter(100)
  return <>
    <h1>{count}</h1>
  </>

}

function Child2() {
  // let [count, setCount] = useState(1000);

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     setCount(++count)
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])
  let count = useCounter(1000)
  return <>
    <h2>{count}</h2>
  </>

}


function App() {

  return <>
    <Child1 />
    <Child2 />
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))