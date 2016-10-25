import constants from '../../constants/pubRecConstants';
import React from 'react';

const WelcomePrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal">
				<h3>Welcome to TruthFinder!</h3>
				<p><strong>{props.message1}</strong></p>
				<p>{props.message2}</p>
				<div className="confirm">
					<button className="continue" onClick={props.confirmWelcome}>Search Now</button>
				</div>
			</div>
		</div>
	);
}

export default WelcomePrompt;

WelcomePrompt.PropTypes = {
	message1: React.PropTypes.string.isRequired,
	message2: React.PropTypes.string.isRequired,
	confirmWelcome: React.PropTypes.func.isRequired
}