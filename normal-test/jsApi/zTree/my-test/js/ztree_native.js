(function(){
  class zTree{
    constructor(element,options){
      //init params
      
    }
  }

  if(typeof window !== 'undefined'){
    window.zTree = zTree;
  }
  if(typeof module === 'object' && typeof module.exports ==='object'){
    module.exports = zTree;
  }
})()