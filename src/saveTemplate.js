const debug = require('debug')('apogeu:saveTemplate');
const fs = require('fs');
const getBase = require('../src/getBase');

module.exports = (template, filePath) => new Promise((resolve, reject) => {
  debug(`saving template file ${filePath}`);

  fs.writeFile(getBase(filePath), template, (err) => {
    if (err) return reject(err);
    resolve();
  });
});
