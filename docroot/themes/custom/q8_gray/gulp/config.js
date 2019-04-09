const util = require('gulp-util');
const fs = require('fs');
const path = require('path');
const production = util.env.production || util.env.prod || false;
const distPath = '.';
const srcPath = 'src';

let localConfig = false; // or a default object {}
let pathToLocalConf = path.join(__dirname, './', 'config.local.js');
if (fs.existsSync(pathToLocalConf)) {
    localConfig = require(pathToLocalConf);
}

const config = {
    env       : 'development',
    production: production,

    outputCSS: 'style.css',

    // uncomment if you want to use proxy
    // serverProxy: localConfig ? localConfig.serverProxy : 'mysite.com',

    src: {
        root         : srcPath,
        sass         : srcPath + '/styles',
        scripts      : srcPath + '/js',
        img          : srcPath + '/images',
        svg          : srcPath + '/images/svg',
        spriteCSS    : srcPath + '/images/sprites/css',
        fonts        : srcPath + '/fonts',
        lib          : srcPath + '/lib',
        static       : 'static'
    },
    dest: {
        root    : distPath,
        html    : distPath,
        css     : distPath + '/css',
        scripts : distPath + '/js',
        img     : distPath + '/images',
        svg     : distPath + '/images/svg',
        spriteCSS: distPath + '/images/sprites',
        spriteCSSFile: '../../css/sprite.css',
        spriteCSSSVG: '../images/sprites/%f',
        fonts   : distPath + '/fonts',
        lib     : distPath + '/lib'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
