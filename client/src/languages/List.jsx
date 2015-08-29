/* @flow */

import React          from 'react';
import Router         from 'react-router';
import makeClassAdder from '../shared/services/makeClassAdder.js';
import Busy           from '../shared/Busy.jsx';

const PT              = React.PropTypes;
const classAdder      = makeClassAdder('languages--List');

class Comp extends React.Component {

	renderItems() {
		return _.map(this.props.languages, (language) => {
			return <li key={language.id}>{language.attributes.name}</li>
		})
	}

	render () {
		return (
			<section className={classAdder()}>
				<h2>Languages</h2>
				<ul>
					{this.renderItems()}
				</ul>
			</section>
		);
	}
}

Comp.displayName = classAdder();

Comp.contextTypes = {
	router: PT.object
};

Comp.propTypes = {
	languages: PT.array.isRequired
}

export default Comp;
