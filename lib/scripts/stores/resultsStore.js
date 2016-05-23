import {EventEmitter} from 'events';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';

var _results = [],
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

class ResultsStore extends EventEmitter {
	getAllResults() {
		return _results;
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
		fetch(config.API_ROOT + '/people/?' + serialize(_criteria))
			.then((response) => response.json())
			.then((responseData) => {
				_results = responseData.people;
				_searching = false;
				_loaded = true;
				this.emitChange();
			});
	}

}

var resultsStore = new ResultsStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
		case 'SEARCH':
			_criteria = action.criteria;
			_loaded = false;
			_searching = true;
			resultsStore.emitChange();
			resultsStore.fetchData();
			break;

		case 'UPDATE_CRITERIA':
			_criteria[action.updates.field] = action.updates.value;
			resultsStore.emitChange();
			break;

		default:
			break;
	}
});


export default resultsStore;