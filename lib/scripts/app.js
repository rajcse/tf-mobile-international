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

function handleRouteUpdate() {
	if (this.state.location.action === 'PUSH') window.scrollTo(0, 0);
}

// Expose the kickoff method to Cordova
window.initializeApp = function() {
	// Add the tap event
	// Reject clicks for production - switch this on build?
	injectTapEvent({shouldRejectClick: () => config.DISABLE_CLICK});
	ReactDOM.render(
		<Router history={hashHistory} onUpdate={handleRouteUpdate}>
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

// Log all client errors - self contained VanillaJS, matches endpoint used in the funnel
window.onerror = function(message, file, line, column, err) {
	var httpRequest = new XMLHttpRequest(),
		data = 'message=' + encodeURIComponent(message) +
							'&file=' + encodeURIComponent(file) +
							'&line=' + encodeURIComponent(line) +
							'&column=' + encodeURIComponent(column) +
							'&url=' + encodeURIComponent(location.href),
		version = '';

	// Get the version number by finding the first comment inside the body tag (which should be the version - this is a best guesstimate and can be accidentally changed)
	for (var i = 0; i < document.body.childNodes.length; i++) {
		if(document.body.childNodes[i].nodeType === document.COMMENT_NODE) {
			version = document.body.childNodes[i].nodeValue;
			break;
		}
	}
	data += '&version=' + encodeURIComponent(version.trim());

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
