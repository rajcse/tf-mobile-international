import constants from '../../constants/pubRecConstants';
import React from 'react';

const PremiumUpsellPrompt = (props) => {

	let { firstName } = props;
	return (
		<div id="payment-prompt">
			<div className="modal">
				<h3>Additional Information!</h3>
				<p className="intro">Great News!! {props.firstName}'s report is eligible for a Premium Upgrade. The special relationships we have with our data providers allow TruthFinder members to access this valuable information for a small fee.</p>
				<p>Click <strong>CONTINUE</strong> to add available Premium Data to this report and see what else you can uncover about {props.firstName}. <strong>Our data providers update their databases daily!!</strong></p>
				
				<div className="confirm">
					<button className="continue" onTouchTap={props.confirmUpsell}>Continue <span>Yes, charge me $19.99</span></button>
					<a className="cancel" onTouchTap={props.cancelUpsell}>Cancel</a>
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