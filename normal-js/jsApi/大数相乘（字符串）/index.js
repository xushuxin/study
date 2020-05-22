/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
     const left = '0'.charCodeAt(0);//转为Unicode码 48 number
    // 首先将字符串用 charCodeAt 转换成对应的数字。
    // num1Arr 取较短的数字， num2Arr 取较长的数字，用 num1Arr 去分别乘 num2Arr 速度会提升15ms
    const num1Arr = (num1.length > num2.length ? num2 : num1).split('').map(item => item.charCodeAt(0) - left);
    const num2Arr = (num1.length > num2.length ? num1 : num2).split('').map(item => item.charCodeAt(0) - left);
    console.log(num1Arr,num2Arr)
    let res = [];
    for (let i = num1Arr.length - 1; i > -1; i--) {
        for (let j = num2Arr.length - 1; j > -1; j--) {
            // 数字的相乘的结果转换为数组，并且 reverse，方便计算
            const resArr = (num1Arr[i] * num2Arr[j]).toString().split('');
            resArr.reverse();
            // console.log(resArr)
            const index = num2Arr.length - 1 - j + num1Arr.length - 1 - i;//0+0 1+0 2+0 ; 1+0 1+1 2+1; 0+2 1+2 2+2
            let next = 0, k = 0;
            while (k < resArr.length || next !== 0) {
                // 结果当前位数加上前一位的进位
                let sum = (res[index + k] | 0) + next;
                // 若 k < resArr，即非最后一位进位
                if (k < resArr.length) {
                    sum += +resArr[k];
                }
                res[index + k] = sum % 10;
                // 若 sum 大于10，进位 = 1
                next = sum / 10 >= 1 ? 1: 0;
                k++;
            }
        }
    }
    // 去除结果前的 0
    while (res.length > 1 && res[res.length - 1] === 0) {
        res.pop();
    }
    return res.reverse().join('');
};
let a=multiply('222','999')
console.log(typeof '0'.charCodeAt(0))
// console.log('9'.charCodeAt(0)-'0'.charCodeAt(0))

    //     2 2 2
    //   * 9 9 9
    // ---------
    //       1 8
    //     1 8
    //   1 8
    //     1 8
    //   1 8
    // 1 8