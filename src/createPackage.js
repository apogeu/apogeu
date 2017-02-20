const debug = require('debug')('apogeu:createPackage');
const fs = require('fs');
const path = require('path');
const clipkg = require('../package.json');

module.exports = projectFolder => new Promise((resolve, reject) => {
  debug('creating package file');

  const apppkg = {
    name: path.basename(path.resolve(projectFolder)),
    version: '0.0.0',
    description: '',
    dependencies: {
      bluebird: clipkg.dependencies.bluebird,
      mongoose: clipkg.dependencies.mongoose,
    },
  };

  fs.writeFile(path.join(projectFolder, 'package.json'), JSON.stringify(apppkg, null, 2), (err) => {
    if (err) return reject(err);
    resolve();
  });
});
