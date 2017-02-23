const debug = require('debug')('apogeu:envs');
const fs = require('fs');
const os = require('os');

const getBase = require('./getBase');

const defaultEnvs = {
  node_env: 'development',
  port: 3000,
  logger: 'dev',
  cluster: os.cpus().length,
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

process.env.NODE_ENV = envs.node_env;

module.exports = envs;
