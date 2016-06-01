import config from '../config';
import dispatcher from '../dispatcher';

var constants = config.constants;

export default {
	search: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH,
			criteria
		});
	},

	updateSearchCriteria: function(updates) {
		dispatcher.dispatch({
			actionType: constants.actions.UPDATE_CRITERIA,
			updates
		});
	},

	fetchReport: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.FETCH_REPORT,
			criteria
		});
	},

	login: function(credentials) {
		dispatcher.dispatch({
			actionType: constants.actions.LOGIN,
			credentials
		});
	},

	logout: function() {
		dispatcher.dispatch({
			actionType: constants.actions.LOGOUT
		});
	}
};
