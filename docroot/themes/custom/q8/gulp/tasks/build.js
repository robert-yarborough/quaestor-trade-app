const gulp        = require('gulp');
const runSequence = require('run-sequence');
const config      = require('../config');

const build = cb => {
    runSequence(
        'clean',
        'styles',
        'images',
        'sprites',
        'webpack',
        'copy',
        cb
    );
}

gulp.task('build', cb => {
    config.setEnv('production');
    config.logEnv();
    build(cb);
});

gulp.task('build:dev', cb => {
    config.setEnv('development');
    config.logEnv();
    build(cb);
});
