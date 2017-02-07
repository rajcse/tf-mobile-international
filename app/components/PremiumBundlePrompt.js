import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import viewActions from 'actions/viewActions';
import Svg from 'components/svg/Svg';

class PremiumBundlePrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			confirmationModal: true,
			upgradingModal: false
		};

		// this.continueToConfirmation = this.continueToConfirmation.bind(this);
		this.confirmPurchaseAndUpgrade = this.confirmPurchaseAndUpgrade.bind(this);
		this.cancelPremiumBundle = this.cancelPremiumBundle.bind(this);
	}

	componentWillUnmount() {
		// Clear the record blur
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.remove('blur');
	}

	confirmPurchaseAndUpgrade() {
		this.setState({
			confirmationModal: false,
			upgradingModal: true
		}, () => {
			viewActions.purchasePremiumBundle(this.props.premiumBundle);
			this.blurRecord();
		});
	}

	cancelPremiumBundle() {
		viewActions.cancelPremiumBundle();
	}

	blurRecord() {
		// Do this safely to enable upsells from outside records
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.add('blur');
	}

	render() {
		const product = this.props.premiumBundle.product;

		return (
			<div  id="premium-bundle">
				{ this.state.confirmationModal ?
					<div className="funnel">
						<content className="content">
							<Svg svg="premiumIcon" className="premium-icon"/>

							<h3>SPECIAL OFFER!</h3>
							<p><strong>Get 3 Premium Report Credits for only the price of 1! That's a savings of $20 and access to three times more data!</strong></p>

							<p className="confirm">
								<button className="continue" onClick={this.confirmPurchaseAndUpgrade}>
									<span>Buy 3 Premium Credits for ${String(product.price).replace('$', '')/* Fix for difference between IAP and Accounts Service */}</span>
								</button>
							</p>
							<p>
								<a className="cancel" onClick={this.cancelPremiumBundle}><u>No thanks, I hate good deals.</u></a>
							</p>
						</content>
					</div>
				: null }

				{/* Upgrading Modal */}
				{ this.state.upgradingModal ?
					<div className="modal modal-transparent">
						<Loader />
						<h3>Purchasing credits</h3>
						<p>Please wait...</p>
					</div>
				: null }
			</div>
		);
	}
}

export default PremiumBundlePrompt;

PremiumBundlePrompt.propTypes = {
	premiumUpsell: PropTypes.object
};
