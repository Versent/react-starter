import React          from 'react'
import Router         from 'react-router'
import bows           from 'bows'
import makeClassAdder from '../shared/services/makeClassAdder.js'
import { connect }    from 'react-redux'
import actions        from './actions'
import Busy           from '../shared/Busy.jsx'
import Edit           from './Edit.jsx'
import loader         from 'redux-loader'

const PT              = React.PropTypes
const baseClass       = 'users--EditLoader'
const classAdder      = makeClassAdder(baseClass)
const log             = bows(baseClass)

const Loader = loader.create({
  component: Edit,
  busy: Busy,
  resources: {
    user: function(options) {
      const userId = options.props.params.id
      const id = `users/${userId}`

      return {
        id: id,
        find: function() {
          return _.find(options.props.users, {id: userId})
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
