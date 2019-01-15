const gulp   = require('gulp');
const server = require('browser-sync').create();
const util   = require('gulp-util');
const config = require('../config');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

const proxyServer = {
    proxy: config.serverProxy
};

const staticServer = {
    server: {
        baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
        directory: false,
        serveStaticOptions: {
            extensions: ['html']
        }
    }
};

let serverConfig = {
    files: [
        config.dest.html + '/*.html',
        config.dest.css + '/*.css',
        config.dest.img + '/**/*'
    ],
    port: util.env.port || 9000,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: Boolean(util.env.open) || true,
    notify: false,
    ghostMode: false,
    online: Boolean(util.env.tunnel),
    tunnel: util.env.tunnel || null
};

config.serverProxy
    ? serverConfig = Object.assign(serverConfig, proxyServer)
    : serverConfig = Object.assign(serverConfig, staticServer);

gulp.task('server', function() {
    server.init(serverConfig);
});

module.exports = server;
