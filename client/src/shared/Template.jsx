/* @flow */

import React          from 'react'
import Router         from 'react-router'
import makeClassAdder from '../shared/services/makeClassAdder.js'
import Busy           from '../shared/Busy.jsx'

const PT              = React.PropTypes
const classAdder      = makeClassAdder('shared--Template')

class Comp extends React.Component {

  componentDidMount() {}

  render() {
    return (
      <section className={classAdder()}>Hello</section>
    )
  }
}

Comp.displayName = classAdder()

Comp.contextTypes = {
  router: PT.object,
}

Comp.propTypes = {
  something: PT.array.isRequired,
}

export default Comp
