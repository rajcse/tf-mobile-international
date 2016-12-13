import React from 'react';
import _ from 'lodash';
import { createFilter } from 'react-search-input';
import constants from 'constants/pubRecConstants';
import viewActions from 'actions/viewActions';
import Header from 'components/Header';
import Svg from 'components/svg/Svg';
import Link from 'components/Link';
import DashboardRow from './components/DashboardRow';

const KEYS_TO_FILTERS = [
	'data.name.first',
	'data.name.last',
	'data.location.address.city',
	'data.location.address.state',
	'data.phone.number',
	'data.email.address'
];

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			records: [],
			filter: 'ALL',
			isArchived: false,
			confirmArchive: false,
			isSearching: false
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
		this.searchRecords = this.searchRecords.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.archiveAllRecords = this.archiveAllRecords.bind(this);
		this.archiveStatusToggle = this.archiveStatusToggle.bind(this);
	}

	handleFilterChange(event) {
		this.setState({
			filter: event.target.value
		});
	}

	/**
	* Update search term
	**/
	handleSearch(term) {
		this.setState({
			searchTerm: term,
			filter: 'ALL'
		});
	}

	/**
	 * Toggle Search Records
	 */
	toggleSearch() {
		this.setState({
			isSearching: !this.state.isSearching
		});
	}

	/**
	* Filter Services
	*/
	searchRecords(records) {
		let filtered = records.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

		return filtered;
	}

	/**
	 * Archive All Reports
	 */
	archiveAllRecords(records) {
		records.map(record => viewActions.archiveRecord(record.id[2]));
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
		// Filter out bad records with missing pointers, archived records, and location records
		let records = this.props.appState.usage.filter(record => record.data.pointer && record.id[1] !== 'location' && !record.data.isArchived);

		records = this.searchRecords(records);

		return (
			<div id="dashboard">
				<Header
					title="My Reports"
					isArchived={this.state.isArchived}
					archiveStatusToggle={this.archiveStatusToggle}
					searchFilter={this.handleSearch}
					searchTerm={this.state.searchTerm}
					isSearching={this.state.isSearching}
					toggleSearch={this.toggleSearch}
				/>

				{ _.isEmpty(this.state.searchTerm) ?
					<div id="record-filter" className={records.length ? '' : 'disabled'}>
						<label htmlFor="dashboard-filter">FILTER BY</label>
						<select disabled={records.length ? false : true} id="dashboard-filter" name="dashboard-filter" defaultValue={'ALL'} onChange={this.handleFilterChange}>
							<option value="ALL">All Reports</option>
							<option value={constants.recordTypes.PERSON}>Person Reports</option>
							<option value={constants.recordTypes.PHONE}>Phone Reports</option>
							<option value={constants.recordTypes.EMAIL}>Email Reports</option>
						</select>
					</div>
				: null }

				{ _.isEmpty(this.state.searchTerm) ? records.length ?
					<h6>Sorted by most recently viewed</h6>
					: <h6>No Reports</h6>
					: <h6>Search Records for "{this.state.searchTerm}"</h6>
				}

				<ul id="record-history">
					{ records.map(record => (this.state.filter === 'ALL' || record.id[1] === this.state.filter) &&
						<DashboardRow
							key={JSON.stringify(record.id[2])}
							archiveStatus={this.state.isArchived}
							{...record}
						/>)
					}


					{/* Fallback if no records exist on dashboard or recently archived all records */}
					{ !records.length &&
						<div className="no-records">
							<h3>No Report History</h3>
							<p>
								<Link to="/search">Do a New Search!</Link>
							</p>
						</div>
					}

					{ _.isEmpty(this.state.searchTerm) ? null
						: <button className="btn btn-primary btn-upgrade" onClick={() => this.handleSearch('')}>Show All Reports</button>
					}
				</ul>

				{ this.state.isArchived &&
					<div className="archive-all">
						<button className="btn" onClick={() => this.archiveModalToggle()}>Clear All Report History</button>
					</div>
				}

				{ this.state.confirmArchive &&
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
				}
			</div>
		);
	}
}

Dashboard.propTypes = {
	appState: React.PropTypes.object
};
