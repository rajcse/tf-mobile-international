import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import PubRecApp from './components/app/PubRecApp';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/search/Search';
import Support from './components/support/Support';
import Account from './components/account/Account';
import Record from './components/Record';

// Modal Location Routes
import LocationModal from './components/modal/location';

function handleRouteUpdate() {
	if (this.state.location.action === 'PUSH') window.scrollTo(0, 0);
}

// Expose the kickoff method to Cordova
window.initializeApp = function() {
	ReactDOM.render(
		<Router history={hashHistory} onUpdate={handleRouteUpdate}>
			<Route path="/" component={PubRecApp}>
				<IndexRoute component={Dashboard}/>
				<Route path="/search" component={Search}/>
				<Route path="/support" component={Support}/>
				<Route path="/account" component={Account}/>
				{/* This goes last because of the loose routing */}
				<Route path="/users/:userId/records/:recordId" component={Record} >
					<Route path="location/:locationId" component={LocationModal}/>
				</Route>
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
