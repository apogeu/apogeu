const debug = require('debug')('apogeu:errorHandler');

module.exports = (app, isApi = false) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    if (!err) return next();

    res.status(err.status || 500);

    const message = err.message;
    const error = req.app.get('env') === 'development' ? err : {};

    if (isApi) {
      debug('api');
      return res.json({ message, error });
    }

    debug('views');

    // set locals, only providing error in development
    res.locals.message = message;
    res.locals.error = error;

    // render the error page
    res.render('error');
  });
};
