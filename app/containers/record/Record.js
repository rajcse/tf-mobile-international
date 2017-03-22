import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import constants from 'constants/pubRecConstants';
import pubRecAPI from 'utils/PubRecAPI';
import viewActions from 'actions/viewActions';
import recordStore from 'stores/recordStore';
import ErrorPrompt from 'components/ErrorPrompt';
import RecordLoader from './components/RecordLoader';
import PersonRecord from './containers/PersonRecord';
import PhoneRecord from './containers/PhoneRecord';
import EmailRecord from './containers/EmailRecord';
import LocationRecord from './containers/LocationRecord';

export default class Record extends Component {
	constructor(props, context) {
		super(props, context);

		// Initial state should always be null, even if the record is cached
		this.state = {
			record: null,
			error: null,
			offender: {},
			criminal: {},
			locationId: null,
			recordPosition: 0
		};

		this.onRecordChange = this.onRecordChange.bind(this);
		this._gotoLocationModal = this._gotoLocationModal.bind(this);
		this._gotoOffenderModal = this._gotoOffenderModal.bind(this);
		this._gotoCriminalModal = this._gotoCriminalModal.bind(this);
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

	componentDidUpdate() {
		if (this.state.recordPosition !== 0){
			window.scrollTo(0, this.state.recordPosition);
		}
	}

	componentWillUnmount() {
		recordStore.removeChangeListener(this.onRecordChange);
	}

	onRecordChange() {
		this.setState({
			record: recordStore.getCurrentRecord(),
			error: recordStore.getError()
		});
	}

	_gotoLocationModal(locationId) {
		let { params } = this.props;
		let baseUrl = `/users/${params.userId}/records/${params.recordId}`;

		this.setState({
			locationId: locationId
		}, hashHistory.push(`${baseUrl}/location`));
	}

	_gotoOffenderModal(offender) {
		let { params } = this.props;
		let baseUrl = `/users/${params.userId}/records/${params.recordId}`;

		this.setState({
			offender: offender
		}, hashHistory.push(`${baseUrl}/offender`));
	}

	_gotoCriminalModal(criminal) {
		let { params } = this.props;
		let baseUrl = `/users/${params.userId}/records/${params.recordId}`;

		this.setState({
			criminal: criminal
		}, hashHistory.push(`${baseUrl}/criminal`));
	}


	render() {
		if(this.state.error) {
			return (
				<ErrorPrompt 
					confirmError={this.state.error.criteria ? viewActions.goToSearch(this.state.error.criteria) : viewActions.clearRecordError} 
					message="There was an error loading your report, please try again" 

				/>
			);
		}

		if(!this.state.record) {
			return (
				<RecordLoader
					backButton
				/>
			);
		}

		let recordRendered = null;

		switch(this.state.record.id[1]) {
			case constants.recordTypes.PERSON:
				recordRendered = (
					<PersonRecord
						record={this.state.record}
						openLocation={this._gotoLocationModal}
						openCrime={this._gotoCriminalModal}
						location={this.props.location}
						appState={this.props.appState}
					/>
				);
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
				{this.props.children && React.cloneElement(this.props.children, {
					record: this.state.record,
					offender: this.state.offender,
					criminal: this.state.criminal,
					locationId: this.state.locationId,
					openLocation: this._gotoLocationModal,
					openOffender: this._gotoOffenderModal
				}) || recordRendered}
				<div id="fcra-disclaimer">
					<p>
						DISCLAIMER: You may not use our service or the information it provides to make decisions about consumer credit,
						employment, insurance, tenant screening, or any other purpose that would require FCRA compliance. TruthFinder does
						not provide consumer reports and is not a consumer reporting agency. (These terms have special meanings under the
						Fair Credit Reporting Act, 15 USC 1681 et seq., ("FCRA"), which are incorporated herein by reference.) The information
						available on our website may not be 100% accurate, complete, or up to date, so do not use it as a substitute for your
						own due diligence, especially if you have concerns about a person's criminal history. TruthFinder does not make any
						representation or warranty about the accuracy of the information available through our website or about the character
						or integrity of the person about whom you inquire. For more information, please review TruthFinder Terms of Use
					</p>
				</div>
			</div>
		);
	}
}

Record.propTypes = {
	appState: PropTypes.object,
	params: PropTypes.object,
	children: PropTypes.node,
	location: PropTypes.object
};
