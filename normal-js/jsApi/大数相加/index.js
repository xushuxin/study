/**
 * 题目描述：
 * 如何实现两个非常大的数字(已经超出了Number范围)的加法运算
 * 注意由于这两个已经超过了Number范围，因此不能用Number存，这里我们选择使用字符串存储。
 * 思路：
 * 我们只要将两个数字前面补0至相同的长度，然后从低位到高位进行相加， 同时用一个变量记录进位的信息即可。
 * @param {*} a 
 * @param {*} b 
 */
function bigNumberSum(a, b) {
  // 123456789
  // 000009876
  console.log('a:'+a)
  console.log('b:'+b)
  // padding
  let maxLength = a.length>b.length?a.length:b.length;//取两个数中较大的数的长度
  while (a.length<maxLength || b.length<maxLength) {
    console.log(a[maxLength])
    if (!a[maxLength]) {
      a = "0" + a;
    } else if (!b[maxLength]) {
      b = "0" + b;
    }
  }
  let carried = 0;
  let res = '';

  for (let i = maxLength - 1; i >= 0; i--) {
    const sum = carried + (+a[i]) + (+b[i]);
    carried = Math.floor(sum/10);//进位信息0或1，每次循环更新
    console.log('carried:'+carried)
    res=sum % 10 + res;//字符串拼接上每位相加的结果的个位
  }
  //循环结束表示所有的位数上都已相加，如果这时进位信息为1需要在前面补1
  if(carried===1){
    res='1'+res;
  }
  return res;
}

let h=bigNumberSum(Math.pow(2,32).toString(),Math.pow(2,64).toString());
console.log(h)