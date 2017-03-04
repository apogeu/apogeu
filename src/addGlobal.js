const debug = require('debug')('apogeu:addGlobal');
const getBase = require('./getBase');

module.exports = (path, name) => {
  const pathBase = getBase(path);
  debug(`${name} - ${pathBase}`);
  return (global[name] = require(pathBase));
};
