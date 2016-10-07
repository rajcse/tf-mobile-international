import constants from '../../constants/pubRecConstants';
import React from 'react';

const RatingsPrompt = (props) => {
	return (
		<div id="ratings-prompt">
			<div className="modal">
				<h3>Help us get better!</h3>
				<p>{props.message}</p>

				<div className="confirm">
					<button className="continue" onClick={props.storeRating}>IT'S GREAT!</button>
				</div>
				
				<div className="cancel">
					<button className="cancel" onClick={props.support}>I DON'T LIKE IT</button>
				</div>
			</div>
		</div>
	);
}

export default RatingsPrompt;

RatingsPrompt.PropTypes = {
	message: React.PropTypes.string.isRequired,
	storeRating: React.PropTypes.func.isRequired,
	support: React.PropTypes.func.isRequired
}