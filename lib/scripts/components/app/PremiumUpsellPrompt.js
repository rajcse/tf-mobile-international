import React from 'react';

const PremiumUpsellPrompt = (props) => {
	
	if(props.purchasePending) {
		return (
			<div id="payment-prompt">
				<div className="modal">
					<h3>Upgrading your report...</h3>
					<p>Please wait while we add more data to your your report...</p>
				</div>
			</div>
		);
	} 
	return (
		<div id="payment-prompt">
			<div className="modal">
				<h3>Additional Information!</h3>
				<p className="intro">Great News!! This report is eligible for a Premium Upgrade. The special relationships we have with our data providers allow TruthFinder members to access this valuable information for a small fee.</p>
				
				<p>Remember, your premium report content is available for you to see on any device or computer once you've logged into your TruthFinder account.</p>

				<p>Click <strong>CONTINUE</strong> to add available Premium Data to this report and see what else you can uncover. <strong>Our data providers update their databases daily!!</strong></p>
				
				<div className="confirm">
					<button className="continue" onClick={props.confirmUpsell}>Continue <span>Yes, charge me $19.99</span></button>
					<a className="cancel" onClick={props.cancelUpsell}>Cancel</a>
				</div>
			</div>
		</div>
	);
};

export default PremiumUpsellPrompt;

PremiumUpsellPrompt.propTypes = {
	purchasePending: React.PropTypes.bool.isRequired,
	confirmUpsell: React.PropTypes.func.isRequired,
	cancelUpsell: React.PropTypes.func.isRequired
};