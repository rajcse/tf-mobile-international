import {EventEmitter} from 'events';
import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

var _user = null,
    _usage = [];

class UserStore extends EventEmitter {
    getUser() {
        return _user;
    }

    // TODO: This should check JWT expiration etc.
    // TODO: This should completely destroy all user info if their session is no longer valid
    // This gets called on every single app render, so it needs to be FAST
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
        case constants.actions.RECEIVE_USER:
            _user = action.user;
            userStore.emitChange();
            break;

        case constants.actions.LOGOUT:
            _user = null;
            _usage = [];
            userStore.emitChange();
            break;

        default:
            break;
    }
});


export default userStore;
