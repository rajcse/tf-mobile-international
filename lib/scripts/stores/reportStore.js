import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

// DEV
import testPerson from '../testPerson';
//

const CHANGE_EVENT = 'change';

var _reportHistory = [],
	_errors = null;

class ReportStore extends EventEmitter {

	getCurrentReport() {
		return _reportHistory[_reportHistory.length - 1] || null;
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

	// fetchReport(criteria) {
	// 	// Check for a cached report in their history first
	// 	let reportId = criteria.reportId,
	// 		cachedReportIndex = _.findIndex(_reportHistory, {reportMeta: {reportId: reportId}}),
	// 		report = null;
	// 
	// 	// If there's no cached report, get a new one
	// 	if(cachedReportIndex < 0) {
	// 		fetch(config.API_ROOT + '/people/' + reportId + '?jwt=' + criteria.jwt)
	//             .then((response) => {
	//                 // If it's not JSON, throw an error before it just bellyflops trying to parse it
	//                 if(response.headers.get('Content-Type') !== 'application/json') {
	//                     let err = new Error(response.statusText);
	//                     err.response = response;
	//                     throw err;
	//                 }
	//         
	//                 return response;
	//             })
	// 			.then((response) => response.json())
	//             .then((responseData) => {
	//                 if(responseData.success) {
	//                     report = responseData.report;
	// 					
	// 					// Add the new report
	// 					_reportHistory.push(report);
	// 					
	// 					// Shift out the oldest element if the history length is greater than 10
	// 					if(_reportHistory.length > 10) _reportHistory.shift();
	//                 } else {
	//                     _errors = responseData.errors;
	//                 }
	//         		console.log(report);
	//                 this.emitChange();
	//             })
	//             .catch((error) => {
	//                 console.error(error);
	//             });
	// 
	// 		// setTimeout(() => {
	// 		// 	report = _.cloneDeep(testPerson);
	// 		// 	report.reportMeta = {};
	// 		// 	report.reportMeta.isPremium = false;
	// 		// 	report.reportMeta.reportId = reportId;
	// 		// 
	// 		// 	// Add the new report
	// 		// 	_reportHistory.push(report);
	// 		// 
	// 		// 	// Shift out the oldest element if the history length is greater than 10
	// 		// 	if(_reportHistory.length > 10) _reportHistory.shift();
	// 		// 
	// 		// 	this.emitChange();
	// 		// }, 1000);
	// 	} else {
	// 		// Splice the cached report out and append it to the history
	// 		_reportHistory.push(_reportHistory.splice(cachedReportIndex, 1)[0]);
	// 		this.emitChange();
	// 	}
	// }

}

var reportStore = new ReportStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
		// case constants.actions.FETCH_REPORT:
		// 	reportStore.fetchReport(action.criteria);
		// 	break;
		
		case constants.actions.RECEIVE_RECORD_ID:
			console.log(action.recordId);
			console.log(action.reportType);
			break;

		default:
			break;
	}
});

export default reportStore;
