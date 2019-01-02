const gulp   = require('gulp');
// const config = require('../config');

gulp.task('watch',
    ['images:watch',
    'sprites:watch',
    'webpack:watch',
    'styles:watch'
]);
