const css = require('css');
const pxReg = /\b(\d+(\.\d+)?)px\b/;
module.exports = class Px2vw{
    constructor(options){
        // todo可以接收一些webapck loader配置参数
        // this.vwUnit = options.remUnit;
        this.vwPrecision = options.remPrecision;
    }
    generateVw(cssText){
        let cssAst = css.parse(cssText);
        console.log(JSON.stringify(cssAst,null,'     '));

        this._traverseRules(cssAst.stylesheet.rules);
       
        return css.stringify(cssAst)
    }
    _traverseRules(cssRules){
        for (let { declarations } of cssRules){
            for (let item  of declarations){
                if(item.type === 'declaration'){
                    item.value = this._doVwReplace('vw',item.value);
                }
            }
        }
    }
    _doVwReplace(unit,value){
        return value.replace(pxReg,(source,$1) =>{
            let val;
            if($1 / 7.5 !== parseInt($1 / 7.5)){
                val = parseFloat($1 / 7.5).toFixed(this.vwPrecision)
            }else{
                val = parseFloat($1/7.5);
            }
            return val + unit;
        })
    }
}