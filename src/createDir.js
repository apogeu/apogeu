const debug = require('debug')('apogeu:createDir');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const log = require('winston');

module.exports = (dir, overwrite) => {
  try {
    if (fs.existsSync(dir)) {
      if (!overwrite) return;
      rimraf.sync(dir);
    }
    debug(dir);
    mkdirp.sync(dir);
  } catch (ex) {
    log.error(ex.stack);
  }
};
