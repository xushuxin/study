const babel = require("@babel/core");
const loaderUtils = require("loader-utils"); //专门用来处理loader的options的工具包
//1.转换es6代码时通过babel.transform进行转换;
//2.并且还需要把options下的@babel/preset-env预设参数传进去
function loader(source) {
  // this是一个loaderContext对象 传进来的options参数都是放在this.query下
  // console.log(this.query);
  const options = loaderUtils.getOptions(this);
  console.log(this.resourcePath);
  let cb = this.async(); //会把load变成一个异步的loader,并且返回一个异步的回调
  babel.transform(
    source,
    {
      ...options,
      sourceMap: true,
      sourceFileName: this.resourcePath, //对应的sourceMap文件的名字
    },
    function (err, result) {
      cb(err, result.code, result.map); //code表示结果；map指source-map，产生源码的映射
    }
  );
  return source;
}
module.exports = loader;
