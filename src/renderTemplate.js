const debug = require('debug')('apogeu:readTemplate');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

const paths = require('../src/paths');
const getBase = require('../src/getBase');

const scaffoldPath = getBase(paths.scaffold);
const readTemplate = template => fs.readFileSync(path.join(scaffoldPath, template)).toString();

module.exports = (template, model) => {
  debug(`reading ${template} template file`);

  template = readTemplate(template);
  return Mustache.render(template, { model });
};
