import viewActions from 'actions/viewActions';

/**
* Handles Call interception logic
*/

class PhoneCallClient {
	constructor() {

	}

	init() {
		
	}

	listenIncomingCalls() {
		
		// Cleanly return if PhoneCallTrap plugin is missing
		if(!window.PhoneCallTrap) return;

		//add an event listener to fire onResume when the app is resumed (get back into foreground)
		document.addEventListener('resume', onResume, false);

		function onResume() {

			//if we still have the incomingcall variable in local storage go to search for the number
			if(window.localStorage.getItem('incomingCall')) {
				setTimeout(() => viewActions.goToSearch({type: 'phone', query: {phone: window.localStorage.getItem('incomingCall')}}), 0);
			}
		}

		window.PhoneCallTrap.onCall(function (obj) {

			let callObj = JSON.parse(obj),
				state = callObj.state,
				callingNumber = callObj.incomingNumber;

			switch (state) {
				case 'RINGING':
					console.log('Phone is ringing', callingNumber);

					window.localStorage.setItem('incomingCall', callingNumber);
					
					setTimeout(() => window.localStorage.setItem('incomingCall', false), 30000);
					break;
				case 'OFFHOOK':
					console.log('Phone is off-hook');
					break;
				case 'IDLE':
					console.log('Phone is idle');
					break;
			}
		});
	}
}

let phoneCallClient = new PhoneCallClient();

export default phoneCallClient;
