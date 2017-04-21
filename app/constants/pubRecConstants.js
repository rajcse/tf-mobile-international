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
		'RESET_PASSWORD',
		'RESET_PASSWORD_SUCCESSFUL',
		'RESET_PASSWORD_FAILED',
		'LOGIN_FAILED',
		'CHECK_LOCAL_USER',
		'RECEIVE_USER',
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
		'SHOW_STANDARD_UPSELL',
		'RECEIVE_STANDARD_UPSELL',
		'PURCHASE_STANDARD_RECORD',
		'UPGRADE_TO_STANDARD_RECORD',
		'STANDARD_UPGRADE_SUCCESSFUL',
		'CANCEL_STANDARD_UPSELL',
		'PURCHASE_CROSS_SELL',
		'CANCEL_CROSS_SELL',
		'CROSS_SELL_SUCCESSFUL',
		'PURCHASE_ERROR',
		'REFRESH_PRODUCT_UPSELL',
		'CLEAR_PURCHASE_ERRORS',
		'GOTO_SEARCH',
		'SLACK_POST',
		'RECEIVE_NOTIFICATION',
		'CLEAR_NOTIFICATION',
		'SEARCH_ERROR',
		'CLEAR_SEARCH_ERROR',
		'MARK_USER_AS_RATED',
		'CONFIRM_WELCOME',
		'SHOW_WELCOME_MODAL',
		'DELETE_ACCOUNT',
		'FETCH_SITE_CONFIG',
		'TRIGGER_EVENT',
		'SEEN_TIMED_UPSELL',
		'SHOW_PREMIUM_BUNDLE',
		'PURCHASE_PREMIUM_BUNDLE',
		'RECEIVE_PREMIUM_BUNDLE',
		'CANCEL_PREMIUM_BUNDLE',
		'USED_PREMIUM_BUNDLE'
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
		PERSON_REPORT_1_MONTH_IAP: 'person_report_1_month_iap',
		EMAIL_REPORT_IAP: 'email_report_iap',
		PHONE_REPORT_IAP: 'phone_report_iap',
		PERSON_REPORT_IAP: 'person_report_iap'
	},

	// These values must mirror the mappings in site JSON
	productTypes: {
		PREMIUM_PERSON_REPORT: 'premium_person_report',
		PREMIUM_PERSON_REPORT_IAP: 'premium_person_report_iap',
		STANDARD_PERSON_REPORT: 'standard_person_report',
		STANDARD_PERSON_REPORT_IAP: 'standard_person_report_iap',
		PREMIUM_REPORT_BUNDLE: 'premium_report_bundle'
	},

	// These must match what accounts service expects
	inAppPaymentProcessors: {
		APPLE: 'apple_iap',
		GOOGLE: 'google_play'
	},

	firebase: {
		events: {
			// These map to the predefined event constants in Firebase - custom events should use strings
			// https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event
			LOGIN: 'login',
			PRESENT_OFFER: 'present_offer', // {item_id, item_name, item_category, quantity, price} - ex. Premium Upsell prompt
			SEARCH: 'search', // {search_term}
			SIGN_UP: 'sign_up', // {sign_up_method}
			VIEW_ITEM: 'view_item' // {item_id, item_name, item_category} - ex. record view
		},
		topics: mirror([
			// Stored here so we can loop them and unsubscribe a user from all topics easily
			'MOBILE_REGISTERED_USERS',
			'NO_PURCHASES_MADE'
		]),
		funnelSteps: [
			'INSTALLED_NEVER_LOGGED_IN',
			'REGISTERED_NO_PERSON_SEARCHES',
			'SEARCHED_NO_PERSON_REPORT_VIEWS',
			'PERSON_REPORT_VIEWED_NO_PREMIUM_PROMPT_VIEWS',
			'PREMIUM_PROMPT_VIEWED_NO_PURCHASE',
			'PREMIUM_REPORT_VIEWED'
		]
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
	},

	reportLoaderTeasers : []
};
