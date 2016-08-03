/**
 * Takes an array of strings and returns and object where 
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
		'FETCH_REPORT',
		'RECEIVE_REPORT',
		'FETCH_LOCATION_TEASER',
		'RECEIVE_LOCATION_TEASER',
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
		'CONFIRM_UPSELL',
		'CANCEL_UPSELL'
	]),
	
	// These must match what usage-service is expecting
	reportTypes: {
		PERSON: 'person',
		PHONE: 'phone',
		LOCATION: 'location',
		EMAIL: 'email',
	},
	
	// These keys must match the type values above
	reportEndpoints: {
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
