import _            from 'lodash'
import axios        from 'axios'
import bows         from 'bows'
import reduxCrud    from 'redux-crud'

import getApi       from '../shared/services/getApi'
import actionTypes  from './actionTypes'

const baseActionCreators = reduxCrud.actionCreatorsFor('users')
const host = getApi()
const log  = bows('users--actions')

let actionCreators = {

  fetch() {
    return function(dispatch, getState) {

      const action = baseActionCreators.fetchStart()
      dispatch(action)

      // send the request
      const url = `${host}/users/`
      const promise = axios({
        url: url,
      })

      promise.then(function(response) {
          // dispatch the success action
          const returned = response.data.data
          const successAction = baseActionCreators.fetchSuccess(returned)
          dispatch(successAction)
        }, function(response) {
          // log(response)
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.fetchError(response)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

  fetchOne(id) {
    return function(dispatch) {
      const action = baseActionCreators.fetchStart()
      dispatch(action)

      // send the request
      const url = `${host}/users/${id}`
      const promise = axios({
        url: url,
      })

      promise.then(function(response) {
          // dispatch the success action
          const user = response.data.data
          const successAction = baseActionCreators.fetchSuccess(user)
          dispatch(successAction)
        }, function(response) {
          // log(response)
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.fetchError(response)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

  create(user) {
    return function(dispatch) {
      const optimisticAction = baseActionCreators.createStart(user)
      dispatch(optimisticAction)

      const url = host + '/users'
      const promise = axios({
        url: url,
        method: 'POST',
        data: {
          user,
        },
      })

      promise.then(function(response) {
          // dispatch the success action
          const returnedUser = response.data.data
          const successAction = baseActionCreators.createSuccess(returnedUser)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.createError(response, user)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise

    }
  },

  update(user) {
    return function(dispatch) {
      const optimisticAction = baseActionCreators.updateStart(user)
      dispatch(optimisticAction)

      const url = `${host}/users/${user.id}`
      const promise = axios({
        url: url,
        method: 'PATCH',
        data: {
          user,
        },
      })

      promise.then(function(response) {
          // dispatch the success action
          const returnedUser = response.data.data
          const successAction = baseActionCreators.updateSuccess(returnedUser)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.updateError(response, user)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise

    }
  },

  delete(user) {
    return function(dispatch) {
      const optimisticAction = baseActionCreators.deleteStart(user)
      dispatch(optimisticAction)

      const url = `${host}/users/${user.id}`
      const promise = axios({
        url: url,
        method: 'DELETE',
      })

      promise.then(function(response) {
          // dispatch the success action
          const successAction = baseActionCreators.deleteSuccess(user)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.deleteError(response, user)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

  renameAll() {
    return {
      type: actionTypes.renameAll,
    }
  },

}

actionCreators = _.extend(actionCreators, baseActionCreators)

export default actionCreators
