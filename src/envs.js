const debug = require('debug')('apogeu:envs');
const fs = require('fs');
const getBase = require('./getBase');

const defaultEnvs = {
  node_env: 'development',
  port: 3000,
  logger: 'dev',
};

const envsPath = getBase('config/envs.js');
let envs;

try {
  fs.statSync(envsPath);
  envs = require(envsPath);
} catch (e) {
  debug(`${envsPath} not found`);
  envs = {};
}

envs = Object.assign(defaultEnvs, envs);

debug(envs);

const { node_env } = envs;
debug(`process.env.NODE_ENV = ${node_env}`);
process.env.NODE_ENV = node_env;

module.exports = envs;
