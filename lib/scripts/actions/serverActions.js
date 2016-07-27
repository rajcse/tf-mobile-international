import {hashHistory} from 'react-router';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import appStoreAPI from '../utils/AppStoreAPI';

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
	
	// Need to redirect after dispatch to avoid trying to redirect in the middle of a dispatch o_O
	redirectToRecord: function(userId, recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD_ID,
			recordId
		});
		hashHistory.push('/users/' + userId + '/records/' + recordId);
	},

	receiveReport: function(report) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_REPORT,
			report
		});
	},
	
	receiveLocationTeaser: function(pointer, location) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_LOCATION_TEASER,
			pointer,
			location
		});
	},

	receiveUser: function(user) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USER,
			user
		});
	},
	
	loginFailed: function(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGIN_FAILED,
			errors
		});	
	},
	
	paymentRequired: function(product) {
		dispatcher.dispatch({
			actionType: constants.actions.PAYMENT_REQUIRED,
			product
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
