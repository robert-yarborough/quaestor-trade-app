const gulp = require('gulp');
const watch = require('gulp-watch');
const svgSprite = require("gulp-svg-sprites");
const config = require('../config');

gulp.task('sprites:watch', ['sprites'], () => {
  return watch([
    config.src.svg + '/**/*.svg'], () => {
    gulp.src([
      config.src.svg + '/**/*.svg'
    ])
        .pipe(svgSprite({
          mode: 'symbols'
        }))
        .pipe(gulp.dest(config.dest.svg));
  });
});

gulp.task('sprites', () => {
  return gulp.src(config.src.svg + '/**/*.svg')
      .pipe(svgSprite({
        mode: 'symbols'
      }))
      .pipe(gulp.dest(config.dest.svg));
});
