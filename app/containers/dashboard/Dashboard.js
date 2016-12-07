import React from 'react';
import _ from 'lodash';
import { createFilter } from 'react-search-input';
import pubRecAPI from 'utils/PubRecAPI';
import constants from 'constants/pubRecConstants';
import Header from 'components/Header';
import Svg from 'components/svg/Svg';
import Link from 'components/Link';
import DashboardRow from './components/DashboardRow';

const KEYS_TO_FILTERS = [
	'data.name.first',
	'data.name.last',
	'data.location.address.city',
	'data.location.address.state'
];

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

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

		this.state = {
			searchTerm: '',
			records: records,
			filter: 'ALL',
			isArchived: false,
			confirmArchive: false
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.archiveAllRecords = this.archiveAllRecords.bind(this);
		this.archiveStatusToggle = this.archiveStatusToggle.bind(this);
	}

	handleFilterChange() {
		this.setState({filter: event.target.value});
	}

	/**
	* Update search term
	**/
	handleSearch(term) {
		this.setState({
			searchTerm: term
		});
	}

	/**
	* Filter Services
	*/
	searchRecords() {
		let filtered = this.state.records.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

		return filtered;
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
	archiveStatusToggle() {
		this.setState({
			isArchived: !this.state.isArchived
		});
	}

	/**
	 * Trigger Clear All Reports Modal
	 */
	archiveModalToggle() {
		this.setState({
			confirmArchive: !this.state.confirmArchive
		});
	}

	render() {
		let records = this.searchRecords();

		return (
			<div id="dashboard">
				<Header
					title="My Reports"
					archiveStatus={this.state.isArchived}
					archiveStatusToggle={this.archiveStatusToggle}
					searchFilter={this.handleSearch}
				/>

				<div id="record-filter" className={records.length ? '' : 'disabled'}>
					<label htmlFor="dashboard-filter">FILTER BY</label>
					<select disabled={records.length ? false : true} id="dashboard-filter" name="dashboard-filter" defaultValue={'ALL'} onChange={this.handleFilterChange}>
						<option value="ALL" >All Reports</option>
						<option value={constants.recordTypes.PERSON}>Person Reports</option>
						<option value={constants.recordTypes.PHONE}>Phone Reports</option>
						<option value={constants.recordTypes.EMAIL}>Email Reports</option>
					</select>
				</div>

				{ records.length ?
					<h6>Sorted by most recently viewed</h6> :
					<h6>No Reports</h6>
				}

				<ul id="record-history">
					{ records.map(record => this.state.filter === 'ALL' || record.id[1] === this.state.filter ?
						<DashboardRow
							key={JSON.stringify(record.id[2])}
							archiveStatus={this.state.isArchived}
							{...record}
						/>
					: null) }

					{/* Fallback if no records exist on dashboard or recently archived all records */}
					{ records.length ? null
						: <div className="no-records">
							<h3>No Reports Available</h3>
							<p>
								<Link to="/search">Do a New Search!</Link>
							</p>
						</div>
					}
				</ul>

				{ this.state.isArchived ?
					<div className="archive-all">
						<button className="btn" onClick={() => { this.archiveModalToggle(); this.archiveStatusToggle(); }}>Clear All Report History</button>
					</div>
				: null }

				{ this.state.confirmArchive ?
					<div id="archive-prompt">
						<div className="modal-bg" />
						<div className="modal modal-prompt">
							<span className="modal-close" onClick={() => this.archiveModalToggle()}>
								<Svg svg="closeGreyCircle" />
							</span>

							<h3>Confirm</h3>
							<p>Are you sure you want to clear your report history?</p>
							<p>This cannot be undone.</p>

							<div className="confirm">
								<button className="btn btn-primary" onClick={() => { this.archiveModalToggle(); this.archiveAllRecords(records); }}>Clear All Report History</button>
								<button className="btn btn-link" onClick={() => this.archiveModalToggle() }>Cancel</button>
							</div>
						</div>
					</div>
				: null }
			</div>
		);
	}
}

Dashboard.propTypes = {
	appState: React.PropTypes.object
};
