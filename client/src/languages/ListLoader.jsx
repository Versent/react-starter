import React          from 'react';
import Router         from 'react-router';
import bows           from 'bows'
import makeClassAdder from '../shared/services/makeClassAdder.js';
import { connect }    from 'react-redux';
import actions        from './actions'
import Busy           from '../shared/Busy.jsx'
import Component      from './List.jsx'
import createLoader   from 'redux-loader'

const PT              = React.PropTypes
const baseClass       = 'languages--ListLoader'
const classAdder      = makeClassAdder(baseClass);
const log             = bows(baseClass)

const Loader = createLoader({
	component: Component,
	busy: Busy,
	resources: {

		languages: function(options) {
			const id = '/languages'
			return {
				id,
				find() {
					const requests  = options.props.requests
					log(requests)
					const languages = options.props.languages
					if (requests[id]) {
						return languages
					}
				},
				load() {
					// const userId = options.context.router.state.params.id
					const action = actions.fetch()
					return options.dispatch(action);
				}
			}
		},

		languagesUsers: function(options) {
			const id = '/languages_users'
			return {
				id,
				find() {
					return options.props.languages_users
				},
				load() {}
			}
		}

	}
})

Loader.contextTypes = {
	router: PT.object.isRequired
};

export default connect(state => state)(Loader);
