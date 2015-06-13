var factory = require('../factory.js');
var jsdom   = require('jsdom').jsdom;
var _      = require('lodash');
var React;
var mockedComponents = [];

function render(Component, props, done) {
	var comp = React.createElement(Component, props);
	return React.render(
		comp,
		document.body,
		function() {
			if (typeof done === 'function') setTimeout(done);
		}
	);
};

function shallowRender(Component, props, done) {
	var comp = React.createElement(Component, props);
	var shallowRenderer = React.addons.TestUtils.createRenderer();
	shallowRenderer.render(comp);
	return shallowRenderer.getRenderOutput();
};

function afterEach(done) {
	React.unmountComponentAtNode(document.body);
	document.body.innerHTML = '';
	setTimeout(done);
};

/*
Returns a dummy react component that uses the given tag name
*/
function createMockedComponent(tagName) {
	var tagName = tagName || 'div'
	return React.createClass({
		render: function() {
			return React.createElement(tagName, null, '...');
		}
	});
}

/*
Mock sub components
Usage:

```
helper.mockComponents Component,
		EligibilityLoader: '',
		InitialInfoComp: 'InitialInfoComp'
```

@param {ReactComponent} Parent component
@param {Object} Map with components to mock

*/
function mockComponents(Component, componentsToMock) {
	 beforeEach(function() {

		_.each(componentsToMock, function(tagName, mockedName) {
			Component.__Rewire__(mockedName, createMockedComponent(tagName));
			mockedComponents.push(mockedName);
		});

	});

	afterEach(function() {
		_.each(mockedComponents, function(mockedName) {
			ComponentToTest.__ResetDependency__(mockedName);
		});
	});

	return Component;
};

// init gets called in every test file
function init() {

	var host = 'http://localhost';

	// if already called in another test file bail out
	if (typeof document == 'undefined') {
		var defaultHTML = '<html><body></body></html>';
		var options = {
			html: defaultHTML,
			host: host
		}
		var doc = jsdom(defaultHTML, options);
		var win = doc.defaultView;
		win.GLOBALS = {
			api_host: host
		};

		var nav = win.navigator = {};
		nav.userAgent  = 'NodeJs JsDom';
		nav.appVersion = '';

		global.document  = doc;
		global.window    = win;
		global.navigator = nav;
	}

	// React need to be required after calling jsdom
	React = React || require('react/addons');

	// This is the primary interface to the helper object
	return {
		React: React,
		host: host,
		render: render,
		shallowRender: shallowRender,
		factory: factory,
		afterEach: afterEach,
		mockComponents: mockComponents
	};

};

module.exports = {
	init: init,
	afterEach: afterEach, // DEPRECATE CALLS TO THIS, USE INIT() OBJECT INSTEAD
	render: render, // DEPRECATE CALLS TO THIS, USE INIT() OBJECT INSTEAD
}
