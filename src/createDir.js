const debug = require('debug')('apogeu:createDir');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

module.exports = (dir, overwrite) => {
  debug(`create dir: ${dir}`);
  try {
    if (fs.existsSync(dir)) {
      if (!overwrite) return;
      rimraf.sync(dir);
    }
    mkdirp.sync(dir);
  } catch (ex) {
    console.error(ex.stack);
  }
};
