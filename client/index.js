var webpack              = require('webpack');
var webpackConfig        = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var getConfigVar         = require('./server/services/getConfigVar');
var express              = require('express');
var exphbs               = require('express-handlebars');

var NODE_ENV = getConfigVar('NODE_ENV') || 'development';
var app = express();

var hbsConfig = {
	extname:        '.hbs',
	defaultLayout:  'main',
	layoutsDir:     'server/views/layouts',
	partialsDir:    'server/views'
}

app.use(express.static('public'));

// if running in development, use webpack middleware to serve code
if (NODE_ENV === 'development') {
	var compiler = webpack(webpackConfig);
	var webpackDev = webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: { colors: true }
	});
	app.use(webpackDev);
}

// TODO - test mode and production mode

app.engine('.hbs', exphbs(hbsConfig));
app.set('views', 'server/views/');
app.set('view engine', '.hbs');

app.use(function(req, res, next) {
	res.locals = {
		api_host: getConfigVar('API_HOST')
	}
	next();
});

app.get('/', function(req, res) {
	res.render('dashboard', req.locals);
});

app.get('/dashboard', function(req, res) {
	res.render('dashboard', req.locals);
});

var server = app.listen(9010, '0.0.0.0', function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening at http://%s:%s', host, port);
});

module.exports = {
	stop: function() {
		webpackDev.close(function() {
			server.close();
		});
	}
};
