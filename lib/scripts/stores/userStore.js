import {EventEmitter} from 'events';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';
var constants = config.constants;

var _user = null,
    _errors = null;

// If there's already a user in local storage, load that user
// TODO: Check for session expiration via JWT
let localUser = window.localStorage.getItem('user')
if(localUser) {
    try {
        _user = JSON.parse(localUser);
    } catch(e) {
        // Do nothing - _user is already defaulted to null
    }
}

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
    getUser() {
        return _user;
    }

    // TODO: This should check JWT expiration etc.
    // This gets called on every single app render, so it needs to be FAST
    isLoggedIn() {
        return _user !== null;
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
                    // Only set the user on login success
                    _user = responseData.user;

                    //store the customer object in the local storage
                    window.localStorage.setItem('user', JSON.stringify(_user));
                } else {
                    _errors = responseData.errors;
                }

                this.emitChange();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    logout() {
        _user = null;
        _errors = null;
        window.localStorage.removeItem('user');
        this.emitChange();
    }

}

var userStore = new UserStore();

// Register callback to handle all updates
dispatcher.register(function(action) {
    switch(action.actionType) {
        case constants.actions.LOGIN:
            userStore.login(action.credentials);
            break;

        case constants.actions.LOGOUT:
            userStore.logout();
            break;

        default:
            break;
    }
});


export default userStore;
