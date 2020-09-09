// 直接下载，用户体验好(但是必须保证资源地址和当前网页同源)

function download() {
  var $a = document.createElement('a');
  $a.setAttribute("href", '/study/normal-test/images/image1.png');
  $a.setAttribute("download", "");
  var evObj = document.createEvent('MouseEvents');
  evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
  $a.dispatchEvent(evObj);
};
button.onclick = download;