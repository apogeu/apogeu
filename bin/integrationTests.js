// const debug = require('debug')('apogeu:integrationTests');

const logger = require('../src/logger');
const paths = require('../src/paths');
const getBase = require('../src/getBase');
const app = require('../src/app');
const test = require('../src/test');

const testFolder = getBase(paths.test.integration);

const runTests = () => {
  logger.info('running integration tests');
  return test(testFolder);
};

const error = (err) => {
  logger.error(`integration test failed with error: ${err.stack}`);
};

app
  .then(runTests)
  .then(() => process.exit(0))
  .catch(error);
