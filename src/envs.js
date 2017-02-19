const debug = require('debug')('apogeu:envs');
const fs = require('fs');
const getBase = require('./getBase');

const defaultEnvs = {
  node_env: 'development',
  port: 3000,
  timestamps: true,
  logger: 'dev',
  mongodb: `mongodb://localhost:27017/${getBase('').replace(/.*\//, '')}`,
};

const envsPath = getBase('config/envs');
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

module.exports = envs;
