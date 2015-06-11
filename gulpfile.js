var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var smoosher = require('gulp-smoosher');

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

gulp.task('smoosh', ['minify'], function() {
  gulp.src('./src/index.html')
    .pipe(smoosher())
    .pipe(gulp.dest('./'));
});

// gulp.task('build', function() {
//   gulp.src(sassSrc)
//     .pipe(sourcemaps.init())
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./src/css'))
//     .pipe(concat('./src/css/**/*.css'))
//     .pipe(gulp.dest('./css'))
//     .pipe(minifyCSS())
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest('./css'))
//     .pipe(gulp.src('./css/style.min.css'))
//     .pipe(inject('./index.html'));
// });

gulp.task('build', ['sass', 'concat', 'minify', 'smoosh']);

gulp.task('watch', function() {
  gulp.watch(sassSrc, ['build']);
});

gulp.task('default', ['build', 'watch']);