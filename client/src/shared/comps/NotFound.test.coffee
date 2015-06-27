helper      = require('../../../test/support/unit/helper').init()
React       = helper.React
path        = './NotFound.jsx';
Comp        = require(path);
TU          = React.addons.TestUtils;
chai        = require('chai')
expect      = require('chai').expect;
sinonChai   = require('sinon-chai')

chai.use(sinonChai);

props = {}

describe 'NotFound', ->

	describe 'shows', ->

		it 'a message', ->
			comp = helper.render(Comp, props)

			label = TU.findRenderedDOMComponentWithTag(comp, 'section')
			expect(label.getDOMNode().textContent).to.eql('Not found')
