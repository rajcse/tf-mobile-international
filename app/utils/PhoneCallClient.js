import viewActions from 'actions/viewActions';

/**
* Handles Call interception logic
*/

class PhoneCallClient {
	constructor() {

	}

	init() {
		window.phoneNumber = false;
	}

	listenIncomingCalls() {
		// Cleanly return if PhoneCallTrap plugin is missing
		if(!window.PhoneCallTrap) return;

		document.addEventListener('resume', onResume, false);

		function onResume() {
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
					// window.phoneNumber = callingNumber;

					//just test remve this aasp
					//setTimeout(() => viewActions.goToSearch({type: 'phone', query: {phone: callingNumber}}), 0);

					//unset phonenumber in 30 seconds -- TTL 30 sec
					// setTimeout(() => window.phoneNumber = false, 30000);
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
