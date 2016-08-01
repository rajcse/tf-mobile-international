import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

let _results = null,
    _criteria = defaultCriteria(),
    _searching = false,
    _searchErrors = null,
    _gettingRecord = false;

function defaultCriteria() {
    return {
        text: '',
        type: constants.reportTypes.PERSON,
        state: 'ALL'
    };
}

class SearchStore extends EventEmitter {
	getAllResults() {
		return _results;
	}

	getCriteria() {
		return _criteria;
	}

    isSearching() {
        return _searching;
    }

    isGettingRecord() {
        return _gettingRecord;
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

let searchStore = new SearchStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
        case constants.actions.UPDATE_CRITERIA:
			_criteria[action.updates.field] = action.updates.value;
			searchStore.emitChange();
			break;

        case constants.actions.SEARCH:
            _searching = true;
            searchStore.emitChange();
            break;
            
        case constants.actions.GO_TO_SEARCH:
            _results = [];
            // Default the criteria, and set fields individually
            _criteria = defaultCriteria();
            _criteria.text = action.criteria.text;
            _criteria.type = action.criteria.type;
            _criteria.state = action.criteria.query.state ? action.criteria.query.state : _criteria.state;
            _searching = true;
            searchStore.emitChange();
            break;

        case constants.actions.CLEAR_SEARCH_RESULTS:
            _results = null;
            _criteria = defaultCriteria();
            _searching = false;
			searchStore.emitChange();
			break;

		case constants.actions.RECEIVE_SEARCH_RESULTS:
            _searching = false;
            _results = action.results;
			searchStore.emitChange();
			break;

        // Catch the outgoing request to create a record so we can prep for a redirect
        case constants.actions.SELECT_TEASER:
            _gettingRecord = true;
            searchStore.emitChange();
            break;

        case constants.actions.RECEIVE_RECORD_ID:
            _gettingRecord = false;
            searchStore.emitChange();
    		break;

        // This waits for the PubRecAPI to clear its jwt state
        case constants.actions.LOGGED_OUT:
            _results = null;
            _criteria = defaultCriteria();
            _searching = false;
            _searchErrors = null;
            _gettingRecord = false;
            searchStore.emitChange();
            break;

		default:
			break;
	}
});


export default searchStore;
