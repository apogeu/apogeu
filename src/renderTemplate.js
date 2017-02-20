const debug = require('debug')('apogeu:readTemplate');
const fs = require('fs');
const path = require('path');
const paths = require('../src/paths');
const getBase = require('../src/getBase');
const Mustache = require('mustache');

const readTemplate = template => fs.readFileSync(path.join(getBase(paths.scaffold), template)).toString();

module.exports = (template, model) => {
  debug(`reading ${template} template file`);

  template = readTemplate(template);
  return Mustache.render(template, { model });
};
