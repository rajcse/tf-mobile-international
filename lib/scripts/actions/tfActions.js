import config from '../config';
import dispatcher from '../dispatcher';

var constants = config.constants;

export default {
	search: function(criteria) {
		dispatcher.dispatch({
			actionType: constants.actions.SEARCH,
			criteria: criteria
		});
	},

	updateSearchCriteria: function(updates) {
		dispatcher.dispatch({
			actionType: constants.actions.UPDATE_CRITERIA,
			updates: updates
		});
	}
};
