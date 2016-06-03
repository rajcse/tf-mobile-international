import config from '../config';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';

export default {
	receiveSearchResults: function(results) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_SEARCH_RESULTS,
			results
		});
	},
	
	receiveRecordId: function(recordId, reportType) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD_ID,
			recordId,
			reportType
		});
	},

	receiveReport: function(report) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_REPORT,
			report
		});
	},

	receiveUser: function(user) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USER,
			user
		});
	},

	receiveUsage: function(usage) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USAGE,
			usage
		});
	}

};
