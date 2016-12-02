import _ from 'lodash';
import {EventEmitter} from 'events';
import constants from 'constants/pubRecConstants';
import dispatcher from 'dispatcher';

const CHANGE_EVENT = 'change';

let _user = null,
	_accountInfo = null,
	_registering = false,
	_registerErrors = null,
	_loggingIn = false,
	_loginErrors = null,
	_purchasePending = false,
	_purchaseErrors = null,
	_premiumUpsell = null,
	_productCrossSell = null,
	_purchaseSuccess = false,
	_rated = false,
	// Just in case our value gets borked, we need to check to make sure it's a number before coercing, otherwise we'll be incrementing NaN forever
	_recordsViewed = !Number.isNaN(Number(window.localStorage.getItem('recordsViewed'))) ? Number(window.localStorage.getItem('recordsViewed')) : 0,
	_premiumAccess = false, // Default to false, hit user endpoint to check for access on app start/login/refresh token
	_welcomeModalStatus = false,
	_notifications = [],
	_usage = [];

class UserStore extends EventEmitter {
	getUser() {
		return _user;
	}

	getUsage() {
		return _usage;
	}

	getPremiumAccess() {
		return _premiumAccess;
	}

	getWelcomeModalStatus() {
		return _welcomeModalStatus;
	}

	getrecordsViewed() {
		return _recordsViewed;
	}

	incrementRecordsViewed() {
		window.localStorage.setItem('recordsViewed', ++_recordsViewed);
	}

	getRated() {
		return _rated;
	}

	getAccountInfo() {
		return _accountInfo;
	}

	getProductCrossSell() {
		return _productCrossSell;
	}

	getPremiumUpsell() {
		return _premiumUpsell;
	}

	getPurchasePending() {
		return _purchasePending;
	}

	getPurchaseErrors() {
		return _purchaseErrors;
	}

	getPurchaseSuccess() {
		return _purchaseSuccess;
	}

	isRegistering() {
		return _registering;
	}

	getRegisterErrors() {
		return _registerErrors;
	}

	isLoggingIn() {
		return _loggingIn;
	}

	getLoginErrors() {
		return _loginErrors;
	}

	// This gets called on every single app render, so it needs to be FAST
	// We don't care if the access token is expired, the API will handle that
	isLoggedIn() {
		return _user !== null;
	}

	getNotifications() {
		return _notifications;
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}

let userStore = new UserStore();

// Register callback to handle all updates
dispatcher.register(action => {
	switch(action.actionType) {
		case constants.actions.CHECK_LOCAL_USER:
			break;

		case constants.actions.REGISTER:
			_registering = true;
			_registerErrors = null;
			userStore.emitChange();
			break;

		case constants.actions.REGISTER_FAILED:
			_registering = false;
			_registerErrors = action.errors;
			userStore.emitChange();
			break;

		case constants.actions.LOGIN:
			_loggingIn = true;
			_loginErrors = null;
			userStore.emitChange();
			break;

		case constants.actions.LOGIN_FAILED:
			_loggingIn = false;
			_loginErrors = action.errors;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_USER:
			_loggingIn = false;
			_loginErrors = null;
			_user = action.user;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_ACCOUNT_INFO:
			_accountInfo = action.account;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_USAGE:
			_usage = action.usage;
			userStore.emitChange();
			break;

		case constants.actions.PAYMENT_REQUIRED:
			_productCrossSell = action.product;
			userStore.emitChange();
			break;

		case constants.actions.SHOW_PREMIUM_UPSELL:
			_premiumUpsell = action.recordId;
			userStore.emitChange();
			break;

		case constants.actions.CONFIRM_PREMIUM_UPSELL:
			_purchasePending = true;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_PREMIUM_UPSELL:
			_premiumUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.PURCHASE_SUCCESSFUL:
			_premiumUpsell = null;
			_productCrossSell = null;
			_purchasePending = false;
			_purchaseSuccess = true;
			userStore.emitChange();
			break;

		case constants.actions.PURCHASE_ERROR:
			_purchasePending = false;
			_purchaseErrors = action.errors;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_CROSS_SELL:
			_productCrossSell = null;
			_purchasePending = false;
			userStore.emitChange();
			break;

		case constants.actions.CONFIRM_CROSS_SELL:
			_purchasePending = true;
			userStore.emitChange();
			break;

		case constants.actions.CLEAR_USER_ERRORS:
			_purchaseErrors = null;
			userStore.emitChange();
			break;

		case constants.actions.GOTO_SEARCH:
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_NOTIFICATION:
			console.log(action.notification);
			_notifications.push(action.notification);
			userStore.emitChange();
			break;

		case constants.actions.CLEAR_NOTIFICATION:
			console.log(_.remove(_notifications, {id: action.id}));
			_.remove(_notifications, {id: action.id});
			userStore.emitChange();
			break;

		case constants.actions.CLEAR_SUCCESS:
			_purchaseSuccess = false;
			userStore.emitChange();
			break;

		case constants.actions.RATE:
			_rated = true;
			userStore.emitChange();
			break;

		case constants.actions.CONFIRM_WELCOME:
			_welcomeModalStatus = false;
			userStore.emitChange();
			break;

		case constants.actions.SET_WELCOME_STATUS:
			_welcomeModalStatus = true;
			userStore.emitChange();
			break;

		case constants.actions.VIEW_UNCACHED_RECORD:
			userStore.incrementRecordsViewed();
			userStore.emitChange();
			break;

		case constants.actions.ENABLE_PREMIUM_ACCESS:
			_premiumAccess = true;
			userStore.emitChange();
			break;

		// This waits for the PubRecAPI to clear its jwt state
		case constants.actions.LOGGED_OUT:
			_user = null;
			_accountInfo = null;
			_loggingIn = false;
			_loginErrors = null;
			_productCrossSell = null;
			_premiumUpsell = null;
			_purchaseSuccess = false;
			_purchasePending = false;
			_premiumAccess = false;
			_usage = [];
			_recordsViewed = 0;
			window.localStorage.removeItem('recordsViewed');
			userStore.emitChange();
			break;

		default:
			break;
	}
});


export default userStore;
