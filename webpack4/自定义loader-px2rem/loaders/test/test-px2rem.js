/* 直接全局替换的方案，不确定有无风险 */
/* let pxReg = /(\d+(\.\d+)?)px/g;
class Px2Rem{
  constructor(options){
    this.remUnit= options.remUnit;
    this.remPrecision= options.remPrecision;
  }
  //将px转为rem
  generateRem(source){
    return source.replace(pxReg,(_,$1) => {
      console.log($1)
      let remNum =  $1/this.remUnit;
      if(parseInt(remNum) !== remNum) {
        return remNum.toFixed(this.remPrecision) + 'rem';
      }else{
        return remNum + 'rem'
      }
     
    })
  }
}
module.exports = Px2Rem */

const css  = require('css');
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;//数字px

class Px2Rem{
  constructor(options){
    this.remUnit= options.remUnit;
    this.remPrecision= options.remPrecision;
  }
  generateRem(cssText){
    let cssAst = css.parse(cssText);
    this.processRules(cssAst.stylesheet.rules);
    return css.stringify(cssAst)
  }
  processRules(cssRules){
    cssRules.forEach(({declarations}) =>{
      declarations.forEach(item=>{
        if(item.type === 'declaration'){
          item.value = this._getCalcVal('rem',item.value);
        } 
      })
    })
  }
  _getCalcVal(unit,value){
    return value.replace(pxRegExp ,(_,$1) =>{
      let remNum =  $1 / this.remUnit;
      //如果转换后不是整数，保留指定位数的小数
      if(parseInt(remNum) !== remNum) {
        remNum = remNum.toFixed(this.remPrecision)
      }
      return remNum + unit
    })  
  }
}

module.exports = Px2Rem;