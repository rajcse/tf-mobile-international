import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

let _record = null,
	_error = null;

function mergeLocationData(pointer, location) {
	let locationIndex = _.findIndex(_record.reportData.locations, {'@search_pointer': pointer});
	
	if(locationIndex >= 0) {
		_record.reportData.locations[locationIndex] = _.merge(_record.reportData.locations[locationIndex], location);
	}
}

class RecordStore extends EventEmitter {

	getCurrentRecord() {
		return _record;
	}
	
	getError() {
		return _error;
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

let recordStore = new RecordStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
		case constants.actions.FETCH_RECORD:
			_record = null;
			recordStore.emitChange();
			break;

		case constants.actions.RECEIVE_RECORD:
			_record = action.record;
			recordStore.emitChange();
			break;
		
		case constants.actions.RECORD_REQUEST_ERROR:
			_error = action.error;
			recordStore.emitChange();
			break;
		
		case constants.actions.CLEAR_RECORD_ERROR:
			_error = null;
			recordStore.emitChange();
			break;	

		case constants.actions.FETCH_LOCATION_TEASER:
			break;

		case constants.actions.RECEIVE_LOCATION_TEASER:
			mergeLocationData(action.pointer, action.location)
			recordStore.emitChange();
			break;

		default:
			break;
	}
});

export default recordStore;
