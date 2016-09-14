import config from 'config';
import _ from 'lodash';
import 'whatwg-fetch';
import jwtDecode from 'jwt-decode';
import constants from '../constants/pubRecConstants';
import serverActions from '../actions/serverActions';

const RECORD_CACHE_LIMIT = 25;
const RECORDID_CACHE_LIMIT = 100;

let _accessToken = null,
	_refreshToken = null,
	_recordIdCache = [],
	_recordCache = [];

/**
 * Quick 'n dirty stackoverflow find for serializing objects into a query string
 * @param {Object} obj - Object to serialize into a key=value query string
 * @returns {String}
 */
function _serialize(obj, prefix) {
	let str = [];
	for(let p in obj) {
		if (obj.hasOwnProperty(p)) {
			let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
			str.push(typeof v === 'object' ?
			_serialize(v, k) :
			encodeURIComponent(k) + '=' + encodeURIComponent(v));
		}
	}
	return str.join('&');
}

/**
 * Checks to see if any given JWT is expired
 * @param {String} token - JWT token
 * @returns {Boolean}
 */
function _isTokenExpired(token) {
	let decoded = jwtDecode(token);

	// PHP time() exp, so convert Date.now() to seconds
	return Date.now()/1000 > decoded.exp;
}

/**
 * Extracts user data used by the app from the access token passed
 * @param {String} token - Access token containing user data
 * @returns {Object}
 */
function _userFromAccessToken(token) {
	// Parse the user
	let decoded = jwtDecode(token);

	return {
		firstName: decoded.first_name,
		lastName: decoded.last_name,
		email: decoded.email,
		id: decoded.id
	};
}


/**
 * Custom error type for PubRecAPI
 * @param {Object|String} settings - Message or object with error information
 */
class PubRecAPIError extends Error {
	constructor(settings) {
		super();

		// Accept string only errors
		if(typeof settings === 'string') {
			settings = {message: settings};
		}

			// Default if nothing is set
		settings = settings || {};

		this.name = 'PubRecAPIError';

		this.message = settings.message || 'An unknown error occured';
		this.statusCode = settings.statusCode || null;
		this.host = settings.host || config.API_ROOT;
		this.requestPath = settings.requestPath || null;
		this.requestData = settings.requestData || null;
		this.responseBody = settings.responseBody || null;

		// Don't log passwords - just set it to a boolean if it was present and a string
		if(this.requestData && typeof this.requestData.password === 'string') this.requestData.password = true;
	}
}

/**
 * Thin abstraction layer for fetch() that centralizes error handling logic
 * and standard options
 * @param {String} path - Path (excluding query string) to make the request to
 * @param {Object[]} [options] - Additional options for the request
 * @param {Object} [options[].query] - Object to be serialized into a key=value query string
 * @param {Object} [options[].body] - Object to be sent as JSON body with request
 * @param {String} [options[].method=GET] - HTTP method for request
 * @param {Boolean} [options[].needsAuth] - Does this request need the Authorization header
 * @returns {Promise} - Returns the promise from fetch() after some standard HTTP error checking and JSON body conversion
 */
function _makeRequest(path, options) {
	if(typeof options !== 'object') options = {};

	let queryString = options.query ? '?' + _serialize(options.query) : '',
		fetchOpts = {
			headers: {
				'Content-Type': 'application/json'
			},
			method: options.method || 'GET'
		},
		requestCount = options.requestCount || 0;

	if(typeof options.body === 'object') {
		fetchOpts.body = JSON.stringify(options.body);
	}

	if(options.needsAuth) {
		fetchOpts.headers['Authorization'] = 'Bearer ' + _accessToken;
	}

	return fetch(config.API_ROOT + path + queryString, fetchOpts)
	.then((response) => {
		// If it's not JSON, throw and catch an error to default before it just bellyflops trying to parse the response
		if(response.headers.get('Content-Type') !== 'application/json') {

			throw new PubRecAPIError({
				message: response.statusText,
				responseBody: response.text(),
				statusCode: response.status,
				requestPath: path
			});
		}

		return response;
	})
	.then((response) => {
		// Check for HTTP error statuses, throw errors to skip processing response body

		// Check for Unauthorized response
		if(response.status === 401) throw new PubRecAPIError({message: 'Access Token Expired', statusCode: response.status});

		// If it's a 402, we need to throw an error to halt downstream processes
		if(response.status === 402) throw new PubRecAPIError({message: response.statusText, responseBody: response.json(), statusCode: response.status});

		// If it's a 403, log the user out. No requests should return a 403 that doesn't require the user to log out
		if(response.status === 403) throw new PubRecAPIError({message: response.statusText, responseBody: response.json(), statusCode: response.status});

		// Throw a generic error for every other error status
		if(response.status > 400) throw new PubRecAPIError({message: response.statusText, responseBody: response.json(), statusCode: response.status});

		return response;
	})
	.then((response) => response.json())
	.catch((error) => {
		// Catch the HTTP status errors, throw again to let the caller deal with the response

		// If it was a 401, get a new access token here, then make the original request again
		if(error.statusCode === 401 && requestCount++ < 10) {
			return pubRecAPI.refreshAccessToken().then(() => _makeRequest(path, Object.assign(options, {requestCount})));
		} else if(error.statusCode === 401){
				// After 10 attempts, they should be logged out
			pubRecAPI.logout();
		}

		// If it's a 402, call the upsell flow now, don't hit the caller's catch block
		if(error.statusCode === 402) {
			error.responseBody.then(responseData => {
				setTimeout(() => serverActions.paymentRequired(responseData.errors[0].item), 0);
			});
		}

		if(error.statusCode === 403) {
			pubRecAPI.logout();
		}

		if(error.statusCode > 400) throw error;

		// Return a default object for down the line
		return {
			success: false,
			errors: [{message: error.message, code: error.statusCode}],
			originalResponse: error.response
		};
	});
}


