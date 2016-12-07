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
		'ARCHIVE_RECORD',
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
		'RECEIVE_PREMIUM_UPSELL',
		'PURCHASE_PREMIUM_RECORD',
		'UPGRADE_TO_PREMIUM_RECORD',
		'PREMIUM_UPGRADE_SUCCESSFUL',
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

	// These values must mirror the mappings in site JSON
	planTypes: {
		PERSON_REPORT_1_MONTH: 'person_report_1_month',
		PERSON_REPORT_1_MONTH_IAP: 'person_report_1_month_iap'
	},

	// These values must mirror the mappings in site JSON
	productTypes: {
		PREMIUM_PERSON_REPORT: 'premium_person_report',
		PREMIUM_PERSON_REPORT_IAP: 'premium_person_report_iap'
	},

	// These must match what accounts service expects
	inAppPaymentProcessors: {
		APPLE: 'apple_iap',
		GOOGLE: 'google_play'
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
