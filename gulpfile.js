const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
  // body omitted
  cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  // body omitted
  cb();
}

// Compile SCSS files to CSS
function compileSass() {
  return src('styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('styles'))
    .pipe(browserSync.stream());
}

// Watch for changes in SCSS files
function watchFiles() {
  watch('styles/**/*.scss', compileSass);
}

// Start a local server
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  watch('styles/**/*.scss', compileSass);
  watch('*.html').on('change', browserSync.reload);
  watch('scripts/**/*.js').on('change', browserSync.reload);
}

exports.build = build;
exports.default = series(clean, build, compileSass);
exports.watch = watchFiles;
exports.serve = serve;