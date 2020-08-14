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
