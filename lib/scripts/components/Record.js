import React from 'react';
import constants from '../constants/pubRecConstants';
import pubRecAPI from '../utils/PubRecAPI';
import viewActions from '../actions/viewActions';
import recordStore from '../stores/recordStore';
import RecordLoader from './RecordLoader';
import PersonRecord from './PersonRecord';
import PhoneRecord from './PhoneRecord';
import EmailRecord from './EmailRecord';
import LocationRecord from './LocationRecord';

// Modals
import LocationModal from './modal/location';
import OffenderModal from './modal/offender';

export default class Record extends React.Component {
	constructor(props) {
		super(props);

		// Initial state should always be null, even if the record is cached
		this.state = {
			record: null,
			location: {
				open: false,
				selected: null
			},
			offender: {
				open: false,
				selected: null
			},
			crime: {
				open: false,
				selected: null
			}
		};

		this.onRecordChange = this.onRecordChange.bind(this);
		this.toggleLocationModal = this.toggleLocationModal.bind(this);
		this.toggleOffenderModal = this.toggleOffenderModal.bind(this);
	}

	componentWillMount() {
		recordStore.addChangeListener(this.onRecordChange);

		// Initial mount should trigger a record fetch
		// This cannot be an action, so hit the DAO directly in this case
		pubRecAPI.fetchRecord({recordId: this.props.params.recordId});
	}

	componentWillReceiveProps(nextProps) {
		// This listens for record changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the id is changed
		if (nextProps.params.recordId !== this.props.params.recordId) {
			viewActions.fetchRecord({recordId: nextProps.params.recordId});
		}
	}

	shouldComponentUpdate() {
		return true;
	}

	componentWillUnmount() {
		recordStore.removeChangeListener(this.onRecordChange);
	}

	onRecordChange() {
		this.setState({
			record: recordStore.getCurrentRecord()
		});
	}

	toggleLocationModal(index) {
		if (this.state.location.open) {
			this.setState({
				location: {
					open: false,
					selected: null
				}
			});
		} else {
			this.setState({
				location: {
					open: true,
					selected: index
				}
			});
		}
	}

	toggleOffenderModal(offender) {
		if (this.state.offender.open) {
			this.setState({
				offender: {
					open: false,
					selected: null
				}
			});
		} else {
			this.setState({
				offender: {
					open: true,
					selected: offender
				}
			});
		}
	}

	render() {
		if(!this.state.record) {
			return (
				<RecordLoader />
			);
		}

		// Offender Modal
		if(this.state.offender.open) {
			return (
				<OffenderModal
					closeOffender={this.toggleOffenderModal}
					offender={this.state.offender.selected}
				/>
			);
		}

		// Location Modal
		if(this.state.location.open) {
			return (
				<LocationModal
					closeLocation={this.toggleLocationModal}
					openOffender={this.toggleOffenderModal}
					selected={this.state.location.selected}
					record={this.state.record}
				/>
			);
		}

		let recordRendered = null;

		switch(this.state.record.id[1]) {
		case constants.recordTypes.PERSON:
			recordRendered = <PersonRecord record={this.state.record} openLocation={this.toggleLocationModal}/>;
			break;
		case constants.recordTypes.PHONE:
			recordRendered = <PhoneRecord record={this.state.record} />;
			break;
		case constants.recordTypes.EMAIL:
			recordRendered = <EmailRecord record={this.state.record} />;
			break;
		case constants.recordTypes.LOCATION:
			recordRendered = <LocationRecord record={this.state.record} />;
			break;
		default:
			break;
		}

		return (
			<div id="record">
				{recordRendered}
			</div>
		);
	}
}

Record.propTypes = {
	params: React.PropTypes.object
};
