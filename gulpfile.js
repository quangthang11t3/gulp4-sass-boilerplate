const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
// const minify = require('gulp-minify-css');


const paths = {
  scripts: {
    src: 'src/coding-html/layouts/',
    dest: 'src/'
  }
};

function includeHTML(){
  return gulp.src([
    'src/coding-html/**/**/*.html',
    '!src/coding-html/layouts/**/*.html'
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}

//compile scss into css
function style() {
  //1.where is my scss
  return gulp.src('src/assets/scss/**/*.scss') //gets all files ending with .scss in src/assets/scss
    //2. init source maps
    .pipe(sourcemaps.init())
    //3. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    //4. write source maps
    .pipe(sourcemaps.write('../maps'))
    //5. where do I save the compiled css file
    .pipe(gulp.dest('src/assets/css'))
    //6. stream change to all browsers
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src",
      index: "/index.html"
    }
  });
  gulp.watch('src/assets/scss/**/*.scss', style);
  gulp.watch('src/assets/scss/**/*.scss').on('change', browserSync.reload);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('src/assets/js/**/*.js').on('change', browserSync.reload);
}

function defaultTask() {
  watch();
  includeHTML();

}

exports.style = style;
exports.watch = watch;
exports.default = defaultTask;
exports.includeHTML = includeHTML;