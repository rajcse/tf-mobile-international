import {EventEmitter} from 'events';
import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

var _results, _criteria, _searching;

class ResultsStore extends EventEmitter {
	initialize() {
		_results = [];
		_criteria = {};
        _searching = false;
	}

	getAllResults() {
		return _results;
	}

	getCriteria() {
		return _criteria;
	}
    
    isSearching() {
        return _searching;
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
}

var resultsStore = new ResultsStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
        case constants.actions.UPDATE_CRITERIA:
			_criteria[action.updates.field] = action.updates.value;
			resultsStore.emitChange();
			break;
            
        case constants.actions.SEARCH:
            _searching = true;
            resultsStore.emitChange();
            break;
            
		case constants.actions.RECEIVE_SEARCH_RESULTS:
            _searching = false;
            _results = action.results;
			resultsStore.emitChange();
			break;

		default:
			break;
	}
});


export default resultsStore;
