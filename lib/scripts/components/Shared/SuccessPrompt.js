import constants from '../../constants/pubRecConstants';
import React from 'react';

const SuccessPrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal">
				<h3>You got it!</h3>
				<p>{props.message}</p>
				
				<div className="confirm">
					<button className="continue" onClick={props.confirmSuccess}>Ok</button>
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