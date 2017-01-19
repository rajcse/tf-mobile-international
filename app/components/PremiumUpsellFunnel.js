import React, { Component, PropTypes } from 'react';
import viewActions from 'actions/viewActions';
import Svg from 'components/svg/Svg';
import CarouselCard from 'components/CarouselCard';

class PremiumUpsellFunnel extends Component {
	constructor(props) {
		super(props);

		const fullName = `${this.props.premiumUpsell.record.data.name.first} ${this.props.premiumUpsell.record.data.name.last}`;

		this.state = {
			initialModal: true,
			funnelModal: false,
			reviewModal: false,
			isWorking: false,
			fullName: fullName,
			// cards: [{
			// 	title: 'Finances',
			// 	content: `Financial information can tell you a lot about ${fullName}’s character and spending habits.`,
			// 	list: [ 'Bankruptcies', 'Tax Liens', 'Evictions', 'Foreclosures'],
			// 	split: true
			// }, {
			// 	title: 'Assets',
			// 	content: `Asset information can show you about ${fullName}’s lifestyle and where his money goes.`,
			// 	list: [ 'Houses', 'Watercraft', 'Mortgages', 'Properties'],
			// 	split: true
			// }, {
			// 	title: 'Licenses',
			// 	content: `This information can show you what ${fullName} is licensed to do/possess.`,
			// 	list: [ 'Hunting & Weapon Licenses', 'Pharmaceutical Licenses', 'Professional Licenses'],
			// 	split: false
			// }, {
			// 	title: 'Additional Relationships',
			// 	content: `This section provides names of people that are connected to and live near ${fullName}.`,
			// 	list: [ 'Social Media Connections', 'Related Persons', 'Neighbors', 'Roomates'],
			// 	split: false
			// }]
			cards: [{
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
			}]
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.continueToFunnel = this.continueToFunnel.bind(this);
		this.continueToReview = this.continueToReview.bind(this);
		this.cancelPremiumUpsell = this.cancelPremiumUpsell.bind(this);
	}

	continueToFunnel() {
		this.setState({
			initialModal: false,
			funnelModal: true
		});
	}

	continueToReview() {
		this.setState({
			initialModal: false,
			funnelModal: false,
			reviewModal: true
		});
	}

	handleSubmit() {
		this.setState({
			isWorking: true
		}, () => {
			this.props.premiumUpsell.accountInfo.balances.premium_person_report > 0 ?
				viewActions.upgradeToPremiumRecord(this.props.premiumUpsell.record.id[2])
				: viewActions.purchasePremiumRecord(this.props.premiumUpsell);
		});
	}

	cancelPremiumUpsell() {
		viewActions.cancelPremiumUpsell();
	}

	render() {
		const {
			product,
			record,
			accountInfo
		} = this.props.premiumUpsell;

		return (
			<div id="premium-funnel">
				{/* First Step - Show intro text to upsell */}
				{ this.state.initialModal ?
					<div className="funnel">
						<div className="content">
							<Svg svg="premiumIcon" className="premium-icon"/>
							<p>Upgrading to a Premium Report is a fantastic way to see additional data on <strong>{this.state.fullName}</strong> that isn't available in Free or Full Reports.</p>
							<p>Please tap "Continue" to see the data that's included in Premium</p>
							<div className="confirm">
								<button type="button" className="btn btn-primary btn-upgrade" onClick={this.continueToFunnel}>Continue</button>
							</div>
						</div>
					</div>
				: null }

				{/* Continue to Funnel */}
				{ this.state.funnelModal ?
					<div className="funnel light">
						<div className="funnels-wrapper">
							<Svg svg="premiumIcon" className="premium-icon"/>
							<h3>Premium reports include</h3>

							<CarouselCard
								cards={this.state.cards}
								cardsType="fullscreen"
								classNames=""
								onComplete={this.continueToReview}
							/>
						</div>
					</div>
				: null }

				{/* Upgrading Modal */}
				{ this.state.reviewModal ?
					<div className="funnel">
						<div className="content">
							<Svg svg="premiumIcon" className="premium-icon"/>
							<h3>Final Step</h3>
							<p>You’re one step away from viewing {record.data.name.first}’s Premium Report.
								Tap "Upgrade Report" to reveal all available Premium Data instantly for only {
									accountInfo.balances.premium_person_report > 0 ? '1 Premium Credit' : `<$${String(product.price).replace('$', '')}>`
								}.
							</p>
							{/* Above: Fix for difference between IAP and Accounts Service */}

							<div className="confirm">
								<button
									disabled={this.state.isWorking}
									className="btn btn-primary btn-upgrade"
									onClick={this.handleSubmit}>
									{ this.state.isWorking ? 'Please wait...' : 'Upgrade Report' }
								</button>

								{ this.state.isWorking ? null
									: <a className="btn btn-cancel" onClick={this.cancelPremiumUpsell}>Cancel</a>
								}
							</div>
						</div>
					</div>
				: null }
			</div>
		);
	}
}

export default PremiumUpsellFunnel;

PremiumUpsellFunnel.propTypes = {
	premiumUpsell: PropTypes.object.isRequired
};
