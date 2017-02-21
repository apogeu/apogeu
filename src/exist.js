const fs = require('fs');

const getBase = require('./getBase');

module.exports = (dir) => {
  try {
    fs.statSync(getBase(dir));
    return true;
  } catch (e) {
    return false;
  }
};
