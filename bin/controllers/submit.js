const log = require('../middleware/logger');
const fs = require('fs');
const path = require('path');

let storage = {};
let data = {};

let submit = async ctx => {
  let body = ctx.request.body;
  let name = body.name;
  let date = body.date;

  let time = new Date();
  let msg = ( storage.hasOwnProperty(name) ? 'Update' : 'Submit');
  log(`Time: ${time.toUTCString()} [${msg}] Name:${name} Date:${date}`);

  msg += ' Successfully';
  storage[name] = date;

  let temp = date.split(',');
  for (t in temp) {
    if (!data.hasOwnProperty(temp[t])) data[temp[t]] = new Set();
    data[temp[t]].add(name);
  }

  fs.writeFileSync(path.resolve(__dirname, '../../data.txt'), '');
  for (let key in data) {
    let people = '';
    data[key].forEach(ele => {
      people += ele + ' ';
    });
    fs.appendFileSync(path.resolve(__dirname, '../../data.txt'), `${key} ${data[key].size} ${people}\r\n`);
  }

  ctx.body = {
    msg: msg
  };
}

module.exports = {
  'POST /submit': submit
}