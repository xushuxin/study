

var foo = function foo(...args){
    let fn = function(...innerArgs){
      return foo(...args,...innerArgs)
    };
    fn.getValue = function(){
      return  args.reduce((total,item)=>{
        return total + item;
      })
    }
    return fn;
  };
  var f1 = foo(1,2,3);
  let r1 = f1.getValue();//6
  console.log(r1);
  
  var f2 = foo(1)(2,3);
  let r2 = f2.getValue();//6
  console.log(r2);
  
  var f3 = foo(1)(2)(3)(4);
  let r3 = f3.getValue();//6
  console.log(r3);