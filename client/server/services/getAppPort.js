var getConfigVar = require('./getConfigVar');

module.exports = function getAppPort() {
	var port = getConfigVar('FE_SERVER_PORT');
	if (!port) console.log('Warning: PORT not specified in env vars');
	port = port || '3000';
	return port;
}
