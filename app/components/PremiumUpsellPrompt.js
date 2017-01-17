import React, { Component, PropTypes } from 'react';
import viewActions from 'actions/viewActions';
import Svg from 'components/svg/Svg';
import PremiumFunnel from 'components/PremiumFunnel';

class PremiumUpsellPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialModal: true,
			confirmationModal: false,
			upgradingModal: false
		};

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
			initialModal: false,
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

		let funnels = [{
			title: 'Finances',
			content: `Financial information can tell you a lot about ${fullName}’s character and spending habits.`,
			list: [ 'Bankruptcies', 'Tax Liens', 'Evictions', 'Foreclosures'],
			split: true
		}, {
			title: 'Assets',
			content: `Asset information can show you about ${fullName}’s lifestyle and where his money goes.`,
			list: [ 'Houses', 'Watercraft', 'Mortgages', 'Properties'],
			split: true
		}, {
			title: 'Licenses',
			content: `This information can show you what ${fullName} is licensed to do/possess.`,
			list: [ 'Hunting & Weapon Licenses', 'Pharmaceutical Licenses', 'Professional Licenses'],
			split: false
		}, {
			title: 'Additional Relationships',
			content: `This section provides names of people that are connected to and live near ${fullName}.`,
			list: [ 'Social Media Connections', 'Related Persons', 'Neighbors', 'Roomates'],
			split: false
		}];

		return (
			<div id="premium-upsell">
				{/* First Step - Show intro text to upsell */}
				{ this.state.initialModal ?
					<div className="funnel initial">
						<div className="content">
							<Svg svg="premiumIcon" className="premium-icon"/>
							<p>Upgrading to a Premium Report is a fantastic way to see additional data on <strong>{fullName}</strong> that isn't available in Free or Full Reports.</p>
							<p>Please tap "Continue" to see the data that's included in Premium</p>
							<div className="confirm">
								<button type="button" className="btn btn-primary btn-upgrade" onClick={this.continueToConfirmation}>Continue</button>
							</div>
						</div>
					</div>
				: null }

				{/* Continue to Purchase */}
				{ this.state.confirmationModal ?
					<div className="funnel confirmation">
						<div className="funnels-wrapper">
							<Svg svg="premiumIcon" className="premium-icon"/>
							<h3>Premium reports include</h3>

							<PremiumFunnel
								funnels={funnels}
							/>
						</div>
					</div>
				: null }

				{/* Upgrading Modal */}
				{ this.state.upgradingModal ?
					<div className="funnel upgrade">
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
			</div>
		);
	}
}

export default PremiumUpsellPrompt;

PremiumUpsellPrompt.propTypes = {
	premiumUpsell: PropTypes.object
};
