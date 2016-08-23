import constants from '../../constants/pubRecConstants';
import React from 'react';

const ErrorPrompt = (props) => {
	return (
		<div id="error-prompt">
			<div className="modal">
				<h3>Oops!</h3>
				<p>{props.message}</p>
				
				<div className="confirm">
					<button className="continue" onTouchTap={props.confirmError}>Ok</button>
				</div>
			</div>
		</div>
	);
}

export default ErrorPrompt;

ErrorPrompt.PropTypes = {
	message: React.PropTypes.string.isRequired,
	confirmError: React.PropTypes.func.isRequired
}