/**
 * DAO Class that handles all the API requests and caching
 * Each method that makes a request returns the _makeRequest promise for use in other promises
 * All serverActions within a _makeRequest promise **MUST** be called asynchronously (via setTimeout(fn, 0)) to remove the
 *     synchronous action chain from the scope of the promise - this prevents downstream React errors from getting caught
 *     by the .catch() method in this DAO
 */
class PubRecAPI {
	checkLocalUser() {
		// Check there's already a valid access and refresh token in local storage
		let accessToken = window.localStorage.getItem('accessToken'),
			refreshToken = window.localStorage.getItem('refreshToken'),
			user = null;

		if(accessToken && refreshToken && !_isTokenExpired(refreshToken)) {
			// If we have both tokens, and the refresh expired, just log the user in
			try {
				_accessToken = accessToken;
				_refreshToken = refreshToken;

				// Decode the user from the existing access token
				user = _userFromAccessToken(_accessToken);

				// Trigger a received user
				serverActions.receiveUser(user);

				// Fetch the initial usage info for the user
				// If the access token is expired, it will refresh itself automatically on 401
				this.getUsage();

			} catch(e) {
				// Force a logout - the access token was malformed
				return this.logout();
			}
		} else {
			// If we can't log the user in, trigger a logout and remove any leftover info
			return this.logout(false);
		}
	}

