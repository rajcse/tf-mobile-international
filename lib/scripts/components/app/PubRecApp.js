import React from 'react';

import pubRecAPI from '../../utils/PubRecAPI';
import viewActions from '../../actions/viewActions';

import userStore from '../../stores/userStore';
import searchStore from '../../stores/searchStore';

import Navigation from './Navigation';
import Login from '../login/Login';
import PaymentPrompt from './PaymentPrompt';

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
				criteria: searchStore.getCriteria()
			},
			user: userStore.getUser(),
			accountInfo: userStore.getAccountInfo(),
			productUpsell: userStore.getProductUpsell(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			modalOpen: true
		};

		this.onResultsChange = this.onResultsChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
		this.confirmCrosssell = this.confirmCrosssell.bind(this);
		this.cancelUpsell = this.cancelUpsell.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
				criteria: searchStore.getCriteria()
			}
		});
	}

	onUserChange() {
		this.setState({
			user: userStore.getUser(),
			accountInfo: userStore.getAccountInfo(),
			productUpsell: userStore.getProductUpsell(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors(),
			modalOpen: true
		});
	}

	confirmCrosssell() {
		viewActions.confirmCrosssell(this.state.productUpsell);
	}

	cancelUpsell() {
		viewActions.cancelUpsell();
	}

	closeModal() {
		this.setState({
			modalOpen: false
		});
		setTimeout(() => viewActions.goToDashboard(), 100);
		setTimeout(() => viewActions.refreshProductUpsell(), 100);
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

				{ this.state.productUpsell && this.state.modalOpen ?
					<PaymentPrompt
						confirmCrosssell={this.confirmCrosssell}
						cancelUpsell={this.cancelUpsell}
						accountInfo={this.state.accountInfo}
						closeModal={this.closeModal}
						{...this.state.productUpsell}
					/> : null }

				{ React.cloneElement(children, {
					appState: this.state
				}) }

				<Navigation />
			</div>
		);
	}
}

PubRecApp.propTypes = {
	children: React.PropTypes.node.isRequired,
	dispatch: React.PropTypes.any,
};