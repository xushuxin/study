/* 基数排序 */
// 1.低16位（可以看成个位）
// ①统计数组中的每个整数（32位）的低16位的个数，
// ②对统计的数组求前缀和，得到前缀和数组（记得开头补0），
// ③每个低16位的数量的前缀和对应的是多个具有相同低16位的数的末尾索引，按照索引依次将每一个数按照其低16位所在位置从末尾索引往前放置 （归位）
// 1.高16位（可以看成十位）
// ①统计上面处理后的数组中的每个整数（32位）的高16位的个数，
// ②对统计的数组求前缀和，得到前缀和数组（记得开头补0），
// ③每个高16位的数量的前缀和对应的是多个具有相同高16位的数的末尾索引，按照索引依次将每一个数按照其高16位所在位置从末尾索引往前放置 （归位）

/**
 * 
 * @param {待排序数组} arr 
 * @param {数组的长度} n 
 */
function radix_sort(arr, n) {
    let cnt = new Array(65536).fill(0);
    let temp = new Array(n);
    // console.log(cnt)
    // low 16 bit sort
    for (let i = 0; i < n; i++) {
        // console.log(arr[i], low16(arr[i]))
        cnt[low16(arr[i])] += 1;//根据低16位统计数量
    }
    // console.log(cnt.filter(item => item !== 0))
    for (let i = 1; i < 65536; i++) cnt[i] += cnt[i - 1];//前缀和数组
    // console.log(cnt)
    //前缀和对应的是相同低16位的末尾索引
    for (let i = n - 1; i >= 0; --i) {
        // console.log(arr[i], low16(arr[i]), cnt[low16(arr[i])])
        // 知识点：--cnt[low16(arr[i])] 等同于 cnt[low16(arr[i])]= cnt[low16(arr[i])] - 1;
        temp[--cnt[low16(arr[i])]] = arr[i];
    }
    console.log('按低16位排序的结果', temp)

    for (let i = 0; i < 65536; i++) cnt[i] = 0;

    // high 16 bit sort
    for (let i = 0; i < n; i++) {
        cnt[high16(temp[i])] += 1;
    }
    for (let i = 1; i < 65536; i++) cnt[i] += cnt[i - 1];
    for (let i = n - 1; i >= 0; --i) arr[--cnt[high16(temp[i])]] = temp[i]; x                                                                           yul

    console.log('在低16位排序的结果基础上进行高16位排序的结果', arr);

    return;
}
// 取高低16位可以看作是一个数是65536进制，取个位和十位
// 取32位有符号整数的低16位（仅考虑正整数）
function low16(a) {
    return a & 0xffff;//单纯考虑正整数，a % 65536
}
// 取32位有符号整数的高16位（仅考虑正整数）
function __high16(a) {
    console.log(a)
    return (a & 0xffff0000) >> 16;//单纯考虑正整数，等价于(a / 65536) >> 0
}

/* 考虑兼容负数 */
function high16(a) {
    return __high16(a) > 32767 ? (__high16(a) - 32768) : (__high16(a) + 32768)
}

// test
let arr = [6666, 3279182, 123, 4, 7, 832901, 39034, -1, -37749, -56, -8324792]
radix_sort(arr, arr.length)