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
	_resettingPassword = false,
	_resettingPasswordErrors = null,
	_purchaseErrors = null,
	_premiumUpsell = null,
	_standardUpsell = null,
	_premiumBundleUsed = false,
	_premiumBundle = null,
	_userSeenTimedUpsell = false,
	_crossSell = null,
	_userHasRated = false,
	_recordsViewed = 0,
	_welcomeModal = false,
	_notifications = [],
	_usage = [];

class UserStore extends EventEmitter {
	getUser() {
		return _user;
	}

	getUsage() {
		return _usage;
	}

	getWelcomeModal() {
		return _welcomeModal;
	}

	getrecordsViewed() {
		return _recordsViewed;
	}

	getPremiumBundleUsed() {
		return _premiumBundleUsed;
	}

	getPremiumBundle() {
		return _premiumBundle;
	}

	getUserSeenTimedUpsell() {
		return _userSeenTimedUpsell;
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

	getCrossSell() {
		return _crossSell;
	}

	getPremiumUpsell() {
		return _premiumUpsell;
	}

	getStandardUpsell() {
		return _standardUpsell;
	}

	getPurchaseErrors() {
		return _purchaseErrors;
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

	isResettingPassword() {
		return _resettingPassword;
	}

	getResetPasswordErrors() {
		return _resettingPasswordErrors;
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

		case constants.actions.RESET_PASSWORD:
			_resettingPassword = true;
			_resettingPasswordErrors = null;
			userStore.emitChange();
			break;

		case constants.actions.RESET_PASSWORD_FAILED:
			_resettingPassword = false;
			_resettingPasswordErrors = action.errors;
			userStore.emitChange();
			break;

		case constants.actions.RESET_PASSWORD_SUCCESSFUL:
			_resettingPassword = false;
			_resettingPasswordErrors = null;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_USER:
			_loggingIn = false;
			_loginErrors = null;
			_registering = false;
			_registerErrors = null;
			_user = action.user;
			_recordsViewed = userStore.checkRecordsViewed(action.user.id);
			_userHasRated = window.localStorage.getItem(action.user.id + ':userHasRated') || false;
			_premiumBundleUsed = window.localStorage.getItem(action.user.id + ':premiumBundleUsed') || false;
			_userSeenTimedUpsell = window.localStorage.getItem(action.user.id + ':userSeenTimedUpsell') || false;
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
			_crossSell = action.crossSell;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_PREMIUM_UPSELL:
			_premiumUpsell = action.premiumUpsell;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_PREMIUM_BUNDLE:
			_premiumBundle = action.premiumBundle;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_PREMIUM_UPSELL:
			_premiumUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_PREMIUM_BUNDLE:
			_premiumBundle = null;
			userStore.emitChange();
			break;

		case constants.actions.PREMIUM_UPGRADE_SUCCESSFUL:
			_premiumUpsell = null;
			_standardUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.RECEIVE_STANDARD_UPSELL:
			_standardUpsell = action.standardUpsell;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_STANDARD_UPSELL:
			_standardUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.STANDARD_UPGRADE_SUCCESSFUL:
			_standardUpsell = null;
			_premiumUpsell = null;
			userStore.emitChange();
			break;

		case constants.actions.CROSS_SELL_SUCCESSFUL:
			_crossSell = null;
			userStore.emitChange();
			break;

		case constants.actions.PURCHASE_ERROR:
			_purchaseErrors = action.errors;
			userStore.emitChange();
			break;

		case constants.actions.CANCEL_CROSS_SELL:
			_crossSell = null;
			userStore.emitChange();
			break;

		case constants.actions.PURCHASE_CROSS_SELL:
			userStore.emitChange();
			break;

		case constants.actions.CLEAR_PURCHASE_ERRORS:
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

		case constants.actions.MARK_USER_AS_RATED:
			_userHasRated = true;
			window.localStorage.setItem(_user.id + ':userHasRated', 'true');
			userStore.emitChange();
			break;

		case constants.actions.USED_PREMIUM_BUNDLE:
			_premiumBundleUsed = true;
			_premiumBundle = null;
			window.localStorage.setItem(_user.id + ':premiumBundleUsed', 'true');
			userStore.emitChange();
			break;

		case constants.actions.SEEN_TIMED_UPSELL:
			_userSeenTimedUpsell = true;
			window.localStorage.setItem(_user.id + ':userSeenTimedUpsell', 'true');
			userStore.emitChange();
			break;

		case constants.actions.CONFIRM_WELCOME:
			_welcomeModal = false;
			userStore.emitChange();
			break;

		case constants.actions.SHOW_WELCOME_MODAL:
			_welcomeModal = true;
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
			_crossSell = null;
			_premiumUpsell = null;
			_standardUpsell = null;
			_usage = [];
			_recordsViewed = 0;
			_registering = false;
			_registerErrors = null;
			_purchaseErrors = null;
			_userHasRated = false;
			_userSeenTimedUpsell = false;
			_welcomeModal = false;
			_notifications = [];
			userStore.emitChange();
			break;

		default:
			break;
	}
});


export default userStore;
