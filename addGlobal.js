const debug = require('debug')('phosphoros:addGlobal');

module.exports = (path, name) => {
  global[name] = require(path);
  debug(`add global : ${name} - ${path}`);
};
