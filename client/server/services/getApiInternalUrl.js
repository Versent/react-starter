var getConfigVar = require('./getConfigVar');

module.exports = function getApiInternalUrl() {
	console.log('getApiInternalUrl');

	var host = getConfigVar('API_INTERNAL_HOST');
	var port = getConfigVar('API_INTERNAL_PORT');

	if (host == null) {
		console.error('API_INTERNAL_HOST not specified, exiting');
		process.exit();
	}

	console.log('host', host);
	console.log('host', port);

	var url = [host, port].join(':');
	console.log('url', url);

	return url;
}
