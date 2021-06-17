/**
 * AST
 * JS语法树
 * CSS语法树
 */
const css = require('css');//css是一个第三方模块
//把CSS源代码转成一个CSS抽象语法，其实就是一个描述CSS代码的JS对象
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;
class Px2rem{
    constructor(config){
        this.config = config;
    }
    generateRem(cssText){
        const processRules=(rules)=>{
            for(let i=0;i<rules.length;i++){
                let rule = rules[i];
                let declarations = rule.declarations;
                for(let j=0;j<declarations.length;j++){
                    let declaration = declarations[j];
                    if(declaration.type === 'declaration'&&pxRegExp.test(declaration.value)){
                        declaration.value = this._getCalcValue('rem',declaration.value);
                    }
                }
            }
        }
        var astObj = css.parse(cssText);
        //console.log(JSON.stringify(astObj,null,2));
        processRules(astObj.stylesheet.rules);
        return css.stringify(astObj);
    }
    _getCalcValue(type,value){
        let {remUnit,remPrecision} = this.config;
        return value.replace(pxRegExp,(_,$1)=>{
            let val = (parseFloat($1)/remUnit).toFixed(remPrecision);
            return val+type;//10rem
        });
    }
}
module.exports = Px2rem;

/**
{
  "type": "stylesheet",
  "stylesheet": {
    "rules": [
      {
        "type": "rule",
        "selectors": [
          "#root"
        ],
        "declarations": [
          {
            "type": "declaration",
            "property": "width",
            "value": "750px"
          },
          {
            "type": "declaration",
            "property": "height",
            "value": "750px"
          }
        ]
      }
    ]
  }
}
 */