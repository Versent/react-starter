import React                 from 'react';
import Router                from 'react-router';
import bows                  from 'bows'
import makeClassAdder        from '../shared/services/makeClassAdder.js';
import { connect }           from 'react-redux';
import actions               from './actions'
import languagesUsersActions from '../languages_users/actions'

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

	getUserId() {
		return this.props.user.id
	}

	getLanguageUser(languageId) {
		const userId = this.getUserId()
		return _.find(this.props.languagesUsers, function (item) {
			return item.attributes.user_id == userId && item.attributes.language_id == languageId
		})
	}

	getLanguageChecked(languageId) {
		log('languagesUsers', this.props.languagesUsers)
		const languageUser = this.getLanguageUser(languageId)
		// log(languageUser)
		return !!languageUser
	}

	onList(event) {
		this.getRouter().transitionTo('/users')
	}

	onEdit(event) {
		const user = this.props.user
		this.getRouter().transitionTo(`/users/${user.id}/edit`)
	}

	onLanguageChange(event) {
		// log(event.target)
		const { value } = event.target
		// log(value)
		const userId  = this.getUserId()
		// const checked = this.getLanguageChecked(value)
		let languageUser = this.getLanguageUser(value)
		// const languageUser = {
		// 	language_id: value,
		// 	user_id: userId,
		// }
		let action
		if (languageUser) {
			// uncheck
			log('uncheck')

			action = languagesUsersActions.delete(languageUser)
		} else {
			// check
			log('check')
			languageUser = {
				language_id: value,
				user_id: userId,
			}
			action = languagesUsersActions.create(languageUser)
		}
		this.getDispatch()(action)
	}

	renderCheckboxForLang(language) {
		// TODO check if selected
		const checked = this.getLanguageChecked(language.id)

		return (
			<span key={language.id} className='mr2'>
				<label htmlFor="">{language.attributes.name}</label>
				<input
					type='checkbox'
					value={language.id}
					checked={checked}
					onChange={this.onLanguageChange.bind(this)} />
			</span>
		)
	}

	renderLanguages() {
		log(this.props.languages)
		return _.map(this.props.languages, this.renderCheckboxForLang.bind(this))
	}

	render () {
		const user = this.props.user
		// log('user', user)
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

Comp.displayName = classAdder()

Comp.contextTypes = {
	router: PT.object.isRequired
};

Comp.propTypes = {
	dispatch:       PT.func.isRequired,
	languages:      PT.array.isRequired,
	languagesUsers: PT.array.isRequired,
	user:           PT.object.isRequired,
}

export default Comp
