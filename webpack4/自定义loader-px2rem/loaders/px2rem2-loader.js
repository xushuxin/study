
/**
 * loader的本质是一个函数，参数是上一个loader的内容或者模块的源代码
 * 经过一些处理，把结果返回结果下一个loader或者webpack
 */
let Px2rem = require('./px2rem');
//只要安装了webpack,就得到这样的一个模块
//通过它可以获得loader配置的参数对象
let loaderUtils = require('loader-utils');
//this= loaderContext loader上下文对象，这里保存了所有的loader信息
function loader(source,ast){
    //通过getOptions方法可以获得用户在webpack.config.js里配置的参数对象 {remUnit:75,remPrecision:8}
    let options = loaderUtils.getOptions(this);
    console.log(this.resource);
    //this.resource当前正在转换的模块的绝对路径
    if(options.exclude&&options.exclude.test(this.resource)){
        return source;//不转换，直接返回
    }
    let px2rem = new Px2rem( options);
    //console.log(source);
    let targetSource = px2rem.generateRem(source);//生成REM
    ///console.log(targetSource);
    return targetSource;
}
module.exports = loader;

/* 
let source = `
#root{
    width:750px;
    height:750px;
}
`;
loader(source); */