var axios          = require('axios')
var actionTypes    = require('./actionTypes')

function request(id, config, options) {
	if (id == null)                throw new Error('id is null')
	if (config.url == null)        throw new Error('config.url is null')
	if (options.dispatch == null)  throw new Error('options.dispatch is null')
	if (options.getState == null)  throw new Error('options.getState is null')

	var state    = options.getState()
	var requests = state.requests

	if (requests[id]) {
		console.log(`Request already done ${id}`)
		return new Promise(function(resolve) {
			resolve({
				data: {
					data: []
				}
			})
		})
	}

	var promise = axios(config)

	var action = {
		id:   id,
		type: actionTypes.REQUEST_DONE,
	}

	options.dispatch(action)

	return promise
}

module.exports = request
