/**
 * Takes an array of strings and returns an object where
 * the values are identical to the keys
 */
function mirror(arr) {
	let obj = {};

	for (let i = 0; i < arr.length; i++) {
		obj[arr[i]] = arr[i];
	}

	return obj;
}

export default {
	actions: mirror([
		'SEARCH',
		'GO_TO_SEARCH',
		'CLEAR_SEARCH_RESULTS',
		'RECEIVE_SEARCH_RESULTS',
		'UPDATE_SEARCH_CRITERIA',
		'CREATE_RECORD',
		'RECEIVE_RECORD_ID',
		'SELECT_TEASER',
		'SELECT_PHONE',
		'SELECT_EMAIL',
		'FETCH_RECORD',
		'RECEIVE_RECORD',
		'VIEW_UNCACHED_RECORD',
		'RECORD_REQUEST_ERROR',
		'CLEAR_RECORD_ERROR',
		'FETCH_LOCATION_TEASER',
		'RECEIVE_LOCATION_TEASER',
		'REGISTER',
		'REGISTER_FAILED',
		'LOGIN',
		'LOGIN_FAILED',
		'CHECK_LOCAL_USER',
		'RECEIVE_USER',
		'FETCH_ACCOUNT_INFO',
		'RECEIVE_ACCOUNT_INFO',
		'LOGOUT',
		'LOGGED_OUT',
		'GET_USAGE',
		'RECEIVE_USAGE',
		'PAYMENT_REQUIRED',
		'SHOW_PREMIUM_UPSELL',
		'CONFIRM_PREMIUM_UPSELL',
		'CANCEL_PREMIUM_UPSELL',
		'CONFIRM_CROSS_SELL',
		'CANCEL_CROSS_SELL',
		'PURCHASE_SUCCESSFUL',
		'PURCHASE_ERROR',
		'REFRESH_PRODUCT_UPSELL',
		'CLEAR_USER_ERRORS',
		'CLEAR_SEARCH_STATE',
		'GOTO_SEARCH',
		'SLACK_POST',
		'RECEIVE_NOTIFICATION',
		'CLEAR_NOTIFICATION',
		'SEARCH_ERROR',
		'CLEAR_SEARCH_ERROR',
		'CLEAR_SUCCESS',
		'RATE',
		'ENABLE_PREMIUM_ACCESS',
		'CONFIRM_WELCOME',
		'SET_WELCOME_STATUS'
	]),

	// These must match what usage-service is expecting
	recordTypes: {
		PERSON: 'person',
		PHONE: 'phone',
		LOCATION: 'location',
		EMAIL: 'email'
	},

	// These keys must match the type values above
	recordEndpoints: {
		person: 'people',
		phone: 'phones',
		location: 'locations',
		email: 'emails'
	},

	months: {
		1: 'January',
		2: 'February',
		3: 'March',
		4: 'April',
		5: 'May',
		6: 'June',
		7: 'July',
		8: 'August',
		9: 'September',
		10: 'October',
		11: 'November',
		12: 'December'
	}
};
