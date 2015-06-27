var _  = require('lodash');
var SI = require('seamless-immutable');

function build(given, defaults) {
	given = given || {};
	defaults = defaults || {};
	const model = _.defaults(given, defaults);
	return SI(model);
}

module.exports = {
	email: function(given) {
		var defaults = {
			created_at: '2015-05-26T14:53:58.182+10:00',
			id:         1,
			kind_code:  'work',
			person_id:  1,
			updated_at: '2015-05-26T14:54:13.771+10:00',
			value:      'sam@sample.com'
		};
		return build(given, defaults);
	}
}
