const log = require('../middleware/logger');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

var storage = {};
var data = {};

// load data
(function load() {
  let file = fs.createReadStream(path.resolve(__dirname, '../../storage.txt'));
  let fileLines = readline.createInterface({
    input: file
  });
  fileLines.on('line', line => {
    let name = line.split(' ')[0];
    let date = line.split(' ')[1];
    storage[name] = date;
    let temp = date.split(',');
    for (t in temp) {
      if (!data.hasOwnProperty(temp[t])) data[temp[t]] = new Set();
      data[temp[t]].add(name);
    }
  });

  fileLines.on('close', () => {
    // console.log(storage);
    // console.log(data);
    console.log('Load End');
  });
}());

let submit = async ctx => {
  let body = ctx.request.body;
  let name = body.name;
  let date = body.date;

  let time = new Date();
  let msg = ( storage.hasOwnProperty(name) ? 'Update' : 'Submit');
  log(`Time: ${time.toUTCString()} [${msg}] Name:${name} Date:${date}`);

  msg += ' Successfully';
  let prev = storage[name];
  let temp = date.split(',');
  if (prev === undefined) { // first time
    for (t in temp) {
      if (!data.hasOwnProperty(temp[t])) data[temp[t]] = new Set();
      data[temp[t]].add(name);
    }
  } else {  // update
    prev = prev.split(',');
    let del = [];
    let add = [];
    for (let i = 0; i < prev.length; ++i) {
      let flag = false;
      for (let j = 0; j < temp.length; ++j) {
        if (temp[j] === prev[i]) {
          break;
        } else if (j === temp.length - 1) {
          flag = true;
        }
      }
      if (flag) {
        del.push(prev[i]);
      }
    }
    
    for (let i = 0; i < temp.length; ++i) {
      let flag = false;
      for (let j = 0; j < prev.length; ++j) {
        if (temp[i] === prev[j]) {
          break;
        } else if (j === prev.length - 1) {
          flag = true;
        }
      }
      if (flag) {
        add.push(temp[i]);
      }
    }
    
    del.forEach(x => {
      data[x].delete(name);
    });

    add.forEach(x => {
      if (!data.hasOwnProperty(x)) data[x] = new Set();
      data[x].add(name);
    });
  }
  
  storage[name] = date;
  fs.writeFileSync(path.resolve(__dirname, '../../storage.txt'), '');
  for (let key in storage) {
    fs.appendFileSync(path.resolve(__dirname, '../../storage.txt'), `${key} ${storage[key]}\r\n`);
  }
  
  ctx.body = {
    msg: msg
  };
}

module.exports = {
  'POST /submit': submit,
  'data': data
}