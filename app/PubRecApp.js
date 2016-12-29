import React from 'react';
import _ from 'lodash';

import viewActions from 'actions/viewActions';
import userStore from 'stores/userStore';
import searchStore from 'stores/searchStore';

import Navigation from 'components/Navigation';
import Login from 'containers/login/Login';
import PremiumUpsellPrompt from 'components/PremiumUpsellPrompt';
import PaymentPrompt from 'components/PaymentPrompt';
import ErrorPrompt from 'components/ErrorPrompt';
import RatingsPrompt from 'components/RatingsPrompt';
import WelcomePrompt from 'components/WelcomePrompt';
import NotificationPrompt from 'components/NotificationPrompt';

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
			premiumUpsell: userStore.getPremiumUpsell(),
			crossSell: userStore.getCrossSell(),
			purchaseErrors: userStore.getPurchaseErrors(),
			usage: userStore.getUsage(),
			notifications: userStore.getNotifications(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			recordsViewed: userStore.getrecordsViewed(),
			userHasRated: userStore.getUserHasRated(),
			welcomeModal: userStore.getWelcomeModalStatus()
		};

		this.onResultsChange = this.onResultsChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
	}

	componentWillMount() {
		searchStore.addChangeListener(this.onResultsChange);
		userStore.addChangeListener(this.onUserChange);
	}

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
			premiumUpsell: userStore.getPremiumUpsell(),
			crossSell: userStore.getCrossSell(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			purchaseErrors: userStore.getPurchaseErrors(),
			recordsViewed: userStore.getrecordsViewed(),
			userHasRated: userStore.getUserHasRated(),
			welcomeModal: userStore.getWelcomeModalStatus()
		});
	}

	confirmWelcome() {
		viewActions.confirmWelcome();
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

				{ this.state.premiumUpsell && !this.state.purchaseErrors &&
					<PremiumUpsellPrompt
						premiumUpsell={this.state.premiumUpsell}
					/>
				}

				{ this.state.crossSell && !this.state.purchaseErrors &&
					<PaymentPrompt
						crossSell={this.state.crossSell}
					/>
				}

				{this.state.purchaseErrors &&
					<ErrorPrompt
						message={
							`An error occured while making your purchase. Please visit
							<a href="https://www.truthfinder.com/dashboard/account/my-billing?referer=mobile-app">www.truthfinder.com</a> to review your settings.`
						}
						confirmError={ this.state.premiumUpsell
							? () => { viewActions.clearPurchaseErrors(); viewActions.cancelPremiumUpsell(); }
							: () => { viewActions.clearPurchaseErrors(); viewActions.cancelCrossSell(); }
						}
					/>
				}

				{this.state.search.errors &&
					<ErrorPrompt
						message="Report Not Found"
						confirmError={viewActions.clearSearchError}
					/>
				}

				{ // pop up the ratings modal when reports looked at is 5 and user has not rated before
					this.state.recordsViewed === 5 && !this.state.userHasRated &&
						<RatingsPrompt
							message="How are you liking our app?"
							message2="If you enjoy using TruthFinder, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!"
						/>
				}

				{ //welcome modal that has the free credit info
					this.state.welcomeModal &&
						<WelcomePrompt
							message1="Congratulations! Your account has been succesfully created and you now have access to one of the most powerful people search apps available."
							message2={
								`To celebrate the launch of our new Mobile App we're granting each new user 50 FREE Person reports,
								30 FREE Phone Number lookups, and 30 FREE Email address lookups. As a bonus, you will also have
								access to our website where you can look people up and view reports on your desktop or laptop!`
							}
							confirmWelcome={this.confirmWelcome}
						/>
				}

				{ !!this.state.notifications.length &&
					<NotificationPrompt notifications={_.takeRight(this.state.notifications, 4)} />
				}

				<Navigation />
			</div>
		);
	}
}

PubRecApp.propTypes = {
	children: React.PropTypes.node.isRequired
};
