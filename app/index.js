import '../www/less/main.less';

// Fetch polyfill
import 'whatwg-fetch';

// Promise polyfill
require('es6-promise').polyfill();

// Custom polyfills
import 'utils/polyfills';

import React from 'react';
import config from 'config';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

import PubRecApp from './PubRecApp';
import Register from 'containers/register/Register';
import Dashboard from 'containers/dashboard/Dashboard';
import Search from 'containers/search/Search';
import Support from 'containers/support/Support';
import Account from 'containers/account/Account';
import Record from 'containers/record/Record';

import pubRecAPI from 'utils/PubRecAPI';
import appStoreAPI from 'utils/AppStoreAPI';
import firebaseClient from 'utils/FirebaseClient';

// Modal Routes
import LocationModal from 'containers/record/components/LocationModal';
import SexOffendersModal from 'containers/record/components/SexOffendersModal';
import CrimeModal from 'containers/record/components/CrimeModal';

// Expose the kickoff method to Cordova
window.initializeApp = () => {

	// 1 - Initialize the PubRec API
	pubRecAPI.init();
	// 2 - Initialize the app store plugin
	appStoreAPI.init();

	/**
	 * Sets the app version as quickly as possible - this is async for reasons unknown, blame the plugin author
	 */
	if(window.cordova && window.cordova.getAppVersion) {
		window.cordova.getAppVersion.getVersionNumber()
			.then(version => window.appVersion = version);

		window.cordova.getAppVersion.getVersionCode()
			.then(build => window.appBuild = build);
	}

	/**
	 * Facebook event tracking
	 */
	if(window.facebookConnectPlugin) {
		window.facebookConnectPlugin.activateApp();
	}

	/**
	 * Firebase hookup
	 */
	if(window.FirebasePlugin) {
		firebaseClient.init();
	}

	// Render after all plugin/service initialization
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
					<Route path="offender" component={SexOffendersModal}/>
					<Route path="criminal" component={CrimeModal}/>
				</Route>
			</Route>
			<Route path="/register" component={Register} />
		</Router>,
		document.querySelector('#app')
	);
};

// Log all client errors - self contained VanillaJS, matches endpoint used in the funnel
window.onerror = (message, file, line, column, err) => {
	let httpRequest = new XMLHttpRequest(),
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
	httpRequest.onreadystatechange = () => {};

	// Send it off
	httpRequest.open('POST', config.API_ROOT + '/errors');
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.send(data);
};
