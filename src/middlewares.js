const debug = require('debug')('apogeu:middlewares');
const path = require('path');
const pluralize = require('pluralize');
const capitalize = require('capitalize');

const paths = require('./paths');
const addGlobal = require('./addGlobal');
const readDir = require('./readDir');

const resolveName = (name) => {
  const singular = pluralize.singular(path.basename(name, '.js'));
  const middlewareName = `${capitalize(singular)}Middleware`;
  debug(`resolve middleware name: ${middlewareName}`);
  return middlewareName;
};

module.exports = () => new Promise((resolve, reject) => {
  readDir(paths.middlewares, '.js')
    .then((middlewares) => {
      middlewares.forEach((middleware) => {
        const middlewareName = resolveName(middleware);
        addGlobal(`${paths.middlewares}/${middleware}`, middlewareName);
      });
      resolve();
    })
    .catch(reject);
});
