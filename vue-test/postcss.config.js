module.exports = {
  plugins: {
    "autoprefixer": { browsers: 'last 5 version' },
    "postcss-pxtorem": { //官方网站https://www.npmjs.com/package/postcss-pxtorem
      "rootValue": "100", //css文件中100px转为1rem，如750px会转为7.5rem
      "propList": ["*", "!letter-spacing"], //转换的属性的列表，*表示通用,!加属性名表示不匹配指定属性
      "selectorBlackList": [ //忽略的css选择器.ig-表示包含.ig-的都不转换,支持正则
        ".ig-"
      ],
      "unitPrecision": 5, //保留rem小数点位数
      "mediaQuery": false, //媒体查询中是否生效
      "minPixelValue": 1 //px小于1不会转换
    }
  }
}