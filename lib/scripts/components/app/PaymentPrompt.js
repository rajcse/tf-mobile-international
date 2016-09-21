import React from 'react';

const PaymentPrompt = (props) => {
	
	if(props.purchasePending) {
		return (
			<div id="payment-prompt">
				<div className="modal">
					<h3>Upgrading Your Account...</h3>
					<p>Please do not refresh the page or press the back button.</p>
				</div>
			</div>

		);
	} 
	
	let content = [];
	
	switch (props.item_type) {
		case 'person_report':
			content.push(
				<div>
					<h3>Upgrade Your Account To Access This Report!</h3>
					<p className="intro">When you upgrade your account with Background Report access you'll be able to <span>uncover all kinds of sensitive personal information</span>.</p>
					<p className="includes">Background Reports may contain:</p>
					<ul>
						<li>Criminal Records</li>
						<li>Traffic Records</li>
						<li>Court Documents</li>
						<li>Birth Information</li>
						<li>Death Information</li>
						<li>Social Media Data</li>
						<li>Photos</li>
						<li>Address History</li>
						<li>Email Addresses</li>
						<li>Phone Numbers</li>
						<li>Relatives</li>
						<li>FAA/DEA Licenses</li>
						<li>Nearby Sex Offenders</li>
						<li>Career Information</li>
						<li>Education Information</li>
						<li>And More!!</li> 
					</ul>
				</div>
			);
			break;
		case 'phone_report':
			content.push(
				<div>
					<h3>Upgrade Your Account To Access This Report!</h3>
					<p className="intro">When you upgrade your account with Background Report access you'll be able to <span>uncover all kinds of sensitive personal information</span>.</p>
					<p className="includes">Background Reports may contain:</p>
					<ul>
						<li>Name</li>
						<li>Photos</li>
						<li>Current Address</li>
						<li>Social Media Data</li>
						<li>Possible Associates</li>
						<li>Address History</li>
						<li>Career Information</li>
						<li>Email Addresses</li>
						<li>Online Account Usernames</li>
						<li>Education Information</li>
						<li>And More!!</li>
					</ul>
				</div>
			);
			break;
		case 'email_report':
			content.push(
				<div>
					<h3>Upgrade Your Account To Access This Report!</h3>
					<p className="intro">When you upgrade your account with Background Report access you'll be able to <span>uncover all kinds of sensitive personal information</span>.</p>
					<p className="includes">Background Reports may contain:</p>
					<ul>
						<li>Name</li>
						<li>Photos</li>
						<li>Followers or Friends</li>
						<li>Social Media Data</li>
						<li>Address History</li>
						<li>Career Information</li>
						<li>Other Email Addresses</li>
						<li>Online Account Usernames</li>
						<li>Education Information</li>
						<li>And More!!</li>
					</ul>
				</div>
			);
			break;
	}
	
	return (
		<div id="payment-prompt">
			<div className="modal">
				{content}
				<p className="billing-details">*Billing Details: {props.terms}</p>
				<div className="confirm">
					<button className="continue" onClick={props.confirmCrossSell}>I agree <span>yes, charge me ${props.recurring_price}/mo</span></button>
					<a className="cancel" onClick={props.cancelCrossSell}>Cancel</a>
				</div>
			</div>
		</div>
	);
};

export default PaymentPrompt;

PaymentPrompt.propTypes = {
	terms: React.PropTypes.string.isRequired,
	item_type: React.PropTypes.string.isRequired,
	recurring_price: React.PropTypes.number.isRequired,
	confirmCrossSell: React.PropTypes.func.isRequired,
	cancelCrossSell: React.PropTypes.func.isRequired
};