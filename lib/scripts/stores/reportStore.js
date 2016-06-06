import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

const CHANGE_EVENT = 'change';

var _reportHistory = [],
	_reportLoading = false,
	_redirectUrl = null,
	_errors = null;

class ReportStore extends EventEmitter {

	getCurrentReport() {
		return _reportHistory[_reportHistory.length - 1] || null;
	}
	
	isReportLoading() {
		return _reportLoading;
	}

	getRedirectUrl() {
		return _redirectUrl;
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
			// Check for a stale version of the report in their history first
			let staleReportIndex = _.findIndex(_reportHistory, {reportMeta: {recordId: action.report.reportMeta.recordId}});
			if(staleReportIndex >= 0) {
				// Remove the old record
				_reportHistory.splice(staleReportIndex, 1)[0];				
			}
			_reportHistory.push(action.report);
			// Shift out the oldest element if the history length is greater than 10
			if(_reportHistory.length > 10) _reportHistory.shift();
			_reportLoading = false;
			reportStore.emitChange();
			break;
		
		case constants.actions.CREATE_RECORD:
			// Check for a cached report in their history to serve immediately
			// let cachedReportIndex = _.findIndex(_reportHistory, {reportMeta: {recordId: action.recordId}});
			// if(cachedReportIndex >= 0) {
			// 	_reportHistory.push(_reportHistory.splice(cachedReportIndex, 1)[0]);
			// 	reportStore.emitChange();
			// }
			break;
		
		// Catch the outgoing request to create a record so we can prep for a redirect
		case constants.actions.SELECT_TEASER:
			_reportLoading = true;
			reportStore.emitChange();
			break;
		
		case constants.actions.REDIRECT_TO_RECORD:
			_redirectUrl = '/' + action.reportType + '/' + action.recordId;
			reportStore.emitChange();
			break;

		case constants.actions.CLEAR_REPORT_REDIRECT:
			_redirectUrl = null;
			break;
			
		default:
			break;
	}
});

export default reportStore;
