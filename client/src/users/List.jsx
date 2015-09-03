import React          from 'react'
import Router         from 'react-router'
import makeClassAdder from '../shared/services/makeClassAdder.js'
import { connect }    from 'react-redux'
import actions        from './actions'
import Icon           from 'react-fa'
import bows           from 'bows'

const PT              = React.PropTypes
const baseClass       = 'users--List'
const classAdder      = makeClassAdder(baseClass)
const log             = bows(baseClass)

let renderCount = 0

class Comp extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const ids1 = _.pluck(this.props.users, 'id')
    const ids2 = _.pluck(nextProps.users, 'id')
    return !_.isEqual(ids1, ids2)
  }

  getDispatch() {
    return this.props.dispatch
  }

  getRouter() {
    return this.context.router
  }

  onShow(user, event) {
    event.preventDefault()
    const router = this.getRouter()
    router.transitionTo('/users/' + user.id)
  }

  onEdit(user, event) {
    event.preventDefault()
    const router = this.getRouter()
    router.transitionTo('/users/' + user.id + '/edit')
  }

  onDelete(user, event) {
    event.preventDefault()
    const action = actions.delete(user)
    const dispatch = this.getDispatch()
    dispatch(action)
  }

  renderUsers() {
    return _.map(this.props.users, (user) => {
      return (
        <tr>
          <td>
            {user.attributes.name}
          </td>
          <td></td>
          <td>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onShow.bind(this, user)}><Icon name='eye' /></a>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onEdit.bind(this, user)}><Icon name='pencil' /></a>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onDelete.bind(this, user)}><Icon name='trash' /></a>
          </td>
        </tr>
      )
    })
  }

  render() {
    renderCount++
    log('render', renderCount)
    return (
      <section className={`${classAdder()}`}>
        <table className='table-light'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Langs</th>
            <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
      </section>
    )
  }
}

Comp.displayName = classAdder()

Comp.contextTypes = {
  router: PT.object.isRequired,
}

Comp.propTypes = {
  users: PT.array.isRequired,
  dispatch: PT.func.isRequired,
}

export default Comp
