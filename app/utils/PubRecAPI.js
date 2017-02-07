import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import constants from 'constants/pubRecConstants';
import serverActions from 'actions/serverActions';
import appStoreClient from './appStoreClient';
import firebaseClient from './firebaseClient';
import config from 'config';

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
				'Content-Type': 'application/json',
				'App-Version': window.appVersion || '0.0.0',
				'App-Build': window.appBuild || '0'
			},
			method: options.method || 'GET',
			credentials: 'include'
		},
		requestCount = options.requestCount || 0;

	if(typeof options.body === 'object') {
		fetchOpts.body = JSON.stringify(options.body);
	}

	if(options.needsAuth) {
		fetchOpts.headers['Authorization'] = 'Bearer ' + _accessToken;
	}

	return fetch(config.API_ROOT + path + queryString, fetchOpts)
		.then(response => {
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
		.then(response => {
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
		.then(response => response.json())
		.catch(error => {
			/* eslint-disable no-use-before-define */
			// Catch the HTTP status errors, throw again to let the caller deal with the response

			// If it was a 401, get a new access token here, then make the original request again
			// If there is no refresh token (user has been logged out already for a 403), skip the request
			if(error.statusCode === 401 && requestCount++ < 10 && _refreshToken) {
				return pubRecAPI.refreshAccessToken().then(() => _makeRequest(path, Object.assign(options, {requestCount})));
			} else if(error.statusCode === 401){
				// After 10 attempts, clear the user data and fire a logout
				pubRecAPI.clearUserData();
				serverActions.loggedOut();
			}

			// If it's a 402, call the upsell flow now, don't hit the caller's catch block
			if(error.statusCode === 402) {
				error.responseBody.then(responseData => {
					setTimeout(() => serverActions.paymentRequired(responseData.errors[0].item));
				});
			}

			if(error.statusCode === 403) {
				pubRecAPI.clearUserData();
				serverActions.loggedOut();
			}

			if(error.statusCode > 400) throw error;

			// Return a default object for down the line
			return {
				success: false,
				errors: [{message: error.message, code: error.statusCode}],
				originalResponse: error.response
			};
			/* eslint-enable */
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
	init() {
		appStoreClient.setValidator((product, cb) => {
			const productSkus = [],
				planSkus = [],
				appStoreDetails = {
					paymentProcessor: appStoreClient.PAYMENT_PROCESSOR,
					...product.transaction
				};

			// Check whether we need a plan or product, and if we have a sku mapped
			if(appStoreClient.PLANS.includes(product.type)) {
				planSkus.push(product.additionalData && product.additionalData.pubrec_sku ? product.additionalData.pubrec_sku : product.id);
			} else {
				productSkus.push(product.additionalData && product.additionalData.pubrec_sku ? product.additionalData.pubrec_sku : product.id);
			}

			this.purchase(productSkus, planSkus, appStoreDetails)
				.then(order => {
					cb(true, {...product.transaction});
				})
				.catch(error => {
					console.error(error);
					cb(false, error);
				});
		});
	}

	checkLocalUser() {
		// Check there's already a valid access and refresh token in local storage
		let accessToken = window.localStorage.getItem('accessToken'),
			refreshToken = window.localStorage.getItem('refreshToken'),
			user = null;

		if(accessToken && refreshToken && !_isTokenExpired(refreshToken)) {
			// If we have both tokens, and the refresh is not expired, just log the user in
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

				// Make sure the loggedInOnce flag is set
				window.localStorage.setItem('loggedInOnce', 'true');

				// If the user has already logged in, but has no funnel going, turn the funnel off
				if(!window.localStorage.getItem('currentFunnelTopic')) window.localStorage.setItem('skipFunnel', 'true');

			} catch(e) {
				// Clear user data - the access token was malformed
				this.clearUserData();
				return serverActions.loggedOut();
			}
		} else {
			// If we can't log the user in, clear all the user data and trigger a logout
			this.clearUserData();

			if(window.localStorage.getItem('loggedInOnce') !== 'true') {
				firebaseClient.progressFunnel('INSTALLED_NEVER_LOGGED_IN');
			}

			return serverActions.loggedOut(false);
		}
	}

	refreshAccessToken() {
		return _makeRequest('/refresh-access-token', {method: 'POST', body: {refreshToken: _refreshToken}})
			.then(responseData => {
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
			.catch(error => {
				console.error(error);
			});
	}

	register(credentials) {
		// Validate full name entry
		if(!credentials.first_name || !credentials.last_name) {
			return serverActions.registerFailed('Please enter your full name');
		}

		// Validate email and password
		if(!credentials.email || !credentials.password) {
			return serverActions.registerFailed('Please enter your email and a password');
		}

		// Very basic email validation
		if(!/@.+\..+/.test(credentials.email)) {
			return serverActions.registerFailed('Please enter a valid email');
		}

		// Passwords must match
		if(credentials.password !== credentials.confirmPassword) {
			return serverActions.registerFailed('Your passwords do not match');
		}

		// Passwords must be 6 characters
		if(credentials.password.length < 6) {
			return serverActions.registerFailed('Your password must be at least 6 characters long');
		}

		// Append the device uuid or user agent to the credentials - this is used for refresh tokens
		credentials.deviceId = window.device.uuid || navigator.userAgent;
		credentials.cordovaDevice = window.device;
		credentials.firebaseToken = firebaseClient.deviceToken;

		return firebaseClient.getConfigValue('signup_sku')
			.then(signupSku => {
				if(signupSku) credentials.signupSku = signupSku;

				return _makeRequest('/register', {method: 'POST', body: credentials});
			})
			.then(responseData => {
				if(responseData.success) {
					firebaseClient.setUserProperty('signup_product', 'lite_reports');

					// Set the access token for future calls
					_accessToken = responseData.accessToken;

					// Set the refresh token to get new access tokens
					_refreshToken = responseData.refreshToken;

					// Set the tokens in local storage
					window.localStorage.setItem('accessToken', _accessToken);
					window.localStorage.setItem('refreshToken', _refreshToken);

					// Set a permanent flag that the user has logged in at least once
					window.localStorage.setItem('loggedInOnce', 'true');

					setTimeout(() => serverActions.receiveUser(_userFromAccessToken(_accessToken)));

					// Get the usage for the user
					this.getUsage();

					// Set welcome modal status for new users
					setTimeout(() => serverActions.showWelcomeModal());

					//Redirect to Search page on inital login
					setTimeout(() => serverActions.redirectToSearch());

					// Fire Event and subscribe to topics
					firebaseClient.logEvent(constants.firebase.events.SIGN_UP, {sign_up_method: 'Mobile App'});
					firebaseClient.subscribe(constants.firebase.topics.MOBILE_REGISTERED_USERS);
					firebaseClient.subscribe(constants.firebase.topics.NO_PURCHASES_MADE);
					firebaseClient.progressFunnel('REGISTERED_NO_PERSON_SEARCHES');

				} else {
					// TODO: Switch error messages based on error response
					let online = window.navigator.onLine;
					if(!online) {
						setTimeout(() => serverActions.registerFailed('No connection to internet'), 0);
					} else {
						setTimeout(() => serverActions.registerFailed('Unknown error occured'), 0);
					}
				}
			})
			.catch(error => {
				if (error.statusCode === 409) {
					setTimeout(() => serverActions.registerFailed('The email address you entered is already in use, please try another one or call member care at (800) 699-8081'), 0);
				} else {
					setTimeout(() => serverActions.registerFailed('Unknown error occured'), 0);
				}
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
		credentials.firebaseToken = firebaseClient.deviceToken;

		return _makeRequest('/login', {method: 'POST', body: credentials})
			.then(responseData => {
				if(responseData.success) {
					// Set the access token for future calls
					_accessToken = responseData.accessToken;

					// Set the refresh token to get new access tokens
					_refreshToken = responseData.refreshToken;

					// Set the tokens in local storage
					window.localStorage.setItem('accessToken', _accessToken);
					window.localStorage.setItem('refreshToken', _refreshToken);

					// Set a permanent flag that the user has logged in at least once
					window.localStorage.setItem('loggedInOnce', 'true');

					// Once the logout/login cycle has happened, or this is an existing member, just skip the funnel
					window.localStorage.setItem('skipFunnel', 'true');

					setTimeout(() => serverActions.receiveUser(_userFromAccessToken(_accessToken)), 0);

					//Redirect to Search page on inital login
					setTimeout(() => serverActions.redirectToSearch(), 0);

					// Get the usage for the user
					this.getUsage();

					//Redirect to Search page on inital login
					setTimeout(() => serverActions.redirectToSearch(), 0);

					// Fire event
					firebaseClient.logEvent(constants.firebase.events.LOGIN);

				} else {
					// TODO: Switch error messages based on error response
					let online = window.navigator.onLine;
					if(!online) {
						setTimeout(() => serverActions.loginFailed('No connection to internet'), 0);
					} else {
						setTimeout(() => serverActions.loginFailed('Invalid email and/or password'), 0);
					}
				}
			})
			.catch(error => {
				console.error(error);
				setTimeout(() => serverActions.loginFailed(error.message), 0);
			});
	}

	slackPost(message) {
		const user = _userFromAccessToken(_accessToken);

		// Validate credentials first
		if(!message.message) {
			return serverActions.loginFailed('Please enter your email and password');
		}

		// Append the device uuid or user agent to the credentials - this is used for refresh tokens
		message.deviceId = window.device.uuid || navigator.userAgent;
		message.cordovaDevice = window.device;
		message.text = message.message;

		return _makeRequest('/users/' + user.id + '/slackroom-post', {needsAuth: true, method: 'POST', body: message})
			.then(responseData => {
				if(responseData.success) {
					// TODO: Do something
				} else {
					// TODO: Switch error messages based on error response
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Internal function to clear user data
	 */
	clearUserData() {
		// Null out the _accessToken, _refreshToken, and local items
		_accessToken = null;
		_refreshToken = null;
		_recordCache = [];
		_recordIdCache = [];
		window.localStorage.removeItem('accessToken');
		window.localStorage.removeItem('refreshToken');

		// Unsubscribe from all topics
		firebaseClient.unsubscribeAll();
	}

	logout(redirect) {
		// Delete the firebase token for the device
		return this.updateUser({
			devices: [{
				id: window.device.uuid || navigator.userAgent,
				firebase_token: null
			}]
		})
		// Same actions need to fire regardless of success response for user update
		.then(user => {
			this.clearUserData();
			firebaseClient.logEvent('logout');
			firebaseClient.setUserId(null);
			setTimeout(serverActions.loggedOut(redirect), 0);
		})
		.catch(error => {
			this.clearUserData();
			firebaseClient.logEvent('logout');
			firebaseClient.setUserId(null);
			setTimeout(serverActions.loggedOut(redirect), 0);
		});
	}

	fetchAccountInfo() {
		const user = _userFromAccessToken(_accessToken);
		return _makeRequest('/users/' + user.id, {needsAuth: true})
			.then(responseData => {
				if(responseData.success) {
					setTimeout(() => serverActions.receiveAccountInfo(responseData.user), 0);
				} else {
					console.error(responseData.errors);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	search(criteria) {
		if(criteria.type === constants.recordTypes.PERSON) firebaseClient.progressFunnel('SEARCHED_NO_PERSON_REPORT_VIEWS');

		return _makeRequest('/' + constants.recordEndpoints[criteria.type], {query: criteria.query, needsAuth: true})
			.then(responseData => {
				setTimeout(() => serverActions.receiveSearchResults(responseData.results, criteria.type), 0);
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * This function creates/retrieves a record in usage service and optionally redirects
	 * the app after successful response
	 */
	createRecord(recordData, recordType, redirect, forceRefresh) {
		const user = _userFromAccessToken(_accessToken);

		// Usage service currently doesn't support email report pointer so we have
		// to use the actual email addresses for now.
		if(recordType === constants.recordTypes.EMAIL) recordData.pointer = recordData.email.address;

		// Fill in empty pointers for phone reports
		if(recordType === constants.recordTypes.PHONE && !recordData.pointer) recordData.pointer = recordData.phone.number;

		if(!forceRefresh) {
			// Check for a cached recordId to serve immediately
			const cachedRecordIndex = _.findIndex(_recordIdCache, {pointer: recordData.pointer});

			if(~cachedRecordIndex) {
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

		return _makeRequest('/users/' + user.id + '/records', {
			needsAuth: true,
			method: 'POST',
			body: {
				record: recordData,
				type: recordType
			}
		})
		.then(responseData => {
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

				return responseData.recordId;
			} else {
				console.log(responseData.errors);
			}
		})
		.catch(error => {
			console.error(error);
		});
	}

	createPhoneRecordFromNumber(number) {
		return _makeRequest('/' + constants.recordEndpoints[constants.recordTypes.PHONE], {
			query: {phone: number},
			needsAuth: true
		})
		.then(responseData => {
			if(!responseData.results.length){
				setTimeout(() => serverActions.searchError('404'), 0);
				return console.log(responseData);
			}

			this.createRecord({phone: {number}}, constants.recordTypes.PHONE, true);
		})
		.catch(error => {
			console.error(error);
		});
	}

	createEmailRecordFromAddress(address) {
		return _makeRequest('/' + constants.recordEndpoints[constants.recordTypes.EMAIL], {
			query: {email: address},
			needsAuth: true
		})
		.then(responseData => {
			if(!responseData.results.length){
				setTimeout(() => serverActions.searchError('404'), 0);
				return console.log(responseData);
			}

			this.createRecord({email: {address}}, constants.recordTypes.EMAIL, true);
		})
		.catch(error => {
			console.error(error);
		});
	}

	/**
	 * This also handles checking the local cache prior to requesting a record
	 */
	fetchRecord(criteria, forceRefresh) {
		const user = _userFromAccessToken(_accessToken);

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
			.then(responseData => {
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
					setTimeout(serverActions.viewUncachedRecord, 0);
					setTimeout(() => serverActions.receiveRecord(responseData.record), 0);

					if(responseData.record.id[1] === constants.recordTypes.PERSON) firebaseClient.progressFunnel('PERSON_REPORT_VIEWED_NO_PREMIUM_PROMPT_VIEWS');
				} else {
					console.log(responseData.errors);
				}
			})
			.then(() => this.getUsage())
			.catch(error => {
				console.error(error);
				setTimeout(() => serverActions.recordRequestError(error), 0);
			});
	}

	/**
	 * Handles fetching location teaser by pointer
	 */
	fetchLocationTeaser(pointer) {
		return _makeRequest('/' + constants.recordEndpoints[constants.recordTypes.LOCATION], {query: {pointer}, needsAuth: true})
			.then(responseData => {
				setTimeout(() => serverActions.receiveLocationTeaser(pointer, responseData.results[0]), 0);
			})
			.catch(error => {
				console.error(error);
			});
	}

	getUsage() {
		const user = _userFromAccessToken(_accessToken);

		return _makeRequest('/users/' + user.id + '/records', {needsAuth: true})
			.then(responseData => {
				if(responseData.success) {
					setTimeout(() => serverActions.receiveUsage(responseData.records), 0);
				} else {
					console.error(responseData.errors);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	fetchPremiumUpsellInfo(record, timed = false) {
		let accountInfo;

		if(timed) {
			setTimeout(() => serverActions.seenTimedUpsell(), 0);
		}

		this.fetchUser()
			.then(user => {
				// Set the account info for down the line
				accountInfo = user;

				const paymentOptions = user.payment_options || [],
					paymentOptionOnFile = paymentOptions.some(p => p.status === 'active' && ![constants.inAppPaymentProcessors.APPLE, constants.inAppPaymentProcessors.GOOGLE].includes(p.payment_processor));

				if(paymentOptionOnFile) {
					return this.fetchProductInfo(constants.productTypes.PREMIUM_PERSON_REPORT);
				} else {
					return appStoreClient.getProductInfo(constants.productTypes.PREMIUM_PERSON_REPORT_IAP);
				}
			})
			.then(product => {
				setTimeout(() => serverActions.receivePremiumUpsellInfo({record, product, accountInfo}), 0);
			})
			.catch(error => {
				console.error(error);
			});
	}

	fetchPremiumBundleInfo() {
		let accountInfo;
// console.log('asdasdas');
		this.fetchUser()
			.then(user => {
				// Set the account info for down the line
				accountInfo = user;

				const paymentOptions = user.payment_options || [],
					paymentOptionOnFile = paymentOptions.some(p => p.status === 'active' && ![constants.inAppPaymentProcessors.APPLE, constants.inAppPaymentProcessors.GOOGLE].includes(p.payment_processor));

				if(paymentOptionOnFile) {
					return this.fetchProductInfo(constants.productTypes.PREMIUM_REPORT_BUNDLE);
				} else {
					return appStoreClient.getProductInfo(constants.productTypes.PREMIUM_REPORT_BUNDLE);
				}
			})
			.then(product => {
				//do a server action here and show invoke something that tells the user they have credits
				setTimeout(() => serverActions.receivePremiumBundleInfo({product, accountInfo}), 0);
			})
			.catch(error => {
				console.error(error);
			});
	}

	fetchStandardUpsellInfo(record) {
		let accountInfo;

		this.fetchUser()
			.then(user => {
				// Set the account info for down the line
				accountInfo = user;

				const paymentOptions = user.payment_options || [],
					paymentOptionOnFile = paymentOptions.some(p => p.status === 'active' && ![constants.inAppPaymentProcessors.APPLE, constants.inAppPaymentProcessors.GOOGLE].includes(p.payment_processor));

				 if(paymentOptionOnFile) {
					return this.fetchProductInfo(constants.productTypes.STANDARD_PERSON_REPORT);
				 } else {
					return appStoreClient.getProductInfo(constants.productTypes.STANDARD_PERSON_REPORT_IAP);
				 }
			})
			.then(product => {
				setTimeout(() => serverActions.receiveStandardUpsellInfo({record, product, accountInfo}), 0);
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Fetch site config values
	 */
	fetchSiteConfig(...keyPaths) {
		return _makeRequest('/site-config', {query: {q: keyPaths.join('|')}})
			.then(responseData => {
				if(responseData.success){
					return responseData.data;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Trigger events on PubRec
	 */
	triggerEvent(event) {
		return _makeRequest('/events', {method: 'POST', body: {event}})
			.then(responseData => {
				if(responseData.success){
					console.log('Event Sent', event);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Internal function used to fetch user info
	 */
	fetchUser() {
		const user = _userFromAccessToken(_accessToken);
		return _makeRequest('/users/' + user.id, {needsAuth: true})
			.then(responseData => {
				if(responseData.success){
					return responseData.user;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Internal function to update users
	 */
	updateUser(updates) {
		const user = _userFromAccessToken(_accessToken);

		// Only allow device updates for now
		let data = {
			devices: updates.devices
		};

		return _makeRequest('/users/' + user.id, {needsAuth: true, method: 'PATCH', body: data});
	}

	/**
	 * Internal function to get plan info
	 */
	fetchPlanInfo(planType) {
		return _makeRequest('/plans/' + planType, {needsAuth: true})
			.then(responseData => {

			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Internal function to get product info
	 */
	fetchProductInfo(productType) {
		return _makeRequest('/products/' + productType, {needsAuth: true})
			.then(responseData => {
				console.log(JSON.stringify(responseData.product));
				return responseData.product;
			})
			.catch(error => {
				console.error(error);
			});
	}

	/**
	 * Internal function to make purchases
	 */
	purchase(productSkus = [], planSkus = [], appStoreDetails) {
		const cart = {
			productSkus,
			planSkus
		};

		if(appStoreDetails) cart.appStoreDetails = appStoreDetails;

		return _makeRequest('/purchase', {needsAuth: true, method: 'POST', body: cart})
			.then(responseData => {
				if(responseData.success) {
					// Unsubscribe from no_purchases_made topic
					firebaseClient.unsubscribe(constants.firebase.topics.NO_PURCHASES_MADE);

					return responseData.order;
				} else {
					// Throw an erro for downstream
					throw new Error(responseData.errors[0]);
				}
			});
	}

	/**
	 * Internal function to update records
	 */
	updateRecord(recordId, updates) {
		const user = _userFromAccessToken(_accessToken);

		// Only allow archive/unarchive and premium upgrade for now
		let data = {};

		if(updates.hasOwnProperty('isArchived')) data.isArchived = Boolean(updates.isArchived);
		if(updates.isPremium) data.isPremium = true;
		if(updates.isStandard) data.isStandard = true;

		return _makeRequest('/users/' + user.id + '/records/' + recordId, {needsAuth: true, method: 'PATCH', body: data});
	}

	purchasePremiumRecord(premiumUpsell) {
		let order;

		// Switch between pubrec purchase and in app purchase
		// In app products will not have a 'sku' property
		if(premiumUpsell.product.sku) {
			order = this.purchase([premiumUpsell.product.sku]);
		} else {
			// Wrap the wonky plugin promise with a real promise
			order = new Promise((resolve, reject) => {
				appStoreClient.purchaseProduct(constants.productTypes.PREMIUM_PERSON_REPORT_IAP)
					.then(p => resolve(p))
					.error(error => reject(error));
			});

			// Promisify the product event callbacks, then unregister them as needed
			let res, rej;
			order = order.then(p => {
				return new Promise((resolve, reject) => {
					// Save them to the outer scope to deregister later
					res = p => resolve(p);
					rej = error => reject(error);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_PERSON_REPORT_IAP, 'verified', res);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_PERSON_REPORT_IAP, 'cancelled', rej);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_PERSON_REPORT_IAP, 'unverified', rej);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_PERSON_REPORT_IAP, 'error', rej);
				});
			})
			.then(p => {
				appStoreClient.unregister(rej);
				return p;
			})
			.catch(error => {
				appStoreClient.unregister(res);
				throw error;
			});
		}

		return order
				.catch(error => {
					setTimeout(() => serverActions.purchaseError(error));
					// Skip the rest of the chain
					throw error;
				})
				.then(o => {
					return this.upgradeToPremiumRecord(premiumUpsell.record.id[2]);
				})
				.catch(error => {
					console.error(error);
				});
	}

	purchasePremiumBundle(premiumBundle) {
		let order;

		// Switch between pubrec purchase and in app purchase
		// In app products will not have a 'sku' property
		if(premiumBundle.product.sku) {
			order = this.purchase([premiumBundle.product.sku]);
		} else {
			// Wrap the wonky plugin promise with a real promise
			order = new Promise((resolve, reject) => {
				appStoreClient.purchaseProduct(constants.productTypes.PREMIUM_REPORT_BUNDLE)
					.then(p => resolve(p))
					.error(error => reject(error));
			});

			// Promisify the product event callbacks, then unregister them as needed
			let res, rej;
			order = order.then(p => {
				return new Promise((resolve, reject) => {
					// Save them to the outer scope to deregister later
					res = p => resolve(p);
					rej = error => reject(error);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_REPORT_BUNDLE, 'verified', res);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_REPORT_BUNDLE, 'cancelled', rej);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_REPORT_BUNDLE, 'unverified', rej);
					appStoreClient.registerOnce(constants.productTypes.PREMIUM_REPORT_BUNDLE, 'error', rej);
				});
			})
			.then(p => {
				appStoreClient.unregister(rej);
				return p;
			})
			.catch(error => {
				appStoreClient.unregister(res);
				throw error;
			});
		}

		return order
				.catch(error => {
					setTimeout(() => serverActions.purchaseError(error));
					// Skip the rest of the chain
					throw error;
				})
				.then(o => {
					setTimeout(() => serverActions.usedPremiumBundle());
				})
				.catch(error => {
					console.error(error);
				});
	}



	purchaseStandardRecord(standardUpsell) {
		let order;

		// Switch between pubrec purchase and in app purchase
		// In app products will not have a 'sku' property
		if(standardUpsell.product.sku) {
			order = this.purchase([standardUpsell.product.sku]);
		} else {
			// Wrap the wonky plugin promise with a real promise
			order = new Promise((resolve, reject) => {
				appStoreClient.purchaseProduct(constants.productTypes.STANDARD_PERSON_REPORT_IAP)
					.then(p => resolve(p))
					.error(error => reject(error));
			});

			// Promisify the product event callbacks, then unregister them as needed
			let res, rej;
			order = order.then(p => {
				return new Promise((resolve, reject) => {
					// Save them to the outer scope to deregister later
					res = p => resolve(p);
					rej = error => reject(error);
					appStoreClient.registerOnce(constants.productTypes.STANDARD_PERSON_REPORT_IAP, 'verified', res);
					appStoreClient.registerOnce(constants.productTypes.STANDARD_PERSON_REPORT_IAP, 'cancelled', rej);
					appStoreClient.registerOnce(constants.productTypes.STANDARD_PERSON_REPORT_IAP, 'unverified', rej);
					appStoreClient.registerOnce(constants.productTypes.STANDARD_PERSON_REPORT_IAP, 'error', rej);
				});
			})
			.then(p => {
				appStoreClient.unregister(rej);
				return p;
			})
			.catch(error => {
				appStoreClient.unregister(res);
				throw error;
			});
		}

		return order
				.catch(error => {
					setTimeout(() => serverActions.purchaseError(error));
					// Skip the rest of the chain
					throw error;
				})
				.then(o => {
					return this.upgradeToStandardRecord(standardUpsell.record.id[2]);
				})
				.catch(error => {
					console.error(error);
				});
	}

	upgradeToPremiumRecord(recordId) {
		return this.updateRecord(recordId, {isPremium: true})
				.then(() => this.fetchRecord({recordId}, true))
				.then(() => setTimeout(serverActions.premiumUpgradeSuccessful))
				.then(() => firebaseClient.progressFunnel('PREMIUM_REPORT_VIEWED'))
				.catch(error => {
					console.error(error);
				});
	}

	upgradeToStandardRecord(recordId) {
		return this.updateRecord(recordId, {isStandard: true})
				.then(() => this.fetchRecord({recordId}, true))
				.then(() => setTimeout(serverActions.standardUpgradeSuccessful))
				.catch(error => {
					console.error(error);
				});
	}

	purchaseCrossSell(crossSell, skipVerification) {
		// Original criteria from the 402 is needed
		if (!crossSell.original_criteria || !crossSell.original_criteria.type) {
			setTimeout(() => serverActions.purchaseError('Unknown purchase error'));
		}

		if(!skipVerification) {
			switch(crossSell.original_criteria.type){
				case constants.recordTypes.PHONE:
					if(crossSell.original_criteria.phone) {
						// This should only happen from the phones endpoint, and never on record creation
						return _makeRequest('/' + constants.recordEndpoints[constants.recordTypes.PHONE], {
							query: {verify: true, phone: crossSell.original_criteria.phone},
							needsAuth: true
						})
						.then(responseData => {
							if(!responseData.results.length){
								setTimeout(() => serverActions.purchaseError('Report Not Found'));
								return console.log(JSON.stringify(responseData));
							}

							// Assign the record data from the search
							const newCrossSell = Object.assign({}, crossSell, {original_criteria: Object.assign({}, crossSell.original_criteria, {recordData: responseData.results[0].recordData})});
							this.purchaseCrossSell(newCrossSell, true);
						})
						.catch(error => {
							console.error(error);
						});
					}
					break;

				case constants.recordTypes.EMAIL:
					if(crossSell.original_criteria.email) {
						// This should only happen from the email endpoint, and never on record creation
						return _makeRequest('/' + constants.recordEndpoints[constants.recordTypes.EMAIL], {
							query: {verify: true, email: crossSell.original_criteria.email},
							needsAuth: true
						})
						.then(responseData => {
							if(!responseData.results.length){
								setTimeout(() => serverActions.purchaseError('Report Not Found'));
								return console.log(JSON.stringify(responseData));
							}

							// Assign the record data from the search
							const newCrossSell = Object.assign({}, crossSell, {original_criteria: Object.assign({}, crossSell.original_criteria, {recordData: responseData.results[0].recordData})});
							this.purchaseCrossSell(newCrossSell, true);
						})
						.catch(error => {
							console.error(error);
						});
					}
					break;

				default:
					break;
			}
		}

		const plans = [],
			products = [];

		if(crossSell.hasOwnProperty('recurring_price')) plans.push(crossSell.sku);
		if(crossSell.hasOwnProperty('price')) products.push(crossSell.sku);

		return this.purchase(products, plans)
			.then(responseData => {
				// Even if they are trying to access a record already in usage, this will work
				return this.createRecord(crossSell.original_criteria.recordData, crossSell.original_criteria.type, true, true);
			})
			.then(recordId => {
				setTimeout(() => serverActions.crossSellSuccessful());
				// Fetch the record, to refresh records already navigated to but errored
				return this.fetchRecord({recordId});
			})
			.catch(error => {
				console.error(error);
				setTimeout(() => serverActions.purchaseError(error));
			});
	}

	/**
	 * Sets the record's archive status
	 */
	setRecordArchiveStatus(recordId, isArchived) {
		// Remove the cached record
		_.remove(_recordCache, record => record.id[2] === recordId);

		return this.updateRecord(recordId, {isArchived: Boolean(isArchived)})
		.then(() => this.getUsage())
		.catch(error => {
			console.error(error);
		});
	}

	/**
	 * Deactives user's account
	 */
	deleteAccount() {
		const user = _userFromAccessToken(_accessToken);

		return _makeRequest('/users/' + user.id, {needsAuth: true, method: 'DELETE'})
			.then(responseData => {
				if(responseData.success) {
					this.clearUserData();
					firebaseClient.logEvent('delete_account');
					firebaseClient.setUserId(null);
					setTimeout(serverActions.loggedOut(), 0);
				} else {
					console.error(responseData.errors);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
}

let pubRecAPI = new PubRecAPI();

export default pubRecAPI;
