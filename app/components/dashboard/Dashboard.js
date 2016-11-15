import React from 'react';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import Header from 'components/shared/Header';
import DashboardRow from './DashboardRow';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filter: 'ALL'
		};

		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	handleFilterChange() {
		this.setState({filter: event.target.value});
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

		return (
			<div id="dashboard">
				<Header title="My Reports" />

				<div id="record-filter">
					<label htmlFor="dashboard-filter">FILTER BY</label>
					<select id="dashboard-filter" name="dashboard-filter" defaultValue={'ALL'} onChange={this.handleFilterChange}>
						<option value="ALL" >ALL REPORTS</option>
						<option value={constants.recordTypes.PERSON}>PERSON REPORTS</option>
						<option value={constants.recordTypes.PHONE}>PHONE REPORTS</option>
						<option value={constants.recordTypes.EMAIL}>EMAIL REPORTS</option>
					</select>
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
