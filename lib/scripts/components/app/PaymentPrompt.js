import React from 'react';

const PaymentPrompt = (props) => {
	return (
		<div id="payment-prompt">
			<div className="modal">
				<h3>Attention!</h3>
				<p>{props.name} - {props.sku}</p>

				<div className="confirm">
					<button className="cancel" onTouchTap={props.cancelUpsell}>Cancel</button>
					<button className="continue" onTouchTap={props.confirmUpsell}>Continue</button>
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
	confirmUpsell: React.PropTypes.func.isRequired,
	cancelUpsell: React.PropTypes.func.isRequired
};
