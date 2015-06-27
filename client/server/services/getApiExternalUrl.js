var getConfigVar = require('./getConfigVar');

module.exports = function getApiExternalUrl() {
	console.log('getApiExternalUrl');

	var host = getConfigVar('API_EXTERNAL_HOST');
	var port = getConfigVar('API_EXTERNAL_PORT');

	if (host == null) {
		console.error('API_EXTERNAL_HOST not specified, exiting');
		process.exit();
	}

	console.log('host', host);
	console.log('host', port);

	var url = [host, port].join(':');
	console.log('url', url);

	return url;
}
