import _ from 'lodash';
import React from 'react';
import constants from '../../constants/pubRecConstants';
import Header from '../shared/Header';
import PillSelector from '../shared/PillSelector';
import DashboardRow from './DashboardRow';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			filter: 'ALL'
		};
		
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}
	
	handleFilterChange(filter) {
		this.setState({filter});
	}

	render() {
		let filterPills = [
			{
				label: 'All',
				value: 'ALL'
			},
			{
				label: 'Person',
				value: constants.recordTypes.PERSON
			},
			{
				label: 'Phone',
				value: constants.recordTypes.PHONE
			},
			{
				label: 'Email',
				value: constants.recordTypes.EMAIL
			}
		];
		
		return (
			<div id="dashboard">
				<Header />
				<div id="record-filter">
					<h5>Filter Reports By</h5>
    				<PillSelector items={filterPills} name="dashboard-filter" onChange={this.handleFilterChange} defaultValue={'ALL'}/>
			    </div>
				<h6>Sorted by most recently viewed</h6>
				<ul id="record-history">
					{this.props.appState.usage.map(record => this.state.filter === 'ALL' || record.id[1] === this.state.filter ? <DashboardRow key={JSON.stringify(record.id[2])} {...record} /> : null)}
				</ul>
			</div>
		);
	}
};