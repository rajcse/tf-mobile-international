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
		'LOGIN',
		'RECEIVE_USER',
		'LOGOUT',
		'LOGGED_OUT',
		'GET_USAGE',
		'RECEIVE_USAGE'
	]),
	
	// These should correspond to the API endpoint for each entity
	reportTypes: {
		PERSON: 'people',
		PHONE: 'phones',
		LOCATION: 'locations'
	}
};
