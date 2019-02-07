const template = require('../middleware/template')();

const month = require('../../setting').month;
const date = require('../../setting').date;

let index = async ctx => {
  ctx.body = template.render('index.html', {
    title: 'Date Vote',
    intro: 'Vote for a party date',
    month: month,
    date: date
  });
}

module.exports = {
  'GET /index': index
}