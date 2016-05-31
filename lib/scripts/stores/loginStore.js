import {EventEmitter} from 'events';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';

var _jwt = [],
  _loaded = false,
  _searching = false,
  _criteria = {};

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

  isLoaded() {
    return _loaded;
  }

  isSearching() {
    return _searching;
  }

  getCriteria() {
    return _criteria;
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
    fetch(config.API_ROOT + '/login/?' + serialize(_criteria))
      .then((response) => response.json())
      .then((responseData) => {
        _jwt = responseData.jwt;
        _searching = false;
        _loaded = true;
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
    case 'LOGIN':
      _criteria = action.criteria;
      _loaded = false;
      _searching = true;
      loginStore.emitChange();
      loginStore.fetchData();
      break;

    default:
      break;
  }
});


export default loginStore;