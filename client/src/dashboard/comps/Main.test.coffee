helper            = require('../../../spec/support/unit/helper').init()
React             = helper.React
SI                = require 'seamless-immutable'
TU                = React.addons.TestUtils
_                 = require('lodash')
sinon             = require('sinon')
chai              = require('chai')
expect            = chai.expect
sinonChai         = require('sinon-chai')
Component         = require('./Main.jsx')

chai.use(sinonChai);

props           = {}
baseClass       = 'dashboard-Main'

describe baseClass, ->

	afterEach(helper.afterEach)

	describe 'shows', ->
		it 'the title', ->
			renderedComponent = helper.render(Component, props)
			node = document.querySelectorAll(".#{baseClass}--title")[0]
			expect(node.textContent).to.eq('Dashboard')
