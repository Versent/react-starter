import React                  from 'react'
import Router                 from 'react-router'
import bows                   from 'bows'
import makeClassAdder         from '../shared/services/makeClassAdder.js'
import { connect }            from 'react-redux'
import actions                from './actions'
import languagesUsersActions  from '../languages_users/actions'
import Busy                   from '../shared/Busy.jsx'
import Show                   from './Show.jsx'
import reduxLoader            from 'redux-loader'

const PT              = React.PropTypes
const baseClass       = 'users--ShowLoader'
const classAdder      = makeClassAdder(baseClass)
const log             = bows(baseClass)

const Loader = reduxLoader.create({
  component: Show,
  busy: Busy,
  resources: {

    languagesUsers: function(options) {
      const id = '/languages_users'

      return {
        id,
        find: function() {
          return options.props.languages_users
        },
        load: function() {
          const action = languagesUsersActions.fetch()
          return options.dispatch(action)
        },
      }
    },

    user: function(options) {
      const userId = options.props.params.id
      const id = `/users/${userId}`

      return {
        id,
        find: function() {
          const user = _.find(options.props.users, {id: userId})
          // log('user', user)
          return user
        },
        load: function() {
          const action = actions.fetchOne(userId)
          return options.dispatch(action)
        },
      }

    },
  },
})

Loader.contextTypes = {
  router: PT.object.isRequired,
}

export default connect(state => state)(Loader)
