var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var smoosher = require('gulp-smoosher');
var wait = require('gulp-wait');
var sassSrc = './src/sass/**/*.{scss,sass}';
var stylesSrc = './src/css/**/*.css';

gulp.task('sass', function() {
  gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(wait(500))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed',
      includePaths: ['./node_modules/susy/sass']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('concat', ['sass'], function() {
  gulp.src(stylesSrc)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('minify', ['concat'], function() {
  gulp.src('./css/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('smoosh', ['minify'], function() {
  gulp.src('./src/index.html')
    .pipe(smoosher())
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['sass', 'concat', 'minify', 'smoosh']);

gulp.task('watch', function() {
  gulp.watch([sassSrc, "./src/index.html"], ['build']);
});

gulp.task('default', ['build', 'watch']);