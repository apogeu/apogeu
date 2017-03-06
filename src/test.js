const debug = require('debug')('apogeu:test');
const path = require('path');
const Mocha = require('mocha');
const istanbul = require('istanbul');
const im = require('istanbul-middleware');

const logger = require('../src/logger');
const readDir = require('../src/readDir');
const getBase = require('../src/getBase');

module.exports = testFolder => new Promise((resolve, reject) => {
  const mocha = new Mocha();
  const collector = new istanbul.Collector();
  const reporter = new istanbul.Reporter();

  im.hookLoader(getBase(), { verbose: true });

  function addFiles(files) {
    files.forEach((file) => {
      debug(`adding ${file} file`);
      mocha.addFile(path.join(testFolder, file));
    });
  }

  function execute() {
    mocha.run((failures) => {
      collector.add(global.__coverage__ || {});
      reporter.addAll(['text', 'html']);
      reporter.write(collector, true, () => {
        logger.info('Coverage report saved to coverage/index.html');
      });

      process.on('exit', () => process.exit(failures));
    });
  }

  readDir(testFolder, '.js')
    .then(addFiles)
    .then(execute)
    .catch(reject);
});
