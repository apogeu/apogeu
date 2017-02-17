const debug = require('debug')('phosphoros:readDir');
const fs = require('fs');
const path = require('path');

module.exports = (dir, ext = '') => {
  return new Promise((resolve, reject) => {
    debug(`read dir: ${dir}`);
    fs.readdir(dir, (err, files) => {
      if (err) return reject(err);
      if (ext) files = files.filter(file => path.extname(file) === ext);
      debug(`files: ${files}`);
      resolve(files);
    });
  });
};
