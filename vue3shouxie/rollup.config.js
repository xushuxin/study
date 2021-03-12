// 根据环境变量中的target属性 获取对应模块的package.json
import path from 'path';
import resolvePlugin from ''
const packagesDir = path.resolve(__dirname,'packages');//存放所有包的目录
const packageDir = path.resolve(packagesDir,process.env.TARGET)//找到要打包的某个包

//永远针对的某个模块
const resolve = (p)=>path.resolve(packageDir,p);

const pkg = require(resolve('package.json'));//获取package.json文件

const name = path.basename(packageDir);//取文件名

//对打包类型，先做一个映射表，根据提供的formats 来格式化需要打包的内容

const outputConfig = {//自定义的，与package.json中对应
  'esm-bundler':{
    file:resolve(`dist/${name}.esm-bundler.js`),
    format:'es'
  },
  'cjs':{
    file:resolve(`dist/${name}.cjs.js`),
    format:'cjs'
  },
  'global':{
    file:resolve(`dist/${name}.global.js`),
    format:'iife'//立即执行函数
  }
}

const options = pkg.buildOptions;


function createConfig(format,output){
  output.name = options.name;//出口的文件名
  output.sourcemap = true;//生成sourcemap
  //生成rollup配置
  return {
    input:resolve(`src/index.ts`),
    output,
    plugins:[
      json(),
      ts({//ts插件
        tsconfig:path.resolve(__dirname,'tsconfig.json')
      }),
      resolvePlugin()//解析第三方模块的插件
    ]
  }
}

//rollup导出的最终配置
//产生每个模块的配置，放到数组中
export default options.formats.map((format)=>{
  return createConfig(format,outputConfig[format]);
})