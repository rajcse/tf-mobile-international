import {EventEmitter} from 'events';
import config from '../config.js';
import _ from 'lodash';
import dispatcher from '../dispatcher';
require('es6-promise').polyfill();
import 'isomorphic-fetch';

// DEV
import testPerson from '../testPerson';
//

const CHANGE_EVENT = 'change';
var constants = config.constants;

var _reportHistory = [];

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

	fetchReport(criteria) {
		// Check for a cached report in their history first
		let reportId = criteria.reportId,
			cachedReportIndex = _.findIndex(_reportHistory, {reportMeta: {reportId: reportId}}),
			report = null;

		// If there's no cached report, get a new one
		if(cachedReportIndex < 0) {
			let headers = {
				'Authentication': ''
			};
			// fetch(config.API_ROOT + '/people/')
			// 	.then((response) => response.json())
			// 	.then((responseData) => {
			// 		_results = responseData.people;
			// 		_searching = false;
			// 		_loaded = true;
			// 		this.emitChange();
			// 	});

			setTimeout(() => {
				report = _.cloneDeep(testPerson);
				report.reportMeta = {};
				report.reportMeta.isPremium = false;
				report.reportMeta.reportId = reportId;

				// Add the new report
				_reportHistory.push(report);

				// Shift out the oldest element if the history length is greater than 10
				if(_reportHistory.length > 10) _reportHistory.shift();

				this.emitChange();
			}, 1000);
		} else {
			// Splice the cached report out and append it to the history
			_reportHistory.push(_reportHistory.splice(cachedReportIndex, 1)[0]);
			this.emitChange();
		}
	}

}

var reportStore = new ReportStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {
		case constants.actions.FETCH_REPORT:
			reportStore.fetchReport(action.criteria);
			break;

		default:
			break;
	}
});

export default reportStore;
