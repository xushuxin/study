n级阶梯的走法等于n-1个阶梯或者n-2个阶梯的走法之和，通过递归方式把每一级的阶梯拆分为前一级和前两级的阶梯走法之和，递归结束条件是n=1或者n=2,这两种的走法是固定的1和2

最后全部都被拆分为1和2进行相加求和

```js
function getWayCount(n){
  if(n ===1 || n===2) return n;
  return getWayCount(n-1) + getWayCount(n-2);
}
//test
console.log(getwayCount(10))
```

