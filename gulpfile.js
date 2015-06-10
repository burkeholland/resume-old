var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var sassSrc = './src/sass/**/*.{scss,sass}';

gulp.task('sass', function() {
  gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('concat', ['sass'], function() {
  gulp.src('./src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('minify', ['concat'], function() {
  gulp.src('./css/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch(sassSrc, ['sass', 'concat', 'minify']);
});  

gulp.task('default', ['watch']);