import _ from 'lodash';
import React, { Component } from 'react';
import pubRecAPI from 'utils/PubRecAPI';
import userStore from 'stores/userStore';
import viewActions from 'actions/viewActions';
import Header from 'components/Header';
import Loader from 'components/Loader';

export default class Support extends Component {
	constructor(props) {
		super(props);

		// This component should always mount without account info
		this.state = {
			accountInfo: null,
			deleteAccountModal: false,
			deleteConfirmationModal: false
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.doLogout = this.doLogout.bind(this);
		this.deleteAccountModal = this.deleteAccountModal.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
		this.cancelDeleteModal = this.cancelDeleteModal.bind(this);
	}

	componentWillMount() {
		userStore.addChangeListener(this.onUserChange);

		// Initial mount should trigger account fetch - this makes sure only fresh data is served
		// This cannot be an action, so hit the DAO directly in this case
		pubRecAPI.fetchAccountInfo();
	}

	componentWillUnmount() {
		userStore.removeChangeListener(this.onUserChange);
	}

	onUserChange() {
		this.setState({
			accountInfo: userStore.getAccountInfo()
		});
	}

	doLogout() {
		viewActions.logout();
	}

	deleteAccountModal() {
		this.setState({
			deleteAccountModal: true
		});
	}

	cancelDeleteModal() {
		this.setState({
			deleteAccountModal: false
		});
	}

	deleteAccount() {
		viewActions.deleteAccount();
	}

	render() {
		let //premiumBalance,
			personBalance,
			phoneBalance,
			emailBalance,
			defaultPaymentOption = null;

		if(this.state.accountInfo) {
			personBalance = this.state.accountInfo.balances.person_report === null ? 'Unlimited' : this.state.accountInfo.balances.person_report + ' credits';
			phoneBalance = this.state.accountInfo.balances.phone_report === null ? 'Unlimited' : this.state.accountInfo.balances.phone_report + ' credits';
			emailBalance = this.state.accountInfo.balances.email_report === null ? 'Unlimited' : this.state.accountInfo.balances.email_report + ' credits';
			//premiumBalance = this.state.accountInfo.balances.premium_person_report === null ? 'Unlimited' : this.state.accountInfo.balances.premium_person_report + ' credits';

			// There's a tiny chance this will not be present in the event of accounts service error
			if(this.state.accountInfo.payment_options) {
				defaultPaymentOption = _.find(this.state.accountInfo.payment_options, (paymentOption) => (
				    paymentOption.id === this.state.accountInfo.default_payment_option_id && (paymentOption.payment_processor == 'orange' || paymentOption.payment_processor == 'paypal')
				));
			}
		} else {
			// Don't assign these by default above to save the overhead of rendering 3 Loader components on every Account render
			personBalance = <Loader />;
			phoneBalance = <Loader />;
			emailBalance = <Loader />;
			//premiumBalance = <Loader />;
		}

		return (
				this.state.deleteAccountModal
				? <div className="modal">
					<h3>Warning!</h3>
					<p>Are you sure you want to delete your account?</p>
					<p className="confirm">
						<button className="continue" onClick={this.cancelDeleteModal}>No, I want to look up more reports.</button>
						<a className="cancel" onClick={this.deleteAccount}>Yes, delete my account.</a>
					</p>
				</div>

				: <div id="account">
					<Header title="Account Info" />

					<div id="account-details" className="content-block">
						<h3>Account Details</h3>

						<h5>User</h5>
						<dl>
							<dt>Username</dt>
							<dd>{this.props.appState.user.email}</dd>
							<dd id="logout"><button onClick={this.doLogout}>Log Out</button></dd>
						</dl>


						<h5>Report Access</h5>
						<dl className="balances">
							<dt>Person Reports</dt>
							<dd>{personBalance}</dd>

							<dt>Phone Reports</dt>
							<dd>{phoneBalance}</dd>

							<dt>Email Reports</dt>
							<dd>{emailBalance}</dd>
						</dl>

						{!defaultPaymentOption ?
							<dl>
								<dd id="delete-account"><button onClick={this.deleteAccountModal}>Delete Account</button></dd>
							</dl> : null
						}

					</div>
					{defaultPaymentOption &&
						<div id="payment-details" className="content-block">
							<h3>Payment Details</h3>
							<h5>Default Payment Option</h5>
							<dl>
								<dt>{defaultPaymentOption.name}</dt>
								<dd>
									{ defaultPaymentOption.payment_processor !== 'paypal'
										? `EXP: ${defaultPaymentOption.payment_processor_details.exp_month}/${defaultPaymentOption.payment_processor_details.exp_year}`
										: 'PayPal Account'
									}
								</dd>
							</dl> 
						</div>
					}

					<div id="legal" className="content-block">
						<h3>Legal</h3>
						<h4><a href="https://www.truthfinder.com/privacy-policy">Privacy Policy</a></h4>
						<h4><a href="https://www.truthfinder.com/terms-of-use">Terms of Use</a></h4>
					</div>
				</div>
		);
	}
}

Support.propTypes = {
	appState: React.PropTypes.object
};
