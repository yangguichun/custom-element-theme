var path = require('path')
var fs = require('fs')
var gulp = require('gulp')
var { series} = require('gulp')
var rename = require('gulp-rename')
var ora = require('ora')
var nop = require('gulp-nop')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')
var config = require('./config')

function fonts(opts) {
  var spin = ora(opts.message).start()
  var stream = gulp.src(path.resolve(config.themePath, './src/fonts/**'))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(path.resolve(opts.out || config.out, './fonts')))
    .on('end', function () {
      spin.succeed()
    })

  return stream
}


function backup_vars(){
  var varsPath = path.resolve(config.themePath, './src/common/var.scss')
  return gulp.src(varsPath)
    .pipe(rename('var.scss.bak'))
    .pipe(gulp.dest('./'))
}

function restore_vars(){
  var varsPath = path.resolve(config.themePath, './src/common/')
  return gulp.src('./var.scss.bak')
    .pipe(rename('var.scss'))
    .pipe(gulp.dest(varsPath))
}

function del_vars_bak(done){
  var bakVarsPath = './var.scss.bak'
  if(fs.existsSync(bakVarsPath)){
    fs.unlinkSync(bakVarsPath)
  }
  done()
}

function build(opts) {
  var spin = ora(opts.message).start()
  var stream
  var components
  var cssFiles = '*'

  if (config.components) {
    components = config.components.concat(['base'])
    cssFiles = '{' + components.join(',') + '}'
  }
  var varsPath = path.resolve(config.themePath, './src/common/var.scss')
  fs.writeFileSync(varsPath, fs.readFileSync(path.resolve(process.cwd(), opts.config || config.config)), 'utf-8')

  stream = gulp.src([opts.config || config.config, path.resolve(config.themePath, './src/' + cssFiles + '.scss')])
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: config.browsers,
      cascade: false
    }))
    .pipe((opts.minimize || config.minimize) ? cssmin({showLog: false}) : nop())
    .pipe(gulp.dest(opts.out || config.out))
    .on('end', function () {
      spin.succeed()
    })

  return stream
}

exports.build = series(backup_vars, build, restore_vars, del_vars_bak)
exports.fonts = fonts