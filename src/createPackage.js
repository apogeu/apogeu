const debug = require('debug')('apogeu:createPackage');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const clipkg = require('../package.json');

module.exports = (projectFolder) => new Promise((resolve, reject) => {
  debug('creating package file');

  const apppkg = {
    name: path.basename(projectFolder),
    version: '0.0.0',
    description: '',
    dependencies: {
      mongoose: clipkg.dependencies.mongoose,
    },
  };

  fs.writeFile(path.join(projectFolder, 'package.json'), JSON.stringify(apppkg, null, 4), (err) => {
    if (err) return reject(err);
    resolve();
  });
});
