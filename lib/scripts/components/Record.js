import _ from 'lodash';
import React from 'react';
import constants from '../constants/pubRecConstants';
import Link from './Link';
import pubRecAPI from '../utils/PubRecAPI';
import viewActions from '../actions/viewActions';
import recordStore from '../stores/recordStore';
import RecordLoader from './RecordLoader';
import PersonRecord from './PersonRecord';
import PhoneRecord from './PhoneRecord';
import EmailRecord from './EmailRecord';
import LocationRecord from './LocationRecord';

export default class Record extends React.Component {
	constructor(props) {
		super(props);

		// Initial state should always be null, even if the record is cached
		this.state = {
			record: null
		};

		this.onRecordChange = this.onRecordChange.bind(this);
	}

	onRecordChange() {
		this.setState({
			record: recordStore.getCurrentRecord()
		});
	}

	componentWillMount() {
		recordStore.addChangeListener(this.onRecordChange);

		// Initial mount should trigger a record fetch
		// This cannot be an action, so hit the DAO directly in this case
		pubRecAPI.fetchRecord({recordId: this.props.params.recordId});
	}

	componentWillUnmount() {
		recordStore.removeChangeListener(this.onRecordChange);
	}

	shouldComponentUpdate() {
		return true;
	}

	componentWillReceiveProps(nextProps) {
		// This listens for record changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the id is changed
		if (nextProps.params.recordId !== this.props.params.recordId) {
			viewActions.fetchRecord({recordId: nextProps.params.recordId});
		}
	}

	render() {
		if(!this.state.record) {
			return (
				<RecordLoader />
			);
		}

		let recordRendered = null;

	    switch(this.state.record.id[1]) {
	        case constants.recordTypes.PERSON:
	            recordRendered = <PersonRecord record={this.state.record} />
	            break;
	        case constants.recordTypes.PHONE:
	            recordRendered = <PhoneRecord record={this.state.record} />
	            break;
	        case constants.recordTypes.EMAIL:
	            recordRendered = <EmailRecord record={this.state.record} />
	            break;
	        case constants.recordTypes.LOCATION:
	            recordRendered = <LocationRecord record={this.state.record} />
	            break;
	        default:
	            break;
	    }

	    return (
	        <div id="record">
	            {recordRendered}
	        </div>
	    )
	}
};
