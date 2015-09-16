import React          from 'react'
import Router         from 'react-router'
import bows           from 'bows'
import makeClassAdder from '../shared/services/makeClassAdder.js'
import { connect }    from 'react-redux'
import actions        from './actions'
import Form           from './Form.jsx'

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

  onList(event) {
    this.history.pushState(null, '/users')
  }

  onShow(event) {
    const user = this.props.user
    this.history.pushState(null, `/users/${user.id}`)
  }

  onCommit(user) {
    log('onCommit', user)
    const action = actions.update(user)
    const dispatch = this.props.dispatch
    dispatch(action)
  }

  renderForm() {
    return (
      <div>
        <input />
      </div>
    )
  }

  render() {
    const user = this.props.user
    return (
      <section className={`${classAdder()} p2`}>
        <a className='btn btn-outline' onClick={this.onList.bind(this)} href='javascript://'>List</a>&nbsp;
        <a className='btn btn-outline' onClick={this.onShow.bind(this)} href='javascript://'>Show</a>
        <h1>Edit {user.attributes.name}</h1>
        <Form
          {...this.props}
          user={user}
          onCommit={this.onCommit.bind(this)} />
      </section>
    )
  }
}

Comp.displayName = classAdder()

Comp.contextTypes = {
  router: PT.object.isRequired,
}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
  user:     PT.object.isRequired,
}

export default Comp
