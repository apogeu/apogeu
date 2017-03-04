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
      'mongoose-timestamp': clipkg.dependencies['mongoose-timestamp'],
      winston: clipkg.dependencies.winston,
    },
    devDependencies: {
      assert: clipkg.dependencies.assert,
      mocha: clipkg.dependencies.mocha,
      eslint: clipkg.devDependencies.eslint,
      'eslint-config-airbnb-base': clipkg.devDependencies['eslint-config-airbnb-base'],
      'eslint-plugin-import': clipkg.devDependencies['eslint-plugin-import'],
    },
  };

  fs.writeFile(path.join(projectFolder, 'package.json'), JSON.stringify(apppkg, null, 2), (err) => {
    if (err) return reject(err);
    resolve();
  });
});
