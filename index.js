const debug = require('debug')('index');
const Promise = require('bluebird');
const http = require('http');

const models = require('./models');

debug('execute all process');
Promise
  .all([
    models(),
  ])
  .then(() => {
    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`ClientModel.foo: ${ClientModel.foo}\n`);
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch(console.error)
