var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');
var fs = require('fs');


var customThemeName='.custom-theme'

gulp.task('css-wrap', function() {
  return gulp.src( path.resolve('./theme/index.css'))
    .pipe(cssWrap({selector:customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('move-font', function() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('default',['css-wrap','move-font']);
let configFilePath = './confg.json'
if(fs.existsSync(configFilePath)){
  fs.copyFileSync(configFilePath, './dist/config.json')
}