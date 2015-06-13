var factory   = require('../factory.js');
var Interfake = require('interfake');
var interfake = new Interfake({
	path: 'v1'
});
var port = 3000;

// -----------------------------------------------------------------------------
// enquiries
// -----------------------------------------------------------------------------
interfake.get('/enquiries').body({
	data: [factory.enquiry(), factory.enquiry()]
});

interfake.post('/enquiries').body({
	data: [factory.enquiry()]
});

interfake.get('/enquiries/1').body({
	data: [factory.enquiry()]
});

interfake.get('/enquiries/1/notes').body({
	data: []
});

// -----------------------------------------------------------------------------
// people
// -----------------------------------------------------------------------------
interfake.get('/people/1').body({
	data: [factory.person()]
});

interfake.get('/people/2').body({
	data: [factory.person().merge({id: 2})]
});

interfake.get('/people/1/financials').body({
	data: []
});

// -----------------------------------------------------------------------------

interfake.listen(port, function () {
	console.log('Fake API Listening at http://localhost:%s', port);
});

module.exports = interfake;
