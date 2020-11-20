function createXMLHttpRequest(){
  var XMLHttpRequest;
  if(window.XMLHttpRequest){
    //code for IE7,safari,chrome,firefox,opera
    XMLHttpRequest=new XMLHttpRequest();
  }else{
    // code for IE5,IE6
    XMLHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return XMLHttpRequest;
}
