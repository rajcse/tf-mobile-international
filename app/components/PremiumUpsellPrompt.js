import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import viewActions from 'actions/viewActions';
import firebaseClient from 'utils/firebaseClient';

class PremiumUpsellPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			introModal: true,
			confirmationModal: false,
			upgradingModal: false
		};

		firebaseClient.progressFunnel('PREMIUM_PROMPT_VIEWED_NO_PURCHASE');

		this.continueToConfirmation = this.continueToConfirmation.bind(this);
		this.confirmPurchaseAndUpgrade = this.confirmPurchaseAndUpgrade.bind(this);
		this.confirmUpgradeWithCredits = this.confirmUpgradeWithCredits.bind(this);
		this.cancelPremiumUpsell = this.cancelPremiumUpsell.bind(this);
	}

	componentWillUnmount() {
		// Clear the record blur
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.remove('blur');
	}

	continueToConfirmation() {
		this.setState({
			introModal: false,
			confirmationModal: true
		});
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
		const { product, record, accountInfo } = this.props.premiumUpsell,
			fullName = `${record.data.name.first} ${record.data.name.last}`; // This will always be present

		return (
			<div id="payment-prompt">
				{/* First Step - Show intro text to upsell */}
				{ this.state.introModal ?
					<div className="modal">
						<h3>Important Report Info</h3>
						<p className="intro">Please read this important notice about {fullName}'s Report:</p>
						<p>
							Thank you for being a valued TruthFinder user. One of our top priorities is helping you get as much information
							as possible in every report so that you can have a more complete understanding about the people you search.
						</p>
						<p>
							Remember, your subscription gives you access to all of the data in an unlimited number of Standard Reports but you should
							know that more information could be available and you have the option to search for more information by upgrading your report
							to a Premium Report. This information can include sensitive personal information such as bankruptcies, liens, and mortgages.
						</p>
						<p>
							This Premium Data is valuable and costs us money. Because this upgrade requires an additional fee to access, we require your
							personal authorization to continue. Click the “CONTINUE” button below to add all available Premium Data to your report and
							learn as much about {fullName} as possible.
						</p>
						<p className="confirm">
							<button type="button" className="continue btn btn-primary btn-upgrade" onClick={this.continueToConfirmation}>Continue</button>
							<a className="cancel" onClick={this.cancelPremiumUpsell}>No Thanks, I don't want more info.</a>
						</p>
					</div>
				: null }

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
	premiumUpsell: PropTypes.object
};
