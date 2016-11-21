/**
* Handles 402 response and upsell flow
* @return {[type]} [description]
*/

const PERSON_SUBSCRIPTION_1_MONTH = 'PERSON_SUBSCRIPTION_1_MONTH',
	PREMIUM_PERSON_REPORT = 'PREMIUM_PERSON_REPORT';

class AppStoreAPI {
	constructor() {

	}

	/**
	 * Initializes the store when on `deviceready` event
	 */
	init() {
		// The store is not available in browser
		if (!window.store) {
			return console.warn('Store not available');
		}

		// Let's set a pretty high verbosity level, so that we see a lot of stuff
		// in the console (reassuring us that something is happening).
		//store.verbosity = store.INFO;
		window.store.verbosity = window.store.DEBUG;
		window.store.validator = 'https://api.fovea.cc:1982/check-purchase';

		if(window.device.platform === 'iOS') this.registerAppleProducts();
		if(window.device.platform === 'Android') this.registerGoogleProducts();

		// When there is a product update
		window.store.when('product').updated(p => {

		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).approved(p => {
			console.log('verify subscription!!!!!!!!');
			p.verify();
		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).verified(p => {
			console.log('subscription verified!!!!!!!!');
			p.finish();
		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).unverified(p => {
			console.log('subscription unverified!!!!!!!!!');
		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).updated(p => {
			if (p.owned) {
				console.log('You are a lucky subscriber!');
				// location.reload(true);
			} else {
				console.log('You are NOT subscribed!');
			}
		});

		// Log all errors
		window.store.error(error => {
			console.log('ERROR ' + error.code + ': ' + error.message);
		});

		// When every goes as expected, it's time to celebrate!
		// The 'ready' event should be welcomed with music and fireworks,
		window.store.ready(() => {
			console.log('\\o/ STORE READY \\o/');
		});

		// After we've done our setup, we tell the store to do
		// it's first refresh. Nothing will happen if we do not call window.store.refresh()
		window.store.refresh();
	}

	// purchaseSubscription(product) {
	//     //console.log(product);
	//     window.store.order('unlimited_standard_report_27_78_month_mobile');
	// }

	purchasePremium() {
		window.store.order('premium_person_report_1999_mobile');
	}

	registerGoogleProducts() {
		window.store.register({
			id:    'unlimited_standard_report_27_78_month_mobile',
			alias: PERSON_SUBSCRIPTION_1_MONTH,
			type:  window.store.PAID_SUBSCRIPTION
		});

		window.store.register({
			id:    'premium_person_report_1999_mobile',
			alias: PREMIUM_PERSON_REPORT,
			type:  window.store.CONSUMABLE
		});
	}

	registerAppleProducts() {
		window.store.register({
			id:    'premium_person_report_19_99',
			alias: PREMIUM_PERSON_REPORT,
			type:  window.store.CONSUMABLE
		});
	}
}

let appStoreAPI = new AppStoreAPI();

export default appStoreAPI;
