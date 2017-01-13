import {hashHistory} from 'react-router';
import constants from 'constants/pubRecConstants';
import dispatcher from 'dispatcher';
import pubRecAPI from 'utils/PubRecAPI';
import firebaseClient from 'utils/firebaseClient';

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
		// Fire view record event whenever we receive a record (cached or uncached)
		firebaseClient.logEvent(constants.firebase.events.VIEW_ITEM, {item_name: 'Record', item_id: record.id[2], item_category: record.id[1]});
	},

	viewUncachedRecord() {
		dispatcher.dispatch({
			actionType: constants.actions.VIEW_UNCACHED_RECORD
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
		firebaseClient.setUserId(user.id);

		// This is purely for client error logging - DO NOT ACCESS THIS VALUE ELSEWHERE
		window.userIdForErrorLogging = user.id;
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

	paymentRequired(crossSell) {
		dispatcher.dispatch({
			actionType: constants.actions.PAYMENT_REQUIRED,
			crossSell
		});
	},

	crossSellSuccessful() {
		dispatcher.dispatch({
			actionType: constants.actions.CROSS_SELL_SUCCESSFUL
		});
	},

	premiumUpgradeSuccessful() {
		dispatcher.dispatch({
			actionType: constants.actions.PREMIUM_UPGRADE_SUCCESSFUL
		});
	},

	standardUpgradeSuccessful() {
		dispatcher.dispatch({
			actionType: constants.actions.STANDARD_UPGRADE_SUCCESSFUL
		});
	},

	purchaseError(errors) {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_ERROR,
			errors
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

		window.userIdForErrorLogging = null;
	},

	receiveUsage(usage) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_USAGE,
			usage
		});
	},

	receiveNotification(notification) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_NOTIFICATION,
			notification
		});
	},

	receivePremiumUpsellInfo(premiumUpsell) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_PREMIUM_UPSELL,
			premiumUpsell
		});
		firebaseClient.logEvent(constants.firebase.events.PRESENT_OFFER, {
			item_id: premiumUpsell.product.sku || premiumUpsell.product.id,
			item_category: 'Premium Person Report',
			quantity: 1,
			price: Number(String(premiumUpsell.product.price).replace('$', '')) // Possible values of price are {String}'$xx.xx', and {Number}xx.xx, event requires a number
		});
	},

	receiveStandardUpsellInfo(standardUpsell) {
		dispatcher.dispatch({
			actionType: constants.actions.RECEIVE_STANDARD_UPSELL,
			standardUpsell
		});
		// firebaseClient.logEvent(constants.firebase.events.PRESENT_OFFER, {
		// 	item_id: standardUpsell.product.sku || standardUpsell.product.id,
		// 	item_category: 'Premium Person Report',
		// 	quantity: 1,
		// 	price: Number(String(standardUpsell.product.price).replace('$', '')) // Possible values of price are {String}'$xx.xx', and {Number}xx.xx, event requires a number
		// });
	},

	showWelcomeModal() {
		dispatcher.dispatch({
			actionType: constants.actions.SHOW_WELCOME_MODAL
		});
	}
};
