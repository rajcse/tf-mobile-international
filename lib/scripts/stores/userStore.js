import {EventEmitter} from 'events';
import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

var _user = null,
    _loggingIn = false,
    _usageLoading = false,
    _usage = [];

class UserStore extends EventEmitter {
    getUser() {
        return _user;
    }
    getUsage() {
        return _usage;
    }

    // TODO: This should check JWT expiration etc.
    // TODO: This should completely destroy all user info if their session is no longer valid
    // This gets called on every single app render, so it needs to be FAST
    isLoggedIn() {
        return _user !== null;
    }
    
    isLoggingIn() {
        return _loggingIn;
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
        case constants.actions.LOGIN:
            _loggingIn = true;
            userStore.emitChange();
            break;
            
        case constants.actions.RECEIVE_USER:
            _user = action.user;
            _loggingIn = false;
            userStore.emitChange();
            break;

        case constants.actions.RECEIVE_USAGE:
            console.log(action.usage);
            _usage = action.usage;
            userStore.emitChange();
            break;
            
        // This waits for the PubRecAPI to clear its jwt state
        case constants.actions.LOGGED_OUT:
            _user = null;
            _loggingIn = false;
            _usage = [];
            userStore.emitChange();
            break;

        default:
            break;
    }
});


export default userStore;
