let docEl = document.documentElement;
var dpr = window.devicePixelRatio || 1
//chrome 默认字体是16
//rem 根元素的字体设置 37.5px
function setBodyFontSize() {
    if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
}
setBodyFontSize();
function setRemUnit() {
    //750px
    //iPhone6 375px 
    //1rem=设计稿为750px/10
    let rem = docEl.clientWidth / 10;//实际的宽度/10就是一个rem大小
    docEl.style.fontSize = rem + 'px';
}
setRemUnit();
window.addEventListener('resize', setRemUnit)


