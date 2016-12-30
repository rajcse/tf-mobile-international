import React from 'react';
import viewActions from 'actions/viewActions';

const WelcomePrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal">
				<h3>Welcome to TruthFinder!</h3>
				<p><strong>{props.message1}</strong></p>
				<p>{props.message2}</p>
				<div className="confirm">
					<button className="continue" onClick={viewActions.confirmWelcome}>Search Now</button>
				</div>
			</div>
		</div>
	);
};

WelcomePrompt.propTypes = {
	message1: React.PropTypes.string.isRequired,
	message2: React.PropTypes.string.isRequired
};

export default WelcomePrompt;
