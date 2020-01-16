var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var rename = require('gulp-rename')

const {series, task, parallel } = require('gulp')

const {build, fonts} = require('./lib/task')
const {update_theme_variables} = require('./lib/update-element-theme-variable')

var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');
let minimist = require('minimist');

let defaultOption = {
  string:'n',
  default: { n: 'custom-theme'}
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

function del_vars_file(done){
  let filePath = './element-variables.scss'
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  done()
}

function init_vars() {
  var config = require('./lib/config')
  var varsPath = path.resolve(config.themePath, './src/common/var.scss')  
  return gulp.src(varsPath)
    .pipe(rename('element-variables.scss'))
    .pipe(gulp.dest('./'))
}

exports.default = series(del_vars_file, init_vars, update_theme_variables, build, fonts, parallel(wrapCss, moveFont, copyConfig))