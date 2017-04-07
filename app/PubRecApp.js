import React from 'react';
import _ from 'lodash';

import config from 'config';
import viewActions from 'actions/viewActions';
import userStore from 'stores/userStore';
import searchStore from 'stores/searchStore';

import Navigation from 'components/Navigation';
import Register from 'containers/register/Register';
import FunnelFrame from 'components/FunnelFrame';
import PremiumUpsellPrompt from 'components/PremiumUpsellPrompt';
import PremiumUpsellFunnel from 'components/PremiumUpsellFunnel';
import PremiumBundlePrompt from 'components/PremiumBundlePrompt';
import StandardUpsellPrompt from 'components/StandardUpsellPrompt';
import PaymentPrompt from 'components/PaymentPrompt';
import ErrorPrompt from 'components/ErrorPrompt';
import RatingsPrompt from 'components/RatingsPrompt';
// import Onboarding from 'components/Onboarding';
import NotificationPrompt from 'components/NotificationPrompt';
import firebaseClient from 'utils/firebaseClient';

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
				criteria: searchStore.getCriteria(),
				errors: searchStore.getSearchErrors()
			},
			user: userStore.getUser(),
			premiumUpsell: userStore.getPremiumUpsell(),
			premiumBundle: userStore.getPremiumBundle(),
			standardUpsell: userStore.getStandardUpsell(),
			crossSell: userStore.getCrossSell(),
			purchaseErrors: userStore.getPurchaseErrors(),
			usage: userStore.getUsage(),
			notifications: userStore.getNotifications(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			recordsViewed: userStore.getrecordsViewed(),
			userHasRated: userStore.getUserHasRated(),
			welcomeModal: userStore.getWelcomeModal(),
			userSeenTimedUpsell: userStore.getUserSeenTimedUpsell(),
			premiumIframeFunnelClosed: false,
			premiumBundleUsed: userStore.getPremiumBundleUsed(),
			premiumFlow: ''
		};

		this.onResultsChange = this.onResultsChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
	}

	componentWillMount() {
		searchStore.addChangeListener(this.onResultsChange);
		userStore.addChangeListener(this.onUserChange);

		firebaseClient.getConfigValue('premium_prompt')
			.then(response => {
				this.setState({
					premiumFlow: response
				});
				firebaseClient.setUserProperty('premium_prompt', response);
			});
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
				criteria: searchStore.getCriteria(),
				errors: searchStore.getSearchErrors()
			}
		});
	}

	onUserChange() {
		this.setState({
			user: userStore.getUser(),
			premiumUpsell: userStore.getPremiumUpsell(),
			standardUpsell: userStore.getStandardUpsell(),
			premiumBundle: userStore.getPremiumBundle(),
			crossSell: userStore.getCrossSell(),
			usage: userStore.getUsage(),
			registering: userStore.isRegistering(),
			registerErrors: userStore.getRegisterErrors(),
			purchaseErrors: userStore.getPurchaseErrors(),
			recordsViewed: userStore.getrecordsViewed(),
			userHasRated: userStore.getUserHasRated(),
			welcomeModal: userStore.getWelcomeModal(),
			userSeenTimedUpsell: userStore.getUserSeenTimedUpsell(),
			premiumBundleUsed: userStore.getPremiumBundleUsed()
		});
	}

	render() {
		// If the user isn't logged in, render the login page
		if(!userStore.isLoggedIn()) {
			return (
				<Register registerErrors={this.state.registerErrors} registering={this.state.registering}/>
			);
		}

		let { children } = this.props;

		return (
			<div>

				{ React.cloneElement(children, {
					appState: this.state
				}) }

				{ this.state.premiumBundle && !this.state.purchaseErrors && !this.state.premiumBundleUsed &&
					<PremiumBundlePrompt
						premiumBundle={this.state.premiumBundle}
					/>
				}

				{ this.state.standardUpsell && !this.state.purchaseErrors && this.state.premiumUpsell &&
					<StandardUpsellPrompt
						standardUpsell={this.state.standardUpsell}
						premiumUpsell={this.state.premiumUpsell}
					/>
				}

				{ this.state.premiumUpsell && !this.state.purchaseErrors && !this.state.standardUpsell
					? this.state.premiumFlow === 'iframe'
						? (!this.state.premiumIframeFunnelClosed &&
							<FunnelFrame
								iframeSrc={`${config.API_ROOT}/premium-funnel/?pid=${this.state.premiumUpsell.record.data.pointer}`}
								onClose={() => this.setState({premiumIframeFunnelClosed: true})}
							/>) ||
							<PremiumUpsellPrompt premiumUpsell={this.state.premiumUpsell} onClose={() => this.setState({premiumIframeFunnelClosed: false})} />

						: <PremiumUpsellFunnel premiumUpsell={this.state.premiumUpsell} />
					: null
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
							? () => { viewActions.clearPurchaseErrors(); viewActions.cancelPremiumUpsell(); viewActions.cancelStandardUpsell();}
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
					(this.state.recordsViewed === 5 || this.state.recordsViewed === 15) && !this.state.userHasRated &&
						<RatingsPrompt
							message="How are you liking our app?"
						/>
				}

				{ // Welcome modal that has a message set by Remote Config
					/*this.state.welcomeModal &&
						<Onboarding />
				*/}

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
