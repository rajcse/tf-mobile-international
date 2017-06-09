import viewActions from 'actions/viewActions';

/**
* Handles Facebook integration
* @returns {Object} Facebook client singleton
*/

class FacebookConnectPlugin {
	constructor() {
	}

	/**
	 * Initializes the client on `deviceready` event
	 */
	init() {
		// The store is not available in browser
		if (!window.facebookConnectPlugin) {
			return console.warn('Facebook Plugin not available');
		}
	}

	login() {
		//sends user to facebook login page, app if they have it, website if they dont
		window.facebookConnectPlugin.login(['public_profile', 'email'], function (userData) {
			//get the email address and name info from facebook for the authenticated user
			window.facebookConnectPlugin.api(userData.authResponse.userID + '/?fields=email,name', ['email'],
			  function onSuccess(result) {			
				viewActions.login({facebookToken: userData.authResponse.accessToken, 
					email: result.email, 
					first_name: result.name.split(' ')[0],
					last_name: result.name.split(' ')[1],
					facebook_id: userData.authResponse.userID
				});
			
			}, function onError(error) {
				console.error('Failed: ', error);
			});
		},
			function loginError(error) {
		    console.error(error);
		  }
		);
	}

	register() {
		//sends user to facebook login page, app if they have it, website if they dont
		window.facebookConnectPlugin.login(['public_profile', 'email'], function (userData) {
			//get the email address and name info from facebook for the authenticated user
			window.facebookConnectPlugin.api(userData.authResponse.userID + '/?fields=email,name', ['email'],
			  function onSuccess(result) {
				viewActions.register({facebookToken: userData.authResponse.accessToken, 
					email: result.email, 
					first_name: result.name.split(' ')[0],
					last_name: result.name.split(' ')[1],
					facebook_id: userData.authResponse.userID
				}); 
			}, function onError(error) {
				console.error('Failed: ', error);
			});
		},
			function loginError(error) {
		    console.error(error);
		  }
		);
	}
}

let facebookConnectPlugin = new FacebookConnectPlugin();

export default facebookConnectPlugin;
