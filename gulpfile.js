// var gulp = require("gulp");
// var concat = require("gulp-concat");
// var minifyCSS = require("gulp-minify-css");
// var rename = require("gulp-rename");
// var watch = require("gulp-watch");
// var sass = require("gulp-sass");
// var sourcemaps = require("gulp-sourcemaps");
// var smoosher = require("gulp-smoosher");
// var wait = require("gulp-wait");

// var sassSrc = "./src/sass/**/*.{scss,sass}";
// var stylesSrc = "./src/css/**/*.css";

// sass.compiler = require("node-sass");

// function sass() {
//   return gulp
//     .src(sassSrc)
//     .pipe(sass().on("error", sass.logError))
//     .pipe(gulp.dest("./build/css"));
// }

// function minify() {
//   // }, gulp.series('concat'), function() {
//   gulp
//     .src("./css/style.css")
//     .pipe(minifyCSS())
//     .pipe(rename("style.min.css"))
//     .pipe(gulp.dest("./css"));
// }

// function smoosh() {
//   // }, gulp.series('minify'), function() {
//   gulp.src("./src/index.html").pipe(smoosher()).pipe(gulp.dest("./"));
// }

// function watch() {
//   // , function() {
//   gulp.watch([sassSrc, "./src/index.html"], ["build"]);
// }

// const build = gulp.series(sass);

// // gulp.task('build', gulp.series('sass', 'concat', 'minify', 'smoosh'));
// // gulp.task('default', gulp.series('build', 'watch'));

// exports.build = build;

// exports.default = build;

const { series, src, dest } = require("gulp");
const gulpSass = require("gulp-sass");
const gulpConcat = require("gulp-concat");
const gulpMinifyCSS = require("gulp-minify-css");
const gulpRename = require("gulp-rename");
const gulpSmoosher = require("gulp-smoosher");
const gulpWatch = require("gulp-watch");

gulpSass.compiler = require("node-sass");

const sassSrc = "./src/sass/**/*.{scss,sass}";
const cssSrc = "./src/css/**/*.css";

function sass() {
  return src(sassSrc)
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(dest("src/css"));
}

function concat() {
  return src(cssSrc).pipe(gulpConcat("styles.css")).pipe(dest("./css/"));
}

function minify() {
  return src("./css/styles.css").pipe(gulpMinifyCSS()).pipe(dest("./css/"));
}

function rename() {
  return src("./css/styles.css")
    .pipe(gulpRename("styles.min.css"))
    .pipe(dest("./css/"));
}

function smoosh() {
  return src("./src/index.html").pipe(gulpSmoosher()).pipe(dest("./"));
}

function watch() {
  return gulpWatch([sassSrc, "./src/index.html"], function () {
    series(sass, concat, rename, smoosh);
  });
}

exports.default = series(sass, concat, rename, smoosh);
