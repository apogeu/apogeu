const debug = require('debug')('apogeu:debug');
const Promise = require('bluebird');

Promise.config({
  warnings: {
    wForgottenReturn: false,
  },
});

global.Promise = Promise;
debug('global.Promise = require("bluebird")');
