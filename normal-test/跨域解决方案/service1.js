const express =require('express'),
      app = express();
app.listen(1001,_=>{
  console.log('listen 1001')
})
app.use(express.static('./'));