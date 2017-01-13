import React, { Component } from 'react';
import firebaseClient from 'utils/firebaseClient';
import viewActions from 'actions/viewActions';

class WelcomePrompt extends Component {
	constructor() {
		super();

		this.state = {
			message1: '',
			message2: ''
		};
	}

	componentWillMount() {
		const message1Promise = firebaseClient.getConfigValue('welcome_message1'),
			message2Promise = firebaseClient.getConfigValue('welcome_message2');

		Promise.all([message1Promise, message2Promise])
			.then(messages => {
				this.setState({
					message1: messages[0],
					message2: messages[1]
				});
			});
	}

	render() {
		return (
			<div id="success-prompt">
				<div className="modal">
					<h3>Welcome to TruthFinder!</h3>
					<p><strong>{this.state.message1}</strong></p>
					<p>{this.state.message2}</p>
					<div className="confirm">
						<button className="continue" onClick={viewActions.confirmWelcome}>Search Now</button>
					</div>
				</div>
			</div>
		);
	}
}

export default WelcomePrompt;
