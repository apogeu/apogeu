const debug = require('debug')('apogeu:installDependencies');
const path = require('path');
const createDir = require('../src/createDir');
const npm = require('npm');

module.exports = projectFolder => new Promise((resolve, reject) => {
  debug('installing app dependencies');

  createDir(path.join(projectFolder, 'node_modules'), true);

  npm.load({ prefix: projectFolder }, (err) => {
    if (err) return reject(err);

    npm.commands.install([projectFolder], (error) => {
      if (err) return reject(error);
      debug('dependencies installed');
      resolve();
    });

    npm.on('log', message => debug(message));
  });
});
