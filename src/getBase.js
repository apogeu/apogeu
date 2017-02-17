const path = require('path');

module.exports = (dir) => {
  return path.join(__dirname, '..', dir);
};
