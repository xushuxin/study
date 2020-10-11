const $utils = {
  //大数相加
  bigNumberSum(a, b) {
    // 123456789
    // 000009876
    console.log('a:' + a)
    console.log('b:' + b)
      // padding
    let maxLength = a.length > b.length ? a.length : b.length; //取两个数中较大的数的长度
    while (a.length < maxLength || b.length < maxLength) {
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
      carried = Math.floor(sum / 10); //进位信息0或1，每次循环更新
      res = sum % 10 + res; //字符串拼接上每位相加的结果的个位
    }
    //循环结束表示所有的位数上都已相加，如果这时进位信息为1需要在前面补1
    if (carried === 1) {
      res = '1' + res;
    }
    return res;
  },
  /*格式化为百分比
    @params str 数字格式的字符串，symbol
    @params symbol 符号
  0.04235=>4.235%*/
  noSymbolRate(str, symbol = "%") {
    return str.replace(/^(\d+)(\.(\d+))?$/, function() {
      console.log(arguments)
      let $1 = arguments[1]; //整数部分
      let $3 = arguments[3]; //小数部分
      if (!$3) return $1 * 100 + symbol;
      if ($3.length === 1) $3 = $3 + '0';
      let arr = $3.split('');
      arr.splice(2, 0, '.');
      return $1 * 100 + Number(arr.join('')) + symbol;
    })
  },
  /**
   * @param {string/number} a 被减数
   * @param {string/number} b 减数
   * @return {string} a - b的结果
   */
  substract(a, b) {
    a = Number(a).toString();
    b = Number(b).toString();
    let arr1 = a.split('.');
    let arr2 = b.split('.');
    let i1 = arr1[0],
      d1 = arr1[1] || '',
      i2 = arr2[0],
      d2 = arr2[1] || '';
    let maxDLen = d1.length > d2.length ? d1.length : d2.length;
    let minDLen = d1.length < d2.length ? d1.length : d2.length;
    let i = minDLen;
    while (i < maxDLen) {
      if (!d1[i]) d1 += '0';
      if (!d2[i]) d2 += '0';
      i++;
    }
    let intStr = ((i1 + d1) - (i2 + d2)) + '';
    let reg = new RegExp('^\\d+(?=(\\d{' + maxDLen + '})$)');
    return maxDLen ? intStr.replace(reg, content => content + '.') : intStr
      // return ((i1 + d1) - (i2 + d2)) / Math.pow(10, maxDLen);
  }
}

// ==test==
console.log($utils.substract('10000', 1099.11));