import React          from 'react'
import SI             from 'seamless-immutable'
import actions        from './actions'
import Form           from './Form.jsx'

const PT              = React.PropTypes

class Comp extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = this.getCleanState()
  }

  getCleanState() {
    return {
      user: SI({
        attributes: {},
      }),
    }
  }

  onCommit(user) {
    const action = actions.create(user)
    const dispatch = this.props.dispatch
    dispatch(action)
    this.setState(this.getCleanState())
  }

  render() {
    return (
      <section>
        <Form
          {...this.props}
          user={this.state.user}
          onCommit={this.onCommit.bind(this)} />
      </section>
    )
  }

}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
}

export default Comp
