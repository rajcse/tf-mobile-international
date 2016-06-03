import _ from 'lodash';
require('es6-promise').polyfill();
import 'isomorphic-fetch';
import constants from '../constants/pubRecConstants';
import config from '../config.js';
import serverActions from '../actions/serverActions';

var _jwt = null;

function serialize(obj, prefix) {
    var str = [];
    for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

class PubRecAPI {
    search(criteria) {
		fetch(config.API_ROOT + '/people/?' + serialize(criteria))
			.then((response) => response.json())
			.then((responseData) => {
				serverActions.receiveSearchResults(responseData.people)
			});
	}
    
    // TODO: Make this switch on report type
    fetchRecordId(recordData, reportType) {
        fetch(config.API_ROOT + '/person?jwt=' + _jwt, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    person: recordData
                })
            })
            .then((response) => {
                // If it's not JSON, throw an error before it just bellyflops trying to parse it
                if(response.headers.get('Content-Type') !== 'application/json') {
                    let err = new Error(response.statusText);
                    err.response = response;
                    throw err;
                }
        
                return response;
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.success) {
                    serverActions.receiveRecordId(responseData.recordId, reportType);
                } else {
                    console.log(responseData.errors);
                }        
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    checkLocalUser() {
        console.log('Checking for local user');
        // If there's already a user in local storage, load that user
        // TODO: Check for session expiration via JWT
        let localUser = window.localStorage.getItem('user')
        if(localUser) {
            try {
                localUser = JSON.parse(localUser);
                _jwt = localUser.jwt;
                serverActions.receiveUser(localUser);
            } catch(e) {
                // Do nothing - _user is already defaulted to null
            }
        }
    }

    login(credentials) {
        fetch(config.API_ROOT + '/login', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: serialize(credentials)
            })
            .then((response) => {
                // If it's not JSON, throw an error before it just bellyflops trying to parse it
                if(response.headers.get('Content-Type') !== 'application/json') {
                    let err = new Error(response.statusText);
                    err.response = response;
                    throw err;
                }

                return response;
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.success) {
                    // Set the JWT for future calls
                    _jwt = responseData.user.jwt;
                    
                    // Set the user in local storage
                    window.localStorage.setItem('user', JSON.stringify(responseData.user));
                    
                    serverActions.receiveUser(responseData.user)
                } else {
                    console.log(responseData.errors);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    
    logout() {
        // Null out the _jwt and local items
        _jwt = null;
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('usage');
    }
    
    fetchReport(criteria) {
		fetch(config.API_ROOT + '/people/' + criteria.recordId + '?jwt=' + _jwt)
            .then((response) => {
                // If it's not JSON, throw an error before it just bellyflops trying to parse it
                if(response.headers.get('Content-Type') !== 'application/json') {
                    let err = new Error(response.statusText);
                    err.response = response;
                    throw err;
                }
        
                return response;
            })
			.then((response) => response.json())
            .then((responseData) => {
                if(responseData.success) {
                    serverActions.receiveReport(responseData.report);				
                } else {
                    console.log(responseData.errors);
                }
            })
            .catch((error) => {
                console.error(error);
            });
	}

    getUsage(userId) {
        fetch(config.API_ROOT + '/users/' + userId + '/usage?jwt=' + _jwt, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                // If it's not JSON, throw an error before it just bellyflops trying to parse it
                if(response.headers.get('Content-Type') !== 'application/json') {
                    let err = new Error(response.statusText);
                    err.response = response;
                    throw err;
                }
                return response;
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.success) {
                    //_records = responseData.records;
                    //store the customer object in the local storage
                    console.log('asgfadsf');
                    serverActions.receiveUsage(responseData.records);               

                    window.localStorage.setItem('usage', JSON.stringify(responseData.records));
                } else {
                    _errors = responseData.errors;
                }
            })
            .catch((error) => {
                //localStorage.clear();
                console.error(error);
            });

    }

}

var pubRecAPI = new PubRecAPI();

export default pubRecAPI;