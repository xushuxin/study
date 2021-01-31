
//获取生成时间戳的对象，优先采用user Timing api，精确度更高
const Time = window.performance && window.performance.now?
window.performance:Date;
export function genStateKey(){
  return Time.now().toFixed(3);//保留三位小数
}

//生成唯一key
let _key = genStateKey();

//获取key
export function getStateKey(){
  return _key;
}
//设置key并返回值
export function setStateKey(key){
  return (_key = key);
}
