import SI          from 'seamless-immutable'
import reduxCrud   from 'redux-crud'
import actionTypes from './actionTypes'
import bows        from 'bows'

const baseReducers = reduxCrud.reducersFor('users')
const log = bows('users--reducer')

function reverseName(user) {
  let attributes = user.attributes
  let name       = attributes.name
  name = name.split('').reverse().join('')
  attributes = attributes.merge({name})
  return user.merge({attributes})
}

function shuffleName(user) {
  let attributes = user.attributes
  let name = attributes.name
  name = name.split('').sort(()=> 0.5 - Math.random()).join('')
  attributes = attributes.merge({name})
  return user.merge({attributes})
}

function reducer(state=SI([]), action) {
  switch (action.type) {
  case actionTypes.renameAll:
    return state.map(reverseName)
  case actionTypes.shuffleName:
    return state.map(shuffleName)
  default:
    return baseReducers(state, action)
  }
}

export default reducer
