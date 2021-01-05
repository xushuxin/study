let express = require('./node_modules/express'), 
    app = express();
app.listen(8001, () => {
  console.log('ok！')
});
app.get('/list', (req, res) => {
  let {
    callback = Function.prototype
  } = req.query;
  let data = {
    code: 0,
    message: '珠峰培训'
  };
  res.send(`${callback}(${JSON.stringify(data)})`)
})