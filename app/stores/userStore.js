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
	_userHasRated = false,
	_recordsViewed = 0,
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

	getWelcomeModalStatus() {
		return _welcomeModalStatus;
	}

	getrecordsViewed() {
		return _recordsViewed;
	}

	checkRecordsViewed(userId) {
		let recordsViewed = !Number.isNaN(Number(window.localStorage.getItem(userId + ':recordsViewed'))) ? Number(window.localStorage.getItem(userId + ':recordsViewed')) : 0;

		// If there are no records views, check for and convert legacy values to namespaced values
		if(!recordsViewed && !Number.isNaN(Number(window.localStorage.getItem('recordsViewed'))) && Number(window.localStorage.getItem('recordsViewed'))) {
			recordsViewed = Number(window.localStorage.getItem('recordsViewed'));
			window.localStorage.setItem(userId + ':recordsViewed', recordsViewed);
		}

		// Delete the old value
		window.localStorage.removeItem('recordsViewed');

		return recordsViewed;
	}

	incrementRecordsViewed() {
		window.localStorage.setItem(_user.id + ':recordsViewed', ++_recordsViewed);
	}

	getUserHasRated() {
		return _userHasRated;
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
			_recordsViewed = userStore.checkRecordsViewed(action.user.id);
			_userHasRated = window.localStorage.getItem(action.user.id + ':userHasRated') || false;
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

		case constants.actions.RECEIVE_PREMIUM_UPSELL:
			_premiumUpsell = action.premiumUpsell;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_PREMIUM_UPSELL:
			_premiumUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.PREMIUM_UPGRADE_SUCCESSFUL:
			_premiumUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.PURCHASE_SUCCESSFUL:
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
			_notifications.push(action.notification);
			userStore.emitChange();
			break;

		case constants.actions.CLEAR_NOTIFICATION:
			_.remove(_notifications, {id: action.id});
			userStore.emitChange();
			break;

		case constants.actions.CLEAR_SUCCESS:
			_purchaseSuccess = false;
			userStore.emitChange();
			break;

		case constants.actions.MARK_USER_AS_RATED:
			_userHasRated = true;
			window.localStorage.setItem(_user.id + ':userHasRated', 'true');
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
			_usage = [];
			_recordsViewed = 0;
			userStore.emitChange();
			break;

		default:
			break;
	}
});


export default userStore;
