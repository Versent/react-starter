var api    = require('./fake_api.js');

module.exports = {

	before : function(cb) {
		cb();
	},

	beforeEach : function(browser, cb) {
		cb();
	},

	after : function(cb) {
		api.stop();
		cb();
	},

	afterEach : function(browser, cb) {
		cb();
	},

	reporter : function(results, cb) {
		cb();
	}
};
