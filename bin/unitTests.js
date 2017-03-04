const debug = require('debug')('apogeu:unitTests');
const path = require('path');
const Mocha = require('mocha');

const logger = require('../src/logger');
const paths = require('../src/paths');
const readDir = require('../src/readDir');
const getBase = require('../src/getBase');
const models = require('../src/models');
const services = require('../src/services');
const middlewares = require('../src/middlewares');
const controllers = require('../src/controllers');

const testFolder = getBase(paths.test.unit);

const runTests = () => {
  logger.info('running unit tests');

  const mocha = new Mocha();

  function addFiles(files) {
    files.forEach((file) => {
      debug(`adding ${file} file`);
      mocha.addFile(path.join(testFolder, file));
    });
  }
  function execute() {
    mocha.run((failures) => {
      process.on('exit', () => {
        process.exit(failures);
      });
    });
  }

  readDir(testFolder, '.js')
    .then(addFiles)
    .then(execute);
};

models()
  .then(services)
  .then(middlewares)
  .then(controllers)
  .then(runTests);
