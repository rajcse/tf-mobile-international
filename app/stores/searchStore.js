import {EventEmitter} from 'events';
import constants from 'constants/pubRecConstants';
import dispatcher from 'dispatcher';

const CHANGE_EVENT = 'change';

let _results = defaultResults(),
	_criteria = defaultCriteria(),
	_searching = false,
	_searchErrors = null,
	_gettingRecord = false;

function defaultResults() {
	let resultsSet = {};

	for (let recordType in constants.recordTypes) {
		if (constants.recordTypes.hasOwnProperty(recordType))
			resultsSet[constants.recordTypes[recordType]] = null;
	}

	return resultsSet;
}

function defaultCriteria() {
	let criteriaSet = {
		type: constants.recordTypes.PERSON
	};

	// Person
	criteriaSet[constants.recordTypes.PERSON] = {
		firstName: '',
		middleInitial: '',
		lastName: '',
		state: 'ALL'
	};

	// Phone
	criteriaSet[constants.recordTypes.PHONE] = {
		text: ''
	};

	// Email
	criteriaSet[constants.recordTypes.EMAIL] = {
		text: ''
	};

	return criteriaSet;
}

class SearchStore extends EventEmitter {
	getAllResults() {
		return _results;
	}

	getSearchErrors() {
		return _searchErrors;
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
dispatcher.register(action => {

	switch (action.actionType) {
		case constants.actions.UPDATE_SEARCH_CRITERIA:
			if (action.updates.field === 'type') {
				_criteria.type = action.updates.value;
			} else {
				_criteria[_criteria.type][action.updates.field] = action.updates.value;
			}
			searchStore.emitChange();
			break;

		case constants.actions.SEARCH:
			_searching = true;
			searchStore.emitChange();
			break;

		case constants.actions.GO_TO_SEARCH:
			_results = defaultResults();
			// Default the criteria, and set fields individually
			_criteria = defaultCriteria();
			_criteria.type = action.criteria.type;
			if (_criteria.type === constants.recordTypes.PERSON) {
				_criteria[constants.recordTypes.PERSON].state = action.criteria.query.state
					? action.criteria.query.state
					: _criteria[constants.recordTypes.PERSON].state;
				_criteria[constants.recordTypes.PERSON].firstName = action.criteria.query.firstName;
				_criteria[constants.recordTypes.PERSON].lastName = action.criteria.query.lastName;
			} else {
				_criteria[action.criteria.type].text = action.criteria.text;
			}
			_searching = true;
			searchStore.emitChange();
			break;

		case constants.actions.CANCEL_CROSS_SELL:
		case constants.actions.CLEAR_SEARCH_RESULTS:
			_results = defaultResults();
			_criteria = defaultCriteria();
			_searching = false;
			searchStore.emitChange();
			break;

		case constants.actions.RECEIVE_SEARCH_RESULTS:
			_searching = false;
			_results[action.type] = action.results;
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

		case constants.actions.CLEAR_SEARCH_STATE:
			_gettingRecord = false;
			searchStore.emitChange();
			break;

		case constants.actions.SEARCH_ERROR:
			_searchErrors = action.errors;
			searchStore.emitChange();
			break;

		case constants.actions.CLEAR_SEARCH_ERROR:
			_searchErrors = null;
			searchStore.emitChange();
			break;

			// This waits for the PubRecAPI to clear its jwt state
		case constants.actions.LOGGED_OUT:
			_results = defaultResults();
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
