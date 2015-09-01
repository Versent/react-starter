var axios          = require('axios')
var actionTypes    = require('./actionTypes')
var isDone         = require('./isDone')
var isPending      = require('./isPending')
var cuid           = require('cuid')

function request(config, options) {
  var id       = options.id
  if (id == null)  throw new Error('Expected options.id')

  if (config.url       == null)  throw new Error('Expected config.url in ' + id)
  if (options.dispatch == null)  throw new Error('Expected options.dispatch in ' + id)
  if (options.start    == null)  throw new Error('Expected options.start in ' + id)
  if (options.success  == null)  throw new Error('Expected options.success in ' + id)
  if (options.error    == null)  throw new Error('Expected options.error in ' + id)

  var dispatch = options.dispatch
  var state    = options.getState()
  var requests = state.requests
  var pending  = isPending(requests, id)
  var done     = isDone(requests, id)

  // console.log('pending', pending)
  // console.log('done', done)

  if (pending || done) {
    // console.log(`Skipping request ${id}`)
    return
  }

  var startAction = {
    id:   id,
    type: actionTypes.REQUEST_START,
  }

  // Optimistic action
  options.start()

  // console.log('dispatch startAction', startAction)
  dispatch(startAction)

  var promise = axios(config)

  return promise
    .then(function(response) {
      console.log('request done', id)
      var doneAction = {
        id:   id,
        type: actionTypes.REQUEST_DONE,
        // uid:  cuid()
      }
      // console.log('dispatch doneAction', doneAction)
      dispatch(doneAction)

      options.success(response)
      return response

    }).catch(function(err) {
      console.error(err.toString())
      options.error(err)
    })
}

module.exports = request
