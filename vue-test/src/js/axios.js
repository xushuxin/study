import axios from 'axios';
// const baseURL=axios.defaults.baseURL="https://api.publicapis.org";
const baseURL = axios.defaults.baseURL = "http://127.0.0.1:8081";
const post = (url, parmas) => {
  return new Promise((resolve, reject) => {
    axios.post(url, parmas).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    });
  })
}
const get = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    });
  })
}
const myAxios = {
  post,
  get,
  baseURL
}
module.exports = myAxios //用于webpack（使用的require）自动引入，
export default myAxios