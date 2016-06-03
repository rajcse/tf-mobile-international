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
		//console.log(localStorage.getItem('usage'));
	}

	render() {

		return (
			<div>
				DASHBOARD PAGE!!!<br/>
				<Link to="/people/8fa0274d-9c15-4595-9367-c8e1ab595087">Go to Joe's report</Link><br/>
				<Link to="/people/51070b95-0216-4c80-b790-887fb3e6ebf7">Go to Brian's report</Link><br/>
				<Link to={'/people/' + Date.now()}>Go to a broken/unseen report</Link>
				<ul>
					{ //	console.log('asdfdas');
					
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
