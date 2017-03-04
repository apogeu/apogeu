module.exports = {
  index: 'index',
  models: 'app/models',
  controllers: 'app/controllers',
  services: 'app/services',
  middlewares: 'app/middlewares',
  views: 'app/views',
  i18n: 'app/i18n',
  test: {
    this: 'test',
    unit: 'test/unit',
    integration: 'test/integration/',
  },
  config: {
    this: 'config',
    routes: 'config/routes',
    envs: 'config/envs',
    scaffold: 'config/scaffold',
    database: 'config/database',
  },
  assets: {
    stylesheets: 'app/assets/stylesheets',
  },
  public: {
    this: 'public',
    stylesheets: 'public/stylesheets',
  },
};
