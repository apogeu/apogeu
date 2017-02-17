const debug = require('debug')('phosphoros:readDir');
const fs = require('fs');

module.exports = (path) => {
  return new Promise((resolve, reject) => {
    debug(`read dir: ${path}`);
    fs.readdir(path, (err, files) => {
      if (err) return reject(err);
      debug(`files: ${files}`);
      resolve(files);
    });
  });
};
