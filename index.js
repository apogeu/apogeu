const debug = require('debug')('phosphoros:index');
const Promise = require('bluebird');
const express = require('express');
const app = express();

const models = require('./models');
const controllers = require('./controllers');
const routes = require('./routes');

debug('execute all process');
models()
  .then(controllers)
  .then(routes)
  .then((router) => {
    app.use(router);
    const port = 3000;
    app.listen(port, function () {
      console.log(`Phosphoros listening on port ${port}`);
    })
  })
  .catch(console.error);

// Promise
//   .some([
//     models(),
//     controllers(),
//   ])
//   .then(() => {
//     const port = 3000;
//     app.listen(port, function () {
//       console.log(`Phosphoros listening on port ${port}`);
//     })
//   })
//   .catch(console.error)
