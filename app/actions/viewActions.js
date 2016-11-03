import {hashHistory} from 'react-router';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import pubRecAPI from '../utils/PubRecAPI';
import appStoreAPI from '../utils/AppStoreAPI';

export default {
	search(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH,
			criteria
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

	goToDashboard() {
		hashHistory.push('/');
		this.clearSearchResults();
	},

	goToSupport() {
		hashHistory.push('/support');
	},

	rate() {
		dispatcher.dispatch({
			actionType: constants.actions.RATE
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
			actionType: constants.actions.CLEAR_RECORD_ERROR,
		});

		if(redirectToHome) hashHistory.push('/');
	},

	clearUserErrors(redirectToHome = false) {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_USER_ERRORS,
		});

		if(redirectToHome) hashHistory.push('/');
	},

	clearSearchError() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SEARCH_ERROR
		});
	},

	clearSuccess() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SUCCESS
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
		pubRecAPI.login(credentials);
	},

	logout() {
		dispatcher.dispatch({
			actionType: constants.actions.LOGOUT
		});
		pubRecAPI.logout();
	},

	fetchAccountInfo() {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_ACCOUNT_INFO
		});
		pubRecAPI.fetchAccountInfo();
	},
	
	showPremiumUpsell(recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.SHOW_PREMIUM_UPSELL,
			recordId
		});
	},

	confirmPremiumUpsell(recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.CONFIRM_PREMIUM_UPSELL,
			recordId
		});
		//APP STORE INTEGRATION NOT READY YET!!!
		//appStoreAPI.purchaseSubscription(product);
		pubRecAPI.purchasePremium(recordId);
	},

	cancelPremiumUpsell() {
		dispatcher.dispatch({
			actionType: constants.actions.CANCEL_PREMIUM_UPSELL
		});
	},
	
	confirmCrossSell(sku) {
		dispatcher.dispatch({
			actionType: constants.actions.CONFIRM_CROSS_SELL,
			sku
		});
		//APP STORE INTEGRATION NOT READY YET!!!
		//appStoreAPI.purchaseSubscription(product);
		pubRecAPI.purchasePackage(sku);
	},

	cancelCrossSell() {
		dispatcher.dispatch({
			actionType: constants.actions.CANCEL_CROSS_SELL
		});
		this.clearSearchResults();
	},
		
	refreshProductUpsell() {
		dispatcher.dispatch({
			actionType: constants.actions.REFRESH_PRODUCT_UPSELL
		});
	},

	getUsage() {
		dispatcher.dispatch({
			actionType: constants.actions.GET_USAGE
		});
		pubRecAPI.getUsage();
	}
};