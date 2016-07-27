import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import Link from './Link';
import pubRecAPI from '../utils/PubRecAPI';
import viewActions from '../actions/viewActions';
import reportStore from '../stores/reportStore';
import ReportLoader from './ReportLoader';
import PersonReport from './PersonReport';
import PhoneReport from './PhoneReport';
import EmailReport from './EmailReport';
import LocationReport from './LocationReport';

export default class Report extends Component {
	constructor(props) {
		super(props);

		// Initial state should always be null, even if the report is cached
		this.state = {
			report: null
		};

		this.onReportChange = this.onReportChange.bind(this);
	}

	onReportChange() {
		this.setState({
			report: reportStore.getCurrentReport()
		});
	}

	componentWillMount() {
		reportStore.addChangeListener(this.onReportChange);

		// Initial mount should trigger a report fetch
		// This cannot be an action, so hit the DAO directly in this case
		pubRecAPI.fetchReport({recordId: this.props.params.recordId});
	}

	componentWillUnmount() {
		reportStore.removeChangeListener(this.onReportChange);
	}

	shouldComponentUpdate() {
		return true;
	}

	componentWillReceiveProps(nextProps) {
		// This listens for report changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the id is changed
		if (nextProps.params.recordId !== this.props.params.recordId) {
			viewActions.fetchReport({recordId: nextProps.params.recordId});
		}
	}

	render() {
		if(!this.state.report) {
			return (
				<ReportLoader />
			);
		}

		let reportRendered = null;
    
	    switch(this.state.report.reportMeta.type) {
	        case 'person':
	            reportRendered = <PersonReport person={this.state.report} />
	            break;
	        case 'phone':
	            reportRendered = <PhoneReport person={this.state.report} />
	            break;
	        case 'email':
	            reportRendered = <EmailReport person={this.state.report} />
	            break;
	        case 'location':
	            reportRendered = <LocationReport person={this.state.report} />
	            break;
	        default:
	            break;
	    }
	    
	    return (
	        <div id="report">
	            {reportRendered}
	        </div>
	    )
	}
};