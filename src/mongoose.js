const path = require('path');
const paths = require('../src/paths');
const getBase = require('../src/getBase');

const databasePath = getBase(path.join(paths.config.this, 'database.js'));
const database = require(databasePath);

module.exports = database;
