const mockApi = function(app,server){
  //修改数据需要重启项目
  app.get('/api/haha',function(req,res){
    res.json({custom:'response666'})
  })
}
module.exports = {
  mockApi
}