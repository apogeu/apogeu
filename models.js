const debug = require('debug')('models');
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const Promise = require('bluebird');

const paths = require('./paths');

const getModels = () => {
  return new Promise((resolve, reject) => {
    debug(`get models: ${paths.models}`);
    fs.readdir(paths.models, (err, files) => {
      if (err) return reject(err);
      debug(`models: ${files}`);
      resolve(files);
    });
  });
};

const resolveModelName = (name) => {
  const singular = pluralize.singular(path.basename(name, '.js'));
  const modelName = `${capitalize(singular)}Model`;
  debug(`resolve model name: ${modelName}`);
  return modelName;
};

const exportModel = (model, name) => {
  const modelPath = `${paths.models}/${model}`;
  global[name] = require(modelPath);
  debug(`export model: ${name} - ${modelPath}`);
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    getModels()
      .then(models => {
        models.forEach(model => exportModel(model, resolveModelName(model)));
        resolve();
      })
      .catch(reject);
  });
}
