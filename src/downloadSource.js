const debug = require('debug')('apogeu:download');
const path = require('path');
const fs = require('fs');
const request = require('request');
const unzip = require('unzip');
const createDir = require('./createDir');

module.exports = (projectFolder, api = false) => new Promise((resolve, reject) => {
  debug('downloading sources');

  request('https://github.com/apogeu/apogeu/archive/master.zip')
    .pipe(unzip.Parse())
    .on('entry', (entry) => {
      if (entry.type === 'Directory') return entry.autodrain();

      const filePath = path.join(projectFolder, entry.path.replace('apogeu-master/', ''));
      const isView = filePath.split('/').map(val => ['views', 'assets', 'public'].includes(val)).includes(true);
      if (api && isView) return;
      createDir(path.dirname(filePath));
      entry
        .pipe(fs.createWriteStream(filePath))
        .on('error', reject);
    })
    .on('close', resolve)
    .on('error', reject);
});
