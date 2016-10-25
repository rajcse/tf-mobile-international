import React from 'react';

import pubRecAPI from '../../utils/PubRecAPI';
import viewActions from '../../actions/viewActions';

import userStore from '../../stores/userStore';
import searchStore from '../../stores/searchStore';

import Navigation from './Navigation';
import Login from '../login/Login';
import PremiumUpsellPrompt from './PremiumUpsellPrompt';
import PaymentPrompt from './PaymentPrompt';
import ErrorPrompt from '../shared/ErrorPrompt';
import SuccessPrompt from '../shared/SuccessPrompt';
import RatingsPrompt from '../shared/RatingsPrompt';
import WelcomePrompt from '../shared/WelcomePrompt';

export default class PubRecApp extends React.Component {

	constructor(props) {
		super(props);

		// Clear the search results between logout/login
		// TODO: Move this to the proper location
		viewActions.clearSearchResults();

		// Check for local user before initializing state and listening to userStore
		// Essentially this is here to log users in on page refresh/application load.
		// This is in the constructor to avoid triggering an unnecessary state update from
		// placing it in componentWillMount (since user will ALWAYS be null on page load/app load).
		// Since all incoming/outgoing actions are synchronous, if a user is already logged in the entire roundtrip
		// of actions is actually synchronous (which means this component will end up with user data before first render!).
		// If there is a valid refresh token, but expired access token, this round trip becomes async like all other API roundtrips
		viewActions.checkLocalUser();

		this.state = {
			search: {
				results: searchStore.getAllResults(),
				searching: searchStore.isSearching(),
				gettingRecord: searchStore.isGettingRecord(),
				criteria: searchStore.getCriteria(),
				errors: searchStore.getSearchErrors()
			},
			user: userStore.getUser(),
			accountInfo: userStore.getAccountInfo(),
			premiumUpsell: userStore.getPremiumUpsell(),
			productCrossSell: userStore.getProductCrossSell(),
			purchasePending: userStore.getPurchasePending(),
			purchaseErrors: userStore.getPurchaseErrors(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			success: userStore.getPurchaseSuccess(),
			reportsLookedAt: userStore.getReportsLookedAt(),
			userRated: userStore.getRated(),
			premiumAccess: userStore.getPremiumAccess(),
			welcomeModal: userStore.getWelcomeModal()
		};

		this.onResultsChange = this.onResultsChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
		this.confirmCrossSell = this.confirmCrossSell.bind(this);
		this.cancelCrossSell = this.cancelCrossSell.bind(this);
		this.confirmPremiumUpsell = this.confirmPremiumUpsell.bind(this);
		this.cancelPremiumUpsell = this.cancelPremiumUpsell.bind(this);
	}

	componentWillMount() {
		searchStore.addChangeListener(this.onResultsChange);
		userStore.addChangeListener(this.onUserChange);
	}

	// // Fired when receiving props (setState does NOT trigger this)
	// componentWillReceiveProps(nextProps) {
	//
	// }
	//
	// Fired when new props or state is received. Needs to be FAST
	shouldComponentUpdate() {
		return true;
	}
	//
	// // Fired immediately before render, and only if shouldComponentUpdate returned true
	// componentWillUpdate(nextProps, nextState) {
	//
	// }
	//
	// // Fired immediately after render and changes are flushed to the DOM
	// componentDidUpdate(prevProps, prevState) {
	//
	// }

	componentWillUnmount() {
		searchStore.removeChangeListener(this.onResultsChange);
		userStore.removeChangeListener(this.onUserChange);
	}

	onResultsChange() {
		this.setState({
			search: {
				results: searchStore.getAllResults(),
				searching: searchStore.isSearching(),
				gettingRecord: searchStore.isGettingRecord(),
				criteria: searchStore.getCriteria(),
				errors: searchStore.getSearchErrors()
			}
		});
	}

	onUserChange() {
		this.setState({
			user: userStore.getUser(),
			accountInfo: userStore.getAccountInfo(),
			premiumUpsell: userStore.getPremiumUpsell(),
			productCrossSell: userStore.getProductCrossSell(),
			purchasePending: userStore.getPurchasePending(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			purchaseErrors: userStore.getPurchaseErrors(),
			success: userStore.getPurchaseSuccess(),
			reportsLookedAt: userStore.getReportsLookedAt(),
			userRated: userStore.getRated(),
			premiumAccess: userStore.getPremiumAccess(),
			welcomeModal: userStore.getWelcomeModal()
		});
	}

	confirmCrossSell() {
		viewActions.confirmCrossSell(this.state.productCrossSell);
	}

	cancelCrossSell() {
		viewActions.clearUserErrors();
		viewActions.cancelCrossSell();
	}
	
	confirmPremiumUpsell() {
		viewActions.confirmPremiumUpsell(this.state.premiumUpsell);
	}

	confirmSuccess() {
		viewActions.clearSuccess();
		window.scrollTo(0, 0);
	}

	cancelPremiumUpsell() {
		viewActions.clearUserErrors();
		viewActions.cancelPremiumUpsell();
	}

	goToSupport() {
		//redirect to support page
		viewActions.goToSupport();

		//marks the user as rated
		viewActions.rate();
	}

	cancelRating() {
		//marks the user as rated
		viewActions.rate();
	}

	cancelWelcome() {
		viewActions.welcome();
	}

	confirmRating() {
		//marks the user as rated
		viewActions.rate();

		//REDIRECT HERE
		window.open("market://details?id=com.truthfinder.app", "_system");
	}

	render() {
		// If the user isn't logged in, render the login page
		if(!userStore.isLoggedIn()) {
			return (
				<Login loginErrors={this.state.loginErrors} loggingIn={this.state.loggingIn}/>
			);
		}

		let { children } = this.props;

		return (
			<div>
				
				{ React.cloneElement(children, {
					appState: this.state
				}) }
				
				{ this.state.premiumUpsell && !this.state.purchaseErrors ?
					<PremiumUpsellPrompt
						purchasePending={this.state.purchasePending}
						confirmUpsell={this.confirmPremiumUpsell}
						cancelUpsell={this.cancelPremiumUpsell}
					/>
					: null
				}
			
				{ this.state.productCrossSell && !this.state.purchaseErrors ?
					<PaymentPrompt
						confirmCrossSell={this.confirmCrossSell}
						purchasePending={this.state.purchasePending}
						cancelCrossSell={this.cancelCrossSell}
						{...this.state.productCrossSell}
					/> : null 
				}
				
				{this.state.purchaseErrors ?
					<ErrorPrompt
						message={"An error occured while making your purchase. Please visit <a href='https://www.truthfinder.com/dashboard/account/my-billing'>www.truthfinder.com</a> to review your settings."}
						confirmError={this.state.premiumUpsell ? this.cancelPremiumUpsell : this.cancelCrossSell}
					/> : null
				}
				{this.state.search.errors ?
					<ErrorPrompt
						message="Report Not Found"
						confirmError={viewActions.clearSearchError}
					/> : null
				}

				{this.state.success ?
					<SuccessPrompt
						message="Purchase Successful"
						confirmSuccess={this.confirmSuccess}
					/> : null
				}

				{
					//pop up the ratings modal when reports looked at is 5 and user has not rated before
					((this.state.reportsLookedAt == 5) && !this.state.userRated) ?
					<RatingsPrompt
						message="How are you liking our app?"
					 	message2="If you enjoy using TruthFinder, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!"
						confirm={this.confirmRating}
						support={this.goToSupport}
						cancel={this.cancelRating}
					/> : null
				}

				{
					//welcome modal that has the free credit info
					(this.state.welcomeModal) ?
					<WelcomePrompt
						message="none"
						cancel={this.cancelWelcome}
					/> : null
				}
				<Navigation />
			</div>
		);
	}
}

PubRecApp.propTypes = {
	children: React.PropTypes.node.isRequired,
	dispatch: React.PropTypes.any,
};
