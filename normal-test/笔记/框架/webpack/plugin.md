loader的实现：

实现一个统计打包后文件大小的插件：

plugins/sync-plugin.js

```js
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
        content += `\r\n - ${filename} ${fileObj.size()}b`;
      });
      content += `\r\n 文件总个数 ${Object.entries(assets).length}个`;

      //定义当前生成文件返回的资源及大小
      compilation.assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}
module.exports = SyncPlugin;
```

webpack.config.js

```js
const SyncPlugin = require("./plugins/sync-plugin");
module.exports = {
  plugins: [
    new SyncPlugin({
      filename: "note.md",
    }),
  ],
};
```

效果：dist目录生成node.md文件，包含其他文件打包后的大小和总个数

