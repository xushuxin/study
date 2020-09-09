const getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    }).then(data => {
      console.log('获取文件数据', data)
      resolve(data.data)
    }).catch(error => {
      reject(error.toString())
    })
  })
}
const packDownLoad = function(urls, saveName = "打包下载.zip") {
  const data = urls // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
  const zip = new JSZip();
  const cache = {};
  const promises = [];
  data.forEach(item => {
    const promise = getFile(item).then(data => {
      // 下载文件, 并存成ArrayBuffer对象
      const arr_name = item.split("/");
      const file_name = arr_name[arr_name.length - 1]; // 获取文件名
      zip.file(file_name, data, { binary: true }); // 逐个添加文件
      cache[file_name] = data;
    });
    promises.push(promise);
  });


  Promise.all(promises).then(() => {
    zip.generateAsync({ type: "blob" }).then(content => { // 以当前文件夹生成二进制流
      console.log(content)
      saveAs(content, saveName); // 利用file-saver保存文件（saveAs是fileSaver暴露给全局的的属性名）
    });
  });
}