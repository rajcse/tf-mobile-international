import React, { Component, PropTypes } from 'react';
import constants from 'constants/pubRecConstants';
import viewActions from 'actions/viewActions';
import Loader from 'components/Loader';

class PaymentPrompt extends Component {

	constructor(props) {
		super(props);

		this.state = {
			purchasePending: false
		};

		this.purchaseCrossSell = this.purchaseCrossSell.bind(this);
		this.cancelCrossSell = this.cancelCrossSell.bind(this);
	}

	purchaseCrossSell() {
		this.setState({
			purchasePending: true
		});
		viewActions.clearRecordError(false);
		viewActions.purchaseCrossSell(this.props.crossSell);
	}

	cancelCrossSell() {
		viewActions.cancelCrossSell();
	}

	render() {
		if(this.state.purchasePending) {
			return (
				<div id="payment-prompt">
					<div className="modal modal-transparent">
						<Loader />
						<h3>Upgrading Your Account</h3>
						<p>Please wait while we upgrade your account...</p>
					</div>
				</div>
			);
		}

		let content = null;

		switch (this.props.crossSell.original_criteria.type) {
			case constants.recordTypes.PERSON:
				content = (
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

			case constants.recordTypes.PHONE:
				content = (
					<div>
						<h3>Upgrade Your Account To Access This Report!</h3>
						<p className="intro">When you upgrade your account with Phone Report access you'll be able to search for any phone number in the U.S. and uncover information about the owner.</p>
						<p className="includes">Phone Reports may contain:</p>
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

			case constants.recordTypes.EMAIL:
				content = (
					<div>
						<h3>Upgrade Your Account To Access This Report!</h3>
						<p className="intro">
							When you upgrade your account with Email Report access you'll be able to search for any email address and reveal Online accounts and other information associated with that email address.
						</p>
						<p className="includes">
							Email Reports may contain:
						</p>
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
					<p className="billing-details">*Billing Details: {this.props.crossSell.terms}</p>
					<div className="confirm">
						<button className="continue" onClick={this.purchaseCrossSell}>I agree <span>yes, charge me ${this.props.crossSell.recurring_price}/mo</span></button>
						<a className="cancel" onClick={this.cancelCrossSell}>Cancel</a>
					</div>
				</div>
			</div>
		);
	}
}

export default PaymentPrompt;

PaymentPrompt.propTypes = {
	crossSell: PropTypes.object.isRequired
};
