const gulp = require('gulp');
const stylus = require('gulp-stylus');

const paths = require('./paths');

const gulpStylus = () => {
  gulp.src(`${paths.assets.stylesheets}/**`)
    .pipe(stylus({
      'include css': true,
      compress: true,
    }))
    .pipe(gulp.dest(paths.public.stylesheets));
};

gulp.task('stylus', gulpStylus);

gulp.watch(`${paths.assets.stylesheets}/**`, ['stylus']);

gulpStylus();
