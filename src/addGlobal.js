const debug = require('debug')('apogeu:addGlobal');
const getBase = require('./getBase');

module.exports = (path, name) => {
  const pathBase = getBase(path);
  global[name] = require(pathBase);
  debug(`add global : ${name} - ${pathBase}`);
};