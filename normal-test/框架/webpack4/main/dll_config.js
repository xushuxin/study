const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  mode: "production",
  entry: {
    vue: ['vue'],
    mathjs: ['mathjs']
  },
  output: {
    filename: 'dll_[name].js',
    path: path.resolve(__dirname, 'multiPageDist'),
    library: 'dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dll_*', '*-mainfest.json']
    }),
    new webpack.DllPlugin({ //根据对应的库名，生成对应映射文件
      name: 'dll_[name]', //需要和上面的library保持一致
      path: path.resolve(__dirname, 'multiPageDist', '[name]-manifest.json')
    })
  ]
}