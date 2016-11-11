import {hashHistory} from 'react-router';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import pubRecAPI from '../utils/PubRecAPI';

export default {
	receiveSearchResults(results, type) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_SEARCH_RESULTS,
			results,
			type
		});
	},

	receiveRecordId(recordId, recordType) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD_ID,
			recordId,
			recordType
		});
	},

	// Need to redirect after dispatch to avoid trying to redirect in the middle of a dispatch o_O
	redirectToRecord(userId, recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD_ID,
			recordId
		});
		hashHistory.push('/users/' + userId + '/records/' + recordId);
	},

	redirectToSearch() {
		dispatcher.dispatch({
			actionType: constants.actions.GOTO_SEARCH
		});
		hashHistory.push('/search');
	},

	slackPost(message) {
		dispatcher.dispatch({
			actionType: constants.actions.SLACK_POST,
			message
		});
		pubRecAPI.slackPost(message);
	},

	receiveRecord(record) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_RECORD,
			record
		});
	},

	reportView() {
		dispatcher.dispatch({
			actionType: constants.actions.REPORT_VIEW
		});
	},
	
	recordRequestError(error) {
		dispatcher.dispatch({
			actionType: constants.actions.RECORD_REQUEST_ERROR,
			error
		});
	},

	receiveLocationTeaser(pointer, location) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_LOCATION_TEASER,
			pointer,
			location
		});
	},

	receiveUser(user) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USER,
			user
		});
	},
	
	receiveAccountInfo(account) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_ACCOUNT_INFO,
			account
		});
	},

	registerFailed(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.REGISTER_FAILED,
			errors
		});
	},
	
	loginFailed(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGIN_FAILED,
			errors
		});
	},

	paymentRequired(product) {
		dispatcher.dispatch({
			actionType: constants.actions.PAYMENT_REQUIRED,
			product
		});
	},
	
	purchaseSuccessful() {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_SUCCESSFUL
		});
	},

	purchaseError(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_ERROR,
			errors
		});
	},

	//This is to clear the search state where it hungs up trying to load the report, get an 402 and go through the crossell flow
	clearSearchState() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SEARCH_STATE
		});
	},

	searchError(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH_ERROR,
			errors
		});
	},

	loggedOut(redirect = true) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGGED_OUT
		});
		if(redirect) hashHistory.push('/');
	},

	receiveUsage(usage) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USAGE,
			usage
		});
	},

	revokePremiumAccess() {
		dispatcher.dispatch({
			actionType: constants.actions.REVOKE_PREMIUM_ACCESS
		});
	},

	setWelcomeStatus() {
		dispatcher.dispatch({
			actionType: constants.actions.SET_WELCOME_STATUS
		});
	}
};
