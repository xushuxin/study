const fs  = require('fs');
const execa  = require('execa');//开启子进程进打包，最终还是使用rollup进行打包
const targets = fs.readdirSync('packages').filter(f=>{
  if(!fs.statSync(`packages/${f}`).isDirectory()){
    return false
  }
  return true;
})

async function build(target){
  await execa('rollup',
    ['-cw','--environment',`TARGET:${target}`],
    {stdio:'inherit'}//子进程信息共享给父进程
  )
}

function runParallel(targets,iteratorFn){
  const res = [];
  for(const item of targets){
    const p = iteratorFn(item)
    res.push(p)
  }
  return Promise.all(res)
}

//平行打包
runParallel(targets,build)