import React from 'react';

const PaymentPrompt = (props) => {
	return (
		<div id="payment-prompt">
			<div className="modal">
				<h3>It appears you don't have access to this content!</h3>
				
				<p>{props.name} - {props.sku}</p>

				<div className="confirm">
					<button className="cancel" onTouchTap={props.cancelUpsell}>Cancel</button>
					<button className="continue" onTouchTap={props.confirmCrosssell}>Continue</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentPrompt;

PaymentPrompt.propTypes = {
	name: React.PropTypes.string.isRequired,
	message: React.PropTypes.string.isRequired,
	sku: React.PropTypes.string.isRequired,
	confirmCrosssell: React.PropTypes.func.isRequired,
	cancelUpsell: React.PropTypes.func.isRequired
};
