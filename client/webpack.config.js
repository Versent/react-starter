var path    = require('path');
var webpack = require('webpack');

// https://github.com/webpack/extract-text-webpack-plugin
// Used for extracting CSS into its own file
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackDevServerHost = 'webpack-dev-server/client?http://0.0.0.0:4000'
var WebpackDevServerOnlyDev = 'webpack/hot/only-dev-server'

var providePlugin = new webpack.ProvidePlugin({
	fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
});

module.exports = {
	context: __dirname,
	entry: {
		app:           [
			webpackDevServerHost,
			WebpackDevServerOnlyDev,
			'./src/app.jsx'
		]
	},
	output: {
		path: path.join(__dirname, 'public', 'bundles'),
		filename:    '[name].js',
		publicPath:  '/bundles/'
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css!autoprefixer-loader?browsers=last 2 version!less')
			},
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			},
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader'},
			{
				test: /\.jsx/,
				exclude: /node_modules/,
				loader: 'babel-loader?stage=1'},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('bundle.css')
	],
	node: { // mocks for Joi validation
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	}
};
