import _ from 'lodash';
import React, { Component } from 'react';
import pubRecAPI from '../../utils/PubRecAPI';
import userStore from '../../stores/UserStore';
import viewActions from '../../actions/viewActions';
import Header from '../shared/Header';
import Loader from '../shared/Loader';

export default class Support extends Component {
	constructor(props) {
		super(props);

		// This component should always mount without account info
		this.state = {
			accountInfo: null
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.doLogout = this.doLogout.bind(this);
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

	render() {
		let premiumBalance,
			personBalance,
			phoneBalance,
			emailBalance,
			defaultPaymentOption = null;

		if(this.state.accountInfo) {
			personBalance = this.state.accountInfo.balances.person_report === null ? 'Unlimited' : this.state.accountInfo.balances.person_report + ' credits';
			phoneBalance = this.state.accountInfo.balances.phone_report === null ? 'Unlimited' : this.state.accountInfo.balances.phone_report + ' credits';
			emailBalance = this.state.accountInfo.balances.email_report === null ? 'Unlimited' : this.state.accountInfo.balances.email_report + ' credits';
			premiumBalance = this.state.accountInfo.balances.premium_person_report === null ? 'Unlimited' : this.state.accountInfo.balances.premium_person_report + ' credits';

			// There's a tiny chance this will not be present in the event of accounts service error
			if(this.state.accountInfo.payment_options) {
				defaultPaymentOption = _.find(this.state.accountInfo.payment_options, {id: this.state.accountInfo.default_payment_option_id});
			}
		} else {
			// Don't assign these by default above to save the overhead of rendering 3 Loader components on every Account render
			personBalance = <Loader />;
			phoneBalance = <Loader />;
			emailBalance = <Loader />;
			premiumBalance = <Loader />;
		}

		return (
			<div id="account">
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

						<dt>Premium Reports</dt>
						<dd>{premiumBalance}</dd>
					</dl>

				</div>

				<div id="payment-details" className="content-block">
					<h3>Payment Details</h3>

					<h5>Default Payment Option</h5>
					{defaultPaymentOption ?
						<dl>
							<dt>{defaultPaymentOption.name}</dt>
							<dd>{defaultPaymentOption.payment_processor !== 'paypal' ? `EXP: ${defaultPaymentOption.payment_processor_details.exp_month}/${defaultPaymentOption.payment_processor_details.exp_year}` : 'PayPal Account'}</dd>
						</dl> : <Loader />
					}
				</div>

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
