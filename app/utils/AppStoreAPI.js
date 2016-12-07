/**
* Handles all communication with the app store as well as API purchase handling
* @return {Object} App Store Singleton
*/

import constants from 'constants/pubRecConstants';

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

		// Set some constants mapping App store types to PubRec types
		this.PRODUCTS = [window.store.CONSUMABLE, window.store.NON_CONSUMABLE];
		this.PLANS = [window.store.NON_RENEWING_SUBSCRIPTION, window.store.PAID_SUBSCRIPTION, window.store.FREE_SUBSCRIPTION];

		if(window.device.platform === 'iOS') {
			this.registerAppleProducts();
			this.PAYMENT_PROCESSOR = constants.inAppPaymentProcessors.APPLE;
		}

		if(window.device.platform === 'Android') {
			this.registerGoogleProducts();
			this.PAYMENT_PROCESSOR = constants.inAppPaymentProcessors.GOOGLE;
		}

		window.store.when(constants.productTypes.PREMIUM_PERSON_REPORT_IAP).approved(p => {
			p.verify();
		});

		window.store.when(constants.productTypes.PREMIUM_PERSON_REPORT_IAP).verified(p => {
			p.finish();
		});

		// window.store.when(constants.planTypes.PERSON_REPORT_1_MONTH_IAP).approved(p => {
		// 	p.verify();
		// });
		//
		// window.store.when(constants.planTypes.PERSON_REPORT_1_MONTH_IAP).verified(p => {
		// 	p.finish();
		// });
		//
		// window.store.when(constants.planTypes.PERSON_REPORT_1_MONTH_IAP).unverified(p => {
		//
		// });
		//
		// window.store.when(constants.planTypes.PERSON_REPORT_1_MONTH_IAP).updated(p => {
		//
		// });

		// Log all errors
		window.store.error(error => {
			console.error('STORE:ERROR', error);

		});

		window.store.ready(() => {

		});

		// After we've done our setup, we tell the store to do
		// it's first refresh. Nothing will happen if we do not call window.store.refresh()
		window.store.refresh();
	}

	/**
	 * Set a custom validator method. This gets called from pubRecAPI in its constructor
	 */
	setValidator(validator) {
		// Make sure store is available
		if(window.store) return window.store.validator = validator;
	}

	/**
	 * Register a callback that fires only once
	 */
	registerOnce(productAlias, action, cb) {
		window.store.once(productAlias, action, cb);
	}

	/**
	 * Unregister any callback
	 */
	unregister(cb) {
		window.store.off(cb);
	}

	getProductInfo(productAlias) {
		return window.store.get(productAlias);
	}

	purchaseProduct(productAlias) {
		return window.store.order(productAlias);
	}

	registerGoogleProducts() {
		// window.store.register({
		// 	id: 'unlim_person_28_99_1mo',
		// 	alias: constants.planTypes.PERSON_REPORT_1_MONTH_IAP,
		// 	type: window.store.PAID_SUBSCRIPTION
		// });

		window.store.register({
			id: 'premium_person_report_9_99',
			alias: constants.productTypes.PREMIUM_PERSON_REPORT_IAP,
			type: window.store.CONSUMABLE
		});
	}

	registerAppleProducts() {
		// window.store.register({
		// 	id: 'unlim_person_28_99_1mo',
		// 	alias: constants.planTypes.PERSON_REPORT_1_MONTH_IAP,
		// 	type: window.store.PAID_SUBSCRIPTION
		// });

		window.store.register({
			id: 'premium_person_report_9_99',
			alias: constants.productTypes.PREMIUM_PERSON_REPORT_IAP,
			type: window.store.CONSUMABLE
		});
	}
}

let appStoreAPI = new AppStoreAPI();

export default appStoreAPI;
