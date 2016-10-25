import constants from '../../constants/pubRecConstants';
import React from 'react';

const WelcomePrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal">
				<h3>Welcome to TruthFinder!</h3>
				<p><strong>Congratulations! Your account has been succesfully created and you now have access to one of the most powerful people search apps available.</strong></p>
				<p>To celebrate the launch of our new Mobile App we're granting each new user <strong>50 FREE Person reports, 30 FREE Phone Number lookups, and 30 FREE Email address lookups</strong>. As a bonus, you will also have access to our website where you can look people up and view reports on your desktop or laptop!</p>
				<div className="confirm">
					<button className="continue" onClick={props.cancel}>Search Now</button>
				</div>
			</div>
		</div>
	);
}

export default WelcomePrompt;

WelcomePrompt.PropTypes = {
	message: React.PropTypes.string.isRequired,
	cancel: React.PropTypes.func.isRequired
}