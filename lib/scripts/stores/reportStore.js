import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';

var _report = null,
	_reportLoading = false,
	_errors = null;

class ReportStore extends EventEmitter {

	getCurrentReport() {
		return _report;
	}
	
	isReportLoading() {
		return _reportLoading;
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

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
		case constants.actions.FETCH_REPORT:
			_reportLoading = true;
			reportStore.emitChange();
			break;
			
		case constants.actions.RECEIVE_REPORT:
			_report = action.report;
			_reportLoading = false;
			reportStore.emitChange();
			break;
		
		case constants.actions.CREATE_RECORD:
			break;
		
		// Catch the outgoing request to create a record so we can prep for a redirect
		case constants.actions.SELECT_TEASER:
			_reportLoading = true;
			reportStore.emitChange();
			break;
					
		default:
			break;
	}
});

export default reportStore;
