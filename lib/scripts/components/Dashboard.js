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
			<div>
				<ul style={styles.ul}>
					{this.props.appState.usage.map(record => <DashboardRow key={JSON.stringify(record.id[2])} {...record} />)}
				</ul>
			</div>
		);
	}
};

var styles = {
	ul: {
		listStyleType: 'none',
		margin: 0,
		padding: 0
	}
};
