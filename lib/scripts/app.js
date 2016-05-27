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

import resultsStore from './stores/resultsStore';

var styles = {
	app: {
		padding: '60px 10px'
	}
};

class TfApp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			search: {
				results: null,
				loaded: false,
				searching: false,
				criteria: {
					firstName: '',
					lastName: '',
					state: 'ALL'
				}
			},
			user: null
		};

		this.onResultsChange = () => {
			this.setState({
				search: {
					results: resultsStore.getAllResults(),
					loaded: resultsStore.isLoaded(),
					searching: resultsStore.isSearching(),
					criteria: resultsStore.getCriteria()
				}
			});
		};
	}

	componentDidMount() {
		resultsStore.addChangeListener(this.onResultsChange);
	}

	componentWillUnmount() {
		resultsStore.removeChangeListener(this.onResultsChange);
	}

	render() {
		//console.log('sdfasd');
		console.log(localStorage.getItem( 'jwt' ));
		//localStorage.removeItem('jwt');
		if(!localStorage.getItem( 'jwt' )) {
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
				{/*<Route path="/report/:reportId" component={Report}/>*/}
			</Route>
			{<Route path="/login" component={Login}/>}
		</Router>,
		document.querySelector('#app')
	);
};
