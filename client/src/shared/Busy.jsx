/* @flow */

import React          from 'react'
import makeClassAdder from './services/makeClassAdder.js'
import Icon           from 'react-fa'
const PT              = React.PropTypes

const classAdder      = makeClassAdder('shared--Busy')
const sizeMap         = {
  s: '.75rem',
  xs: '.5rem',
}

class Comp extends React.Component {

  getFontSize() {
    return sizeMap[this.props.size]
  }

  getStyle() {
    const style = {}
    const size = this.getFontSize()
    if (size) style.fontSize = size
    return style
  }

  render() {
    const style = this.getStyle()
    return (
      <Icon spin name='spinner' />
    )
  }

}

Comp.displayName = classAdder()

Comp.propTypes = {
  size:       PT.oneOf(['xl', 'l', 'm', 's', 'xs']),
}

module.exports = Comp

