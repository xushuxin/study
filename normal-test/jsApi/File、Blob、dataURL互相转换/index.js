//内置类，FilReader、File、Blob
/**
 * @param {File对象} file 
 * @param {函数，实参接收获取的dataUrl} callback 
 */
//将传入的File对象转为base64的dataURL
function file2DataUrl(file, callback) {
  var reader = new FileReader();
  reader.onload = function() {
    callback(reader.result);
  };
  reader.readAsDataURL(file); //FileReader对象的方法，可以读取Blob或者File对象的数据，转化为dataURL格式
}
file.oninput = function() {
  console.log(this.files[0])
  file2DataUrl(this.files[0], function(img) {
    console.log(img)
  })
}



//将base64的dataURL转为Blob对象
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), //全局变量的属性atob，解码base64编码
    n = bstr.length,
    u8arr = new Uint8Array(n) //创建一个8位无符号整型数组,数组项取值范围是0～255（二进制8位最大值11111111=>255）
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}
dataURLtoBlob('data:image/png;base64,XXXXXXXX')

//将Blob对象转为File对象
function blobtoFile({ type } = blob) {
  return new File([blob], '自定义文件名称', { type })
}
//调用上面的dataURLtoBlob方法生成测试的dataURL
var blob = dataURLtoBlob('data:image/png;base64,XXXXXXXX');
console.log(blobtoFile(blob))