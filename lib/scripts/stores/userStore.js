import {EventEmitter} from 'events';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

var _user = null,
    _usageLoading = false,
    _loggingIn = false,
    _loginErrors = null,
    _productUpsell = null,
    _usage = [];

class UserStore extends EventEmitter {
    getUser() {
        return _user;
    }

    getUsage() {
        return _usage;
    }
    
    getProductUpsell() {
        return _productUpsell;
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

var userStore = new UserStore();

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

        case constants.actions.RECEIVE_USAGE:
            _usage = action.usage;
            userStore.emitChange();
            break;
            
        case constants.actions.PAYMENT_REQUIRED:
            _productUpsell = action.product;
            userStore.emitChange();
            break;
        
        // Both actions should clear the upsell status
        // 1. Upsell confirmed, object already handed off
        // or 2. Upsell canceled, no longer need the reference
        case constants.actions.CANCEL_UPSELL:
        case constants.actions.CONFIRM_UPSELL:
            _productUpsell = null;
            userStore.emitChange();
            break;

        // This waits for the PubRecAPI to clear its jwt state
        case constants.actions.LOGGED_OUT:
            _user = null;
            _usage = [];
            userStore.emitChange();
            break;

        default:
            break;
    }

});


export default userStore;
