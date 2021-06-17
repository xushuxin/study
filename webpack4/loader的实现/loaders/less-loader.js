let less = require("less");
function loader(source) {
  let css;
  //less的程序化处理
  less.render(source, (err, result) => {
    css = result.css;
  });
  return css;
}
module.exports = loader;
