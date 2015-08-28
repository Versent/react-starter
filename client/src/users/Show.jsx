import React          from 'react';
import Router         from 'react-router';
import bows           from 'bows'
import makeClassAdder from '../shared/services/makeClassAdder.js';
import { connect }    from 'react-redux';
import actions        from './actions'

const PT              = React.PropTypes
const baseClass       = 'users--Show'
const classAdder      = makeClassAdder(baseClass);
const log             = bows(baseClass)

class Comp extends React.Component {

	getDispatch() {
		return this.props.dispatch
	}

	getRouter() {
		return this.context.router
	}

	onList(event) {
		this.getRouter().transitionTo('/users')
	}

	render () {
		const user = this.props.user
		return (
			<section className={`${classAdder()} p2`}>
				<a className='btn btn-outline' onClick={this.onList.bind(this)} href="javascript://">List</a>
				<h1>{user.attributes.name}</h1>
			</section>
		);
	}
}

Comp.displayName = classAdder();

Comp.contextTypes = {
	router: PT.object.isRequired
};

Comp.propTypes = {
	dispatch: PT.func.isRequired,
	user: PT.object.isRequired
}

export default Comp
