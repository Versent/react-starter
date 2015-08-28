import React          from 'react';
import Router         from 'react-router';
import bows           from 'bows'
import makeClassAdder from '../shared/services/makeClassAdder.js';
import { connect }    from 'react-redux';
import actions        from './actions'
import Busy           from '../shared/Busy.jsx'
import Edit           from './Edit.jsx'

const PT              = React.PropTypes
const baseClass       = 'users--EditLoader'
const classAdder      = makeClassAdder(baseClass);
const log             = bows(baseClass)

class Loader extends React.Component {

	// get use from router

	getRouter() {
		return this.context.router
	}

	componentDidMount() {
		log(this.props.user)
		this.fetchUser()
	}

	componentWillReceiveProps(nextProps) {
		log('componentWillReceiveProps', nextProps)
	}

	getUserId() {
		const router = this.getRouter()
		// log(router)
		// window.router = router
		return router.state.params.id
	}

	fetchUser() {
		const id = this.getUserId()
		const action = actions.fetchOne(id)
		this.props.dispatch(action)
	}

	render() {
		const lookupId = this.getUserId()
		const user = _.find(this.props.users, function(user) {
			return user.id == lookupId
		})

		log('user', user)

		if (user) {
			return <Edit {...this.props} user={user} />
		} else {
			return <Busy />
		}
	}
}

Loader.contextTypes = {
	router: PT.object.isRequired
};

// function find(users, userId) {
// 	return _.find(users, function(user) {
// 		return user.id == userId
// 	})
// }

function mapStateToProps(state, props) {
	// console.log(state)
	// console.log(props)
	// const userId = props.userId
	return {
		users: state.users
	};
}

// function mergeProps

export default connect(
	mapStateToProps,
)(Loader);
