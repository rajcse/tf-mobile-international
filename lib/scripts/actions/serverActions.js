import {hashHistory} from 'react-router';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import appStoreAPI from '../utils/AppStoreAPI';

export default {
	receiveSearchResults: function(results, type) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_SEARCH_RESULTS,
			results,
			type
		});
	},

	receiveRecordId: function(recordId, recordType) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD_ID,
			recordId,
			recordType
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

	receiveRecord: function(record) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD,
			record
		});
	},
	
	recordRequestError: function(error) {
		dispatcher.dispatch({
			actionType: constants.actions.RECORD_REQUEST_ERROR,
			error
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
	
	receiveAccountInfo: function(account) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_ACCOUNT_INFO,
			account
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
	
	purchaseSuccessful: function() {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_SUCCESSFUL
		});
	},
	
	purchaseError: function(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_ERROR,
			errors
		});
	},

	loggedOut: function(redirect = true) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGGED_OUT
		});
		if(redirect) hashHistory.push('/');
	},

	receiveUsage: function(usage) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USAGE,
			usage
		});
	}

};
