const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const ENV = require('./env');

process.env.BABEL_ENV = ENV;

const common = {
	devtool: 'cheap-module-source-map',
	resolve: {
		root: path.resolve('./app'),
		extensions: ['', '.json', '.js', '.jsx'],
		modulesDirectories: ['node_modules'],
		alias: {
			config: path.join(__dirname, 'config', process.env.NODE_ENV)
		}
	},
	entry: {
		app: path.join(__dirname, 'app'),
		vendor: [
			'jquery',
			'react',
			'react-addons-css-transition-group',
			'react-dom',
			'react-owl-carousel',
			'react-router',
			'react-router-scroll',
			'react-router-transition',
			'react-scroll',
			'react-sticky',
			'react-stickynode',
			'uuid',
			'flux',
			'jwt-decode',
			'whatwg-fetch'
		]
	},
	output: {
		path: path.join(__dirname, 'www'),
		filename: '[name].js',
		publicPath: '/'
	},
	node: {
		fs: 'empty'
	},
	browser: {
		fs: false
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel?cacheDirectory',
			exclude: '/node_modules/',
			include: path.join(__dirname, 'app')
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
	debug: true,
	cache: true,
	displayErrorDetails: true,
	outputPathinfo: true
};

if (ENV === 'development') {
	module.exports = merge(common, {
		devServer: {
			contentBase: path.join(__dirname, 'www'),
			port: 3000,
			historyApiFallback: true,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},
			proxy: {
				'/remove_dev_404s': {
					target: 'goodbye_dev_404s',
					secure: false,
					bypass: (req, res) => {
						if(req.url === '/cordova.js' || req.url === '/favicon.ico') {
							// end the response quick so we don't get 404's
							res.status(200).send('');
						}
					}
				}
			},
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only'
		},
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.ProvidePlugin({
				_: 'lodash',
				$: 'jquery',
				jQuery: 'jquery'
			}),
			new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
		]
	});
} else {
	// config can be added here for minifying / etc
	module.exports = merge(common, {
		devtool: 'eval',
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.ProvidePlugin({
				_: 'lodash',
				$: 'jquery',
				jQuery: 'jquery'
			}),
			new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
		]
	});
}
