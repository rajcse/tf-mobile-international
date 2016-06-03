import config from '../config';
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
	
	updateSearchCriteria: function(updates) {
		dispatcher.dispatch({
			actionType: constants.actions.UPDATE_CRITERIA,
			updates
		});
	},
	
	addRecord: function(recordData, reportType, navigate) {
		dispatcher.dispatch({
			actionType: constants.actions.ADD_RECORD,
			recordData,
			reportType
		});
		pubRecAPI.addRecord(recordData, reportType);
	},
	
	// This purely just clears any navigation variables in the stores
	clearNavigation: function() {
		dispatcher.dispatch({
			actionType: constants.actions.CLEAR_NAVIGATION
		});
	},

	fetchReport: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_REPORT,
			criteria
		});
		pubRecAPI.fetchReport(criteria);
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
	}
};
