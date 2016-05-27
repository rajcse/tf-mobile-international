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

var _report = null,
	_reportHistory = [];

class ReportStore extends EventEmitter {

	getReport() {
		return _report;
	}

	emitChange() {
		console.log('report changed');
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	fetchReport(reportType, reportId) {
		// Check for a cached report in their history first
		let cachedReportIndex = _.findIndex(_reportHistory, {reportMeta: {reportId: reportId}});

		// If there's no cached report, get a new one
		if(cachedReportIndex < 0) {
			// fetch(config.API_ROOT + '/people/')
			// 	.then((response) => response.json())
			// 	.then((responseData) => {
			// 		_results = responseData.people;
			// 		_searching = false;
			// 		_loaded = true;
			// 		this.emitChange();
			// 	});

			_report = testPerson;
			_report.reportMeta = {};
			_report.reportMeta.isPremium = false;
			_report.reportMeta.reportId = reportId;

			setTimeout(() => this.emitChange(), 5000);
		} else {
			// Splice the cached report out and set the report to the cached report
			_report = _reportHistory.splice(cachedReportIndex, 1)[0];
			this.emitChange();
		}

		// Cache the current report
		_reportHistory.push(_.cloneDeep(_report));

		// Shift out the oldest element if the history length is greater than 10
		if(_reportHistory.length > 10) _reportHistory.shift();

		console.log(_reportHistory);
	}

}

var reportStore = new ReportStore();

// Register callback to handle all updates
dispatcher.register(function(action) {

	switch(action.actionType) {

		default:
			break;
	}
});

export default reportStore;
