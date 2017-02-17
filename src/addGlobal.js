const debug = require('debug')('phosphoros:addGlobal');
const getBase = require('./getBase');

module.exports = (dir, name) => {
  dir = getBase(dir);
  global[name] = require(dir);
  debug(`add global : ${name} - ${dir}`);
};
