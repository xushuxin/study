upFile.addEventListener('input', function(e) {
  console.log(this.files)
  const content = this.files[0];
  // 读取zip文件
  console.log(content)
  var newZip = new JSZip();
  newZip.loadAsync(content).then(function(zip) {
    console.log(zip)
    let promise = zip.generateAsync({ type: 'blob' });
    promise.then(res => {
      saveAs(res, content.name) //使用fileSaver保存文件
    })
  })
})