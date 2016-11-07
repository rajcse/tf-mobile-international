import '../www/less/main.less';

import React from 'react';
import config from 'config';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

import PubRecApp from './components/app/PubRecApp';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/search/Search';
import Support from './components/support/Support';
import Account from './components/account/Account';
import Record from './components/Record';

// Modal Routes
import LocationModal from './components/location/modal';
import OffenderModal from './components/offender/modal';
import CriminalModal from './components/criminal/modal';

// Expose the kickoff method to Cordova
window.initializeApp = function() {
	ReactDOM.render(
		<Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
			<Route path="/" component={PubRecApp}>
				<IndexRoute component={Dashboard}/>
				<Route path="/search" component={Search}/>
				<Route path="/support" component={Support}/>
				<Route path="/account" component={Account}/>
				{/* This goes last because of the loose routing */}
				<Route path="/users/:userId/records/:recordId" component={Record} >
					<Route path="location" component={LocationModal}/>
					<Route path="offender" component={OffenderModal}/>
					<Route path="criminal" component={CriminalModal}/>
				</Route>
			</Route>
			<Route path="/register" component={Register} />
		</Router>,
		document.querySelector('#app')
	);
	
	/** 
	 * Sets the app version as quickly as possible - this is async for reasons unknown, blame the plugin author
	 */
	if(window.cordova && window.cordova.getAppVersion) {
		window.cordova.getAppVersion.getVersionNumber()
			.then(version => window.appVersion = version);
		
		window.cordova.getAppVersion.getVersionCode()
			.then(build => window.appBuild = build);
	}
};

// Log all client errors - self contained VanillaJS, matches endpoint used in the funnel
window.onerror = function(message, file, line, column, err) {
	var httpRequest = new XMLHttpRequest(),
		data = 'message=' + encodeURIComponent(message) +
							'&file=' + encodeURIComponent(file) +
							'&line=' + encodeURIComponent(line) +
							'&column=' + encodeURIComponent(column) +
							'&url=' + encodeURIComponent(location.href);

	// Some browsers give us the actuall error instance, and that's cool
	if(err && err.stack) {
		data += '&stack=' + encodeURIComponent(err.stack);
	}

	// Don't do anything - the user doesn't need to see this
	httpRequest.onreadystatechange = function() {
	};

	// Send it off
	httpRequest.open('POST', config.API_ROOT + '/errors');
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.send(data);
};
