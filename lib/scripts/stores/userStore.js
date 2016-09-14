import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

let _user = null,
	_accountInfo = null,
	// _usageLoading = false,
	_loggingIn = false,
	_loginErrors = null,
	_premiumUpsell = null,
	_productCrossSell = null,
	_usage = [];

class UserStore extends EventEmitter {
	getUser() {
		return _user;
	}

	getUsage() {
		return _usage;
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
dispatcher.register(function(action) {
	switch(action.actionType) {
	case constants.actions.CHECK_LOCAL_USER:
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

	// Both actions should clear the upsell status
	// 1. Upsell confirmed, object already handed off
	// or 2. Upsell canceled, no longer need the reference
	case constants.actions.CANCEL_PREMIUM_UPSELL:
	case constants.actions.CONFIRM_PREMIUM_UPSELL:
		_premiumUpsell = null;
		userStore.emitChange();
		break;
		
	
	case constants.actions.CANCEL_CROSS_SELL:
	case constants.actions.CONFIRM_CROSS_SELL:
		_productCrossSell = null;
		userStore.emitChange();
		break;
		
	case constants.actions.REFRESH_PRODUCT_UPSELL:
		_productCrossSell = null;
		userStore.emitChange();
		break;


	// This waits for the PubRecAPI to clear its jwt state
	case constants.actions.LOGGED_OUT:
		_user = null;
		_accountInfo = null;
		// _usageLoading = false;
		_loggingIn = false;
		_loginErrors = null;
		_productCrossSell = null;
		_usage = [];
		userStore.emitChange();
		break;

	default:
		break;
	}
});


export default userStore;
