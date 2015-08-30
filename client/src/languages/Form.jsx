import React          from 'react';
import actions        from './actions'
import bows           from 'bows'

const PT              = React.PropTypes;
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
			name: language.attributes.name
		}
	}

	onChange(event) {
		const { value } = event.target
		this.setState({
			name: value
		})
	}

	onSave(event) {
		event.preventDefault()
		let language = this.props.language
		let attributes = language.attributes
		// log(attributes)
		// attributes = attributes.merge(this.state)

		// language = language.merge({attributes})
		attributes = attributes.merge(this.state).merge({id: language.id})
		log(attributes)

		this.props.onCommit(attributes)
	}

	render() {
		return (
			<section>
				<form>
					<label for="name">Name</label>&nbsp;
					<input type='text' value={this.state.name} onChange={this.onChange.bind(this)} className='field' />&nbsp;
					<button type='submit' onClick={this.onSave.bind(this)} className='btn btn-outline'>Save</button>
				</form>
			</section>
		);
	}

}

Comp.propTypes = {
	dispatch: PT.func.isRequired,
	onCommit: PT.func.isRequired,
	language: PT.object.isRequired
}

export default Comp;