var path = require('path')
var fs = require('fs')


var gulp = require('gulp')
var rename = require('gulp-rename')
const {series, task, parallel } = require('gulp')

var config = require('./lib/config')

const { build, fonts} = require('./lib/task')
const { wrapCss } = require('./lib/wrap-css')
const {update_theme_variables} = require('./lib/update-variable')
const { getThemeName } = require('./lib/utils')
let customThemeName = getThemeName()

function del_vars_file(done){
  let filePath = './element-variables.scss'
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  done()
}

function init_vars() {
  var varsPath = path.resolve(config.themePath, './src/common/var.scss')  
  return gulp.src(varsPath)
    .pipe(rename('element-variables.scss'))
    .pipe(gulp.dest('./'))
}

function moveFont() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest(`${config.dest}/${customThemeName}/fonts`));
}

function copyConfig() {
  return gulp.src('./config.json').pipe(gulp.dest(`${config.dest}/${customThemeName}`));
}

exports.default = series(del_vars_file, init_vars, update_theme_variables, build, fonts, parallel(wrapCss, moveFont, copyConfig))
// exports.default = series(update_theme_variables, build, fonts, parallel(wrapCss, moveFont, copyConfig))
// exports.default = series(update_theme_variables, build)