const debug = require('debug')('apogeu:models');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');

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

module.exports = () => new Promise((resolve, reject) => {
  readDir(paths.models, '.js')
    .then((models) => {
      models.forEach((model) => {
        const modelName = resolveModelName(model);
        exportModel(model, modelName);
      });
      resolve();
    })
    .catch(reject);
});
