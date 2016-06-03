import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';
import viewActions from '../actions/viewActions';
import reportStore from '../stores/reportStore';

export default class Report extends Component {
	constructor(props) {
		super(props);

		// Initial state should always be null, even if the report is cached
		this.state = {
			report: null,
			isLoading: false
		};

		this.onReportChange = this.onReportChange.bind(this);
	}

	onReportChange() {
		console.log('report change triggered');
		this.setState({
			report: reportStore.getCurrentReport(),
			isLoading: false
		});
	}

	componentWillMount() {
		reportStore.addChangeListener(this.onReportChange);

		// Initial mount should trigger a report fetch
		viewActions.fetchReport({reportType: this.props.params.reportType, recordId: this.props.params.recordId});
	}

	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
		// This listens for report changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the type and id are changed
		if (nextProps.params.reportType !== this.props.params.reportType || nextProps.params.recordId !== this.props.params.recordId) {
			// New report is loading, so set isLoading (this gets unset on the report update handler)
			this.setState({isLoading: true});
			viewActions.fetchReport({reportType: nextProps.params.reportType, recordId: nextProps.params.recordId});
		}
	}

	componentWillUnmount() {
		reportStore.removeChangeListener(this.onReportChange);
	}

	render() {
		console.log('report rendering');
		console.log(this.state.report);
		if(!this.state.report) {
			return (
				<div>Fetching Record ID: {this.props.params.recordId} ...</div>
			);
		}

		if(this.state.isLoading) {
			return (
				<div style={styles.loading}>
					<div style={styles.loader}>
						<div style={styles.loadingText}>
							LOADING...
						</div>
					</div>
					<PersonReport person={this.state.report} />
				</div>
			);
		}

		return (
			<div>
				<PersonReport person={this.state.report} />
			</div>
		)

	}
};

const PersonReport = (props) => {
	let person = props.person,
		isPremium = props.person.reportMeta.isPremium,
		reportSections = [];

	reportSections.push(<PersonalSection key={'report-section-' + Math.ceil(Math.random()*10000)} person={person} />);

	return (
		<div>
			<p>
				{person.names[0].first} {person.names[0].last} - {person.reportMeta.recordId}<br/>
				<Link to="/people/8fa0274d-9c15-4595-9367-c8e1ab595087">Go to Joe's report</Link><br/>
				<Link to="/people/51070b95-0216-4c80-b790-887fb3e6ebf7">Go to Brian's report</Link><br/>
				<Link to={'/people/' + Date.now()}>Go to a broken/unseen report</Link>
			</p>
			<h1>Report Data</h1>
			{reportSections}
		</div>
	);
}

const PersonalSection = (props) => {
	let person = props.person,
		name = person.names[0],
		aliases = person.names.slice(1);

	return (
		<section style={styles.personalSection}>
			<h3>Personal Data</h3>
			<PersonalSectionRow rowLabel="Name" key={'name-' + Math.ceil(Math.random()*100000)} rowContent={`${name.first} ${name.middle} ${name.last}`} />
			<PersonalSectionRowSeparator />
			{aliases.map(alias => (
				<PersonalSectionRow rowLabel="Alias" key={'alias-' + Math.ceil(Math.random()*100000)} rowContent={`${alias.first} ${alias.middle} ${alias.last}`} />
			))}
		</section>
	);
}

const PersonalSectionRow = (props) => {
	return (
		<div>
			{props.rowLabel}: {props.rowContent}
		</div>
	);
}

const PersonalSectionRowSeparator = (props) => {
	return (
		<hr/>
	);
}

var styles = {
	loading: {
		position: 'relative'
	},
	loader: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)'
	},
	loadingText: {
		position: 'absolute',
		top: '50%',
		width: '100%',
		textAlign: 'center',
		textTransform: 'uppercase',
		transform: 'translateY(-50%)',
		fontSize: '20px'
	},
	personalSection: {
		
	}
};
