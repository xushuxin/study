export const $utils={
  //大数相加
  bigNumberSum(a, b) {
    // 123456789
    // 000009876
    console.log('a:'+a)
    console.log('b:'+b)
    // padding
    let maxLength = a.length>b.length?a.length:b.length;//取两个数中较大的数的长度
    while (a.length<maxLength || b.length<maxLength) {
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
      res=sum % 10 + res;//字符串拼接上每位相加的结果的个位
    }
    //循环结束表示所有的位数上都已相加，如果这时进位信息为1需要在前面补1
    if(carried===1){
      res='1'+res;
    }
    return res;
  }
  
}