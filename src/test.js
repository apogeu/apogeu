const debug = require('debug')('apogeu:test');
const path = require('path');
const Mocha = require('mocha');

const readDir = require('../src/readDir');

module.exports = testFolder => new Promise((resolve, reject) => {
  const mocha = new Mocha();

  function addFiles(files) {
    return new Promise((resolve) => {
      files.forEach((file) => {
        debug(`adding ${file} file`);
        mocha.addFile(path.join(testFolder, file));
      });
      resolve();
    });
  }

  function execute() {
    return new Promise((resolve) => {
      mocha.run((failures) => {
        if (failures === 0) return resolve();
        process.on('exit', () => process.exit(failures));
      });
    });
  }

  readDir(testFolder, '.js')
    .then(addFiles)
    .then(execute)
    .then(resolve)
    .catch(reject);
});
