#!/usr/bin/env node

const debug = require('debug')('apogeu:create');
const path = require('path');
const capitalize = require('capitalize');
const Promise = require('bluebird');
const paths = require('../src/paths');
const renderTemplate = require('../src/renderTemplate');
const saveTemplate = require('../src/saveTemplate');

module.exports = (modelName) => {
  const validator = new RegExp('^[A-Za-z][a-zA-Z0-9]+$');
  modelName = capitalize(modelName.split(' ')[0]);
  if (!validator.test(modelName)) {
    debug('Model name should be composed only by letters and numbers. First char must be a letter.');
  }

  debug(`creating structure for ${modelName} model`);

  const model = renderTemplate('model', modelName);
  const controller = renderTemplate('controller', modelName);
  const service = renderTemplate('service', modelName);

  const fileName = `${modelName.toLowerCase()}.js`;
  Promise.all([
    saveTemplate(model, path.join(paths.models, fileName)),
    saveTemplate(controller, path.join(paths.controllers, fileName)),
    saveTemplate(service, path.join(paths.services, fileName)),
  ])
    .then(() => debug(`${modelName} structure created`))
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};