const mongoose = require('mongoose');
const log = require('winston');
const envs = require('./envs');

module.exports = () => new Promise((resolve, reject) => {
  const url = envs.mongodb;

  mongoose.set('debug', envs.node_env !== 'production');

  mongoose.connect(url);

  mongoose.Promise = Promise;

  mongoose.connection.on('connected', () => log.info(`Mongoose default connection open to ${url}`));

  mongoose.connection.on('error', err => reject(`Mongoose default connection error: ${err}`));

  mongoose.connection.on('disconnected', () => log.info('Mongoose default connection disconnected'));

  mongoose.connection.once('open', () => {
    resolve();
    log.info('Mongoose default connection is open');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      reject('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
});
