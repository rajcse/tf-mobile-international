import React from 'react';
import _ from 'lodash';
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
		// Filter Dashboard Reports by people with pointers
		let records = _.filter(this.props.appState.usage, (record) => {
			return !_.isNull(record.data.pointer);
		});

		// Filter Dashboard Reports by people with valid ids
		records = _.filter(records, (record) => {
			return record.id[1] !== 'people';
		});

		// Filter Dashboard Reports: Hide address look ups
		records = _.filter(records, (record) => {
			return record.id[1] !== 'location';
		});


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
					{ records.map(record => this.state.filter === 'ALL' || record.id[1] === this.state.filter ?
						<DashboardRow key={JSON.stringify(record.id[2])} {...record} />
					: null) }
				</ul>
			</div>
		);
	}
}

Dashboard.propTypes = {
	appState: React.PropTypes.object
};
