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
		'SET_WELCOME_STATUS',
		'DELETE_ACCOUNT'
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
	},

	reportLoaderTeasers: {
		0: 'Did you know that Premium Reports may contain homes that a person owns?',
		1: 'Did you know that every citizen of Kentucky is required by law to take a bath once a year?',
		2: 'Short changed Uncle Sam? Liens may show up in an upgraded premium report',
		3: 'Republican or democrat? Possible voter registration available in a premium report',
		4: 'Scroll through possible business associations',
		5: 'Possible associates — find people that your search subject may have shared a residential or business address with!',
		6: 'Are they related to a criminal? Check out relatives reports when you upgrade to a premium report!',
		7: 'Is that REALLY his boat? Or is it his parent’s? Find out if they own watercraft on a premium report!',
		8: 'Is your blind date a Democrat? If you bleed red, you’ll want to check their voter registration on a premium report.',
		9: 'Are you committed to the vegan lifestyle? Find out if your next date has a hunting license with a premium report!',
		10: 'How many times has she filed for bankruptcy? The debt of your fiancee will soon be yours — get the truth with a premium report. ',
		11: 'What was your cringeworthy email address from middle school? Find email addresses from your past on a premium report!',
		12: 'How financially secure is your partner?  Bankruptcy? Judgements? Find out before you tie the knot!',
		13: 'How much is your bragging friend’s home REALLY worth?',
		14: 'Steer clear of financial losers with bankruptcy, lien, judgment, and foreclosure info in a premium report.',
		15: '13% of Americans own their own business. Discover business affiliations by upgrading to a premium report.',
		16: 'Approximately 1 out of every 144 licensed drivers in the United States have a DUI.  Do you know someone who is one of them?',
		17: 'Is he really a doctor?  Or just trying to score? Our premium reports reveal potential professional licenses.',
		18: 'Pull a premium report on Donald Trump to find billions in real estate holdings, relatives, and a slew of recent lawsuits.',
		19: 'Trying to find hidden assets in a divorce?  Premium reports may reveal a secret goldmine.',
		20: 'Are they a four-year graduate … or a total liar? Find out where they really went to college with a premium report.',
		21: '33% of people lie about their academic degree on resumes. Find out their real alma mater!',
		22: 'Who are they shacking up with? Discover related associates with a premium report!',
		23: 'Are you related to any jailbirds? A premium report can reveal arrest records for family and known associates. Upgrade today!',
		24: '11.1 million Americans have permits to carry concealed weapons. Find out if they have a concealed weapons permit with a premium report!'
	}
};
