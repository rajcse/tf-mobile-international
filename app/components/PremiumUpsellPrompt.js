import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import viewActions from 'actions/viewActions';
import firebaseClient from 'utils/firebaseClient';

class PremiumUpsellPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			confirmationModal: true,
			upgradingModal: false
		};

		firebaseClient.progressFunnel('PREMIUM_PROMPT_VIEWED_NO_PURCHASE');

		this.confirmPurchaseAndUpgrade = this.confirmPurchaseAndUpgrade.bind(this);
		this.confirmUpgradeWithCredits = this.confirmUpgradeWithCredits.bind(this);
		this.cancelPremiumUpsell = this.cancelPremiumUpsell.bind(this);
	}

	componentWillUnmount() {
		// Clear the record blur
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.remove('blur');

		if(this.props.onClose) this.props.onClose();
	}

	confirmPurchaseAndUpgrade() {
		this.setState({
			confirmationModal: false,
			upgradingModal: true
		}, () => {
			viewActions.purchasePremiumRecord(this.props.premiumUpsell);
			this.blurRecord();
		});
	}

	confirmUpgradeWithCredits() {
		this.setState({
			confirmationModal: false,
			upgradingModal: true
		}, () => {
			viewActions.upgradeToPremiumRecord(this.props.premiumUpsell.record.id[2]);
			this.blurRecord();
		});
	}

	cancelPremiumUpsell() {
		viewActions.cancelPremiumUpsell();
	}

	blurRecord() {
		// Do this safely to enable upsells from outside records
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.add('blur');
	}

	render() {
		const { product, accountInfo } = this.props.premiumUpsell;

		return (
			<div id="payment-prompt">
				{/* Continue to Purchase */}
				{ this.state.confirmationModal ?
					<div className="modal">
						<h3>Important Report Info</h3>
						<p>Click <strong>CONTINUE</strong> to add available Premium Data to this report and see what else you can uncover. <strong>Our data providers update their databases daily!!</strong></p>

						<p className="confirm">
							{ accountInfo.balances.premium_person_report > 0
								? <button className="continue" onClick={this.confirmUpgradeWithCredits}>Continue
									<span>Upgrade this report using 1 Premium credit</span>
								</button>

								: <button className="continue" onClick={this.confirmPurchaseAndUpgrade}>Continue
									<span>Upgrade this report for ${String(product.price).replace('$', '')/* Fix for difference between IAP and Accounts Service */}</span>
								</button>
							}
							<a className="cancel" onClick={this.cancelPremiumUpsell}>No Thanks, I don't want more info.</a>
						</p>
					</div>
				: null }

				{/* Upgrading Modal */}
				{ this.state.upgradingModal ?
					<div className="modal modal-transparent">
						<Loader />
						<h3>Upgrading Your Report</h3>
						<p>Please wait while we add premium data to your report...</p>
					</div>
				: null }
			</div>
		);
	}
}

export default PremiumUpsellPrompt;

PremiumUpsellPrompt.propTypes = {
	premiumUpsell: PropTypes.object.isRequired,
	onClose: PropTypes.func
};
