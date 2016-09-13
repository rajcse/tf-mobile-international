import {hashHistory} from 'react-router';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import pubRecAPI from '../utils/PubRecAPI';
import appStoreAPI from '../utils/AppStoreAPI';

export default {
	search: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH,
			criteria
		});
		pubRecAPI.search(criteria);
	},

	goToSearch: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.GO_TO_SEARCH,
			criteria
		});
		// Go directly to the search page after dispatch
		hashHistory.push('/search');
		pubRecAPI.search(criteria);
	},

	goToDashboard: function() {
		hashHistory.push('/');
		this.clearSearchResults();
	},

	// This purely just clears any navigation variables in the stores
	clearSearchResults: function() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SEARCH_RESULTS
		});
	},

	updateSearchCriteria: function(updates) {
		dispatcher.dispatch({
			actionType: constants.actions.UPDATE_SEARCH_CRITERIA,
			updates
		});
	},

	// Use this to add records without redirecting to them
	createRecord: function(recordData, recordType) {
		dispatcher.dispatch({
			actionType: constants.actions.CREATE_RECORD,
			recordData,
			recordType
		});
		pubRecAPI.createRecord(recordData, recordType);
	},

	// Use this to add a record and indicate a redirect to it after the recordID is received
	selectTeaser: function(recordData, recordType) {
		dispatcher.dispatch({
			actionType: constants.actions.SELECT_TEASER,
			recordData,
			recordType
		});
		pubRecAPI.createRecord(recordData, recordType, true);
	},

	fetchRecord: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_RECORD,
			criteria
		});
		pubRecAPI.fetchRecord(criteria);
	},

	clearRecordError: function(redirectToHome = true) {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_RECORD_ERROR,
		});

		if(redirectToHome) hashHistory.push('/');
	},

	fetchLocationTeaser: function(pointer) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_LOCATION_TEASER,
			pointer
		});
		pubRecAPI.fetchLocationTeaser(pointer);
	},

	checkLocalUser: function() {
		dispatcher.dispatch({
			actionType: constants.actions.CHECK_LOCAL_USER
		});
		pubRecAPI.checkLocalUser();
	},

	login: function(credentials) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGIN,
			credentials
		});
		pubRecAPI.login(credentials);
	},

	logout: function() {
		dispatcher.dispatch({
			actionType: constants.actions.LOGOUT
		});
		pubRecAPI.logout();
	},

	fetchAccountInfo: function() {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_ACCOUNT_INFO
		});
		pubRecAPI.fetchAccountInfo();
	},

	confirmUpsell: function(recordId) {
		dispatcher.dispatch({
			actionType: constants.actions.CONFIRM_UPSELL,
			recordId
		});
		//APP STORE INTEGRATION NOT READY YET!!!
		//appStoreAPI.purchaseSubscription(product);
		pubRecAPI.purchasePremium(recordId);
	},

	confirmCrosssell: function(sku) {
		dispatcher.dispatch({
			actionType: constants.actions.CONFIRM_CROSSSELL,
			sku
		});
		//APP STORE INTEGRATION NOT READY YET!!!
		//appStoreAPI.purchaseSubscription(product);
		pubRecAPI.purchasePackage(sku);
	},

	cancelUpsell: function() {
		dispatcher.dispatch({
			actionType: constants.actions.CANCEL_UPSELL
		});
	},
	
	refreshProductUpsell: function() {
		dispatcher.dispatch({
			actionType: constants.actions.REFRESH_PRODUCT_UPSELL
		});
	},

	getUsage: function() {
		dispatcher.dispatch({
			actionType: constants.actions.GET_USAGE
		});
		pubRecAPI.getUsage();
	}
};
