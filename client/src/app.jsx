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

import Index           from './users/Index.jsx'
import ShowLoader      from './users/ShowLoader.jsx'
import EditLoader      from './users/EditLoader.jsx'
import NotFound        from './shared/NotFound.jsx'
import LanguagesList   from './languages/ListLoader.jsx'

addMiddleware();
const log = bows('app')
const history       = new HashHistory();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware, // lets us dispatch() functions
	loggerMiddleware // neat middleware that logs actions
)(createStore);

const allReducers = combineReducers({
	languages:       reduxCrud.reducersFor('languages'),
	languages_users: reduxCrud.reducersFor('languages_users'),
	users:           reduxCrud.reducersFor('users')
});

const store = createStoreWithMiddleware(allReducers);

class AppComponent extends React.Component {
	render() {
		return (
			<section className='container clearfix'>
				<div className='col col-8'>
					{this.props.children}
				</div>
				<div className='col col-4'>
					<LanguagesList />
				</div>
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
					<Route path='/users' component={Index} />
					<Route path='/users/:id' component={ShowLoader} />
					<Route path='/users/:id/edit' component={EditLoader} />
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

