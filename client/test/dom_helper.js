process.env.NODE_ENV = 'test'

import _           from 'lodash'
import ava         from 'ava'
import bows        from 'bows'
import sinon       from 'sinon'
import testTree    from 'react-test-tree'
import { jsdom }   from 'jsdom'

let React
const host        = 'http://localhost'
const defaultHTML = '<html><body></body></html>'

export default function() {

  // if already called in another test file bail out
  if (typeof document == 'undefined') {
    const options = {
      html: defaultHTML,
      host: host,
    }
    const doc = jsdom(defaultHTML, options)
    const win = doc.defaultView

    win.localStorage = require('localStorage')
    win.localStorage.debug = true

    const nav = win.navigator = {}
    nav.userAgent  = 'NodeJs JsDom'
    nav.appVersion = ''

    global.document  = doc
    global.window    = win
    global.navigator = nav
  }

  // React need to be required after calling jsdom
  React = React || require('react/addons')

  return {
    _,
    host,
    React,
    sinon,
    test: ava,
    testTree,
  }

}
