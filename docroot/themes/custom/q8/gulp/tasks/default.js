const gulp        = require('gulp');
const runSequence = require('run-sequence');
const config      = require('../config');

gulp.task('default', cb => {
    runSequence(
        'build:dev',
        'server',
        'watch',
        cb
    );
});
