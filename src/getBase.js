const debug = require('debug')('apogeu:getBase');
const path = require('path');

module.exports = (dir) => {
  const base = path.join(process.cwd(), dir);
  debug(`path: ${base}`);
  return base;
};
