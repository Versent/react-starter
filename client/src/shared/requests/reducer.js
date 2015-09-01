var actionTypes = require('./actionTypes')
var SI          = require('seamless-immutable')

function changeStatus(state, action, status) {
  // console.log('changeStatus', action.id, status)
  // console.log('changeStatus', action)
  var id = action.id
  if (id == null) throw new Error('Expected action.id')

  var request = state[id] || SI({})

  request = request.merge({status:  status})
  const newState = state.without(id).merge({[id]: request})
  // console.log('newState', newState)
  return newState
}

function reducer(state, action) {
  state = state || SI({})

  // console.log(action.type, state)

  switch (action.type) {
  case actionTypes.REQUEST_START:
    return changeStatus(state, action, actionTypes.REQUEST_START)
  case actionTypes.REQUEST_DONE:
    return changeStatus(state, action, actionTypes.REQUEST_DONE)
  default:
    return state
  }
}

module.exports = reducer
