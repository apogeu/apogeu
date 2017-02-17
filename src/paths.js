const debug = require('debug')('apogeu:paths');

const getPath = (folder) => {
  const testPath = process.env.TEST_PATH || '';
  let path = `./${folder}`;
  if (testPath) path = `./${testPath}/${folder}`;
  debug(`path: ${path}`);
  return path;
};

module.exports = {
  models: getPath('app/models'),
  controllers: getPath('app/controllers'),
  config: {
    routes: getPath('config/routes'),
  },
};
