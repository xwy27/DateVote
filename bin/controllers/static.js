const serve = require('koa2-static-middleware');
const path = require('path');

let static = serve(path.resolve(__dirname, '../static'));

module.exports = {
  'GET /static/*' : static
}