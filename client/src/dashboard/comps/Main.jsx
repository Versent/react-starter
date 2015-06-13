/* @flow */

import React          from 'react';
import makeClassAdder from '../../shared/services/makeClassAdder.js';
import './Main.less';

const addClass      = makeClassAdder('dashboard-Main');

class Comp extends React.Component {

	render() {
		return (
			<section className={addClass()}>
				<h1 className={addClass('title', '')}>Dashboard</h1>
			</section>
		)
	}
}

Comp.displayName = addClass();

export default Comp;
