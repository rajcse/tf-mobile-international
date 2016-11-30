import React from 'react';
import _ from 'lodash';
import pubRecAPI from 'utils/PubRecAPI';
import constants from 'constants/pubRecConstants';
import Header from 'components/Header';
import DashboardRow from './components/DashboardRow';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filter: 'ALL',
			records: [],
			isArchived: false
		};

		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.archiveAllRecords = this.archiveAllRecords.bind(this);
		this.archiveToggle = this.archiveToggle.bind(this);
	}

	handleFilterChange() {
		this.setState({filter: event.target.value});
	}

	/**
	 * Archive All Reports
	 */
	archiveAllRecords(records) {
		records.map(record => {
			pubRecAPI.toggleArchiveRecord(record.id[2], record.id[1], true);
		});
	}

	/**
	 * Toggle Archive Record in Header
	 */
	archiveToggle() {
		this.setState({
			isArchived: !this.state.isArchived
		});
	}

	render() {
		let records = _.chain(this.props.appState.usage)
			.filter((record) => {
				return !_.isNull(record.data.pointer);
			})
			.filter((record) => {
				// Filter Dashboard Reports by people with valid ids
				return record.id[1] !== 'people';
			})
			.filter((record) => {
				// Filter Dashboard Reports: Hide address look ups
				return record.id[1] !== 'location';
			})
			.filter((record) => {
				// Filter Dashboard Reports: Archived Record
				return !record.data.isArchived;
			}).value();

		return (
			<div id="dashboard">
				<Header
					title="My Reports"
					archiveStatus={this.state.isArchived}
					archiveToggle={this.archiveToggle}
				/>

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
						<DashboardRow
							key={JSON.stringify(record.id[2])}
							archiveStatus={this.state.isArchived}
							{...record}
						/>
					: null) }
				</ul>

				{ this.state.isArchived ?
					<div className="archive-all">
						<button className="btn" onClick={() => this.archiveAllRecords(records) }>Clear All Report History</button>
					</div>
				: null }
			</div>
		);
	}
}

Dashboard.propTypes = {
	appState: React.PropTypes.object
};
