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

	onEdit(event) {
		const user = this.props.user
		this.getRouter().transitionTo(`/users/${user.id}/edit`)
	}

	renderCheckboxForLang(language) {
		// TODO check if selected
		return (
			<span key={language.id} className='mr2'>
				<label htmlFor="">{language.attributes.name}</label>
				<input type='checkbox' value={language.id} />
			</span>
		)
	}

	renderLanguages() {
		log(this.props.languages)
		return _.map(this.props.languages, this.renderCheckboxForLang)
	}

	render () {
		const user = this.props.user
		return (
			<section className={`${classAdder()} p2`}>
				<a className='btn btn-outline' onClick={this.onList.bind(this)} href="javascript://">List</a>&nbsp;
				<a className='btn btn-outline' onClick={this.onEdit.bind(this)} href="javascript://">Edit</a>
				<h1>{user.attributes.name}</h1>
				{this.renderLanguages()}
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
	languages: PT.array.isRequired,
	languages_users: PT.array.isRequired,
	user: PT.object.isRequired
}

export default Comp
