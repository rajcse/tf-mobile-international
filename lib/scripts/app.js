import config from 'config';
import constants from './constants/pubRecConstants';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import injectTapEvent from 'react-tap-event-plugin';

import viewActions from './actions/viewActions';

import userStore from './stores/userStore';
import searchStore from './stores/searchStore';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/search/Search';
import Support from './components/support/Support';
import Account from './components/account/Account';
import Report from './components/Report';
import PaymentPrompt from './components/PaymentPrompt';

// Add the tap event
// Reject clicks for production - switch this on build?
injectTapEvent({shouldRejectClick: () => config.DISABLE_CLICK});

class TfApp extends React.Component {

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
			productUpsell: userStore.getProductUpsell(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors()
		};

		this.onResultsChange = this.onResultsChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
		this.confirmUpsell = this.confirmUpsell.bind(this);
		this.cancelUpsell = this.cancelUpsell.bind(this);
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
			productUpsell: userStore.getProductUpsell(),
			usage: userStore.getUsage(),
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors()
		});
	}
	
	confirmUpsell() {
		viewActions.confirmUpsell(this.state.productUpsell);
	}
	
	cancelUpsell() {
		viewActions.cancelUpsell();
	}

	componentWillMount() {
		searchStore.addChangeListener(this.onResultsChange);
		userStore.addChangeListener(this.onUserChange);
	}

	// Fired when new props or state is received. Needs to be FAST
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// Fired when receiving props (setState does NOT trigger this)
	componentWillReceiveProps(nextProps) {

	}

	// Fired immediately before render, and only if shouldComponentUpdate returned true
	componentWillUpdate(nextProps, nextState) {

	}

	// Fired immediately after render and changes are flushed to the DOM
	componentDidUpdate(prevProps, prevState) {

	}

	componentWillUnmount() {
		searchStore.removeChangeListener(this.onResultsChange);
		userStore.removeChangeListener(this.onUserChange);
	}

	render() {
		// If the user isn't logged in, render the login page
		if(!userStore.isLoggedIn()) {
			return (
				<Login loginErrors={this.state.loginErrors} loggingIn={this.state.loggingIn}/>
			);
		}
		
		return (
			<div>
				<Header />
				
				{this.state.productUpsell ? <PaymentPrompt confirmUpsell={this.confirmUpsell} cancelUpsell={this.cancelUpsell} {...this.state.productUpsell} /> : null}
				{React.cloneElement(this.props.children, {appState: this.state})}

				<Navigation />
			</div>
		);
	}
};

window.initializeApp = function() {
	ReactDOM.render(
		<Router history={hashHistory}>
			<Route path="/" component={TfApp}>
				<IndexRoute component={Dashboard}/>
				<Route path="/search" component={Search}/>
				<Route path="/support" component={Support}/>
				<Route path="/account" component={Account}/>
				{/* This goes last because of the loose routing */}
				<Route path="/users/:userId/records/:recordId" component={Report}/>
			</Route>
		</Router>,
		document.querySelector('#app')
	);
};
