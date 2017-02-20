const debug = require('debug')('apogeu:installDependencies');
const path = require('path');
const spawn = require('child_process').spawn;
const which = require('which');
const createDir = require('../src/createDir');

module.exports = projectFolder => new Promise((resolve) => {
  debug('installing app dependencies');

  // node_modules folder must exist in order to --prefix work
  createDir(path.join(projectFolder, 'node_modules'), true);

  const npm = `"${which.sync('npm')}"`;
  const proc = spawn(npm, ['install', projectFolder, '--prefix', projectFolder], { shell: true });
  proc.stdout.on('data', data => debug(data.toString()));
  proc.on('close', resolve);

  process.on('exit', () => proc.kill());
  process.on('SIGINT', () => proc.kill());
});
