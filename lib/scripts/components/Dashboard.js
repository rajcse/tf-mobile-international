import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';
import viewActions from '../actions/viewActions';
import userStore from '../stores/userStore';
import DashboardRow from './DashboardRow';

export default class Support extends Component {
	componentWillMount() {
		// Initial mount should trigger a report fetch
		viewActions.getUsage(this.props.appState.user.id);
	}

	render() {

		return (
			<div>
				DASHBOARD
				<ul>
					{ 
			          this.props.appState.usage.map(function(record) {
			            return (
			            	<DashboardRow key={JSON.stringify(record.data.id)} {...record} />
		            	)
			          })
			    	
			        }
				</ul>
			</div>
		);
	}
};

var styles = {
};
