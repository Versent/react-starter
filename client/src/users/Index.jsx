/* @flow */

import React          from 'react';
import Router         from 'react-router';
import makeClassAdder from '../shared/services/makeClassAdder.js';
import { connect }    from 'react-redux';
import actions        from './actions'

const PT              = React.PropTypes;
const classAdder      = makeClassAdder('users-Index');

class Comp extends React.Component {

	componentDidMount() {
		this.fetchUsers();
	}

	getDispatch() {
		return this.props.dispatch
	}

	fetchUsers() {
		const action = actions.fetch()
		const dispatch = this.getDispatch()
		dispatch(action)
	}

	renderUsers() {
		return _.map(this.props.users, function(user) {
			return (
				<tr>
					<td>
						{user.name}
					</td>
				</tr>
			);
		});
	}

	render () {
		return (
			<section className={classAdder()}>
				<h1>Users</h1>
				<table className='table-light'>
					{this.renderUsers()}
				</table>
			</section>
		);
	}
}

Comp.displayName = classAdder();

Comp.contextTypes = {
	router: PT.func
};

Comp.propTypes = {
	something: PT.array.isRequired
}

function mapStateToProps(state) {
	return {
		users: state.users
	};
}

export default connect(
	mapStateToProps,
)(Comp);
