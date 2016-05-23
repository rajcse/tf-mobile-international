import dispatcher from '../dispatcher';

export default {
	search: function(criteria) {
		dispatcher.dispatch({
			actionType: 'SEARCH',
			criteria: criteria
		});
	},

	updateSearchCriteria: function(updates) {
		dispatcher.dispatch({
			actionType: 'UPDATE_CRITERIA',
			updates: updates
		});
	}
};