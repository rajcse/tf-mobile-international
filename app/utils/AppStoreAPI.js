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
	 * Initializes the store on `deviceready` event
	 */
	init() {
		// The store is not available in browser
		if (!window.store) {
			return console.warn('Store not available');
		}

		// Set debug level logging
		window.store.verbosity = window.store.DEBUG;

		if(window.device.platform === 'iOS') this.registerAppleProducts();
		if(window.device.platform === 'Android') this.registerGoogleProducts();

		window.store.validator = (p, cb) => {
			console.log(JSON.stringify(p.transaction));
			cb(true, p.transaction);
		};

		// When there is a product update
		window.store.when('product').updated(p => {

		});

		window.store.when(PREMIUM_PERSON_REPORT).approved(p => {
			p.verify();
		});

		window.store.when(PREMIUM_PERSON_REPORT).verified(p => {
			console.log(JSON.stringify(p.transaction));
			p.finish();
		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).approved(p => {
			p.verify();
		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).verified(p => {
			p.finish();
		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).unverified(p => {

		});

		window.store.when(PERSON_SUBSCRIPTION_1_MONTH).updated(p => {

		});

		// Log all errors
		window.store.error(error => {
			console.log('ERROR ' + error.code + ': ' + error.message);
		});

		// When every goes as expected, it's time to celebrate!
		// The 'ready' event should be welcomed with music and fireworks,
		window.store.ready(() => {
			// console.log('\\o/ STORE READY \\o/');
		});

		// After we've done our setup, we tell the store to do
		// it's first refresh. Nothing will happen if we do not call window.store.refresh()
		window.store.refresh();
	}

	purchasePremium() {
		window.store.order(PREMIUM_PERSON_REPORT);
	}

	registerGoogleProducts() {
		window.store.register({
			id: 'unlim_person_28_99_1mo',
			alias: PERSON_SUBSCRIPTION_1_MONTH,
			type: window.store.PAID_SUBSCRIPTION
		});

		window.store.register({
			id: 'premium_person_report_19_99',
			alias: PREMIUM_PERSON_REPORT,
			type: window.store.CONSUMABLE
		});
	}

	registerAppleProducts() {
		window.store.register({
			id: 'unlim_person_28_99_1mo',
			alias: PERSON_SUBSCRIPTION_1_MONTH,
			type: window.store.PAID_SUBSCRIPTION
		});

		window.store.register({
			id: 'premium_person_report_19_99',
			alias: PREMIUM_PERSON_REPORT,
			type: window.store.CONSUMABLE
		});
	}
}

let appStoreAPI = new AppStoreAPI();

export default appStoreAPI;
