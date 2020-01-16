var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');
const { getThemeName } = require('./utils')

function wrapCss() {
  let themeName = getThemeName()
  return gulp.src(path.resolve('./theme/index.css'))
    .pipe(cssWrap({selector: '.' + themeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dist/${themeName}`));
}

exports.wrapCss = wrapCss