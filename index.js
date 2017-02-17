const debug = require('debug')('index');
const Promise = require('bluebird');

const models = require('./models');

debug('execute all process');
Promise
  .all([
    models(),
  ])
  .then(() => {
    console.log(ClientModel.foo);
  })
  .catch(console.error)
