import serverActions from 'actions/serverActions';
import constants from 'constants/pubRecConstants';
import uuid from 'uuid';

/**
* Handles Firebase integration
* @returns {Object} Firebase client singleton
*/

class FirebaseClient {
	constructor() {
		this.deviceToken = null;
		this.isAndroid = false; // TEMP: Remove this when iOS support is available for remote config
		this.remoteConfigDefaults = {
			rating_text: 'Would you mind taking a moment to rate us 5 stars? Thanks for your support!',
			welcome_message1: 'Congratulations! Your account has been succesfully created and you now have access to one of the most powerful people search apps available.',
			welcome_message2: 'Your account includes unlimited FREE Person Reports, and a complimentary bundle of 10 Phone Number lookups and 10 Email Address lookups. Enjoy!',
			criminal_upsell: 'details',
			standard_upsell: 'default',
			premium_prompt: ''
		};
	}

	/**
	 * Initializes the client on `deviceready` event
	 */
	init() {
		// Affects iOS only
		if(window.device.platform === 'iOS') window.FirebasePlugin.grantPermission();

		this.isAndroid = window.device.platform === 'Android'; // TEMP: Remove this when iOS support is available for remote config

		// Get the initial token value (this should available by deviceReady)
		window.FirebasePlugin.getToken(token => {
			this.deviceToken = token;
		}, e => console.error(e));

		// Set the device token if it changes
		window.FirebasePlugin.onTokenRefresh(token => {
			this.deviceToken = token;
		}, e => console.error(e));

		// Trigger notification action
		window.FirebasePlugin.onNotificationOpen(notification => {
			const clientData = {
				content: notification.content,
				title: notification.title,
				level: notification.level,
				action: notification.action,
				timestamp: notification['google.sent_time'] || Date.now(),
				id: notification['google.message_id'] || uuid.v4()
			};

			serverActions.receiveNotification(clientData);
		});

		if(this.isAndroid) {
			// Set default values on the client for all Remote Configs being used
			window.FirebasePlugin.setDefaults(this.remoteConfigDefaults);

			// Fetch remote config and activate the values
			this.refreshRemoteConfig();
		}
	}

	logEvent(eventName, eventData = {}) {
		// Cleanly return if Firebase plugin is missing
		if(!window.FirebasePlugin) return;

		// Event data must be present (non-null), one level, keys are limited to 40 characters and values may be String or Number, with a limit of 100 characters
		window.FirebasePlugin.logEvent(eventName, eventData);
	}

	setUserId(id) {
		// Cleanly return if Firebase plugin is missing
		if(!window.FirebasePlugin) return;

		// Value must be a string
		window.FirebasePlugin.setUserId(String(id));
	}

	setUserProperty(prop, value) {
		// Cleanly return if Firebase plugin is missing
		if(!window.FirebasePlugin) return;

		// Value must be a string - 36 character max
		window.FirebasePlugin.setUserProperty(prop, String(value));
	}

	subscribe(topic) {
		// Cleanly return if Firebase plugin is missing
		if(!window.FirebasePlugin) return;

		window.FirebasePlugin.subscribe(topic);
	}

	unsubscribe(topic) {
		// Cleanly return if Firebase plugin is missing
		if(!window.FirebasePlugin) return;

		window.FirebasePlugin.unsubscribe(topic);
	}

	unsubscribeAll() {
		// Cleanly return if Firebase plugin is missing
		if(!window.FirebasePlugin) return;

		Object.keys(constants.firebase.topics).forEach(key => window.FirebasePlugin.unsubscribe(constants.firebase.topics[key]));
	}

	refreshRemoteConfig() {
		window.FirebasePlugin.fetch(() => {
			window.FirebasePlugin.activateFetched();
		}, error => console.error(error));
	}

	getConfigValue(key) {
		// Cleanly return config default if Firebase plugin is missing
		if(!window.FirebasePlugin || !this.isAndroid) return new Promise(resolve => resolve(this.remoteConfigDefaults[key] || ''));

		return new Promise((resolve, reject) => {
			window.FirebasePlugin.getValue(key, value => resolve(value), error => reject(error));
		});
	}

	progressFunnel(topic) {
		const currentLevel = constants.firebase.funnelSteps.indexOf(window.localStorage.getItem('currentFunnelTopic')),
			nextLevel = constants.firebase.funnelSteps.indexOf(topic);

		if(window.localStorage.getItem('skipFunnel') === 'true') {
			window.localStorage.removeItem('currentFunnelTopic');
			constants.firebase.funnelSteps.forEach(key => this.unsubscribe(key));
			return;
		}

		if(~currentLevel && nextLevel > currentLevel) {
			window.localStorage.setItem('currentFunnelTopic', topic);

			constants.firebase.funnelSteps.forEach(key => this.unsubscribe(key));
			this.subscribe(topic);
		} else if(!~currentLevel && nextLevel === 0) {
			window.localStorage.setItem('currentFunnelTopic', topic);

			constants.firebase.funnelSteps.forEach(key => this.unsubscribe(key));
			this.subscribe(topic);
		}
	}
}

let firebaseClient = new FirebaseClient();

export default firebaseClient;
