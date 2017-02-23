const debug = require('debug')('apogeu:routes');
const methods = require('methods');
const express = require('express');

const paths = require('./paths');
const getBase = require('./getBase');

const router = express.Router();

const isMethod = method => methods.includes(method);
const isFunction = func => typeof func === 'function';
const isArray = array => Array.isArray(array);

const getRoutes = () => {
  debug('get routes');
  return require(getBase(paths.config.routes));
};

const getMethod = (options = []) => options.filter(isMethod)[0];
const getRoute = (options = []) => options.filter(route => route[0] === '/')[0];

const createRoute = (method = 'get', route = '/', callback = []) => {
  debug(`${method} ${route}`);
  router[method](route, callback);
};

const resolveRoute = (address, routes) => {
  const splited = address.split(' ').filter(s => s);

  const method = getMethod(splited);
  const route = getRoute(splited);
  const target = routes[address];

  if (isFunction(target)) {
    return createRoute(method, route, target);
  }

  if (isArray(target)) {
    if (isFunction(target[0])) {
      return createRoute(method, route, target);
    }

    target.forEach((t) => {
      const callback = [];
      const { middlewares, controller } = t;
      if (middlewares) {
        if (isArray(middlewares)) {
          callback.push(...middlewares);
        } else {
          callback.push(middlewares);
        }
      }
      if (controller) callback.push(controller);
      createRoute(t.method, route, callback);
    });
  }
};

module.exports = () => new Promise((resolve, reject) => {
  try {
    const routes = getRoutes();
    for (const address in routes) {
      resolveRoute(address, routes);
    }
    resolve(router);
  } catch (e) {
    reject(e);
  }
});
