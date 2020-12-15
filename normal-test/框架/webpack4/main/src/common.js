~ function() {
  /**
   * @method formatTime:时间字符串的格式化处理
   * @param {String} template:格式化的模板，我们期望获得的显示格式
   *        {0}~{5}=>年月日时分秒的位置
   * @return {String} 格式化后的事件字符串
   */
  function formatTime(template = '{0}年{1}月{2}日{3}时{4}分{5}秒') {
    let timeArr = this.match(/\d+/g);
    return template.replace(/\{(\d+)\}/g, (...[, $1]) => {
      let time = timeArr[$1] || '00'; //时分秒如果没有传
      return time.length < 2 ? '0' + time : time;
    })
  }
  /**
   * @method parseURLParams:查询字符串和hash解析为对象
   * @return {Object} 解析后的的对象，参数以键值对存储，_hash存储hash值
   */
  function parseURLParams() {
    let reg = /([^?=&#]+)=([^?=&#]+)/g, //匹配(name)=(value)
      obj = {};
    this.replace(reg, (...[, $1, $2]) => obj[$1] = $2);
    this.replace(/#([^?=&#]+)/, (...[, $1]) => {
      obj._hash = $1;
    })
    return obj;
  }
  /**
   * @method delimiter:大数字字符串的千分符处理
   * @return {String} 处理后的字符串 如：12,345,678
   */
  function delimiter() {
    /**不使用正向预查的做法 */
    /* let str = this.split('').reverse().join('');
    return str.replace(/(\d{3})/g, (...[, $1]) => {
      console.log($1);
      return $1 + ',';
    }).replace(/,$/, '').split('').reverse().join(''); */
    /**使用正向预查(先行断言，前面的表达式为每次匹配的主体，?=后面的表达式不参与匹配，每次匹配之前（lastIndex开始），先判断前面的表达式匹配的内容（从最贪婪开始）后面紧跟的内容是否符合?=后面的规则，符合规则的才匹配 */
    //每次匹配之前（从lastIndex开始）根据先行断言，是否以多个三位数字结尾，符合条件的才匹配
    return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ',')
  }
  /**扩展到内置类String.prototype上(jQuery源码技巧) */
  [formatTime, parseURLParams, delimiter].forEach(item => {
    String.prototype[item.name] = item;
  });
  ['formatTime', 'parseURLParams'].forEach(item => {
    String.prototype[item] = eval(item);
  })
}();
//test formatTime
let time = "2019-8-13 6:2:1"; //后台返回的数据格式
console.log(time.formatTime());
console.log(time.formatTime("{0}年{1}月{2}日"));
console.log(time.formatTime("{1}月{2}日"));
console.log(time.formatTime("{3}:{4}"));


//test parseURLparams 
let qryURL = "https://www.baidu.com/s?ie=UTF-8&wd=%E7%8F%A0%E5%B3%B0%E5%9F%B9%E8%AE%AD#HASH";
console.log(qryURL.parseURLParams());


// test千分符 
let numStr = '12345678901';
console.log(numStr.delimiter())