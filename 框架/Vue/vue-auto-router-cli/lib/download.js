const {promisify} = require('util');

//导出clone方法用于下载 repo：仓库地址，desc:本地项目文件夹名
module.exports.clone = async function(repo,desc){
  const download = promisify(require('download-git-repo'));//用于下载git仓库
  const ora = require('ora');//用于生成进度条
  const process = ora(`下载.....${repo}`);//生成进度条
  process.start();//进度条开始转
  await download(repo,desc);//下载git仓库
  process.succeed();//下载成功
}