const debug = require('debug')('phosphoros:models');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const Promise = require('bluebird');

const paths = require('./paths');
const addGlobal = require('./addGlobal');
const readDir = require('./readDir');

const resolveControllerName = (name) => {
  const plural = pluralize.plural(path.basename(name, '.js'));
  const controllerName = `${capitalize(plural)}Controller`;
  debug(`resolve controller name: ${controllerName}`);
  return controllerName;
};

const exportController = (controller, name) => {
  addGlobal(`${paths.controllers}/${controller}`, name);
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    readDir(paths.controllers)
      .then(controllers => {
        controllers.forEach(controller => exportController(controller, resolveControllerName(controller)));
        resolve();
      })
      .catch(reject);
  });
}
