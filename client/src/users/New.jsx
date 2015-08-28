import React          from 'react';
import actions        from './actions'

const PT              = React.PropTypes;

class Comp extends React.Component {

	constructor(props, ctx) {
		super(props, ctx)
		this.state = {
			value: ''
		}
	}

	onChange(event) {
		const { value } = event.target
		this.setState({
			value
		})
	}

	onSave(event) {
		event.preventDefault()
		const value = this.state.value
		const user = {
			attributes: {
				name: value
			}
		}
		const action = actions.create(user)
		const dispatch = this.props.dispatch
		dispatch(action)

		this.setState({
			value: ''
		})
	}

	render() {
		return (
			<section>
				<form>
					<label for="name">Name</label>&nbsp;
					<input type='text' value={this.state.value} onChange={this.onChange.bind(this)} className='field' />&nbsp;
					<button type='submit' onClick={this.onSave.bind(this)} className='btn btn-outline'>Save</button>
				</form>
			</section>
		);
	}

}

Comp.propTypes = {
	dispatch: PT.func.isRequired
}

export default Comp;
