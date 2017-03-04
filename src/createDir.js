const debug = require('debug')('apogeu:createDir');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const logger = require('../src/logger');

module.exports = (dir, overwrite) => {
  try {
    if (fs.existsSync(dir)) {
      if (!overwrite) return;
      rimraf.sync(dir);
    }
    debug(dir);
    mkdirp.sync(dir);
  } catch (ex) {
    logger.error(ex.stack);
  }
};
