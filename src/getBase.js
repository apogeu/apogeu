const debug = require('debug')('apogeu:getBase');
const path = require('path');

module.exports = (dir) => {
  const base = path.join(path.resolve('.'), dir);
  debug(`path: ${base}`);
  return base;
};
