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
import ReportLoader from './components/ReportLoader';

import userStore from './stores/userStore';
import resultsStore from './stores/resultsStore';
import reportStore from './stores/reportStore';

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
			report: {
				reportLoading: reportStore.isReportLoading()
			},
			user: userStore.getUser(),
			usage: userStore.getUsage()
		};
			
		this.onResultsChange = this.onResultsChange.bind(this);
		this.onReportChange = this.onReportChange.bind(this);
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
	
	onReportChange() {
		this.setState({
			report: {
				reportLoading: reportStore.isReportLoading()
			}
		});
	}

	onUserChange() {
		this.setState({
			user: userStore.getUser(),
			usage: userStore.getUsage()
		});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}
		
	componentWillMount() {		
		resultsStore.addChangeListener(this.onResultsChange);
		reportStore.addChangeListener(this.onReportChange);
		userStore.addChangeListener(this.onUserChange);
	}
	
	componentWillUnmount() {
		resultsStore.removeChangeListener(this.onResultsChange);
		reportStore.removeChangeListener(this.onReportChange);
		userStore.removeChangeListener(this.onUserChange);
	}

	render() {
		// If the user isn't logged in, render the login page
		if(!userStore.isLoggedIn()) {
			return <Login />;
		}
				
		return (
			<div style={styles.app}>
				<Header />
				
				{this.state.report.reportLoading ? <ReportLoader /> : null}
				
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
				<Route path="/:reportType(/:recordId)" component={Report}/>
			</Route>
		</Router>,
		document.querySelector('#app')
	);
};
