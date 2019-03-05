const gulp   = require('gulp');
const config = require('../config.js');

gulp.task('copy:fonts', () => {
    return gulp
        .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:lib', () => {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', () => {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:static', () => {
  return gulp
      .src(config.src.static + '/*.*', {
        dot: true
      })
      .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:html', () => {
    return gulp
        .src(config.src.root + '/*.html')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy', [
    'copy:html',
    'copy:static',
    'copy:fonts'
]);
gulp.task('copy:watch', () => {
    gulp.watch(config.src.root + '/**/*.*', ['copy']);
});
