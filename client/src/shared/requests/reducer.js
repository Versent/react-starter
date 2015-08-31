var actionTypes = require('./actionTypes')

function reducer(state={}, action) {
	switch(action.type) {
		case actionTypes.REQUEST_DONE:
			var merge = {}
			merge[action.id] = true
			return Object.assign({}, state, merge)
		default:
			return state
	}
}

module.exports = reducer
