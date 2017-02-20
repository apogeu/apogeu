#!/usr/bin/env node

const debug = require('debug')('apogeu:new');
const path = require('path');
const createDir = require('../src/createDir');
const download = require('../src/downloadSource');
const createPackage = require('../src/createPackage');
const installDependencies = require('../src/installDependencies');
const scriptFolder = process.cwd();

module.exports = (project_name) => {
  let projectFolder = project_name ? path.join(scriptFolder, project_name) : scriptFolder;
  project_name = project_name || path.basename(scriptFolder);

  debug(`project name: ${project_name}`);

  createDir(projectFolder, true);

  download(projectFolder)
    .then(() => createPackage(projectFolder))
    .then(() => installDependencies(projectFolder))
    .then(() => debug(`${project_name} app created`))
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
