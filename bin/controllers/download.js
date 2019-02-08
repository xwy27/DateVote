const send = require('koa-send');
const fs = require('fs');
const PATH = require('path');
const log = require('../middleware/logger');

let download = async ctx => {
  log(`[Download] Downloading data...`);
  
  let data = require('./submit').data;
  fs.writeFileSync(PATH.resolve(__dirname, '../../data.txt'), '');
  for (let key in data) {
    let people = '';
    if (data[key].size) {
      data[key].forEach(ele => {
        people += ele + ' ';
      });
      fs.appendFileSync(PATH.resolve(__dirname, '../../data.txt'), `${key} ${data[key].size} ${people}\r\n`);
    }
  }
  
  let path = `./data.txt`;
  log(`[Download] Download successfully`);
  ctx.attachment(path);
  await send(ctx, path);
}

module.exports = {
  'GET /download': download
}