import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';

export default class Support extends Component {
	constructor(props) {
		super(props);

		this.doLogout = this.doLogout.bind(this);
	}

	doLogout() {
		viewActions.logout();
	}

	render() {

		return (
			<div>
				ACCOUNT PAGE!!!<br/>
				<button onClick={this.doLogout}>Logout</button>
			</div>
		);
	}
};

var styles = {
};
