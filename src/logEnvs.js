const debug = require('debug')('apogeu:logEnvs');

const envs = require('./envs');

Object.keys(envs).forEach(key => debug(`${key} = ${envs[key]}`));
