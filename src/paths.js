const debug = require('debug')('apogeu:paths');

const getPath = (folder) => {
  const template = process.env.TEMPLATE;
  let path = `./${folder}`;
  if (template) path = `./${template}/${folder}`;
  debug(path);
  return path;
};

module.exports = {
  models: getPath('app/models'),
  controllers: getPath('app/controllers'),
  services: getPath('app/services'),
  config: {
    routes: getPath('config/routes'),
    envs: getPath('config/envs'),
  },
  assets: {
    stylesheets: getPath('app/assets/stylesheets'),
  },
  public: {
    stylesheets: getPath('app/public/stylesheets'),
  },
};
