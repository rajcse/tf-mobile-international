import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';

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
			</div>
		);
	}
};