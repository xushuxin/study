//引入a.js使用inline-loader（会加载其他的loader按顺序处理）
// require("inline-loader!./a");

//只使用inline-loader处理a.js
// require("!!inline-loader!./a");

//不要执行当前inline-loader前面的loader(pre,normal)
// require("-!inline-loader!./a");

//不执行normal loader
// require("!inline-loader!./a");
import "./index.less";

import "./js/index.js";

const sum = (a, b) => {
  a.getFn();
  return a + b;
};
console.log(sum(10, 20));
