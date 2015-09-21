import _            from 'lodash'
import reduxCrud    from 'redux-crud'
import axios        from 'axios'
import getApi       from '../shared/services/getApi'
import bows         from 'bows'
import cuid         from 'cuid'

const baseActionCreators = reduxCrud.actionCreatorsFor('languages')
const langsUsersActions  = reduxCrud.actionCreatorsFor('languagesUsers')
const host = getApi()
const log  = bows('languages--actions')

let actionCreators = {

  fetch() {
    return function(dispatch, getState) {

      const action = baseActionCreators.fetchStart()
      dispatch(action)

      // send the request
      const url = `${host}/languages`
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

  create(language) {
    return function(dispatch) {
      const cid = cuid()
      language = language.merge({id: cid})

      const optimisticAction = baseActionCreators.createStart(language)
      dispatch(optimisticAction)

      const url = host + '/languages'
      const promise = axios({
        url: url,
        method: 'POST',
        data: {
          language: language.attributes,
        },
      })

      promise.then(function(response) {
          // dispatch the success action
          const returned = response.data.data
          const successAction = baseActionCreators.createSuccess(returned, cid)
          dispatch(successAction)
        }, function(response) {
          // rejection
          // dispatch the error action
          const errorAction = baseActionCreators.createError(response, language)
          dispatch(errorAction)
        }).catch(function(err) {
          console.error(err.toString())
        })

      return promise

    }
  },

}

actionCreators = _.extend(actionCreators, baseActionCreators)

export default actionCreators
