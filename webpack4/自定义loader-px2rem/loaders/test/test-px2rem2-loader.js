let Px2rem = require('./test-px2rem');

let loaderUtils = require('loader-utils');//webpack的内置模块，可以通过它获得loader配置的参数对象

/**
 * 
 * @param {源代码} source 
 * @param {} ast 
 */
function loader(source,ast){
    let options = loaderUtils.getOptions(this);
    // let options = {remUnit:75,remPrecision:8,exclude:/antd\.css/};
    if(options.exclude && options.exclude.test(this.resource)){
        return source;
    }
    let px2rem = new Px2rem(options) ;

    let targetResource = px2rem.generateRem(source);
    console.log('处理后的代码',targetResource)
    return targetResource;
}
module.exports = loader

/* var source = `
    #root{
        width:750.5px;
        height:750px;
    }
    .class name{
        height:calc(100% - 75px);
    }
`
loader(source); */