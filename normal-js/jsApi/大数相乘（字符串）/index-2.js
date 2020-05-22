/**
 * 在index.js基础上自己写
 * num1,num2必须是字符串
 */
function multiply(num1,num2){
  let arr1=num1.split('').reverse();
  let arr2=num2.split('').reverse();
  let resArr=[];
  for (var index1=0;index1<arr1.length;index1++){
    for (var index2=0;index2<arr2.length;index2++){
      let index=index1+index2;
      let arr = (arr1[index1]*arr2[index2]).toString().split('').reverse();
      // if(arr.length===1) arr.unshift('0');
       // console.log(arr)
      let k=0,next=0;
      while(k<arr.length||next){
        let sum=(resArr[index+k]|0)+next;//8
        if(k<arr.length){
          sum+=+arr[k];//8
        }
        resArr[index+k]=sum%10;
        next=Math.floor(sum/10)//进位0或者1
        k++;
      }
    }
  }
  // console.log(arr1)
  // console.log(arr2)
  // console.log(resArr)
  while(resArr.length>1&&resArr[resArr.length-1]===0){
    resArr.pop();
  }
  return resArr.reverse().join('');
}
let res=multiply('666666','566666')
console.log(res)
  // 123
  // 456
  // =>
  // 321
  // 654
//    81
//     51
//      21   
