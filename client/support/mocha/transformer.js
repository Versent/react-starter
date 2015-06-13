/*
* Transformer takes an ES6 JSX file and returns the code for plain ES5
*/

// Based on https://github.com/Khan/react-components/blob/master/test/compiler.js
var fs                      = require('fs');
var babel                   = require('babel-core');
var coffeeTransformer       = require('coffee-script/register');
var coffeeJSXTransformer    = require('coffee-react/register')
var origJs                  = require.extensions['.js'];

function getContent(path) {
	return fs.readFileSync(path, 'utf8');
}

function transform(path) {

	if (path.indexOf('.coffee') > -1) {
		var content = getContent(path);
		return coffeeTransformer.transform(content);
	}

	if (path.indexOf('.cjsx') > -1) {
		var content = getContent(path);
		return coffeeJSXTransformer(content);
	}

	if (!babel.canCompile(path)) return '';

	var content = getContent(path);
	// object-assign used bybabel-plugin-rewire
	// babel-plugin-rewire used to mock components
	var transformArgs = {
		stage: 1,
		plugins: ['babel-plugin-rewire', 'object-assign']
	}
	return babel.transform(content, transformArgs).code;

}

// Install the compiler.
require.extensions['.js'] = function(module, path) {
	// optimization: code in a distribution should never go through JSX compiler.
	if (path.indexOf('node_modules/') >= 0 && path.indexOf('.css') === -1) {
		return (origJs || require.extensions['.js'])(module, path);
	}

	var transformed = transform(path);
	return module._compile(transformed, path);
};

module.exports = {
	transform: transform
};
