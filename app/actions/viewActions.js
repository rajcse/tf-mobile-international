import {hashHistory} from 'react-router';
import constants from 'constants/pubRecConstants';
import dispatcher from 'dispatcher';
import pubRecAPI from 'utils/PubRecAPI';
import firebaseClient from 'utils/firebaseClient';

export default {
	search(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH,
			criteria
		});

		firebaseClient.logEvent(constants.firebase.events.SEARCH, {
			type: criteria.type,
			...criteria.query
		});
		pubRecAPI.search(criteria);
	},

	goToSearch(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.GO_TO_SEARCH,
			criteria
		});
		// Go directly to the search page after dispatch
		hashHistory.push('/search');
		pubRecAPI.search(criteria);
	},

	goToSupport() {
		hashHistory.push('/support');
	},

	markUserAsRated() {
		dispatcher.dispatch({
			actionType: constants.actions.MARK_USER_AS_RATED
		});
	},

	seenTimedUpsell() {
		dispatcher.dispatch({
			actionType: constants.actions.SEEN_TIMED_UPSELL
		});
	},

	confirmWelcome() {
		dispatcher.dispatch({
			actionType: constants.actions.CONFIRM_WELCOME
		});
	},

	// This purely just clears any navigation variables in the stores
	clearSearchResults() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SEARCH_RESULTS
		});
	},

	updateSearchCriteria(updates) {
		dispatcher.dispatch({
			actionType: constants.actions.UPDATE_SEARCH_CRITERIA,
			updates
		});
	},

	// Use this to add records without redirecting to them
	createRecord(recordData, recordType) {
		dispatcher.dispatch({
			actionType: constants.actions.CREATE_RECORD,
			recordData,
			recordType
		});
		pubRecAPI.createRecord(recordData, recordType);
	},

	// Use this to add a record and indicate a redirect to it after the recordID is received
	selectTeaser(recordData, recordType) {
		dispatcher.dispatch({
			actionType: constants.actions.SELECT_TEASER,
			recordData,
			recordType
		});
		pubRecAPI.createRecord(recordData, recordType, true);
	},

	// Use this to try and navigate directly to a phone record from any record
	selectPhone(number) {
		dispatcher.dispatch({
			actionType: constants.actions.SELECT_PHONE,
			number
		});
		pubRecAPI.createPhoneRecordFromNumber(number);
	},

	// Use this to try and navigate directly to a phone record from any record
	selectEmail(address) {
		dispatcher.dispatch({
			actionType: constants.actions.SELECT_EMAIL,
			address
		});
		pubRecAPI.createEmailRecordFromAddress(address);
	},

	fetchRecord(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_RECORD,
			criteria
		});
		pubRecAPI.fetchRecord(criteria);
	},

	clearRecordError(redirectToHome = true) {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_RECORD_ERROR
		});

		if(redirectToHome) hashHistory.push('/');
	},

	clearPurchaseErrors() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_PURCHASE_ERRORS
		});
	},

	clearSearchError() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SEARCH_ERROR
		});
	},

	fetchLocationTeaser(pointer) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_LOCATION_TEASER,
			pointer
		});
		pubRecAPI.fetchLocationTeaser(pointer);
	},

	checkLocalUser() {
		dispatcher.dispatch({
			actionType: constants.actions.CHECK_LOCAL_USER
		});
		pubRecAPI.checkLocalUser();
	},

	register(credentials) {
		dispatcher.dispatch({
			actionType: constants.actions.REGISTER,
			credentials
		});
		pubRecAPI.register(credentials);
	},

	login(credentials) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGIN,
			credentials
		});
		firebaseClient.logEvent('login_attempt');
		pubRecAPI.login(credentials);
	},

	logout() {
		dispatcher.dispatch({
			actionType: constants.actions.LOGOUT
		});
		pubRecAPI.logout();
	},

	showPremiumUpsell(record) {
		dispatcher.dispatch({
			actionType: constants.actions.SHOW_PREMIUM_UPSELL
		});
		pubRecAPI.fetchPremiumUpsellInfo(record);
	},

	purchasePremiumRecord(premiumUpsell) {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_PREMIUM_RECORD,
			premiumUpsell
		});
		pubRecAPI.purchasePremiumRecord(premiumUpsell);
	},

	upgradeToPremiumRecord(recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.UPGRADE_TO_PREMIUM_RECORD,
			recordId
		});
		pubRecAPI.upgradeToPremiumRecord(recordId);
	},

	cancelPremiumUpsell() {
		dispatcher.dispatch({
			actionType: constants.actions.CANCEL_PREMIUM_UPSELL
		});
	},

	showStandardUpsell(record) {
		dispatcher.dispatch({
			actionType: constants.actions.SHOW_STANDARD_UPSELL
		});
		pubRecAPI.fetchStandardUpsellInfo(record);
	},

	purchaseStandardRecord(standardUpsell) {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_STANDARD_RECORD,
			standardUpsell
		});
		pubRecAPI.purchaseStandardRecord(standardUpsell);
	},

	upgradeToStandardRecord(recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.UPGRADE_TO_STANDARD_RECORD,
			recordId
		});
		pubRecAPI.upgradeToStandardRecord(recordId);
	},

	cancelStandardUpsell() {
		dispatcher.dispatch({
			actionType: constants.actions.CANCEL_STANDARD_UPSELL
		});
	},

	purchaseCrossSell(crossSell) {
		dispatcher.dispatch({
			actionType: constants.actions.PURCHASE_CROSS_SELL,
			crossSell
		});
		pubRecAPI.purchaseCrossSell(crossSell);
	},

	cancelCrossSell() {
		dispatcher.dispatch({
			actionType: constants.actions.CANCEL_CROSS_SELL
		});
		// Redirect them to home from everywhere
		hashHistory.push('/');
	},

	refreshProductUpsell() {
		dispatcher.dispatch({
			actionType: constants.actions.REFRESH_PRODUCT_UPSELL
		});
	},

	clearNotification(id) {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_NOTIFICATION,
			id
		});
	},

	getUsage() {
		dispatcher.dispatch({
			actionType: constants.actions.GET_USAGE
		});
		pubRecAPI.getUsage();
	},

	archiveRecord(recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.ARCHIVE_RECORD
		});
		firebaseClient.logEvent('archive_record', {record_id: recordId});
		pubRecAPI.setRecordArchiveStatus(recordId, true);
	},

	deleteAccount() {
		dispatcher.dispatch({
			actionType: constants.actions.DELETE_ACCOUNT
		});
		pubRecAPI.deleteAccount();
	},

	triggerEvent(event) {
		dispatcher.dispatch({
			actionType: constants.actions.TRIGGER_EVENT
		});
		pubRecAPI.triggerEvent(event);
	}
};
