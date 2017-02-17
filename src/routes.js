const debug = require('debug')('phosphoros:routes');
const Promise = require('bluebird');
const methods = require('methods');
const express = require('express');

const paths = require('./paths');
const getBase = require('./getBase');

const router = express.Router();

const isMethod = (method) => {
  return methods.includes(method);
}

const isRoute = (route) => {
  return route[0] === '/';
};

const isFunction = (func) => {
  return typeof func === 'function';
};

const getRoutes = () => {
  debug('get routes');
  return require(getBase(paths.config.routes));
};

const resolveAddress = (address, routes) => {
  debug('resolve address');
  const splited = address.split(' ');
  let method = splited[0];
  let route = splited[1];
  let target = routes[address];

  if (!isMethod(method) && isRoute(method)) {
    debug(`method ${method} is route`);
    if (isFunction(target)) {
      route = method;
      method = 'get';
    }
  }

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
