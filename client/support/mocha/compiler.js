var transformer    = require('./transformer');
var origJs         = require.extensions['.js'];

// Install the compiler.
require.extensions['.js'] = function(module, filename) {
	// optimization: code in a distribution should never go through transformers

	if (filename.indexOf('node_modules/') >= 0) {
		return (origJs || require.extensions['.js'])(module, filename);
	}

	var transformed = transformer.transform(filename);
	return module._compile(transformed, filename);
};
