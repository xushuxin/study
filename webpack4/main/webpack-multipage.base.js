/* 默认的配置文件，在这里可以进行配置合并 */
//webpack配置遵循commonJS语法规范，可以使用node的内置模块
console.log(__dirname); //获取当前文件所在目录的绝对路径
const webpack = require("webpack");
const path = require("path");
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); //分析打包文件
const StatsPlugin = require('stats-webpack-plugin'); //生成配置文件
const { pages } = require("./package.json"); //引入package.json中的pages配置

// console.log('process.env.npm_config_report', process.env.npm_config_report);
//当配置文件导出的为一个函数时，第一个参数接收命令行中--env传递的参数，具体规则参考官方文档
module.exports = (env) => {
  console.log(env); // env =>{development:true}/{production:true}
  let entries = {};
  let htmlPlugins = Object.keys(pages).map((outputJsName) => {
    entries[outputJsName] = pages[outputJsName].entry; //保存每个页面的entry配置,用于webpack的entry配置多入口
    const { template, filename, title } = pages[outputJsName];
    return new HtmlWebpackPlugin({
      template: template ? template : `./template/index.html`, //模板静态文件，默认index.html
      filename: filename, //打包后的html文件名
      hash: false, //设置为true，插入的js，css，图片等资源文件会有?hash
      minify: env.production ? {
        //压缩html文件
        removeAttributeQuotes: true, //去除属性的引号
        collapseWhitespace: true, //去除空格
        removeComments: true, //去除注释
      } : false,
      inject: "body", //插入js的位置，默认body(设置为false则不引入js)
      chunks: [outputJsName], //指定引入的js文件
      title: title, //页面标题
      favicon: path.resolve(__dirname, "template/favicon.ico"), // 在此处设置网站图标
    });
  });
  let base = {
    //多入口
    entry: entries,
    output: {
      path: path.resolve(__dirname, "multiPageDist"), //所有的文件都打包到multiPageDist目录下
      filename: "[name].[hash:5].js", //name是和entry中属性名是一一对应的
    },
    plugins: [
      new webpack.DllReferencePlugin({
        //打包编译时，到manifest.json文件中查看有没有这个包的映射信息
        //如果有，直接跳过不用再打包
        //没有才去，打包对应的包
        manifest: path.resolve(__dirname, 'multiPageDist', 'vue-manifest.json')
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'multiPageDist', 'mathjs-manifest.json')
      }),
      new CleanWebpackPlugin({
        //[指定删除的文件的路径*匹配所有, 排除指定的文件]如['cc/*','!cc/a.js']
        cleanOnceBeforeBuildPatterns: ["**/*", '!dll_*', '!*-manifest.json'], //不删除动态链接库相关文件
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[hash:5].css",
      }),
      ...htmlPlugins, //数组解构方式合并所有页面的HtmlWebpackPlugin实例
      new webpack.ProvidePlugin({ //定义自动引入的依赖
        '$': 'jquery',
        Vue: ['vue/dist/vue.esm.js', 'default']
      }),
      new webpack.IgnorePlugin(/locale/, /moment/) //打包时忽略node_modules中moment目录下的使用require引入的路径包含locale的资源
    ],
    module: {
      rules: [{
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "less-loader",
          ],
        },
        {
          test: /\.(png|jp(e)?g|gif|ico|svg|eot|ttf|woff|woff2)$/i,
          use: [{
            loader: "url-loader",
            options: {
              esModule: false, //不需要按照模块导出
              limit: 10 * 1024, //单位是Bit,小于10kb转为base64,大于10kb用file-loader生成图片资源
              name: "image/[name].[hash:5].[ext]", //file-load的配置，当图片大于limit指定大小时生效，生成图片的路径及名称（相对于webpack输出目录）
            },
          }, ],
        },
        { //加载html页面引入的图片
          test: /\.(html|htm)$/,
          use: 'html-withimg-loader'
        },
        {
          test: /\.js$/,
          use: "babel-loader",
          //使用babel.config.js配置了，所以这里注掉
          /* use: {
              loader: 'babel-loader',
              options: {
                exclude: /node_modules/, //排除指定文件或文件夹的编译
                presets: ['@babel/preset-env'],
                plugins: [
                  [
                    '@babel/plugin-proposal-decorators', //支持class装饰器语法
                    { 'legacy': true } //使用旧的第一阶段的语法
                  ],
                  [
                    '@babel/plugin-proposal-class-properties', //支持class相关的新的语法的插件(static 私有属性等)
                    { 'loose': true } //宽松语法模式
                  ],
                  ['@babel/plugin-transform-runtime', {
                    corejs: 3
                  }]
                ]

              }
            } */
        },
      ],
    },
    //外部扩展，把依赖从打包文件中剔除，需要通过外部引用方式获取依赖
    externals: {
      jquery: "jQuery",
    },
    optimization: {
      splitChunks: {
        chunks: 'all', //all表示入口模块及异步加载模块都可以分包（并且可以公用拆分出来的包）
        minSize: 10000, //包最小10kb才可以单独拆分出来
        minChunks: 1, //只要被引用1次的包就可以拆分出来
        cacheGroups: {
          default: false, //取消默认缓存组配置
          // jquery: { //因为我们使用了externals把jQuery从打包文件中去除了，所以，这里是拿不到jquery的
          //   filename: '[name].[hash:6].js',
          //   test: /jquery/,
          //   chunks: 'all'
          // },
          lodash: {
            filename: '[name].[hash:6].js',
            test: /lodash/,
            chunks: 'all',
            priority: -1,
            enforce: true
          },
          moment: { //当前案例中使用了IgnorePlugin，所以仅打包使用到的moment/local/zh-cn
            filename: '[name].[hash:6].js',
            test: /moment/,
            chunks: 'all',
            priority: -1, //优先级，高的先抽离
            enforce: true
          },
          vendors: { //抽离vendor.js
            name: 'vendors',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            priority: -2,
            enforce: true
          },
          common: { //抽离common.js
            name: 'common',
            chunks: 'all',
            minSize: 0,
            minChunks: 2, //引用两次才抽离
            priority: -3,
            enforce: true //强制分包(如果不设置，webpack会根据minSize, minChunks,maxAsyncRequests，maxInitialRequests 调整你的打包结果)
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  };
  //npm run multipage:build --report时 npm_config_report为true
  if (process.env.npm_config_report) {
    base.plugins.push(new BundleAnalyzerPlugin());
  }
  if (process.env.npm_config_stats) {
    base.parallelism = 1; //限制并行处理模块的数量，可用于微调性能或获得更可靠的分析结果
    base.profile = true; //生成配置信息文件
    //生成应用程序的统计信息
    //分析网站地址；https://webpack.github.io/analyse/
    base.plugins.push(new StatsPlugin('stats.json', {
      chunkModules: true
    }));
  }
  if (env.development) {
    //base和开发配置进行合并(相同属性后者覆盖前者的值)
    return merge(base, dev);
  } else {
    //base和生产环境进行合并
    return merge(base, prod);
  }
};