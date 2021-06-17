import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
function useRequest(url) {
  let [data, setData] = useState([]);
  let [n, setN] = useState(0)
  function loadMore() {
    fetch(`${url}?page=${n}`).then(data => data.text()).then(d => {
      setData([...data, ...d])
      setN(n + 1)
    })
  }
  useEffect(() => {
    loadMore()
  }, [])

  return [data, loadMore]
}
function App() {
  let [list, loadMore] = useRequest('http://localhost:3000/api')
  return <>
    <h2>{JSON.stringify(list)}</h2>
    <button onClick={loadMore}>按钮</button>
  </>
}

ReactDOM.render(<App />, document.getElementById('root'))