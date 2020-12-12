module.exports = {
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