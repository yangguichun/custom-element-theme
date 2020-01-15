var path = require('path')
var gulp = require('gulp')
const {series, parallel } = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');

var customThemeName='.custom-theme'

function wrapCss() {
  return gulp.src(path.resolve('./theme/index.css'))
    .pipe(cssWrap({selector:customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

function moveFont() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'));
}

function copyConfig() {
  return gulp.src('./config.json').pipe(gulp.dest('dist/'));
}

exports.default = parallel(wrapCss, moveFont, copyConfig)