import constants from '../../constants/pubRecConstants';
import React from 'react';

const WelcomePrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal">
				<h3>credits bla bla!</h3>
				<p>{props.message}</p>
				
				<div className="confirm">
					<button className="continue" onClick={props.cancel}>OK</button>
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