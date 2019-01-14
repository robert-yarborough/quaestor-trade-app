const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const size = require('gulp-size');
const gulpIf = require('gulp-if');
const isFile = gulpIf.isFile;
const config = require('../config');
const watch = require('gulp-watch');

gulp.task('images', () => {
  return gulp.src([config.src.img + '/**/*'])
      .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({
              plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: true}
              ]
          })
      ]))
    .pipe(gulp.dest(config.dest.img))
    .pipe(size({
      title: 'Size',
      showFiles: true,
      showTotal: false,
    }));
});

gulp.task('images:watch', ['images'], function () {
    return watch([
        config.src.img + '/*.*'], function () {
        gulp.src([
            config.src.img + '/*.*'
        ])
            .pipe(gulp.dest(config.dest.img));
    });
});
