import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import reportStore from '../stores/reportStore';

var constants = config.constants;

export default class Report extends Component {
	constructor(props) {
		super(props);

		this.state = {
			report: null
		};

		this.onReportChange = this.onReportChange.bind(this);
	}

	onReportChange() {
		this.setState({
			report: reportStore.getReport()
		});
	}

	componentDidMount() {
		reportStore.addChangeListener(this.onReportChange);
		reportStore.fetchReport(this.props.params.reportType, this.props.params.reportId);
	}

	componentWillUnmount() {
		reportStore.removeChangeListener(this.onReportChange);
	}

	render() {
		if(!this.state.report) {
			return (
				<div>Fetching Report ID: {this.props.params.reportId} ...</div>
			);
		}

		return (
			<PersonReport person={this.state.report} />
		)

	}
};

const PersonReport = (props) => {
	let person = props.person,
		isPremium = props.person.reportMeta.isPremium;

	return (
			<div>
				{person.names[0].first} {person.names[0].last} in {person.locations[0].address.display}
			</div>
	);
}

var styles = {
};
