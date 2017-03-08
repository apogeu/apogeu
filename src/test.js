const debug = require('debug')('apogeu:test');
const path = require('path');
const Mocha = require('mocha');

const readDir = require('../src/readDir');

module.exports = testFolder => new Promise((resolve, reject) => {
  const mocha = new Mocha();

  function addFiles(files) {
    files.forEach((file) => {
      debug(`adding ${file} file`);
      mocha.addFile(path.join(testFolder, file));
    });
  }

  function execute() {
    mocha.run((failures) => {
      process.on('exit', () => process.exit(failures));
    });
  }

  readDir(testFolder, '.js')
    .then(addFiles)
    .then(execute)
    .catch(reject);
});
