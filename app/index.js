import '../www/less/main.less';

// Fetch polyfill
import 'whatwg-fetch';

// Promise polyfill
require('es6-promise').polyfill();

/* eslint-disable */
// Expose jQuery for owl-carousel
window.jQuery = window.$ = jQuery;
/* eslint-enable */

// Custom polyfills
import 'utils/polyfills';

// Source map parser for error reporting
import sourceMap from 'source-map';

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
import appStoreClient from 'utils/appStoreClient';
import firebaseClient from 'utils/firebaseClient';

// Modal Routes
import LocationModal from 'containers/record/components/LocationModal';
import SexOffendersModal from 'containers/record/components/SexOffendersModal';
import CrimeModal from 'containers/record/components/CrimeModal';

// Expose the kickoff method to Cordova
window.initializeApp = () => {

	// 1 - Initialize the PubRec API
	pubRecAPI.init();
	// 2 - Initialize the app store plugin
	appStoreClient.init();

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

/**
 * Client error logging
 */

window.onerror = (message, file, line, column, err) => {
	const errorRequest = new XMLHttpRequest(),
		mapRequest = new XMLHttpRequest(),
		errorData = {
			message,
			userId: window.userIdForErrorLogging || 'User not logged in',
			device: window.device || null,
			path: location.href
		};

	// Some browsers give us the actual error instance, and that's cool
	if(err && err.stack) {
		errorData.stack = err.stack;
	}

	// Don't do anything - the user doesn't need to see this
	errorRequest.onreadystatechange = () => {};

	// We have to fetch the source map first
	// Don't send client errors unless we can map
	mapRequest.onreadystatechange = () => {
		if(mapRequest.readyState == 4 && mapRequest.status == 200) {
			let mapText = mapRequest.responseText,
				mapJSON,
				smc,
				sourceData;

			// Can we parse it?
			try {
				mapJSON = JSON.parse(mapText);
			} catch(e) {
				mapJSON = null;
			}

			if(mapJSON) {
				smc = new sourceMap.SourceMapConsumer(mapJSON);
				sourceData = smc.originalPositionFor({
					line,
					column
				});

				errorData.file = sourceData.source;
				errorData.line = sourceData.line;
				errorData.column = sourceData.column;
				errorData.name = sourceData.name;
			} else {
				// Default to the original file/line/column
				errorData.file = file;
				errorData.line = line;
				errorData.column = column;
			}

			// Send it off
			errorRequest.open('POST', config.API_ROOT + '/errors');
			errorRequest.setRequestHeader('Content-Type', 'application/json');
			errorRequest.setRequestHeader('App-Version', window.appVersion || '0.0.0');
			errorRequest.setRequestHeader('App-Build', window.appBuild || '0');
			errorRequest.send(JSON.stringify(errorData));
		}
	};

	// Request the source map
	mapRequest.open('GET', 'app.js.map');
	mapRequest.send();
};
