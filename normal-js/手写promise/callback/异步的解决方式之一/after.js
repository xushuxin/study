/**after 在...之后*/
/**希望在调用某个函数三次之后再执行一个函数 */
function after(times,say){
  return function(){
    console.log(--times)
    if(--times==0){
      say();
    }
  }
}

let newSay=after(3,function say(){
  console.log('say');
})
newSay();
newSay();
newSay();