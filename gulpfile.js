const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function buildStyles() {
  return src('assets/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(purgecss({ content: ['*.html'] }))
    .pipe(dest('assets/css'))
}

function watchTask() {
  watch(['assets/sass/**/*.scss'], buildStyles);
}

exports.default = series(buildStyles, watchTask);