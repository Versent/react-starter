import '../node_modules/basscss/css/basscss.css'

// import addMiddleware                     from './shared/services/addMiddleware'
import bows                              from 'bows';
import React                             from 'react';
import thunkMiddleware                   from 'redux-thunk';
import loggerMiddleware                  from 'redux-logger';
import { applyMiddleware }               from 'redux';
import { combineReducers }               from 'redux';
import { createStore }                   from 'redux';
import { Provider }                      from 'react-redux';
import { Redirect, Router, Route }       from 'react-router';
import HashHistory                       from 'react-router/lib/HashHistory';
import reduxCrud                         from 'redux-crud';
import addMiddleware                     from './shared/services/addMiddleware';
// import Index          from './prospects/Index.jsx'
// import FlashesLoader  from './shared/FlashesLoader.jsx'

import Index from './users/Index.jsx'
import NotFound from './shared/NotFound.jsx'

addMiddleware();
const log = bows('app')
const history       = new HashHistory();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware, // lets us dispatch() functions
	loggerMiddleware // neat middleware that logs actions
)(createStore);

const allReducers = combineReducers({
	users: reduxCrud.reducersFor('users')
});

const store = createStoreWithMiddleware(allReducers);

class AppComponent extends React.Component {
	render() {
		return (
			<section className='container'>
				{/* this will render the child routes */}
				{this.props.children}
			</section>
		);
	}
}

class AppRouter extends React.Component {
	render() {
		return (
			<Router {...this.props}>
				<Route component={AppComponent} >
					<Route path='/' component={Index} />
					<Route path='/services' component={Index} />
					<Route path='*' component={NotFound} />
				</Route>
			</Router>
		);
	}
}

AppRouter.propTypes = {
	history: React.PropTypes.object.isRequired
};

const mountNode = document.getElementById('app');
React.render(
	<Provider store={store}>
		{() => <AppRouter history={history} /> }
	</Provider>,
	mountNode
);

