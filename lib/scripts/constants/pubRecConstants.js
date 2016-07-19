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
		'CLEAR_SEARCH_RESULTS',
		'RECEIVE_SEARCH_RESULTS',
		'UPDATE_CRITERIA',
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
		'LOGOUT',
		'LOGGED_OUT',
		'GET_USAGE',
		'RECEIVE_USAGE'
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
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December'
	}
};
