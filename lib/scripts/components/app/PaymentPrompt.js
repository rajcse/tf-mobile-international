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
			<h3>Upgrade Your Account To Access This Report!</h3>
			<p className="intro">When you upgrade your account with Background Report access you'll be able to <span>uncover all kinds of sensitive personal information</span>.</p>
			<p className="includes">Background Reports may contain:</p>
			<ul>
				<li>Criminal and Traffic records</li>
				<li>Court Documents</li>
				<li>Birth Information</li>
				<li>Death Information</li>
				<li>Social Media Data</li>
				<li>Photos</li>
				<li>Current and Previous Addresses</li>
				<li>Email Addresses</li>
				<li>Phone Numbers</li>
				<li>Information About Relatives</li>
				<li>FAA/DEA Licenses</li>
				<li>Nearby Sex Offenders</li>
				<li>Career Information</li>
				<li>Education Information</li>
				<li>And More!!</li>
			</ul>

			<p className="billing-details">*Billing Details: {props.terms}</p>
				<div className="confirm">
					<button className="continue" onClick={props.confirmCrossSell}>I agree <span>yes, charge me {props.recurring_price}</span></button>
					<a className="cancel" onClick={props.cancelCrossSell}>Cancel</a>
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