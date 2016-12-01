let path = require('path');

module.exports = function (config) {
	config.set({
		basePath: './',
		frameworks: [ 'mocha' ],
		files: [
			'node_modules/phantomjs-polyfill/bind-polyfill.js',
			'tests.webpack.js'
		],
		preprocessors: {
			'tests.webpack.js': [ 'webpack', 'sourcemap' ]
	  },
		webpack: {
			devtool: 'inline-source-map',
			node: {
				fs: 'empty'
			},
			browser: {
				fs: false
			},
			module: {
				loaders: [{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: '/node_modules/',
					include: path.join(__dirname, 'app'),
					query: {
						presets: ['es2015']
					}
				}, {
					test: /\.(svg)$/,
					loader: 'raw-loader'
				}, {
					test: /\.less$/,
					loader:  'style-loader!css-loader!less-loader'
				}, {
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				}, {
					test: /\.json$/,
					loader: 'json-loader'
				}, {
					test: require.resolve('jquery'),
					loader: 'expose?$!expose?jQuery'
				}]
			},
			resolve: {
				root: path.resolve('./app'),
				extensions: ['', '.js', '.jsx', '.json'],
				modulesDirectories: ['node_modules'],
				alias: {
					config: path.join(__dirname, 'config', process.env.NODE_ENV)
				}
			},
			externals: {
			 'react/lib/ExecutionEnvironment': true,
			 'react/lib/ReactContext': true
		 }
		},
		webpackMiddleware: {
			noInfo: true
		},
		plugins: [
			require('karma-webpack'),
			require('karma-mocha'),
			require('karma-mocha-reporter'),
			require('karma-phantomjs-launcher'),
			require('karma-sourcemap-loader')
		],
		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},
		reporters: [ 'mocha' ],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false
	});
};
