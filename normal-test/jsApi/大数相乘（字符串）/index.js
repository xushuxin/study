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
            //0+0 1+0 2+0 ; 0+1 1+1 2+1; 0+2 1+2 2+2 
            //index的值： 0 1 2 ; 1 2 3 ; 2 3 4
            const index = num2Arr.length - 1 - j + num1Arr.length - 1 - i;
            let next = 0, k = 0;
        
            while (k < resArr.length || next !== 0) {//遍历两位数字相乘结果的倒序数组
                // 结果当前位数加上前一位的进位
                //undefined|0 结果是0 ，undefined非数字，位运算时Number转为数字处理，为NaN
                //因为位运算底层是32位转为64位，转换过程导致NaN和Infinity作为0来处理了
                //|：或运算符，两位之中只要有一位为1,则结果为1，都为0则结果为0
                let sum = (res[index + k] | 0) + next;//首次sum结果为0
                // 若 k < resArr，即非最后一位进位
                if (k < resArr.length) {//比如个位为2和9，相乘的倒序数组是['9','2']
                    sum += +resArr[k];//sum = 0+9 ; sum = 0 + 2
                }
                res[index + k] = sum % 10;//对结果取余，获取当前位的值
                // 若 sum 大于10，进位 = 1
                next = sum / 10 >= 1 ? 1: 0;//判断结果是否有进位
                k++;
            }
            //首次 i=0,j=0循环结束res =['9','2']
            //i=0,j=1循环，res数组index=1,该位置已存在'2'，
            //需要那这个位置的值与当前两个数的计算结果相加，比如个位2和十位9相乘结果是18
            //遍历相乘结果的倒序数组：['8','1'], 8 + 2 =>10,覆盖设置res数组index = 1的值为 0 ，进位next为1
            //继续进入while循环，index=2没有值，但是因为有进位，需要加上进位1，再与倒序数组的index为1的值，
            //也就是1，相加，结果为2，设置为res数组index=2 的值，没有进位，while循环结束，继续下次for循环
            //计算i=0，j=2的相乘结果，并从res数组index=2开始来计算每一位的最终值以及进位情况
        }
    }
    // 去除结果前的 0
    while (res.length > 1 && res[res.length - 1] === 0) {
        res.pop();
    }
    return res.reverse().join('');
};
let a=multiply('222','999')

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