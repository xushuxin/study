var xhr =new XMLHttpRequest();
xhr.open("get",'/api/haha');
xhr.addEventListener('readyStateChange',function(e){
  if(xhr.readyState==='4'&&xhr.state==='200'){
    console.log('请求成功',xhr)
  }
})
xhr.send();

var xhr =new XMLHttpRequest();
xhr.open("get",'secondApi/haha');
xhr.addEventListener('readyStateChange',function(e){
  if(xhr.readyState==='4'&&xhr.state==='200'){
    console.log('请求成功',xhr)
  }
})
xhr.send();