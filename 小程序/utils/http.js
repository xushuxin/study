// http request
let baseUrl = "http://localhost:3000";
function http(option){
  let {url,method = "GET",data} = option;
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      method,
      data,
      success(data){
        resolve(data);
      },
      fail(err){
        reject(err);
      }
    })
  })
}
http.post =function(option){
  const {url,data} = option;
  return http({url, method:"POST",data})
}
http.get =function(option){
  const {url,data} = option;
  return http({url, method:'GET',data})
}