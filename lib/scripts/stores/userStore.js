import {EventEmitter} from 'events';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';
var constants = config.constants;

var _jwt = null,
    _user = null,
    _errors = null;

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

class UserStore extends EventEmitter {
    getJWT() {
        return _jwt;
    }

    getUser() {
        return _user;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
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
                    // Only set these on login success
                    _jwt = responseData.jwt;
                    _user = responseData.user;

                    //store the customer object in the local storage
                    localStorage.setItem( 'user', responseData.user );
                } else {
                    _jwt = null;
                    _user = null;
                    _errors = responseData.errors;
                }

                this.emitChange();
            })
            .catch((error) => {
                console.error(error);
            });

    }

}

var userStore = new UserStore();

// Register callback to handle all updates
dispatcher.register(function(action) {
    switch(action.actionType) {
        case constants.actions.LOGIN:
            userStore.login(action.credentials);
            break;

        default:
            break;
    }
});


export default userStore;
