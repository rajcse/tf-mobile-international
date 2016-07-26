import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';
import constants from '../constants/pubRecConstants';
import SearchLink from './SearchLink';

export default class Support extends Component {
	constructor(props) {
		super(props);

		this.doLogout = this.doLogout.bind(this);
		this.handleClick = this.handleClick.bind(this);
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
				ACCOUNT PAGE!!!<br/>
				<button onClick={this.doLogout}>Logout</button>
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