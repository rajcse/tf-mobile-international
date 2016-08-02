import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

let _report = null,
	_errors = null;

function mergeLocationData(pointer, location) {
	let locationIndex = _.findIndex(_report.locations, {'@search_pointer': pointer});
	
	if(locationIndex >= 0) {
		_report.locations[locationIndex] = _.merge(_report.locations[locationIndex], location);
	}
}

class ReportStore extends EventEmitter {

	getCurrentReport() {
		return _report;
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

let reportStore = new ReportStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
		case constants.actions.FETCH_REPORT:
			_report = null;
			reportStore.emitChange();
			break;

		case constants.actions.RECEIVE_REPORT:
			_report = action.report;
			reportStore.emitChange();
			break;

		case constants.actions.FETCH_LOCATION_TEASER:
			break;

		case constants.actions.RECEIVE_LOCATION_TEASER:
			mergeLocationData(action.pointer, action.location)
			reportStore.emitChange();
			break;

		default:
			break;
	}
});

export default reportStore;
