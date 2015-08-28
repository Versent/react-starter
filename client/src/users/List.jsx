import React          from 'react';
import Router         from 'react-router';
import makeClassAdder from '../shared/services/makeClassAdder.js';
import { connect }    from 'react-redux';
import actions        from './actions'

const PT              = React.PropTypes;
const classAdder      = makeClassAdder('users-List');

class Comp extends React.Component {

	getDispatch() {
		return this.props.dispatch
	}

	renderUsers() {
		return _.map(this.props.users, function(user) {
			return (
				<tr>
					<td>
						{user.attributes.name}
					</td>
				</tr>
			);
		});
	}

	render () {
		return (
			<section className={`${classAdder()}`}>
				<table className='table-light'>
					<thead>
						<tr>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.renderUsers()}
					</tbody>
				</table>
			</section>
		);
	}
}

Comp.displayName = classAdder();

Comp.contextTypes = {
	router: PT.object.isRequired
};

Comp.propTypes = {
	user: PT.array.isRequired,
	dispatch: PT.func.isRequired
}

export default Comp;
