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
      language: SI({
        attributes: {},
      }),
    }
  }

  onCommit(language) {
    const action = actions.create(language)
    const dispatch = this.props.dispatch
    dispatch(action)
    this.setState(this.getCleanState())
  }

  render() {
    return (
      <section>
        <Form
          {...this.props}
          language={this.state.language}
          onCommit={this.onCommit.bind(this)} />
      </section>
    )
  }

}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
}

export default Comp
