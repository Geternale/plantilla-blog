const { watch, src, dest} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const tildeImporter = require('node-sass-tilde-importer');
const browserSync = require('browser-sync').create();

function pugTask(){
  return src('./src/pug/pages/*.pug')
  .pipe(
    pug({
      pretty: true
    })
  )
  .pipe(dest('./dist'));
}

function scssTask() {
  return src('./src/scss/app.scss')
    .pipe(sass({
      importer:tildeImporter,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(dest('./dist/css'))
};

function browserSyncTask(){
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });

  watch('src/scss/*.scss',scssTask).on('change', browserSync.reload)
  watch('src/pug/**/*.pug',pugTask).on('change', browserSync.reload)
}

exports.default = pugTask,scssTask;

exports.pug = pugTask;
exports.scss = scssTask;

exports.server = browserSyncTask;