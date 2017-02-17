const debug = require('debug')('phosphoros:models');
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const Promise = require('bluebird');

const paths = require('./paths');
const addGlobal = require('./addGlobal');
const readDir = require('./readDir');

const resolveModelName = (name) => {
  const singular = pluralize.singular(path.basename(name, '.js'));
  const modelName = `${capitalize(singular)}Model`;
  debug(`resolve model name: ${modelName}`);
  return modelName;
};

const exportModel = (model, name) => {
  addGlobal(`${paths.models}/${model}`, name);
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    readDir(paths.models)
      .then(models => {
        models.forEach(model => exportModel(model, resolveModelName(model)));
        resolve();
      })
      .catch(reject);
  });
}
