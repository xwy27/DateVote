const send = require('koa-send');
const log = require('../middleware/logger');

let download = async ctx => {
  log(`[Download] Downloading data...`);
  let path = `./data.txt`;
  log(`[Download] Download successfully`);
  ctx.attachment(path);
  await send(ctx, path);
}

module.exports = {
  'GET /download': download
}