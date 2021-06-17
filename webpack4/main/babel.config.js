module.exports = {
  exclude: /node_modules/, //排除指定文件或文件夹的编译
  presets: [
    //尽量通过重写类及类上的方法处理
    ['@babel/preset-env', {
      useBuiltIns: 'usage', //按需加载api补丁
      corejs: 3
    }]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators', //支持class装饰器语法
      { 'legacy': true } //使用旧的第一阶段的语法
    ],
    [
      '@babel/plugin-proposal-class-properties', //支持class相关的新的语法的插件(static 私有属性等)
      { 'loose': true } //使用宽松语法模式 this.a = xxx
    ],
    // ['@babel/plugin-transform-runtime', {//转换语法的方式实现低级语法
    //   corejs: 3
    // }]
  ]
}