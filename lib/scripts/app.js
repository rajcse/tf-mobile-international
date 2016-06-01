import config from './config';
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import tfActions from './actions/tfActions';
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

		// Initialize the resultsStore to clear out data between logout/login
		resultsStore.initialize();

		this.state = {
			search: {
				results: resultsStore.getAllResults(),
				loaded: resultsStore.isLoaded(),
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
				loaded: resultsStore.isLoaded(),
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
		if(!userStore.isLoggedIn()) {
			return (
				<Login/>
			);
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
				<Route path="/:reportType(/:reportId)" component={Report}/>
			</Route>
			<Route path="/login" component={Login}/>
		</Router>,
		document.querySelector('#app')
	);
};
