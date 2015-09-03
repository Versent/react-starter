import React          from 'react'
import Router         from 'react-router'
import makeClassAdder from '../shared/services/makeClassAdder.js'
import { connect }    from 'react-redux'
import actions        from './actions'
import New            from './New.jsx'
import List           from './List.jsx'

const PT              = React.PropTypes
const classAdder      = makeClassAdder('users--Index')

class Comp extends React.Component {

  componentDidMount() {
    this.fetchUsers()
  }

  getDispatch() {
    return this.props.dispatch
  }

  fetchUsers() {
    const action = actions.fetch()
    const dispatch = this.getDispatch()
    dispatch(action)
  }

  render() {
    return (
      <section className={`${classAdder()} p1`}>
        <h2>Users</h2>
        <New {...this.props} />
        <List {...this.props} />
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
}

function mapStateToProps(state) {
  return {
    users: state.users,
  }
}

export default connect(
  mapStateToProps
)(Comp)
