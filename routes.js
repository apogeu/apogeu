const debug = require('debug')('phosphoros:routes');
const Promise = require('bluebird');
const express = require('express');

const router = express.Router();

const getRoutes = () => {
  debug('get routes');
  return require('./config/routes');
};

const resolveAddress = (address, routes) => {
  debug('resolve address');
  const splited = address.split(' ');
  const method = splited[0];
  const route = splited[1];
  const target = routes[address];
  debug(`method: ${method}`);
  debug(`route: ${route}`);
  return { method, route, target };
};

const createRoute = (data) => {
  const { method, route, target } = data;
  debug(`create route: ${method} ${route}`);
  router[method](route, target);
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    const routes = getRoutes();
    for (const address in routes) {
      const data = resolveAddress(address, routes);
      createRoute(data);
    }
    resolve(router);
  });
};
