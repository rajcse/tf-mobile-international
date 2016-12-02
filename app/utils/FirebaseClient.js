import serverActions from 'actions/serverActions';
import uuid from 'uuid';

/**
* Handles Firebase integration
* @returns {Object} Firebase client singleton
*/

class FirebaseClient {
	constructor() {
		this.deviceToken = null;
	}

	/**
	 * Initializes the client on `deviceready` event
	 */
	init() {
		// Affects iOS only
		// window.FirebasePlugin.grantPermission();

		// Set the device token
		window.FirebasePlugin.onTokenRefresh(token => this.deviceToken = token, e => console.error(e));

		// Trigger notification action
		window.FirebasePlugin.onNotificationOpen(notification => {
			const clientData = {
				content: notification.content,
				title: notification.title,
				level: notification.level,
				timestamp: notification['google.sent_time'] || Date.now(),
				id: notification['google.message_id'] || uuid.v4()
			};

			serverActions.receiveNotification(clientData);
		});
	}
}

let firebaseClient = new FirebaseClient();
window.firebaseClient = firebaseClient;
export default firebaseClient;
