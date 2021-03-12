'use strict';
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: './' + process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', //import Vue from "vue"会转化为在当前项目的node_modules目录下查找vue/dist/vue.esm.js
      '@': resolve('src'),
      'src': resolve('src'),
      'js': resolve('src/js'),
      'img': resolve('src/assets/images'),
      'components': resolve('src/components')
    }
  },
  plugins: [
    // 自动加载模块，而不必到处 import 或 require
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      //1.这里可以直接使用js，是因为设置了alias;2. axios文件内必须使用commonJS规范导出，才可以这样用
      // myAxios: 'js/axios' 
      myAxios: ['js/axios', 'default'], //axios内使用非标准ESModule（webpack自己实现的）导出，需要设置导出的属性名，默认default
      jqAjax: ['jquery', 'ajax'],
      mathjs: 'mathjs'
    })
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'thread-loader', //多进程打包，用于耗时比较长的loader
          'babel-loader',
        ],
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  externals: [ //外部扩展，不打包属性名对应的依赖，而是通过外部引用的方式获取（属性值为依赖暴露的全局对象的属性）
    // '不想打包的依赖': '该依赖暴露的全局对象的属性',
    //todo lodash mockjs hammerjs（移动端手势库）
    //"vue-router": "VueRouter",
    //"echarts": "echarts",
    {
      // 'vue': 'Vue',
      'jquery': 'jQuery',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'mand-mobile': `window['mand-mobile']`, //mand-mobile暴露的不是正常变量规则，需要我们自己用window去获取
    },

  ]
}