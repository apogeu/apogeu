const debug = require('debug')('apogeu:services');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');

const paths = require('./paths');
const addGlobal = require('./addGlobal');
const readDir = require('./readDir');

const resolveControllerName = (name) => {
  const plural = pluralize.plural(path.basename(name, '.js'));
  const serviceName = `${capitalize(plural)}Service`;
  debug(`resolve service name: ${serviceName}`);
  return serviceName;
};

const exportController = (service, name) => {
  addGlobal(`${paths.services}/${service}`, name);
};

module.exports = () => new Promise((resolve, reject) => {
  readDir(paths.services, '.js')
    .then((services) => {
      services.forEach((service) => {
        const serviceName = resolveControllerName(service);
        return exportController(service, serviceName);
      });
      resolve();
    })
    .catch(reject);
});
