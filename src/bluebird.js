const Promise = require('bluebird');

Promise.config({
  warnings: {
    wForgottenReturn: false,
  },
});

global.Promise = Promise;
