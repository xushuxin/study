//解析webpack中loader的方式
//1.直接把编写的loader放在node_modules下
//2.resolveLoader.alias 给loader设置别名
//3.resolveLoader.modules 设置查找loader的优先级，先查找node_modules，再查找我们指定的文件夹
const path = require("path");
const resolve = (relPath) => path.resolve(__dirname, relPath);
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  devtool: "cheap-eval-module-source-map",
  resolveLoader: {
    // alias: {
    //   loader1: resolve("loaders/loader1.js"),
    //   loader2: resolve("loaders/loader2.js"),
    //   loader3: resolve("loaders/loader3.js"),
    // },
    //modules中设置查找loader的优先级，先查找node_modules，再查找指定的文件夹
    modules: [resolve("node_modules"), resolve("loaders")],
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "loader3",
      //     },
      //   ],
      //   enforce: "pre",
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "loader2",
      //     },
      //   ],
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "loader1",
      //     },
      //   ],
      //   enforce: "post",
      // },
      {
        test: /\.less$/,
        use: ["style-loader", "less-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
