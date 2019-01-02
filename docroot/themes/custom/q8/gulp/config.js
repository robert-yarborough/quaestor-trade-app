const util = require('gulp-util');
const fs = require('fs');
const path = require('path');
const production = util.env.production || util.env.prod || false;
const distPath = 'dist';
const srcPath = 'app';

let localConfig = false; // or a default object {}
let pathToLocalConf = path.join(__dirname, './', 'config.local.js');
if (fs.existsSync(pathToLocalConf)) {
    localConfig = require(pathToLocalConf);
}

const config = {
    env       : 'development',
    production: production,

    outputCSS: 'app.css',

    // uncomment if you want to use proxy
    // serverProxy: localConfig ? localConfig.serverProxy : 'mysite.com',

    src: {
        root         : srcPath,
        sass         : srcPath + '/styles',
        scripts      : srcPath + '/scripts',
        img          : srcPath + '/images',
        svg          : srcPath + '/images/svg',
        fonts        : srcPath + '/fonts',
        lib          : srcPath + '/lib',
        static       : 'static'
    },
    dest: {
        root    : distPath,
        html    : distPath,
        css     : distPath + '/styles',
        scripts : distPath + '/scripts',
        img     : distPath + '/images',
        svg     : distPath + '/images/svg',
        fonts   : distPath + '/fonts',
        lib     : distPath + '/lib'
    },

    setEnv (env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv () {
        util.log(
            'Environment:',
            util.colors.white.bgRed(` ${process.env.NODE_ENV} `)
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
