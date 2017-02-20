const debug = require('debug')('apogeu:mongoose');
const mongoose = require('mongoose');
const log = require('winston');
const mongooseTimestamps = require('mongoose-timestamp');

const envs = require('./envs');

const { timestamps, mongodb, node_env } = envs;

debug(`mongoose timestamps: ${timestamps}`);

if (timestamps) mongoose.plugin(mongooseTimestamps);

module.exports = () => new Promise((resolve, reject) => {
  const debugMongoose = node_env !== 'production';
  debug(`debug mongoose: ${debugMongoose}`);

  mongoose.Promise = Promise;

  mongoose.set('debug', debugMongoose);

  mongoose.connect(mongodb);

  mongoose.connection.on('connected', () => log.info(`Mongoose default connection open to ${mongodb}`));

  mongoose.connection.on('error', err => reject(err));

  mongoose.connection.on('disconnected', () => log.info('Mongoose default connection disconnected'));

  mongoose.connection.once('open', () => {
    resolve();
    log.info('Mongoose default connection is open');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      log.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
});
