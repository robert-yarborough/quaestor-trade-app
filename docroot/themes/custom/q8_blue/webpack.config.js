var webpack = require('webpack');
var path = require('path');
var util = require('gulp-util');
var config = require('./gulp/config');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createConfig(env) {
	var isProduction, webpackConfig;

	if (env === undefined) {
		env = process.env.NODE_ENV;
	}

	isProduction = env === 'production';

	webpackConfig = {
		context: path.join(__dirname, config.src.scripts),
		entry: {
			//vendor: ['jquery'],
			script: './app.js',
			'module-selects': './modules/selects.js',
			'module-features-slider': './modules/features-slider.js',
			'module-finance-slider': './modules/finance-slider.js',
			'module-rates-slider': './modules/rates-slider.js',
			'module-tabs-filters': './modules/tabs-filters.js',
		},
		output: {
			path: path.join(__dirname, config.dest.scripts),
			filename: '[name].js',
			publicPath: 'scripts/'
		},
		devtool: isProduction ?
			'#source-map' :
			'#cheap-module-source-map',
		plugins: [
			// new webpack.optimize.CommonsChunkPlugin({
			//     name: 'vendor',
			//     filename: '[name].js',
			//     minChunks: Infinity
			// }),
			// uncomment in case of emergency code formatter need
			// new PrettierPlugin({
			//     printWidth: 80,
			//     tabWidth: 4
			// }),
			// new webpack.ProvidePlugin({ // Global plugin include
			//     $: "jquery",
			//     jQuery: "jquery",
			//     'window.jQuery': "jquery",
			// }),
			//new webpack.NoEmitOnErrorsPlugin(),

			// Use it to analyse your bundle
			new BundleAnalyzerPlugin({
				analyzerHost: 'localhost',
				analyzerMode: 'static',
				analyzerPort: 6020,
				openAnalyzer: false
			})
		],
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
		module: {
			rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [
					path.resolve(__dirname, "node_modules")
				]
			}]
		}
	};

	if (isProduction) {
		webpackConfig.plugins.push(
			new webpack.LoaderOptionsPlugin({
				minimize: true
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		);
	}

	return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
