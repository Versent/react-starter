/* @flow */

import React          from 'react'
import makeClassAdder from '../shared/services/makeClassAdder.js'
import './NotFound.less'

const classAdder      = makeClassAdder('shared--NotFound')

class Comp extends React.Component {
  render() {
    return (
      <section className={classAdder()}>Not found</section>
    )
  }
}

Comp.displayName = classAdder()

export default Comp
