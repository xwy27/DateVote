const koa = require('koa');
const koaBody = require('koa-body');

const controller = require('./middleware/controller');
const logger = require('./middleware/logger');

app = new koa();

app.use(koaBody());

app.use(logger());

app.use(controller());

app.listen(16173, () => {
  console.log('Date Vote is serving at port 16173');  
});