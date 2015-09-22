import _                     from 'lodash'
import bows                  from 'bows'
import React                 from 'react'
import Router                from 'react-router'
import SI                    from 'seamless-immutable'
import { connect }           from 'react-redux'
import makeClassAdder        from '../shared/services/makeClassAdder.js'
import actions               from './actions'
import languagesUsersActions from '../languages_users/actions'

const PT              = React.PropTypes
const baseClass       = 'users--Show'
const classAdder      = makeClassAdder(baseClass)
const log             = bows(baseClass)

class Comp extends React.Component {

  getDispatch() {
    return this.props.dispatch
  }

  get history() {
    return this.props.history
  }

  getUserId() {
    return this.props.user.id
  }

  getLanguageUser(languageId) {
    const userId = this.getUserId()
    return _.find(this.props.languagesUsers, function(item) {
      return item.attributes.user_id == userId && item.attributes.language_id == languageId
    })
  }

  getLanguageChecked(languageId) {
    // log('languagesUsers', this.props.languagesUsers)
    const languageUser = this.getLanguageUser(languageId)
    // log(languageUser)
    return !!languageUser
  }

  onList(event) {
    this.history.pushState(null, '/users')
  }

  onEdit(event) {
    const user = this.props.user
    this.history.pushState(null, `/users/${user.id}/edit`)
  }

  onLanguageChange(event) {
    // log('onLanguageChange', event.target)
    const { value } = event.target
    const userId  = this.getUserId()
    let languageUser = this.getLanguageUser(value)
    let action
    if (languageUser) {
      action = languagesUsersActions.delete(languageUser)
    } else {
      languageUser = SI({
        attributes: {
          language_id: value,
          user_id: userId,
        },
      })
      action = languagesUsersActions.create(languageUser)
    }
    this.getDispatch()(action)
  }

  renderCheckboxForLang(language) {
    const checked = this.getLanguageChecked(language.id)
    const ref = 'checkbox' + language.id

    return (
      <span key={language.id} className='mr2'>
        <label htmlFor=''>{language.attributes.name}</label>
        <input
          ref={ref}
          type='checkbox'
          value={language.id}
          checked={checked}
          onChange={this.onLanguageChange.bind(this)} />
      </span>
    )
  }

  renderLanguages() {
    // log(this.props.languages)
    return (
      <div ref='wrapperLanguages' refCollection='languages'>
        {_.map(this.props.languages, this.renderCheckboxForLang.bind(this))}
      </div>
    )
  }

  render() {
    const user = this.props.user
    return (
      <section className={`${classAdder()} p2`}>
        <a className='btn btn-outline' onClick={this.onList.bind(this)} href='javascript://'>List</a>&nbsp;
        <a className='btn btn-outline' onClick={this.onEdit.bind(this)} href='javascript://'>Edit</a>
        <h1 ref='label'>{user.attributes.name}</h1>
        {this.renderLanguages()}
      </section>
    )
  }
}

Comp.displayName = classAdder()

Comp.contextTypes = {
  router: PT.object.isRequired,
}

Comp.propTypes = {
  dispatch:       PT.func.isRequired,
  languages:      PT.array.isRequired,
  languagesUsers: PT.array.isRequired,
  user:           PT.object.isRequired,
}

export default Comp
