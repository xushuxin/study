module.exports={
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  "rules": {
    "eqeqeq": 2,//必须使用全等
    "semi": 0,
    "no-async-promise-executor":0,
    "no-misleading-character-class":0,
    "no-useless-catch":0,
    "quote-props":0,
    "css-lcurlyexpected":0
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 6,
    "sourceType": "module"
  },
}