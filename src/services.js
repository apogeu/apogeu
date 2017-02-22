const debug = require('debug')('apogeu:services');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');

const paths = require('./paths');
const addGlobal = require('./addGlobal');
const readDir = require('./readDir');

const resolveName = (name) => {
  const plural = pluralize.plural(path.basename(name, '.js'));
  const serviceName = `${capitalize(plural)}Service`;
  debug(`resolve service name: ${serviceName}`);
  return serviceName;
};

module.exports = () => new Promise((resolve, reject) => {
  readDir(paths.services, '.js')
    .then((services) => {
      services.forEach((service) => {
        const serviceName = resolveName(service);
        addGlobal(`${paths.services}/${service}`, serviceName);
      });
      resolve();
    })
    .catch(reject);
});
