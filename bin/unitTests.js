// const debug = require('debug')('apogeu:unitTests');

const logger = require('../src/logger');
const paths = require('../src/paths');
const getBase = require('../src/getBase');
const models = require('../src/models');
const services = require('../src/services');
const middlewares = require('../src/middlewares');
const controllers = require('../src/controllers');
const test = require('../src/test');

const testFolder = getBase(paths.test.unit);

const runTests = () => {
  logger.info('running unit tests');
  return test(testFolder);
};

const error = (err) => {
  logger.error(`unit test failed with error: ${err.stack}`);
};

models()
  .then(services)
  .then(middlewares)
  .then(controllers)
  .then(runTests)
  .catch(error);
