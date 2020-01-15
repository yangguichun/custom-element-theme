var path = require('path')
var gulp = require('gulp')
const {series, parallel } = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');
let minimist = require('minimist');

let defaultOption = {
  string:'n',
  default: { n: 'custome-theme'}
}
let options  = minimist(process.argv.slice(2), defaultOption)
let customThemeName = options.n

function wrapCss() {
  return gulp.src(path.resolve('./theme/index.css'))
    .pipe(cssWrap({selector: '.' + customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dist/${customThemeName}`));
}

function moveFont() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest(`dist/${customThemeName}/fonts`));
}

function copyConfig() {
  return gulp.src('./config.json').pipe(gulp.dest(`dist/${customThemeName}`));
}

exports.default = parallel(wrapCss, moveFont, copyConfig)