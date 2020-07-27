const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
// const minify = require('gulp-minify-css');

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
}

exports.style = style;
exports.watch = watch;
exports.default = defaultTask;