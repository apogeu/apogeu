const debug = require('debug')('apogeu:addGlobal');
const getBase = require('./getBase');

module.exports = (path, name) => {
  const pathBase = getBase(path);
  debug(`add global : ${name} - ${pathBase}`);
  global[name] = require(pathBase);
};
