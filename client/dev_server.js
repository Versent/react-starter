var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config           = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath:         config.output.publicPath,
	contentBase:        './public',
	hot:                true,
	// inline:             true,
	// quiet:              false,
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	historyApiFallback: true,
	stats: {
		colors: true
	}
}).listen(4000, 'localhost', function(err) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:4000');
});
