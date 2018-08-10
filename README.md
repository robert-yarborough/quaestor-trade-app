# Taskrunner template

This is taskrunner template for BFM internal usage. You must have pre-installed node and npm.
Tested on node v8.6.0 and npm v5.3.0.
 
Here presented gulp for compiling styles and optimizing 
images and webpack for comfortable ES6 usage.

For basic usage you must run:
```
npm i
```
## Usage guide

For using taskrunner on your project you must setup some config. All configuration
that you may need (sources, destinations, browsersync config) in *./gulp/config.js* file.

At first you need to choose how you will use browsersync. You may choose local file or proxy. If you want to use proxy,
just uncomment few lines in *./gulp/config.js* file. 

```javascript
const config = {
    env       : 'development',
    production: production,

    outputCSS: 'app.css',

    // uncomment if you want to use proxy
    // serverProxy: localConfig ? localConfig.serverProxy : 'mysite.com',
```

#### Attention

If you have your own proxy, that differs from another developers
in this project please create *./gulp/config.local.js* file and set your own proxy:

```javascript
const config = {
    serverProxy: 'mysite-another-example.com',
};
```

Every time you run build task, gulp will clean your destination directory. If you dont want to do this, just
comment task 'clean' in *./gulp/tasks/build.js* file.

```javascript
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

function build(cb) {
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
```

Here is used svg sprites creator. Every time gulp see new svg file in src directory, it will create sprites.

If you want to use webpack alias. You can find and edit them in *./webpack.config.js* file.

```javascript
resolve: {
    extensions: ['.js'],
    alias: { // adding alias for short imports
        "Config": path.resolve('app', 'scripts/utils/helpers/index.js'),
        "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
},
```

## Npm scripts

```
npm start
```
- Will start basic dev mode, with local server and livereload and watching files
```
npm run lint
```
- Will start eslint and stylelint
```
npm run lint:fix
```
- Will fix eslint and stylelint issues
```
npm run prod
```
- Will start production mode.

