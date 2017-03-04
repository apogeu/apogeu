const debug = require('debug')('apogeu:integrationTests');
const path = require('path');
const Mocha = require('mocha');

const logger = require('../src/logger');
const paths = require('../src/paths');
const readDir = require('../src/readDir');
const getBase = require('../src/getBase');
const app = require('../src/app');

const testFolder = getBase(paths.test.integration);

const runTests = () => {
  logger.info('running integration tests');

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

app.then(runTests);
