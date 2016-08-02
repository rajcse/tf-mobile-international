import _ from 'lodash';
import React, { Component } from 'react';
import pubRecAPI from '../utils/PubRecAPI';
import userStore from '../stores/UserStore';
import viewActions from '../actions/viewActions';
import constants from '../constants/pubRecConstants';
import SearchLink from './SearchLink';

export default class Support extends Component {
	constructor(props) {
		super(props);

		// This component should always mount without account info
		this.state = {
			accountInfo: null
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.doLogout = this.doLogout.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
		userStore.addChangeListener(this.onUserChange);

		// Initial mount should trigger account fetch - this makes sure only fresh data is served
		// This cannot be an action, so hit the DAO directly in this case
		pubRecAPI.fetchAccountInfo();
	}

	onUserChange() {
		this.setState({
			accountInfo: userStore.getAccountInfo()
		});
	}

	doLogout() {
		viewActions.logout();
	}

	handleClick(e) {
		console.log('BUTTON!');
		console.log(e.type);
	}

	render() {
		return (
			<div>
				<h1>Account Info</h1>
				{!this.state.accountInfo ?
					<p>Loading Account Info...</p> :

						<dl>
							<dt>Username</dt>
							<dd>{this.state.accountInfo.email}</dd>

							<dt>Person Reports</dt>
							<dd>{this.state.accountInfo.balances.person_report === null ? 'Unlimited' : this.state.accountInfo.balances.person_report + ' credits'}</dd>

							<dt>Phone Reports</dt>
							<dd>{this.state.accountInfo.balances.phone_report === null ? 'Unlimited' : this.state.accountInfo.balances.person_report + ' credits'}</dd>

							<dt>Email Reports</dt>
							<dd>{this.state.accountInfo.balances.email_report === null ? 'Unlimited' : this.state.accountInfo.balances.person_report + ' credits'}</dd>
						</dl>
				}

				<div id="logout">
					<button onClick={this.doLogout}>Logout</button>
				</div>

				<h2>Dev Crap Below</h2>
				<p><button onTouchTap={this.handleClick}> Tap Me!</button></p>
				<p><button onClick={this.handleClick}> Click Me!</button></p>
				<p><button onTouchTap={this.handleClick} onClick={this.handleClick}> ClickTap Me!</button></p>
				<p><SearchLink criteria={{type: constants.reportTypes.PERSON, query: {firstName: 'John', lastName: 'Doe', state: 'CA'}, text: 'John Doe'}}>Do a person search!</SearchLink></p>
				<p><SearchLink criteria={{type: constants.reportTypes.PHONE, query: {phone: '7148619593'}, text: '7148619593'}}>Do a phone search!</SearchLink></p>
				<p><SearchLink criteria={{type: constants.reportTypes.EMAIL, query: {email: 'kris.kibak@gmail.com'}, text: 'kris.kibak@gmail.com'}}>Do an email search!</SearchLink></p>
			</div>
		);
	}
};
