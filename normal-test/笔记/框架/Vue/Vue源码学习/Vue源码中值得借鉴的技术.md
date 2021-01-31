使用flow将js变成强类型(现以被typeScript替代了)：

```js
"scripts": {
  "flow": "flow check",//把js变为强类型
}
```



##### 配置 gitHooks，用于commit message的格式检验：

```js
"gitHooks": {
  "pre-commit": "lint-staged",
    //git提交日志的规范，每次提交代码都会调用脚本进行格式校验
   "commit-msg": "node scripts/verify-commit-msg.js"
},
```

scripts/verify-commit-msg.js

```js
const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
    chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
    `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
    `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
    chalk.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
    chalk.red(`  You can also use ${chalk.cyan(`npm run commit`)} to interactively generate a commit message.\n`)
  )
  process.exit(1)
}
```

