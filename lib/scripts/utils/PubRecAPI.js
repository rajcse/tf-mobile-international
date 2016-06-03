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
    addRecord(recordData, reportType) {
        
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
        // Simply null out the _jwt
        _jwt = null;
    }
    
    fetchReport(criteria) {

		fetch(config.API_ROOT + '/people/' + criteria.reportId + '?jwt=' + _jwt)
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
}

var pubRecAPI = new PubRecAPI();

export default pubRecAPI;