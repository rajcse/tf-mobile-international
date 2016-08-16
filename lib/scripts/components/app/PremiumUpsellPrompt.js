import constants from '../../constants/pubRecConstants';
import React from 'react';

const PremiumUpsellPrompt = (props) => {
	return (
		<div id="payment-prompt">
			<div className="modal">
				<h3>Upgrade Report to Premium!</h3>
				<p>{props.name}</p>
				
				<div className="confirm">
					<button className="cancel" onTouchTap={props.cancelUpsell}>Cancel</button>
					<button className="continue" onTouchTap={props.confirmUpsell}>Continue</button>
				</div>
			</div>
		</div>
	);
}

export default PremiumUpsellPrompt;

PremiumUpsellPrompt.PropTypes = {
	message: React.PropTypes.string.isRequired,
	confirmUpsell: React.PropTypes.func.isRequired,
	cancelUpsell: React.PropTypes.func.isRequired,
	recordId: React.PropTypes.string.isRequired
}