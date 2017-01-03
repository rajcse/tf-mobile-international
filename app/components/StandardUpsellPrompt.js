import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import viewActions from 'actions/viewActions';
import Svg from 'components/svg/Svg';

class StandardUpsellPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			introModal: true,
			upgradingModal: false
		};

		this.confirmPremiumPurchaseAndUpgrade = this.confirmPremiumPurchaseAndUpgrade.bind(this);
		this.confirmPremiumUpgradeWithCredits = this.confirmPremiumUpgradeWithCredits.bind(this);
		this.confirmStandardPurchaseAndUpgrade = this.confirmStandardPurchaseAndUpgrade.bind(this);
		this.confirmStandardUpgradeWithCredits = this.confirmStandardUpgradeWithCredits.bind(this);

		this.cancelStandardUpsell = this.cancelStandardUpsell.bind(this);
	}

	componentWillUnmount() {
		// Clear the record blur
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.remove('blur');
	}

	confirmPremiumPurchaseAndUpgrade() {
		this.setState({
			introModal: false,
			upgradingModal: true
		}, () => {
			viewActions.purchasePremiumRecord(this.props.premiumUpsell);
			this.blurRecord();
		});
		// viewActions.cancelStandardUpsell();
	}

	confirmPremiumUpgradeWithCredits() {
		this.setState({
			introModal: false,
			upgradingModal: true
		}, () => {
			viewActions.upgradeToPremiumRecord(this.props.premiumUpsell.record.id[2]);
			this.blurRecord();
		});
		// viewActions.cancelStandardUpsell();
	}

	confirmStandardPurchaseAndUpgrade() {
		// viewActions.cancelPremiumUpsell();
		this.setState({
			introModal: false,
			upgradingModal: true
		}, () => {
			viewActions.purchaseStandardRecord(this.props.standardUpsell);
			this.blurRecord();
		});
	}

	confirmStandardUpgradeWithCredits() {
		// viewActions.cancelPremiumUpsell();
		this.setState({
			introModal: false,
			upgradingModal: true
		}, () => {
			viewActions.upgradeToStandardRecord(this.props.standardUpsell.record.id[2]);
			this.blurRecord();
		});
	}

	cancelStandardUpsell() {
		// viewActions.clearUserErrors();
		viewActions.cancelStandardUpsell();
		viewActions.cancelPremiumUpsell();
	}

	blurRecord() {
		// Do this safely to enable upsells from outside records
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.add('blur');
	}

	render() {
		const { product, record, accountInfo } = this.props.standardUpsell,
			fullName = `${record.data.name.first} ${record.data.name.last}`,// This will always be present
			premiumProduct = this.props.premiumUpsell.product; 

		return (
			<div id="payment-prompt">
				{ this.state.introModal ?
					<div className="modal">
						<h3>Unlock Case Details Now!
							<a className="cancel" onClick={this.cancelStandardUpsell}>
								<Svg className="close-modal" svg="closePhoto"/>
							</a>
						</h3>
						<p>Upgrade your report to unlock the details of {fullName}'s criminal records.  Case details may include the name of the offense, whether or not an arrest was made, sentencing information, and more! You might even see a mugshot!</p>
						
						<p className="confirm">
							{ accountInfo.balances.premium_person_report > 0 ?
								<button type="button" className="continue btn btn-primary btn-upgrade orange" 
									onClick={this.confirmPremiumUpgradeWithCredits}>Upgrade this report and unlock all Premium Data using 1 Premium credit}</button>
							:
								<button type="button" className="continue btn btn-primary btn-upgrade orange"
									onClick={this.confirmPremiumPurchaseAndUpgrade}>Unlock Criminal Records + Premium Data for ${String(premiumProduct.price).replace('$', '')}</button>
							}
							{ accountInfo.balances.person_report > 0 ?
								<a className="cancel" onClick={this.confirmStandardUpgradeWithCredits}>I just want to see criminal record details using 1 Person Report Credit</a>
								:
								<a className="cancel" onClick={this.confirmStandardPurchaseAndUpgrade}>I just want to see criminal record details for ${String(product.price).replace('$', '')}</a>
							}
						</p>
					</div>
				: null }

				{/* Upgrading Modal */}
				{ this.state.upgradingModal ?
					<div className="modal modal-transparent">
						<Loader />
						<h3>Upgrading Your Report</h3>
						<p>Please wait while we add more data to your report...</p>
					</div>
				: null }
			</div>
		);
	}
}

export default StandardUpsellPrompt;

StandardUpsellPrompt.propTypes = {
	standardUpsell: PropTypes.object,
	premiumUpsell: PropTypes.object
};
