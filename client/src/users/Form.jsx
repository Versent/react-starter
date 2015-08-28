import React          from 'react';
import actions        from './actions'
import bows           from 'bows'

const PT              = React.PropTypes;
const log             = bows('users--Form')

class Comp extends React.Component {

	constructor(props, ctx) {
		super(props, ctx)
		this.state = this.getCleanState(props)
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getCleanState(nextProps))
	}

	getCleanState(props) {
		const user = props.user
		log(user)
		return {
			name: user.attributes.name
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
		let user = this.props.user

		// const value = this.state.value
		// const user = {
		// 	attributes: {
		// 		name: value
		// 	}
		// }
		let attributes = user.attributes
		log(attributes)
		attributes = attributes.merge(this.state)

		user = user.merge({attributes})

		const action = actions.update(user)
		const dispatch = this.props.dispatch
		dispatch(action)

		// this.setState({
		// 	value: ''
		// })
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
	user: PT.object.isRequired,
	dispatch: PT.func.isRequired
}

export default Comp;