	refreshAccessToken() {
		return _makeRequest('/refresh-access-token', {method: 'POST', body: {refreshToken: _refreshToken}})
			.then((responseData) => {
				if(responseData.success) {
					// Set the access token for future calls
					_accessToken = responseData.accessToken;

					// Set the tokens in local storage
					window.localStorage.setItem('accessToken', _accessToken);

					setTimeout(() => serverActions.receiveUser(_userFromAccessToken(_accessToken)), 0);
				} else {
					console.log(responseData.errors);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	login(credentials) {
		// Validate credentials first
		if(!credentials.email || !credentials.password) {
			return serverActions.loginFailed('Please enter your email and password');
		}

		// Append the device uuid or user agent to the credentials - this is used for refresh tokens
		credentials.deviceId = window.device.uuid || navigator.userAgent;
		credentials.cordovaDevice = window.device;

		return _makeRequest('/login', {method: 'POST', body: credentials})
			.then((responseData) => {
				if(responseData.success) {
						// Set the access token for future calls
					_accessToken = responseData.accessToken;

					// Set the refresh token to get new access tokens
					_refreshToken = responseData.refreshToken;

					// Set the tokens in local storage
					window.localStorage.setItem('accessToken', _accessToken);
					window.localStorage.setItem('refreshToken', _refreshToken);

					setTimeout(() => serverActions.receiveUser(_userFromAccessToken(_accessToken)), 0);

					// Get the usage for the user
					this.getUsage();

				} else {
					// TODO: Switch error messages based on error response
					// Set a generic error message
					setTimeout(() => serverActions.loginFailed('Invalid email and/or password'), 0);
				}
			})
			.catch((error) => {
				console.error(error);
				setTimeout(() => serverActions.loginFailed(error.message), 0);
			});
	}

	logout(redirect) {
		// Null out the _accessToken, _refreshToken, and local items
		_accessToken = null;
		_refreshToken = null;
		_recordCache = [];
		_recordIdCache = [];
		window.localStorage.removeItem('accessToken');
		window.localStorage.removeItem('refreshToken');
		serverActions.loggedOut(redirect);
	}

	fetchAccountInfo() {
		let user = _userFromAccessToken(_accessToken);
		return _makeRequest('/users/' + user.id, {needsAuth: true})
			.then((responseData) => {
				if(responseData.success) {
					setTimeout(() => serverActions.receiveAccountInfo(responseData.user), 0);
				} else {
					console.error(responseData.errors);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	search(criteria) {
		return _makeRequest('/' + constants.recordEndpoints[criteria.type], {query: criteria.query, needsAuth: true})
			.then((responseData) => {
				setTimeout(() => serverActions.receiveSearchResults(responseData.results, criteria.type), 0);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	/**
	 * This function creates/retrieves a record in usage service and optionally redirects
	 * the app after successful response
	 */
	createRecord(recordData, recordType, redirect, forceRefresh) {
		let user = _userFromAccessToken(_accessToken);

		if(!forceRefresh) {
			// Check for a cached recordId to serve immediately
			let cachedRecordIndex = _.findIndex(_recordIdCache, {pointer: recordData.pointer});

			if(cachedRecordIndex >= 0) {
				let cachedRecordId = _recordIdCache.splice(cachedRecordIndex, 1)[0];
				_recordIdCache.push(cachedRecordId);

				if(redirect) {
					// This action does not trigger a dispatch
					return serverActions.redirectToRecord(user.id, cachedRecordId.recordId);
				} else {
					// This simply announces the record was created
					return serverActions.receiveRecordId(user.id, cachedRecordId.recordId);
				}
			}
		}

		//Usage service currently doesn't support email report pointer so we have to use the actual email addresses for now
		if(recordType === 'email') {
			recordData.pointer = recordData.email.address;
		}

		return _makeRequest('/users/' + user.id + '/records', {
			needsAuth: true,
			method: 'POST',
			body: {
				record: recordData,
				type: recordType
			}
		})
		.then((responseData) => {
			if(responseData.success) {
				// Add the new recordId to the cache
				_recordIdCache.push({pointer: recordData.pointer, recordId: responseData.recordId});

				// Shift out the oldest element if the history length is greater than the limit
				if(_recordIdCache.length > RECORDID_CACHE_LIMIT) _recordIdCache.shift();

				if(redirect) {
					// This action does not trigger a dispatch
					setTimeout(() => serverActions.redirectToRecord(user.id, responseData.recordId), 0);
				} else {
					// This simply announces the record was created
					setTimeout(() => serverActions.receiveRecordId(user.id, responseData.recordId), 0);
				}
			} else {
				console.log(responseData.errors);
			}
		})
		.catch((error) => {
			console.error(error);
		});
	}

	/**
	 * This also handles checking the local cache prior to requesting a record
	 */
	fetchRecord(criteria, forceRefresh) {
		let user = _userFromAccessToken(_accessToken);

		if(!forceRefresh) {
			// Check for a cached record in their history to serve immediately
			let cachedRecordIndex = _.findIndex(_recordCache, (record) => record.id[2] === criteria.recordId);

			if(cachedRecordIndex >= 0) {
				let cachedRecord = _recordCache.splice(cachedRecordIndex, 1)[0];
				_recordCache.push(cachedRecord);

				return serverActions.receiveRecord(cachedRecord);
			}
		}

		return _makeRequest('/users/' + user.id + '/records/' + criteria.recordId, {needsAuth: true})
			.then((responseData) => {
				if(responseData.success) {
					// Check for a stale version of the record in their history first
					let staleRecordIndex = _.findIndex(_recordCache, (record) => record.id[2] === responseData.record.id[2]);

					if(staleRecordIndex >= 0) {
						// Remove the old record
						_recordCache.splice(staleRecordIndex, 1)[0];
					}

					// Add the new record to the cache
					_recordCache.push(responseData.record);

					// Shift out the oldest element if the history length is greater than the limit
					if(_recordCache.length > RECORD_CACHE_LIMIT) _recordCache.shift();
					setTimeout(() => serverActions.receiveRecord(responseData.record), 0);
				} else {
					console.log(responseData.errors);
				}
			})
			.then(() => this.getUsage())
			.catch((error) => {
				console.error(error);
				setTimeout(() => serverActions.recordRequestError(error), 0);
			});
	}

	/**
	 * Handles fetching location teaser by pointer
	 */
	fetchLocationTeaser(pointer) {
		return _makeRequest('/' + constants.recordEndpoints[constants.recordTypes.LOCATION], {query: {pointer}, needsAuth: true})
			.then((responseData) => {
				setTimeout(() => serverActions.receiveLocationTeaser(pointer, responseData.results[0]), 0);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getUsage() {
		let user = _userFromAccessToken(_accessToken);
		return _makeRequest('/users/' + user.id + '/records', {needsAuth: true})
			.then((responseData) => {
				if(responseData.success) {
					setTimeout(() => serverActions.receiveUsage(responseData.records), 0);
				} else {
					console.error(responseData.errors);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	purchasePremium(recordId) {
		let user = _userFromAccessToken(_accessToken);
		return _makeRequest('/users/' + user.id + '/premium-upsell', {needsAuth: true, method: 'POST', body: { recordId }})
			.then((responseData) => {
				if(responseData.success) {
					//serverActions.redirectToRecord(user.id, recordId.recordId);
					this.fetchRecord({recordId}, true);
				} else {
					console.error(responseData.errors);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	purchasePackage(sku) {
		let type = (sku.sku === 'unlim_email_report_4_99' ) ? 'product' : 'plan';
		let user = _userFromAccessToken(_accessToken);

		return _makeRequest('/users/' + user.id + '/purchase-package', {needsAuth: true, method: 'POST', body: {sku: sku.sku, type: type}})
			.then((responseData) => {
				if(responseData.success) {
					setTimeout(() =>
						this.fetchAccountInfo(), 0);
				} else {
					console.error(responseData.errors);
					setTimeout(() => serverActions.recordRequestError(error), 0);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

let pubRecAPI = new PubRecAPI();

export default pubRecAPI;
