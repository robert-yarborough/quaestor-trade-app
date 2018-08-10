const gulp   = require('gulp');
// const config = require('../config');

gulp.task('watch',
    ['images:watch',
    'sprites:watch',
    'sprites-css:watch',
    'webpack:watch',
    'styles:watch'
]);
