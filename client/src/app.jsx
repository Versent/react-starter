import '../node_modules/basscss/css/basscss.css'

// import addMiddleware                     from './shared/services/addMiddleware'
import bows                              from 'bows'
import React                             from 'react'
import thunkMiddleware                   from 'redux-thunk'
import loggerMiddleware                  from 'redux-logger'
import { compose }                       from 'redux'
import { applyMiddleware }               from 'redux'
import { combineReducers }               from 'redux'
import { createStore }                   from 'redux'
import { Provider }                      from 'react-redux'
import { Redirect, Router, Route }       from 'react-router'
// import { devTools, persistState }        from 'redux-devtools'
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { createHashHistory }                from 'history'
import reduxCrud                            from 'redux-crud'
import addMiddleware                        from './shared/services/addMiddleware'
import reduxLoader                          from 'redux-loader'
import usersReducer                         from './users/reducer'
// import Index          from './prospects/Index.jsx'
// import FlashesLoader  from './shared/FlashesLoader.jsx'

import Index           from './users/Index.jsx'
import ShowLoader      from './users/ShowLoader.jsx'
import EditLoader      from './users/EditLoader.jsx'
import NotFound        from './shared/NotFound.jsx'
import LanguagesList   from './languages/ListLoader.jsx'

addMiddleware()
const log           = bows('app')
const history       = createHashHistory()

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
  // Provides support for DevTools:
  // devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
)(createStore)

const allReducers = combineReducers({
  languages:       reduxCrud.reducersFor('languages'),
  languages_users: reduxCrud.reducersFor('languages_users'),
  requests:        reduxLoader.reducer,
  users:           usersReducer,
})

const store = finalCreateStore(allReducers)

class AppComponent extends React.Component {
  render() {
    return (
      <section className='container clearfix'>
        <div className='col col-6'>
          {this.props.children}
        </div>
        <div className='col col-6'>
          <LanguagesList />
        </div>
      </section>
    )
  }
}

class AppRouter extends React.Component {
  render() {
    return (
      <Router {...this.props}>
        <Route component={AppComponent} >
          <Route path='/' component={Index} />
          <Route path='/users' component={Index} />
          <Route path='/users/:id' component={ShowLoader} />
          <Route path='/users/:id/edit' component={EditLoader} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

AppRouter.propTypes = {
  history: React.PropTypes.object.isRequired,
}

// <DebugPanel top right bottom>
//  <DevTools store={store} monitor={LogMonitor} />
// </DebugPanel>

const mountNode = document.getElementById('app')
React.render(
  <div>
    <Provider store={store}>
      {() => <AppRouter history={history} /> }
    </Provider>
  </div>,
  mountNode
)

