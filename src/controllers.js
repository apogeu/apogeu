const debug = require('debug')('apogeu:controllers');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');

const paths = require('./paths');
const addGlobal = require('./addGlobal');
const readDir = require('./readDir');

const resolveName = (name) => {
  const plural = pluralize.plural(path.basename(name, '.js'));
  const controllerName = `${capitalize(plural)}Controller`;
  debug(`resolve controller name: ${controllerName}`);
  return controllerName;
};

module.exports = () => new Promise((resolve, reject) => {
  readDir(paths.controllers, '.js')
    .then((controllers) => {
      controllers.forEach((controller) => {
        const controllerName = resolveName(controller);
        addGlobal(`${paths.controllers}/${controller}`, controllerName);
      });
      resolve();
    })
    .catch(reject);
});
