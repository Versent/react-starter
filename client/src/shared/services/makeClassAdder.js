/* @flow */

import classNames from 'classnames'

function makeClasses(block) {
  return function addClasses(element) {
    var classes = []
    var rest = [].splice.call(arguments, 1)

    // rest can be an array of strings
    // or an object,
    // this will be evaluated by classSet, see
    // http://facebook.github.io/react/docs/class-name-manipulation.html

    if (element) {
      classes.push(block + '--' + element)
    } else {
      classes.push(block)
    }

    var restClasses = classNames.apply(null, rest)

    // restClasses is just a string e.g. '-active -important'
    if (restClasses) {
      classes.push(restClasses)
    }

    return classes.join(' ')
  }
}

module.exports = makeClasses
