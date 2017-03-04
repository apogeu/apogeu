#!/usr/bin/env node

const debug = require('debug')('apogeu:app');
const EventEmitter = require('events');
const util = require('util');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const i18n = require('i18n');

util.inherits(express, EventEmitter);

const app = express();

const logger = require('../src/logger');
const paths = require('./paths');
const envs = require('./envs');
const database = require('./database');
const models = require('./models');
const services = require('./services');
const middlewares = require('./middlewares');
const controllers = require('./controllers');
const routes = require('./routes');
const errorHandler = require('./errorHandler');
const exist = require('./exist');
const getBase = require('./getBase');

i18n.configure({ directory: paths.i18n });

app.use(helmet());
app.use(morgan(envs.logger));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(i18n.init);

if (exist(paths.views)) {
  debug('enable cookie parser');
  app.use(cookieParser());

  debug('enable view engine pug');
  app.set('views', paths.views);
  app.set('view engine', 'pug');
}

if (exist(paths.public.this)) {
  debug('enable public static');
  app.use('/public', express.static(paths.public.this));
}

require('./logEnvs');

module.exports = database()
  .then(models)
  .then(services)
  .then(middlewares)
  .then(controllers)
  .then(routes)
  .then((router) => {
    if (exist(paths.assets.stylesheets)) {
      debug('enable gulp stylus');
      require('./gulp');
    }
    app.use(router);
    require(getBase(paths.index));
    errorHandler(app, exist(paths.views));

    app.listen(envs.port, () => {
      logger.info(`Application listening on port ${envs.port}`);
    });
  })
  .catch((err) => {
    logger.error(err.stack);
    process.exit(1);
  });
