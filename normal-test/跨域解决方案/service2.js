const express =require('express'),
      app = express();
app.listen(1002,_=>{
  console.log('listen 1002')
})
app.use(express.static('./'));