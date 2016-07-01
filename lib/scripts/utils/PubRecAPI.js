import config from 'config';
import _ from 'lodash';
import 'whatwg-fetch';
import jwtDecode from 'jwt-decode';
import constants from '../constants/pubRecConstants';
import serverActions from '../actions/serverActions';

const REPORT_CACHE_LIMIT = 25;

var _accessToken = null,
    _refreshToken = null,
    _pendingRequests = [],
    _reportCache = [];

/**
 * Quick 'n dirty stackoverflow find for serializing objects into a query string
 * @param {Object} obj - Object to serialize into a key=value query string
 * @returns {String}
 */
function _serialize(obj, prefix) {
    let str = [];
    for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
            _serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
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
        id: decoded.personId
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
        };
    
    if(typeof options.body === 'object') {
        fetchOpts.body = JSON.stringify(options.body);
    }
    
    if(options.needsAuth) {
        fetchOpts.headers['Authorization'] = 'Bearer ' + _accessToken;
    }
    console.log(config.API_ROOT);
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
                // Check for 401 response, throw an error to skip json parsing
                if(response.status === 401) {
                    throw new PubRecAPIError({message: 'Access Token Expired', statusCode: response.status});
                }
                
                return response;
            })
            .then((response) => response.json())
            .catch((error) => {
                // If it was a 401, get a new access token here, then make the original request again
                if(error.statusCode === 401) {
                    return pubRecAPI.refreshAccessToken().then(() => _makeRequest(path, options));
                }
                
                // Catch any json related error here so we can return a default object for down the line
                return {
                    success: false,
                    errors: [error.message],
                    originalResponse: error.response
                }
            });
}

/**
 * DAO Class that handles all the API requests and caching
 * Each method that makes a request returns the _makeRequest promise for use in other promises
 */
class PubRecAPI {    
    
    search(criteria) {
		_makeRequest('/people', {query: criteria})
			.then((responseData) => {
				serverActions.receiveSearchResults(responseData.people)
			});
	}
    
    /**
     * This function creates/retrieves a record in usage service and optionally redirects
     * the app after successful response
     */
    // TODO: Make this switch on report type
    createRecord(recordData, reportType, redirect) {
        return _makeRequest('/records', {
                needsAuth: true,
                method: 'POST',
                body: {
                    person: recordData
                }
            })
            .then((responseData) => {
                if(responseData.success) {
                    if(redirect) {
                        // This action does not trigger a dispatch
                        serverActions.redirectToRecord(responseData.recordId, reportType);
                    } else {
                        // This simply announces the record was created
                        serverActions.receiveRecordId(responseData.recordId, reportType);
                    }
                    
                } else {
                    console.log(responseData.errors);
                }        
            })
            .catch((error) => {
                console.error(error);
            });
    }
        
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
                
                // Fetch the initial usage for the user
                // If the access token is expired, it will refresh itself automatically on 401
                this.getUsage();
            } catch(e) {
                // Force a logout - the access token was malformed
                return this.logout();
            }
        } else {
            // If we can't log the user in, trigger a logout and remove any leftover info
            return this.logout();
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
                    
                    serverActions.receiveUser(_userFromAccessToken(_accessToken));
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
                    
                    serverActions.receiveUser(_userFromAccessToken(_accessToken));
                    
                    // Get the usage for the user
                    this.getUsage();
                } else {
                    // TODO: Switch error messages based on error response
                    // Set a generic error message
                    serverActions.loginFailed('Invalid email and/or password');
                }
            })
            .catch((error) => {
                console.error(error);
                serverActions.loginFailed(error.message);
            });
    }
    
    logout() {
        // Null out the _accessToken, _refreshToken, and local items
        _accessToken = null;
        _refreshToken = null;
        _reportCache = [];
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        serverActions.loggedOut();
    }
    
    /**
     * This also handles checking the local cache prior to requesting a report
     */
    fetchReport(criteria, forceRefresh) {
        if(!forceRefresh) {
            // Check for a cached report in their history to serve immediately
            let cachedReportIndex = _.findIndex(_reportCache, {reportMeta: {recordId: criteria.recordId}});
            
            if(cachedReportIndex >= 0) {
                let cachedReport = _reportCache.splice(cachedReportIndex, 1)[0];
                _reportCache.push(cachedReport);
                
                return serverActions.receiveReport(cachedReport);
            }
        }
        
        return _makeRequest('/people/' + criteria.recordId, {needsAuth: true})
            .then((responseData) => {
                if(responseData.success) {
                    // Check for a stale version of the report in their history first
        			let staleReportIndex = _.findIndex(_reportCache, {reportMeta: {recordId: responseData.report.reportMeta.recordId}});
                    
        			if(staleReportIndex >= 0) {
        				// Remove the old record
        				_reportCache.splice(staleReportIndex, 1)[0];				
        			}
                    
                    // Add the new record to the cache
        			_reportCache.push(responseData.report);
                    
        			// Shift out the oldest element if the history length is greater than the limit
        			if(_reportCache.length > REPORT_CACHE_LIMIT) _reportCache.shift();
                    
                    serverActions.receiveReport(responseData.report);				
                } else {
                    console.log(responseData.errors);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .then(() => this.getUsage());
	}

    getUsage() {
        let user = _userFromAccessToken(_accessToken);
        return _makeRequest('/users/' + user.id + '/usage', {needsAuth: true})
            .then((responseData) => {
                if(responseData.success) {
                    serverActions.receiveUsage(responseData.records);               
                } else {
                    console.error(responseData.errors);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

var pubRecAPI = new PubRecAPI();

export default pubRecAPI;