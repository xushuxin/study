module.exports = {
  entry:{
    main:'./main.js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env'],
            plugins:[['@babel/plugin-transform-react-jsx',{pragma:'createElement'}]]//设置编译指示(默认是React.createElement）
          }
        }
      }
    ]
  },
  mode:'development',
  optimization:{
    minimize:false
  }
}