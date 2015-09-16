var jsdom    = require('jsdom').jsdom
var ava      = require('ava')
var testTree = require('react-test-tree')
var sinon    = require('sinon')
var _        = require('lodash')
var bows     = require('bows')
var React

function init() {

  var host = 'http://localhost'

  // if already called in another test file bail out
  if (typeof document == 'undefined') {
    var defaultHTML = '<html><body></body></html>'
    var options = {
      html: defaultHTML,
      host: host,
    }
    var doc = jsdom(defaultHTML, options)
    var win = doc.defaultView
    // win.GLOBALS = {
    //   api_host: host
    // }

    win.localStorage = require('localStorage')
    win.localStorage.debug = true

    var nav = win.navigator = {}
    nav.userAgent  = 'NodeJs JsDom'
    nav.appVersion = ''

    global.document  = doc
    global.window    = win
    global.navigator = nav
  }

  // React need to be required after calling jsdom
  React = React || require('react/addons')

  // This is the primary interface to the helper object
  return {
    _,
    host,
    React,
    sinon,
    test: ava,
    testTree,
  }

}

module.exports = init
