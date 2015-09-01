var path    = require('path');
var webpack = require('webpack');

// https://github.com/webpack/extract-text-webpack-plugin
// Used for extracting CSS into its own file
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackDevServerHost = 'webpack-dev-server/client?http://0.0.0.0:4002' // WebpackDevServer host and port
var WebpackDevServerOnlyDev = 'webpack/hot/only-dev-server'

/*
publicPath is used for finding the bundles during dev
e.g. http://localhost:4002/bundles/app.js

When the index.html is served using the webpack server then just specify the path.

When index.html is served using a framework e.g. from Rails, Phoenix or Go
then you must specify the full url where the webpack dev server is running e.g. http://localhost:4000/bundles/

This path is also used for resolving relative assets e.g. fonts from css. So for production and staging this path has to be
overriden. See webpack.prod.config.js
*/
var publicPath = '/bundles/'

// var providePlugin = new webpack.ProvidePlugin({
//  fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
// });

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
    publicPath:  publicPath
  },
  module: {
    preLoaders: [{
      test:    /\.js|\.jsx$/,
      exclude: /node_modules/,
      loader: 'jscs-loader'
    }],
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
        test: /\.js|\.jsx/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel?stage=1']
      },
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
