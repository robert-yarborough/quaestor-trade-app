var gulp = require('gulp');
var watch = require('gulp-watch');
var svgSprite = require("gulp-svg-sprites");
var config = require('../config');

gulp.task('sprites:watch', ['sprites'], function () {
  return watch([
    config.src.svg + '/**/*.svg'], function () {
    gulp.src([
      config.src.svg + '/**/*.svg'
    ])
        .pipe(svgSprite({
          mode: 'symbols'
        }))
        .pipe(gulp.dest(config.dest.svg));
  });
});

gulp.task('sprites', function () {
  return gulp.src(config.src.svg + '/**/*.svg')
      .pipe(svgSprite({
        mode: 'symbols'
      }))
      .pipe(gulp.dest(config.dest.svg));
});

gulp.task('sprites-css:watch', ['sprites-css', 'styles'], function () {
    return watch([
        config.src.spriteCSS + '/**/*.svg'], function () {
        gulp.src([
            config.src.spriteCSS + '/**/*.svg'
        ])
            .pipe(svgSprite({
                baseSize: 16,
                templates: { scss: true },
                cssFile: config.dest.spriteCSSFile,
                svgPath: config.dest.spriteCSSSVG,
            }))
            .pipe(gulp.dest(config.dest.svg));
    });
});

gulp.task('sprites-css', function () {
    return gulp.src(config.src.spriteCSS + '/**/*.svg')
        .pipe(svgSprite({
            baseSize: 16,
            templates: { scss: true },
            cssFile: config.dest.spriteCSSFile,
            svgPath: config.dest.spriteCSSSVG,
        }))
        .pipe(gulp.dest(config.dest.spriteCSS));
});