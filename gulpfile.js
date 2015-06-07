var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

gulp.task('css', function() {
  watch('./custom.css', function() {
    gulp.src(['components/pure/base.css', 
              'components/pure/grids.css', 
              'css/fontello.css',
              './custom.css'])
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./css'))
      .pipe(minifyCSS())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./css'));
  });
});
  

gulp.task('default', ['css']);