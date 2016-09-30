'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.GOODREADS_API_URL = 'https://www.goodreads.com';

if(env === 'development' || env === 'test') {
  require('babel-register');
}

exports = module.exports = require('./app');
