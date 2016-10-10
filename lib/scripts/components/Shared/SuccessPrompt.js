import constants from '../../constants/pubRecConstants';
import React from 'react';

const SuccessPrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal">
				<h3>Success!</h3>
				<p>{props.message}</p>
				
				<div className="confirm">
					<button className="continue" onClick={props.confirmSuccess}>Continue</button>
				</div>
			</div>
		</div>
	);
}

export default SuccessPrompt;

SuccessPrompt.PropTypes = {
	message: React.PropTypes.string.isRequired,
	confirmSuccess: React.PropTypes.func.isRequired
}