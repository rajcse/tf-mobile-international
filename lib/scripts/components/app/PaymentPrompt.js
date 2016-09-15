import React from 'react';

const PaymentPrompt = (props) => {
	
	if(props.purchasePending) {
		return (
			<div id="payment-prompt">
				<div className="modal">
					<h3>Upgrading your subscription...</h3>
					<p>Please wait while we upgrade</p>
				</div>
			</div>

		);
	} 
	return (
		<div id="payment-prompt">
			<div className="modal">
			<h3>It appears you don't have access to this content!</h3>
				<p>{props.name} - {props.sku}</p>		
				<div className="confirm">
					<button className="cancel" onClick={props.cancelCrossSell}>Cancel</button>
					<button className="continue" onClick={props.confirmCrossSell}>Continue</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentPrompt;

PaymentPrompt.propTypes = {
	name: React.PropTypes.string.isRequired,
	sku: React.PropTypes.string.isRequired,
	confirmCrossSell: React.PropTypes.func.isRequired,
	cancelCrossSell: React.PropTypes.func.isRequired
};