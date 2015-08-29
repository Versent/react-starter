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
		languages: {
			find: function(options) {
				const langs = options.props.languages
				if (langs.length) {
					return options.props.languages  //_.find(options.props.languages, {id: userId})
				}
			},
			load: function(options) {
				// const userId = options.context.router.state.params.id
				const action = actions.fetch()
				return options.dispatch(action);
			}
		},
		
		languagesUsers: {
			find: function(options) {
				return options.props.languages_users
			},

			load: function(options) {

			}
		}
	}
})

Loader.contextTypes = {
	router: PT.object.isRequired
};

export default connect(state => state)(Loader);
