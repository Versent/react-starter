import React          from 'react'
import actions        from './actions'
import bows           from 'bows'
import Icon           from 'react-fa'

const PT              = React.PropTypes
const log             = bows('languages--Form')

class Comp extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = this.getCleanState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getCleanState(nextProps))
  }

  getCleanState(props) {
    const language = props.language
    log(language)
    return {
      name: language.attributes.name,
    }
  }

  onChange(event) {
    const { value } = event.target
    this.setState({
      name: value,
    })
  }

  onSave(event) {
    event.preventDefault()
    let language = this.props.language
    let attributes = language.attributes
    attributes = attributes.merge(this.state)
    language = language.merge({attributes})

    this.props.onCommit(language)
  }

  render() {
    return (
      <section>
        <form>
          <label for='name'>Name</label>&nbsp;
          <input
            type='text'
            value={this.state.name}
            onChange={this.onChange.bind(this)}
            className='field col-5' />&nbsp;
          <button type='submit' onClick={this.onSave.bind(this)} className='btn btn-outline'><Icon name='save' /></button>
        </form>
      </section>
    )
  }

}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
  onCommit: PT.func.isRequired,
  language: PT.object.isRequired,
}

export default Comp
