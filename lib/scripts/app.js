import config from './config';
import constants from './constants/pubRecConstants';
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import viewActions from './actions/viewActions';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import Support from './components/Support';
import Account from './components/Account';
import Report from './components/Report';

import resultsStore from './stores/resultsStore';
import userStore from './stores/userStore';

var styles = {
	app: {
		padding: '70px 10px 60px'
	}
};

class TfApp extends Component {

	constructor(props) {
		super(props);

		// Clear the search results between logout/login
		viewActions.clearSearchResults();
		
		// Check for local user before initializing state and listening to userStore
		// Essentially this is here to log users in on page refresh/application load.
		// This call is synchronous, so it's safe here and would trigger an unnecessary
		// state update if placed in componentWillMount (since user will ALWAYS be null on page load/app load)
		viewActions.checkLocalUser();

		this.state = {
			search: {
				results: resultsStore.getAllResults(),
				searching: resultsStore.isSearching(),
				criteria: resultsStore.getCriteria()
			},
			user: userStore.getUser()
		};
			
		this.onResultsChange = this.onResultsChange.bind(this);
		this.onUserChange = this.onUserChange.bind(this);		
	}

	onResultsChange() {
		this.setState({
			search: {
				results: resultsStore.getAllResults(),
				searching: resultsStore.isSearching(),
				criteria: resultsStore.getCriteria()
			}
		});
	}

	onUserChange() {
		this.setState({
			user: userStore.getUser()
		});
	}

	componentWillMount() {		
		userStore.addChangeListener(this.onUserChange);
		resultsStore.addChangeListener(this.onResultsChange);
	}

	componentWillUnmount() {
		userStore.removeChangeListener(this.onUserChange);
		resultsStore.removeChangeListener(this.onResultsChange);
	}

	render() {
		// If the user isn't logged in, render the login page
		if(!userStore.isLoggedIn()) {
			return <Login />;
		}
		
		return (
			<div style={styles.app}>
				<Header />

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
				<Route path="/:reportType(/:reportId)" component={Report}/>
			</Route>
		</Router>,
		document.querySelector('#app')
	);
};
