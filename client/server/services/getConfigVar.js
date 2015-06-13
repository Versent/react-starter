require('dotenv').load();

module.exports = function(key) {
	return process.env[key];
}
