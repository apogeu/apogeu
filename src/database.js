const paths = require('../src/paths');
const getBase = require('../src/getBase');

const databasePath = getBase(paths.config.database);
const database = require(databasePath);

module.exports = database;
