import helper    from '../../test/dom_helper'
const { _, React, sinon, test, testTree }  = helper()

let Component

const subject = 'uses--Show: '

function render(props) {
  var defaults = {
    value: 'ABC',
    type: 'text',
  }
  props = props || {}
  props = _.defaults(props, defaults)
  return testTree(<Component {...props} />, {
    context: {
      router: {},
    },
  })
}

function makeUser() {
  return {
    id: 1,
    attributes: {
      name: 'Sally',
    },
  }
}

function makeLanguage() {
  return [
    {
      id: 1,
      attributes: {
        name: 'English',
      },
    },
    {
      id: 2,
      attributes: {
        name: 'Spanish',
      },
    },
  ]
}

function makeProps() {
  const user = makeUser()
  const languages = makeLanguage()
  const languagesUsers = [
    {
      attributes: {
        user_id: user.id,
        language_id: 2,
      },
    },
  ]
  return {
    dispatch:       sinon.stub(),
    languages:      languages,
    languagesUsers: languagesUsers,
    user:           user,
  }
}

test.before(function(t) {
  Component = require('./Show.jsx')
  t.end()
})

test(subject + 'shows', function(t) {
  const props = makeProps()
  const comp = render(props)

  t.same(comp.label.innerText, props.user.attributes.name, 'the user name')
  t.same(comp.languages.length, 2, 'the languages')
  t.ok(comp.wrapperLanguages.innerText.match(/English/), 'the language')
  t.ok(comp.wrapperLanguages.innerText.match(/Spanish/), 'the language')
  t.same(comp.checkbox1.getAttribute('checked'), null, 'the linked language')
  t.same(comp.checkbox2.getAttribute('checked'), '', 'the non-linked language')

  t.end()
})

test(subject + 'updates', function(t) {
  const props = makeProps()
  const comp = render(props)

  const change = {
    target: {
      checked: false,
    },
  }
  comp.checkbox1.simulate.change(change)
  // const expected = {
  //   type: LANGUAGES_USERS_DELETE
  // }
  t.ok(props.dispatch.called, 'called uncheck')

  t.end()
})
