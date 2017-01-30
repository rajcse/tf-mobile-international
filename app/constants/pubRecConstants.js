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
		'SEEN_TIMED_MODAL'
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
		PREMIUM_PERSON_REPORT_IAP: 'premium_person_report_iap',
		STANDARD_PERSON_REPORT: 'standard_person_report',
		STANDARD_PERSON_REPORT_IAP: 'standard_person_report_iap'
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

	reportLoaderTeasers : [
		'Did you know that Premium Reports may contain homes that a person owns?',
		'Did you know that every citizen of Kentucky is required by law to take a bath once a year?',
		'Short changed Uncle Sam? Liens may show up in an upgraded premium report',
		'Republican or democrat? Possible voter registration may be available in a premium report',
		'Scroll through possible business associations',
		'Possible associates — you could find people that your search subject may have shared a residential or business address with!',
		'Are they related to a criminal? Check out relatives reports when you upgrade to a premium report!',
		'Is that REALLY his boat? Or is it his parent’s? Find possible watercraft ownership on a premium report!',
		'Is your blind date a Democrat? If you bleed red, you’ll want to search for their voter registration on a premium report.',
		'Are you committed to the vegan lifestyle? Find out if your next date has a hunting license with a premium report!',
		'How many times has she filed for bankruptcy? The debt of your fiancee will soon be yours — search for the truth with a premium report. ',
		'What was your cringeworthy email address from middle school? Find email addresses from your past on a premium report!',
		'How financially secure is your partner?  Bankruptcy? Judgements? Find out before you tie the knot!',
		'How much is your bragging friend’s home REALLY worth?',
		'Steer clear of financial losers with possible bankruptcy, lien, judgment, and foreclosure info in a premium report.',
		'13% of Americans own their own business. Discover available business affiliations by upgrading to a premium report.',
		'Approximately 1 out of every 144 licensed drivers in the United States have a DUI.  Do you know someone who is one of them?',
		'Is he really a doctor?  Or just trying to score? Our premium reports reveal potential professional licenses.',
		'Pull a premium report on your favorite politician and you could find billions in real estate holdings, relatives, and a slew of recent lawsuits.',
		'Trying to find hidden assets in a divorce?  Premium reports may reveal a secret goldmine.',
		'Are they a four-year graduate … or a total liar? You could find out where they really went to college with a premium report.',
		'33% of people lie about their academic degree on resumes. Find out their real alma mater!',
		'Who are they shacking up with? Discover related associates with a premium report!',
		'Are you related to any jailbirds? A premium report could reveal arrest records for family and known associates. Upgrade today!',
		'11.1 million Americans have permits to carry concealed weapons. You could find out if they have a concealed weapons permit with a premium report!'
	]
};
