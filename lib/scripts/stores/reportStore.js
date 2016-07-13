import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

import RemoteDev from 'remotedev';

const CHANGE_EVENT = 'change';

var _report = null,
	_errors = null;

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

var reportStore = new ReportStore();

// Initial state is {}
RemoteDev.init({}, { name: 'Report Store' });
// Subscribe to RemoteDev
RemoteDev.subscribe(state => {
  _report = state;
  reportStore.emitChange();
});

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

		default:
			break;
	}

	// Send to the remote monitor
    RemoteDev.send(action, _report);
});

export default reportStore;
