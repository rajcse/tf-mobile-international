import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';
import pubRecAPI from '../utils/PubRecAPI';

export default {
	search: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH,
			criteria
		});
		pubRecAPI.search(criteria);
	},
	
	// This purely just clears any navigation variables in the stores
	clearSearchResults: function() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_SEARCH_RESULTS
		});
	},
	
	updateSearchCriteria: function(updates) {
		dispatcher.dispatch({
			actionType: constants.actions.UPDATE_CRITERIA,
			updates
		});
	},
	
	// Use this to add records without redirecting to them
	createRecord: function(recordData, reportType) {
		dispatcher.dispatch({
			actionType: constants.actions.CREATE_RECORD,
			recordData,
			reportType
		});
		pubRecAPI.createRecord(recordData, reportType);
	},
	
	// Use this to add a record and indicate a redirect to the report after the recordID is received
	selectTeaser: function(recordData, reportType) {
		dispatcher.dispatch({
			actionType: constants.actions.SELECT_TEASER,
			recordData,
			reportType
		});
		pubRecAPI.createRecord(recordData, reportType, true);
	},

	fetchReport: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_REPORT,
			criteria
		});
		pubRecAPI.fetchReport(criteria);
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

	getUsage: function() {
		dispatcher.dispatch({
			actionType: constants.actions.GET_USAGE
		});
		pubRecAPI.getUsage();
	}
};
