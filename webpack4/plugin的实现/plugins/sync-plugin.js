const sizeof = require("./computedSize");
class SyncPlugin {
  constructor({ filename }) {
    this.filename = filename; //实例初始化时，保存传入的文件名
  }
  apply(compiler) {
    //运行apply方法，接收一个参数compiler 这样保证在回调中可以访问 compiler 对象
    compiler.hooks.emit.tap("SyncPlugin", (compilation) => {
      console.log(compilation.assets); //输出的资源
      let assets = compilation.assets;
      let content = "# 文件名   文件大小";
      Object.entries(assets).forEach(([filename, fileObj]) => {
        content += `\r\n - ${filename} ${fileObj.size()}b`; //\r\n回车换行一起用（windows）
      });
      content += `\r\n 文件总个数 ${Object.entries(assets).length}个`;

      //定义当前生成文件返回的资源及大小
      compilation.assets[this.filename] = {
        source() {
          //source方法返回当前文件生成的内容
          return content;
        },
        size() {
          console.log("size:", sizeof(content, "utf-8"));
          //size方法返回当前文件的大小（b为单位），webpack打包默认使用utf-8编码
          return sizeof(content, "utf-8");
        },
      };
    });
  }
}
module.exports = SyncPlugin;