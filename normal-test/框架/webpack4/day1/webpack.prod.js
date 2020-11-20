//单独配置开发环境的配置
const path = require("path");
module.exports = {
  mode:"production",
  entry:"./src/index.js",
  output:{
    path:path.resolve(__dirname,'output'),
    filename:'index2.js'
  }
}