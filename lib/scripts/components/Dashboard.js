import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';
import viewActions from '../actions/viewActions';
import userStore from '../stores/userStore';
import DashboardRow from './DashboardRow';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		return (
			<div id="dashboard">
				<ul id="report-history">
					{this.props.appState.usage.map(record => <DashboardRow key={JSON.stringify(record.id[2])} {...record} />)}
				</ul>
			</div>
		);
	}
};