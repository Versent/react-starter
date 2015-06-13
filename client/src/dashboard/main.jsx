/* @flow */

import React      from 'react';
import Router     from 'react-router';
import log        from 'loglevel';

import NotFound   from '../shared/comps/NotFound.jsx';
import Main       from './comps/Main.jsx';

import '../../node_modules/basscss/css/basscss.css';
import '../shared/css/global.less';

const Route         = Router.Route;
const NotFoundRoute = Router.NotFoundRoute;
const RouteHandler  = Router.RouteHandler;
const Link          = Router.Link;
const DefaultRoute  = Router.DefaultRoute;

log.setLevel('debug');

class App extends React.Component {
	render() {
		return (
			<section className='container'>
				<RouteHandler />
			</section>
		)
	}
}

var Routes = (
	<Route handler={App} path="/">
		<Route name='dashboard' path='/dashboard' handler={Main} />
		<DefaultRoute handler={Main} />
		<NotFoundRoute handler={NotFound} />
	</Route>
)

Router.run(Routes, Router.HashLocation, function(Handler) {
	var mountNode = document.getElementById('app');
	React.render(<Handler/>, mountNode);
});
