import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import injectTapEvent from 'react-tap-event-plugin';

import PubRecApp from './components/app/PubRecApp';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/search/Search';
import Support from './components/support/Support';
import Account from './components/account/Account';
import Record from './components/Record';



window.initializeApp = function() {
	// Add the tap event
	// Reject clicks for production - switch this on build?
	injectTapEvent({shouldRejectClick: () => config.DISABLE_CLICK});
	ReactDOM.render(
		<Router history={hashHistory}>
			<Route path="/" component={PubRecApp}>
				<IndexRoute component={Dashboard}/>
				<Route path="/search" component={Search}/>
				<Route path="/support" component={Support}/>
				<Route path="/account" component={Account}/>
				{/* This goes last because of the loose routing */}
				<Route path="/users/:userId/records/:recordId" component={Record}/>
			</Route>
		</Router>,
		document.querySelector('#app')
	);
};
