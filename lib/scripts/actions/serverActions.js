import config from '../config';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import {hashHistory} from 'react-router';

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
	
	// Need to redirect instead of dispatch to avoid trying to redirect in the middle of a dispatch o_O
	redirectToRecord: function(recordId, reportType) {
		hashHistory.push('/' + reportType + '/' + recordId);
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
	
	loggedOut: function() {
		dispatcher.dispatch({
			actionType: constants.actions.LOGGED_OUT
		});
	},

	receiveUsage: function(usage) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USAGE,
			usage
		});
	}

};
