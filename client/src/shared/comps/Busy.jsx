/* @flow */

import React          from 'react';
import makeClassAdder from '../../shared/services/makeClassAdder.js';
const PT              = React.PropTypes;

const classAdder      = makeClassAdder('shared-Loader');
const sizeMap         = {
	s: '.75rem',
	xs: '.5rem'
}

class Comp extends React.Component {

	getFontSize() {
		return sizeMap[this.props.size];
	}

	getStyle() {
		const style = {}
		const size = this.getFontSize();
		if (size) style.fontSize = size;
		return style;
	}

	render() {
		const style = this.getStyle();
		return (
			<i className="fa fa-spinner fa-spin" style={style}></i>
		);
	}

}

Comp.displayName = classAdder();

Comp.propTypes = {
	size:       PT.oneOf(['xl', 'l', 'm', 's', 'xs'])
}

module.exports = Comp;

