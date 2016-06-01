import {EventEmitter} from 'events';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';
var constants = config.constants;

var _jwt = [],
    _credentials = {};

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

class LoginStore extends EventEmitter {
    getJWT() {
        return _jwt;
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

    fetchData() {
        fetch(config.API_ROOT + '/login/?' + serialize(_credentials))
        .then((response) => response.json())
        .then((responseData) => {
            _jwt = responseData.jwt;
            //store the customer object in the local storage
            localStorage.setItem( 'customer', responseData );
            //this.emitChange();
            document.location.href="/";
        })
        .catch((error) => {
            console.warn(error);
        });

    }

}

var loginStore = new LoginStore();

// Register callback to handle all updates
dispatcher.register(function(action) {
    switch(action.actionType) {
        case constants.actions.LOGIN:
            _credentials = action.credentials;
            loginStore.emitChange();
            loginStore.fetchData();
            break;

        default:
            break;
    }
});


export default loginStore;
