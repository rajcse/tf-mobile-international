import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import pubRecAPI from 'utils/PubRecAPI';
import viewActions from 'actions/viewActions';

class PremiumUpsellPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			introModal: true,
			continueModal: false,
			upgradingModal: false
		};

		this.continueToPurchase = this.continueToPurchase.bind(this);
		this.continueToUpgrade = this.continueToUpgrade.bind(this);
		this.confirmPremiumUpsell = this.confirmPremiumUpsell.bind(this);
		this.cancelPremiumUpsell = this.cancelPremiumUpsell.bind(this);
	}

	componentWillMount() {
		pubRecAPI.fetchAccountInfo();
	}

	continueToPurchase() {
		this.setState({
			introModal: false,
			continueModal: true
		});
	}

	continueToUpgrade() {
		this.setState({
			continueModal: false,
			upgradingModal: true
		}, () => {
			this.confirmPremiumUpsell();
			this.blurRecord();
		});
	}

	confirmPremiumUpsell() {
		viewActions.confirmPremiumUpsell(this.state.premiumUpsell);
	}

	cancelPremiumUpsell() {
		viewActions.clearUserErrors();
		viewActions.cancelPremiumUpsell();
	}

	blurRecord() {
		// Do this safely to enable upsells fomr outside records
		const visibleRecord = document.querySelector('#record');
		if(visibleRecord) visibleRecord.classList.add('blur');
	}

	render() {
		const {
				introModal,
				continueModal,
				upgradingModal
			} = this.state,
			{ premiumUpsellProduct, record } = this.props.premiumUpsell,
			fullName = `${record.data.name.first} ${record.data.name.last}`; // This will always be present

		return (
			<div id="payment-prompt">
				{/* First Step - Show intro text to upsell */}
				{ introModal ?
					<div className="modal">
						<i className="icon icon-close" onClick={this.cancelPremiumUpsell}/>
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
							<button type="button" className="continue btn btn-primary btn-upgrade" onClick={this.continueToPurchase}>Continue</button>
							<a className="cancel" onClick={this.cancelPremiumUpsell}>No Thanks, I don't want more info.</a>
						</p>
					</div>
				: null }

				{/* Continue to Purchase */}
				{ continueModal ?
					<div className="modal">
						<i className="icon icon-close" onClick={this.cancelPremiumUpsell}/>
						<h3>Important Report Info</h3>
						<p>Click <strong>CONTINUE</strong> to add available Premium Data to this report and see what else you can uncover. <strong>Our data providers update their databases daily!!</strong></p>

						<p className="confirm">
							<button className="continue" onClick={this.continueToUpgrade}>Continue
								{ this.props.accountInfo.balances.premium_person_report > 0 ?
									<span>Upgrade this report using 1 credit</span>
									: <span>Upgrade this report for ${premiumUpsellProduct.price}</span> }
							</button>
							<a className="cancel" onClick={this.cancelPremiumUpsell}>No Thanks, I don't want more info.</a>
						</p>
					</div>
				: null }

				{/* Upgrading Modal */}
				{ upgradingModal ?
					<div className="modal modal-transparent">
						<Loader />
						<h3>Upgrading Your Report</h3>
						<p>Please wait while we add premium data to your report...</p>
					</div>
				: null }

				{/* Purchase Upsell */}
				{ this.props.purchasePending ?
					<div className="modal">
						<h3>Upgrading your report...</h3>
						<p>Please wait while we add more data to your your report...</p>
					</div>
				: null }
			</div>
		);
	}
}

export default PremiumUpsellPrompt;

PremiumUpsellPrompt.propTypes = {
	purchasePending: PropTypes.bool.isRequired,
	premiumUpsell: PropTypes.object,
	accountInfo: PropTypes.object
};
