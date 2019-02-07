const log = require('../middleware/logger');
const fs = require('fs');
const path = require('path');

let data = {};

let submit = async ctx => {
  let body = ctx.request.body;
  let name = body.name;
  let date = body.date;

  let time = new Date();
  let msg = ( data.hasOwnProperty(name) ? 'Update' : 'Submit');
  log(`Time: ${time.toUTCString()} [${msg}] Name:${name} Date:${date}`);

  msg += ' Successfully';
  data[name] = date;


  fs.writeFileSync(path.resolve(__dirname, '../../data.txt'), '');
  for (let key in data) {
    fs.appendFileSync(path.resolve(__dirname, '../../data.txt'), `${key} ${data[key]}`);
  }

  ctx.body = {
    msg: msg
  };
}

module.exports = {
  'POST /submit': submit
}